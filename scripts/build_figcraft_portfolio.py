"""Fast parametric FigCraft generator for Dimas Brahmantya's Portfolio Redesign.

Builds five artboards directly inside a running live FigCraft instance
(via `figcraft-cli.exe mcp --attach 7979`) or offline into a `.figcraft` file:
  1. Design System Tokens (Off-White / White / Grey / Black / Blue / Pink)
  2. Home Desktop (1440px) - Hero (Cutout + Creative Portfolio backdrop), Works, About, Contact
  3. Home Mobile (390px) - Responsive vertical reflow
  4. Project Archive Desktop (/projects 1440px) - Search, Filter Chips, All 10 Projects + CTA
  5. Project Archive Mobile (/projects 390px) - Responsive vertical reflow

Usage:
  python scripts/build_figcraft_portfolio.py            # Push live to FigCraft on port 7979 & save
  python scripts/build_figcraft_portfolio.py --offline  # Build .figcraft headless without GUI
"""

from __future__ import annotations

import argparse
import json
import os
import socket
import subprocess
import tempfile
import time
from pathlib import Path
from typing import Any

FIGCRAFT_APP = Path(r"D:\Dimas\ArtCraft\FigCraft\FigCraft\figcraft.exe")
FIGCRAFT_CLI = Path(r"D:\Dimas\ArtCraft\FigCraft\FigCraft\figcraft-cli.exe")
DEFAULT_OUT = Path(r"D:\Dimas\ArtCraft\FigCraft\Dimas_Portfolio_Editorial.figcraft")
ROOT_DIR = Path(__file__).resolve().parent.parent
PORTRAIT_CUTOUT = ROOT_DIR / "public" / "dimas-hero-cutout.png"
PROJECTS_DIR = ROOT_DIR / "public" / "projects"

# ---------------------------------------------------------------------------
# Design Tokens (edit these to restyle the whole FigCraft document in 1 run)
# ---------------------------------------------------------------------------
TOKENS = {
    "bg_canvas": "#FAF8F4",      # Warm off-white / putih tulang
    "bg_surface": "#FFFFFF",     # Pure white cards
    "bg_muted": "#F1F3F7",       # Soft neutral grey surfaces
    "border": "#E2E5EC",         # Subtle card/pill border
    "border_strong": "#CBD2DF",  # Interactive border
    "ink_primary": "#111216",    # Crisp black display & headings
    "ink_secondary": "#272B35",  # Body copy
    "ink_muted": "#5A6272",      # Captions & metadata (WCAG AA >= 4.5:1 on #FAF8F4)
    "blue": "#2563EB",           # Primary interactive accent (Cobalt Blue)
    "blue_soft": "#EFF6FF",      # Soft blue pill surface
    "blue_border": "#BFDBFE",    # Subtle blue border
    "blue_ink": "#1D4ED8",       # High-contrast blue text on soft blue
    "blue_glow": "#60A5FA",      # Ambient hero aura (left)
    "pink": "#BE185D",           # Rose pink text accent (WCAG AA 5.69:1 on #FAF8F4)
    "pink_solid": "#DB2777",     # Vibrant rose pink button/dot accent (4.60:1 w/ white)
    "pink_soft": "#FCE7F3",      # Soft blush pink surface
    "pink_tint": "#FDF2F8",      # Ultra-soft blush container surface
    "pink_border": "#F9A8D4",    # Soft pink highlight border
    "pink_ink": "#9D174D",       # High-contrast pink text on blush surface
    "pink_glow": "#F472B6",      # Ambient hero aura (right)
}

FONTS = {
    "serif": "Playfair Display",
    "condensed": "Bahnschrift",
    "display": "Montserrat",
    "sans": "Inter",
    "mono": "Liberation Mono",
}

ALL_PROJECTS = [
    {
        "title": "LoyaltyCard SaaS",
        "type": "SaaS Product",
        "category": "webapp",
        "year": "2026",
        "desc": "Multi-tenant digital loyalty stamp platform for SMEs with QR auto-stamp, PostgreSQL RLS, and zero-login token access.",
        "tech": ["Next.js", "TypeScript", "Supabase", "TailwindCSS"],
        "img": PROJECTS_DIR / "loyaltycard.png",
        "mode": "fill",
        "has_demo": True,
        "has_repo": True,
    },
    {
        "title": "SIMRS Rawat Jalan",
        "type": "Final Tasks",
        "category": "webapp",
        "year": "2026",
        "desc": "Outpatient hospital registration system with specialist doctor quota scheduling, medical record lookup, and live queue.",
        "tech": ["Next.js", "MongoDB", "TailwindCSS", "REST API"],
        "img": PROJECTS_DIR / "simrs.png",
        "mode": "fill",
        "has_demo": False,
        "has_repo": True,
    },
    {
        "title": "Secure Hub",
        "type": "Cybersecurity",
        "category": "webapp",
        "year": "2025",
        "desc": "Anti-phishing URL scanner built on NestJS microservices to detect homograph attacks and malicious shortlinks.",
        "tech": ["Next.js", "NestJS", "MongoDB", "TypeScript"],
        "img": PROJECTS_DIR / "securehub.png",
        "mode": "fill",
        "has_demo": False,
        "has_repo": True,
    },
    {
        "title": "RSUD Grati Registration",
        "type": "Intern Tasks",
        "category": "webapp",
        "year": "2025",
        "desc": "On-premise outpatient kiosk module developed during internship at RSUD Grati, Pasuruan for BPJS & general patients.",
        "tech": ["Laravel", "MySQL", "Bootstrap", "PHP"],
        "img": PROJECTS_DIR / "rsud.png",
        "mode": "fill",
        "has_demo": False,
        "has_repo": True,
    },
    {
        "title": "Smart Laundry UI/UX",
        "type": "Academic Design",
        "category": "uiux",
        "year": "2025",
        "desc": "User-centered mobile laundry pickup and real-time washing status tracker designed with modular Figma components.",
        "tech": ["Figma", "UI/UX Design", "Prototyping"],
        "img": PROJECTS_DIR / "laundry.png",
        "mode": "fit",
        "has_demo": True,
        "has_repo": False,
    },
    {
        "title": "Remadja.Inc Landing Page",
        "type": "E-Commerce",
        "category": "webapp",
        "year": "2026",
        "desc": "Contemporary streetwear lookbook landing page with interactive product catalog and WhatsApp Business checkout flow.",
        "tech": ["Next.js", "Framer Motion", "TypeScript"],
        "img": PROJECTS_DIR / "remadja.png",
        "mode": "fill",
        "has_demo": True,
        "has_repo": True,
    },
    {
        "title": "Sale Pisang UI/UX",
        "type": "E-Commerce Design",
        "category": "uiux",
        "year": "2024",
        "desc": "Mobile e-commerce UX tailored for local Malang banana snack SMEs with streamlined 3-step checkout architecture.",
        "tech": ["Figma", "Design System", "Mobile UI"],
        "img": PROJECTS_DIR / "sale.png",
        "mode": "fill",
        "has_demo": True,
        "has_repo": False,
    },
    {
        "title": "Readly UI/UX",
        "type": "Academic Design",
        "category": "uiux",
        "year": "2024",
        "desc": "Interactive digital library prototype with customizable e-reader mode, reading streak goals, and smart search.",
        "tech": ["Figma", "Information Architecture", "UX"],
        "img": PROJECTS_DIR / "readly.png",
        "mode": "fit",
        "has_demo": True,
        "has_repo": False,
    },
    {
        "title": "Rismansyah Portfolio",
        "type": "Personal Project",
        "category": "webapp",
        "year": "2026",
        "desc": "Responsive software engineering portfolio website featuring interactive project cards and career timeline.",
        "tech": ["Next.js", "React", "TailwindCSS", "Vercel"],
        "img": PROJECTS_DIR / "risman.png",
        "mode": "fill",
        "has_demo": True,
        "has_repo": True,
    },
    {
        "title": "Dimas Portfolio",
        "type": "Personal Site",
        "category": "webapp",
        "year": "2026",
        "desc": "Personal portfolio engineered with Next.js App Router, accessible contrast standards, and structured project catalog.",
        "tech": ["Next.js", "TailwindCSS", "TypeScript"],
        "img": PROJECTS_DIR / "dimas.png",
        "mode": "fill",
        "has_demo": True,
        "has_repo": True,
    },
]


class FigCraftBuilder:
    """Collects FigCraft commands with automatic symbolic step references."""

    def __init__(self) -> None:
        self.commands: list[dict[str, Any]] = []
        self._counter = 0

    def _next_ref(self, prefix: str = "n") -> str:
        self._counter += 1
        return f"{prefix}_{self._counter}"

    def add(self, command: str, params: dict[str, Any], alias: str | None = None) -> str:
        ref = alias or self._next_ref()
        self.commands.append({"command": command, "as": ref, "params": params})
        return ref

    def ref(self, alias: str) -> dict[str, str]:
        return {"$ref": alias}

    def frame(
        self,
        name: str,
        x: float,
        y: float,
        w: float,
        h: float,
        fill: str,
        parent: str | None = None,
        stroke: str | None = None,
        stroke_weight: float = 1.0,
        radius: float = 0,
        clip: bool = True,
        effects: list[dict[str, Any]] | None = None,
    ) -> str:
        props: dict[str, Any] = {"fill": fill, "clip": clip}
        if stroke:
            props["stroke"] = stroke
            props["strokeWeight"] = stroke_weight
        if radius:
            props["cornerRadius"] = radius
        if effects:
            props["effects"] = effects
        params: dict[str, Any] = {
            "name": name,
            "x": x,
            "y": y,
            "width": w,
            "height": h,
            "props": props,
            "select": False,
        }
        if parent:
            params["parent"] = self.ref(parent)
        return self.add("frame.create", params)

    def rect(
        self,
        name: str,
        x: float,
        y: float,
        w: float,
        h: float,
        fill: str | list[dict[str, Any]],
        parent: str,
        radius: float = 0,
        stroke: str | None = None,
        stroke_weight: float = 1.0,
        effects: list[dict[str, Any]] | None = None,
    ) -> str:
        props: dict[str, Any] = {}
        if isinstance(fill, list):
            props["fills"] = fill
        else:
            props["fill"] = fill
        if radius:
            props["cornerRadius"] = radius
        if stroke:
            props["stroke"] = stroke
            props["strokeWeight"] = stroke_weight
        if effects:
            props["effects"] = effects
        return self.add(
            "shape.rectangle",
            {
                "name": name,
                "x": x,
                "y": y,
                "width": w,
                "height": h,
                "parent": self.ref(parent),
                "props": props,
                "select": False,
            },
        )

    def ellipse(
        self,
        name: str,
        x: float,
        y: float,
        w: float,
        h: float,
        fills: str | list[dict[str, Any]],
        parent: str,
    ) -> str:
        props: dict[str, Any] = {"fills": fills} if isinstance(fills, list) else {"fill": fills}
        return self.add(
            "shape.ellipse",
            {
                "name": name,
                "x": x,
                "y": y,
                "width": w,
                "height": h,
                "parent": self.ref(parent),
                "props": props,
                "select": False,
            },
        )

    def text(
        self,
        name: str,
        content: str,
        x: float,
        y: float,
        size: float,
        color: str,
        parent: str,
        family: str = FONTS["sans"],
        style: str = "Regular",
        width: float | None = None,
        align: str = "left",
        line_height: str | float | None = None,
        letter_spacing: str | float | None = None,
    ) -> str:
        props: dict[str, Any] = {
            "fontFamily": family,
            "fontStyle": style,
            "fontSize": size,
            "fill": color,
            "textAlign": align,
        }
        if line_height is not None:
            props["lineHeight"] = line_height
        if letter_spacing is not None:
            props["letterSpacing"] = letter_spacing
        params: dict[str, Any] = {
            "name": name,
            "text": content,
            "x": x,
            "y": y,
            "parent": self.ref(parent),
            "props": props,
            "select": False,
        }
        if width is not None:
            params["width"] = width
        return self.add("text.create", params)

    def image(
        self,
        name: str,
        path: Path,
        x: float,
        y: float,
        w: float,
        h: float,
        parent: str,
        mode: str = "fill",
    ) -> str:
        return self.add(
            "image.place",
            {
                "name": name,
                "path": str(path),
                "x": x,
                "y": y,
                "width": w,
                "height": h,
                "parent": self.ref(parent),
                "mode": mode,
            },
        )

    def pill(
        self,
        name: str,
        label: str,
        x: float,
        y: float,
        parent: str,
        bg: str,
        fg: str,
        border: str | None = None,
        h: float = 34,
        pad_x: float = 16,
        size: float = 12,
        family: str = FONTS["sans"],
        style: str = "SemiBold",
        dot_color: str | None = None,
        shadow: bool = False,
        min_w: float | None = None,
    ) -> tuple[str, float]:
        approx_char_w = size * (0.60 if family == FONTS["mono"] else 0.51)
        dot_space = 18 if dot_color else 0
        w = round(max(min_w or 0, len(label) * approx_char_w + pad_x * 2 + dot_space))
        effects = (
            [{"type": "dropShadow", "color": "#11121614", "offset": [0, 6], "radius": 18}]
            if shadow
            else None
        )
        self.rect(
            f"{name} Bg",
            x,
            y,
            w,
            h,
            bg,
            parent,
            radius=999,
            stroke=border,
            stroke_weight=1,
            effects=effects,
        )
        if dot_color:
            self.ellipse(
                f"{name} DotHalo",
                x + pad_x - 2,
                y + (h - 12) / 2,
                12,
                12,
                f"{dot_color}33",
                parent,
            )
            self.ellipse(
                f"{name} Dot",
                x + pad_x + 1,
                y + (h - 6) / 2,
                6,
                6,
                dot_color,
                parent,
            )
            self.text(
                f"{name} Label",
                label,
                x + pad_x + dot_space,
                y + (h - size * 1.24) / 2,
                size,
                fg,
                parent,
                family=family,
                style=style,
                width=w - pad_x - dot_space - 10,
                align="left",
            )
        else:
            self.text(
                f"{name} Label",
                label,
                x,
                y + (h - size * 1.24) / 2,
                size,
                fg,
                parent,
                family=family,
                style=style,
                width=w,
                align="center",
            )
        return name, w


def build_tokens_artboard(b: FigCraftBuilder) -> None:
    """Artboard 1: Editorial Light Design Tokens & Palette."""
    board = b.frame(
        "01 Design System Tokens",
        0,
        0,
        1440,
        240,
        TOKENS["bg_surface"],
        stroke=TOKENS["border"],
        radius=20,
    )
    b.text(
        "Tokens Kicker",
        "DESIGN TOKENS / EDITORIAL LIGHT + BLUE & PINK CO-ACCENT SYSTEM",
        48,
        34,
        11,
        TOKENS["pink"],
        board,
        family=FONTS["mono"],
        style="Bold",
        letter_spacing="8%",
    )
    b.text(
        "Tokens Title",
        "Dimas Brahmantya  |  Creative Portfolio Palette & Type",
        48,
        56,
        24,
        TOKENS["ink_primary"],
        board,
        family=FONTS["serif"],
        style="Bold",
    )
    b.text(
        "Tokens Meta",
        "Playfair Display (Editorial) + Bahnschrift Condensed (Display) + Montserrat (Headings) + Inter (Body)",
        48,
        92,
        13,
        TOKENS["ink_muted"],
        board,
        family=FONTS["sans"],
    )

    swatches = [
        ("Alabaster", TOKENS["bg_canvas"], TOKENS["ink_primary"]),
        ("White", TOKENS["bg_surface"], TOKENS["ink_primary"]),
        ("Soft Grey", TOKENS["bg_muted"], TOKENS["ink_primary"]),
        ("Ink Black", TOKENS["ink_primary"], TOKENS["bg_surface"]),
        ("Cobalt Blue", TOKENS["blue"], TOKENS["bg_surface"]),
        ("Rose Pink", TOKENS["pink_solid"], TOKENS["bg_surface"]),
        ("Blush Pink", TOKENS["pink_soft"], TOKENS["pink_ink"]),
    ]
    sx = 48
    for label, hex_val, text_c in swatches:
        b.rect(
            f"Swatch {label}",
            sx,
            134,
            176,
            72,
            hex_val,
            board,
            radius=12,
            stroke=TOKENS["pink_border"] if "Pink" in label else TOKENS["border"],
        )
        b.text(
            f"Swatch Name {label}",
            label,
            sx + 14,
            148,
            12,
            text_c,
            board,
            family=FONTS["sans"],
            style="SemiBold",
        )
        b.text(
            f"Swatch Hex {label}",
            hex_val,
            sx + 14,
            172,
            11,
            text_c,
            board,
            family=FONTS["mono"],
        )
        sx += 192


def build_desktop_artboard(b: FigCraftBuilder) -> None:
    """Artboard 2: Full Desktop Portfolio Redesign (1440px)."""
    desktop = b.frame(
        "02 Portfolio Editorial Desktop (1440px)",
        0,
        330,
        1440,
        3060,
        TOKENS["bg_canvas"],
        stroke=TOKENS["border"],
        radius=24,
    )

    # ------------------------------------------------------------------
    # HERO SECTION (0..820) - Madison Editorial Composition + Rich Blue/Pink Glow
    # ------------------------------------------------------------------
    hero = b.frame("Hero Section", 0, 0, 1440, 820, TOKENS["bg_canvas"], parent=desktop)

    # Stronger Dual Soft Blue & Rose Pink Ambient Aura behind Portrait
    b.ellipse(
        "Hero Aura Left Blue",
        310,
        165,
        580,
        540,
        [
            {
                "type": "radialGradient",
                "stops": [
                    {"position": 0.0, "color": f"{TOKENS['blue_glow']}8A"},
                    {"position": 0.48, "color": f"{TOKENS['blue_glow']}3B"},
                    {"position": 1.0, "color": f"{TOKENS['blue_glow']}00"},
                ],
            }
        ],
        hero,
    )
    b.ellipse(
        "Hero Aura Right Pink",
        535,
        150,
        640,
        580,
        [
            {
                "type": "radialGradient",
                "stops": [
                    {"position": 0.0, "color": f"{TOKENS['pink_glow']}A6"},
                    {"position": 0.46, "color": f"{TOKENS['pink_glow']}4D"},
                    {"position": 1.0, "color": f"{TOKENS['pink_glow']}00"},
                ],
            }
        ],
        hero,
    )

    # Top Navbar
    b.text(
        "Nav Brand",
        "Dimas.",
        64,
        28,
        28,
        TOKENS["ink_primary"],
        hero,
        family=FONTS["serif"],
        style="Italic",
    )
    # Subtle rose pink dot accent under brand mark
    b.ellipse("Nav Brand Pink Dot", 148, 49, 6, 6, TOKENS["pink_solid"], hero)

    nav_items = [
        ("Home", True, 536),
        ("Works", False, 616),
        ("About", False, 702),
        ("Contact", False, 788),
    ]
    for label, active, nx in nav_items:
        b.text(
            f"Nav {label}",
            label,
            nx,
            36,
            14,
            TOKENS["ink_primary"] if active else TOKENS["ink_muted"],
            hero,
            family=FONTS["sans"],
            style="SemiBold" if active else "Medium",
        )
        if active:
            b.rect("Nav Active Bar Blue", nx + 2, 60, 22, 2.5, TOKENS["blue"], hero, radius=2)
            b.rect("Nav Active Bar Pink", nx + 26, 60, 12, 2.5, TOKENS["pink_solid"], hero, radius=2)

    b.pill(
        "Nav Contact CTA",
        "Contact",
        1256,
        26,
        hero,
        TOKENS["ink_primary"],
        TOKENS["bg_surface"],
        h=42,
        pad_x=24,
        size=13,
        style="SemiBold",
        min_w=120,
    )

    # Single-line condensed PORTFOLIO backdrop behind shoulders/chest
    b.text(
        "Hero Backdrop PORTFOLIO",
        "PORTFOLIO",
        120,
        266,
        186,
        "#11121612",
        hero,
        family=FONTS["condensed"],
        style="Bold Condensed",
        width=1200,
        align="center",
        letter_spacing="8%",
    )

    # Editorial serif italic "Creative" & "Portfolio" flanking behind Dimas's head
    b.text(
        "Hero Behind Left Creative",
        "Creative",
        130,
        166,
        100,
        TOKENS["ink_primary"],
        hero,
        family=FONTS["serif"],
        style="Italic",
        width=405,
        align="right",
    )
    b.text(
        "Hero Behind Right Portfolio",
        "Portfolio",
        900,
        166,
        100,
        TOKENS["ink_primary"],
        hero,
        family=FONTS["serif"],
        style="Italic",
        width=430,
        align="left",
    )

    # Foreground Cutout Portrait of Dimas
    if PORTRAIT_CUTOUT.exists():
        b.image("Hero Portrait Cutout", PORTRAIT_CUTOUT, 491, 102, 458, 718, hero, mode="fit")

    # Left-Mid Availability Pill with Rose Pink active dot & soft pink border tint
    b.pill(
        "Availability Badge",
        "Available for new opportunities",
        64,
        396,
        hero,
        TOKENS["bg_surface"],
        TOKENS["ink_primary"],
        border=TOKENS["pink_border"],
        h=40,
        pad_x=16,
        size=13,
        style="Medium",
        dot_color=TOKENS["pink_solid"],
        shadow=True,
    )

    # Left-Bottom Bold Display Name Lockup ("I AM DIMAS BAS")
    b.text(
        "Hero Name Lockup",
        "I AM\nDIMAS BAS",
        64,
        476,
        102,
        TOKENS["ink_primary"],
        hero,
        family=FONTS["condensed"],
        style="Bold Condensed",
        line_height="92%",
        letter_spacing="-1%",
    )

    # Action CTAs below Name: Blue Primary + Soft Blush Pink Secondary
    _, w1 = b.pill(
        "Hero CTA Primary",
        "View Works",
        64,
        696,
        hero,
        TOKENS["blue"],
        TOKENS["bg_surface"],
        h=46,
        pad_x=24,
        size=13,
        style="SemiBold",
    )
    b.pill(
        "Hero CTA Secondary",
        "Full Archive (10)",
        64 + w1 + 12,
        696,
        hero,
        TOKENS["pink_tint"],
        TOKENS["pink_ink"],
        border=TOKENS["pink_border"],
        h=46,
        pad_x=22,
        size=13,
        style="SemiBold",
    )

    # Right-Mid Specialization Bio
    b.text(
        "Hero Bio Right",
        "Informatics Engineering UMM (GPA 3.80).\nSpecialized in Full-Stack Web Apps,\nUI/UX Design, & Modern Frontend.",
        1026,
        390,
        15,
        TOKENS["ink_secondary"],
        hero,
        family=FONTS["sans"],
        style="Regular",
        width=350,
        align="right",
        line_height="150%",
    )

    # Right-Bottom Stacked Tall Condensed Role Title + Pink Edition Pill
    b.text(
        "Hero Role Stack",
        "FULL STACK\nWEB\nDEVELOPER",
        1036,
        504,
        64,
        TOKENS["ink_primary"],
        hero,
        family=FONTS["condensed"],
        style="Bold Condensed",
        width=340,
        align="right",
        line_height="96%",
    )
    b.pill(
        "Hero Edition Pink Pill",
        "MALANG, INDONESIA",
        1188,
        708,
        hero,
        TOKENS["pink_soft"],
        TOKENS["pink_ink"],
        border=TOKENS["pink_border"],
        h=30,
        pad_x=14,
        size=11,
        family=FONTS["mono"],
        style="Bold",
        min_w=188,
    )

    # Hairline section divider
    b.rect("Divider Hero Works", 64, 820, 1312, 1, TOKENS["border"], desktop)

    # ------------------------------------------------------------------
    # SELECTED WORKS SECTION (845..1755)
    # ------------------------------------------------------------------
    works = b.frame("Selected Works Section", 0, 845, 1440, 910, TOKENS["bg_canvas"], parent=desktop)
    b.text(
        "Works Eyebrow",
        "01  /  SELECTED WORKS",
        64,
        24,
        12,
        TOKENS["blue"],
        works,
        family=FONTS["mono"],
        style="Bold",
        letter_spacing="8%",
    )
    b.text(
        "Works Title",
        "Featured Projects.",
        64,
        48,
        42,
        TOKENS["ink_primary"],
        works,
        family=FONTS["serif"],
        style="Bold",
    )
    b.text(
        "Works Subtitle",
        "Production web applications, multi-tenant SaaS architecture, and UI/UX prototypes.",
        64,
        106,
        15,
        TOKENS["ink_muted"],
        works,
        family=FONTS["sans"],
        width=560,
    )

    # Category filter pills (UI/UX accented with soft pink!)
    filter_specs = [
        ("All (10)", TOKENS["ink_primary"], TOKENS["bg_surface"], None),
        ("Web App (7)", TOKENS["bg_surface"], TOKENS["ink_secondary"], TOKENS["border"]),
        ("UI/UX (3)", TOKENS["pink_tint"], TOKENS["pink_ink"], TOKENS["pink_border"]),
    ]
    fx = 1072
    for label, bg_c, fg_c, brd_c in filter_specs:
        _, pw = b.pill(
            f"Filter {label}",
            label,
            fx,
            64,
            works,
            bg_c,
            fg_c,
            border=brd_c,
            h=38,
            pad_x=18,
            size=12,
            style="SemiBold",
        )
        fx += pw + 10

    # Flagship Project Wide Split Card (LoyaltyCard SaaS)
    flagship = b.frame(
        "Flagship Card LoyaltyCard",
        64,
        156,
        1312,
        340,
        TOKENS["bg_surface"],
        parent=works,
        stroke=TOKENS["border"],
        radius=24,
        effects=[{"type": "dropShadow", "color": "#1112160E", "offset": [0, 12], "radius": 32}],
    )
    _, t1w = b.pill(
        "Flagship Tag",
        "FLAGSHIP SAAS",
        36,
        36,
        flagship,
        TOKENS["blue_soft"],
        TOKENS["blue_ink"],
        h=30,
        pad_x=14,
        size=11,
        family=FONTS["mono"],
        style="Bold",
    )
    b.pill(
        "Flagship Subtag",
        "PostgreSQL RLS",
        36 + t1w + 8,
        36,
        flagship,
        TOKENS["pink_soft"],
        TOKENS["pink_ink"],
        border=TOKENS["pink_border"],
        h=30,
        pad_x=14,
        size=11,
        family=FONTS["mono"],
        style="Bold",
    )
    b.text(
        "Flagship Title",
        "LoyaltyCard SaaS",
        36,
        84,
        32,
        TOKENS["ink_primary"],
        flagship,
        family=FONTS["display"],
        style="Bold",
    )
    b.text(
        "Flagship Desc",
        "Multi-tenant digital loyalty stamp platform for SMEs with instant QR camera auto-stamp, zero-login 192-bit token access, and strict Supabase PostgreSQL RLS isolation.",
        36,
        132,
        14,
        TOKENS["ink_secondary"],
        flagship,
        family=FONTS["sans"],
        width=560,
        line_height="155%",
    )
    cx = 36
    for chip in ["#Next.js", "#TypeScript", "#Supabase", "#TailwindCSS"]:
        _, cw = b.pill(
            f"Flagship Chip {chip}",
            chip,
            cx,
            212,
            flagship,
            TOKENS["bg_muted"],
            TOKENS["ink_secondary"],
            h=28,
            pad_x=12,
            size=11,
            family=FONTS["mono"],
            style="Regular",
        )
        cx += cw + 8
    _, fcw = b.pill(
        "Flagship CTA",
        "View Details",
        36,
        266,
        flagship,
        TOKENS["ink_primary"],
        TOKENS["bg_surface"],
        h=42,
        pad_x=20,
        size=12,
        style="SemiBold",
    )
    b.pill(
        "Flagship Archive Link",
        "Open Archive (10) ->",
        36 + fcw + 10,
        266,
        flagship,
        TOKENS["pink_tint"],
        TOKENS["pink_ink"],
        border=TOKENS["pink_border"],
        h=42,
        pad_x=18,
        size=12,
        style="SemiBold",
    )
    b.rect(
        "Flagship Preview Frame",
        652,
        28,
        632,
        284,
        TOKENS["bg_muted"],
        flagship,
        radius=16,
        stroke=TOKENS["border"],
    )
    lc_img = PROJECTS_DIR / "loyaltycard.png"
    if lc_img.exists():
        b.image("Flagship Screenshot", lc_img, 660, 36, 616, 268, flagship, mode="fill")

    # 3 Supporting Project Cards below
    cards_meta = [
        (
            "SIMRS Rawat Jalan",
            "FINAL TASKS",
            "Outpatient hospital registration system with specialist doctor quota scheduling and live queue board.",
            PROJECTS_DIR / "simrs.png",
            "fill",
            TOKENS["blue_soft"],
            TOKENS["blue_ink"],
            TOKENS["border"],
            "Next.js  /  MongoDB  /  REST API",
        ),
        (
            "Secure Hub",
            "CYBERSECURITY",
            "Anti-phishing URL scanner built on NestJS microservices to detect homograph & typo-squatting threats.",
            PROJECTS_DIR / "securehub.png",
            "fill",
            TOKENS["blue_soft"],
            TOKENS["blue_ink"],
            TOKENS["border"],
            "NestJS  /  Next.js  /  TypeScript",
        ),
        (
            "Smart Laundry UI/UX",
            "UI/UX DESIGN",
            "User-centered mobile laundry pickup & live tracking prototype crafted with structured Figma systems.",
            PROJECTS_DIR / "laundry.png",
            "fit",
            TOKENS["pink_soft"],
            TOKENS["pink_ink"],
            TOKENS["pink_border"],
            "Figma  /  User Research  /  Prototype",
        ),
    ]
    for i, (title, badge, desc, img_path, img_mode, b_bg, b_fg, c_border, stack_line) in enumerate(cards_meta):
        cx = 64 + i * 445
        card = b.frame(
            f"Project Card {title}",
            cx,
            524,
            421,
            346,
            TOKENS["bg_surface"],
            parent=works,
            stroke=c_border,
            radius=20,
        )
        b.rect(f"Thumb Bg {title}", 14, 14, 393, 166, TOKENS["bg_muted"], card, radius=14, stroke=TOKENS["border"])
        if img_path.exists():
            b.image(f"Thumb {title}", img_path, 14, 14, 393, 166, card, mode=img_mode)
        b.pill(
            f"Badge {title}",
            badge,
            20,
            194,
            card,
            b_bg,
            b_fg,
            h=26,
            pad_x=11,
            size=10,
            family=FONTS["mono"],
            style="Bold",
        )
        b.text(
            f"Title {title}",
            title,
            20,
            230,
            19,
            TOKENS["ink_primary"],
            card,
            family=FONTS["display"],
            style="Bold",
        )
        b.text(
            f"Desc {title}",
            desc,
            20,
            260,
            13,
            TOKENS["ink_muted"],
            card,
            family=FONTS["sans"],
            width=381,
            line_height="145%",
        )
        b.text(
            f"Stack {title}",
            stack_line,
            20,
            314,
            11,
            TOKENS["ink_secondary"],
            card,
            family=FONTS["mono"],
            style="Bold",
        )

    b.rect("Divider Works About", 64, 1775, 1312, 1, TOKENS["border"], desktop)

    # ------------------------------------------------------------------
    # ABOUT, CREDENTIALS & TECH STACK SECTION (1795..2435)
    # ------------------------------------------------------------------
    about = b.frame("About & Capabilities Section", 0, 1795, 1440, 640, TOKENS["bg_canvas"], parent=desktop)
    b.text(
        "About Eyebrow",
        "02  /  ABOUT & CAPABILITIES",
        64,
        24,
        12,
        TOKENS["pink"],
        about,
        family=FONTS["mono"],
        style="Bold",
        letter_spacing="8%",
    )
    b.text(
        "About Title",
        "Background & Technical Stack.",
        64,
        48,
        40,
        TOKENS["ink_primary"],
        about,
        family=FONTS["serif"],
        style="Bold",
    )

    bio_card = b.frame(
        "About Bio Card",
        64,
        122,
        520,
        476,
        TOKENS["bg_surface"],
        parent=about,
        stroke=TOKENS["border"],
        radius=22,
    )
    b.text(
        "Bio Name",
        "Dimas Brahmantya Aryasena",
        32,
        32,
        22,
        TOKENS["ink_primary"],
        bio_card,
        family=FONTS["display"],
        style="Bold",
    )
    b.text(
        "Bio Summary",
        "Informatics Engineering graduate from Universitas Muhammadiyah Malang (GPA 3.80). Focused on building production web applications, accessible UI systems, and clean full-stack architectures.",
        32,
        68,
        14,
        TOKENS["ink_secondary"],
        bio_card,
        family=FONTS["sans"],
        width=456,
        line_height="155%",
    )
    b.rect("Bio Divider", 32, 166, 456, 1, TOKENS["border"], bio_card)

    b.ellipse("Exp Dot", 34, 196, 10, 10, TOKENS["pink_solid"], bio_card)
    b.text("Exp Year", "EX-INTERN  AUG 2025 - SEP 2025", 54, 192, 11, TOKENS["pink"], bio_card, family=FONTS["mono"], style="Bold")
    b.text("Exp Org", "RSUD Grati Hospital, Pasuruan", 54, 212, 16, TOKENS["ink_primary"], bio_card, family=FONTS["sans"], style="Bold")
    b.text(
        "Exp Detail",
        "Fullstack Web Developer: Built outpatient SIMRS registration module using Laravel & MySQL.",
        54,
        236,
        13,
        TOKENS["ink_muted"],
        bio_card,
        family=FONTS["sans"],
        width=430,
        line_height="145%",
    )

    b.ellipse("Edu Dot", 34, 308, 10, 10, TOKENS["blue"], bio_card)
    b.text("Edu Year", "B.SC. INFORMATICS  |  GPA 3.80", 54, 304, 11, TOKENS["blue"], bio_card, family=FONTS["mono"], style="Bold")
    b.text("Edu Org", "Universitas Muhammadiyah Malang", 54, 324, 16, TOKENS["ink_primary"], bio_card, family=FONTS["sans"], style="Bold")
    b.text(
        "Edu Detail",
        "Informatics Engineering Graduate  |  SMAN 2 Pasuruan",
        54,
        348,
        13,
        TOKENS["ink_muted"],
        bio_card,
        family=FONTS["sans"],
        width=430,
    )

    b.rect("Bio Divider 2", 32, 392, 456, 1, TOKENS["border"], bio_card)
    b.text("Lang Label", "LANGUAGE PROFICIENCY", 32, 412, 11, TOKENS["ink_muted"], bio_card, family=FONTS["mono"], style="Bold")
    b.text("Lang ID", "Indonesian (Native)   |   English (Professional Working)", 32, 434, 13, TOKENS["ink_primary"], bio_card, family=FONTS["sans"], style="SemiBold")

    stack_panel = b.frame(
        "Tech Stack Card",
        612,
        122,
        764,
        476,
        TOKENS["bg_surface"],
        parent=about,
        stroke=TOKENS["border"],
        radius=22,
    )
    b.text("Stack Heading", "Core Technologies & Engineering Tools", 32, 32, 20, TOKENS["ink_primary"], stack_panel, family=FONTS["display"], style="Bold")
    b.text("Stack Sub", "Production tools used across web apps, APIs, databases, and interface design.", 32, 62, 14, TOKENS["ink_muted"], stack_panel, family=FONTS["sans"])

    groups = [
        ("FRONTEND & UI", TOKENS["bg_canvas"], TOKENS["border"], TOKENS["blue_soft"], TOKENS["blue_ink"], ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vue.js"]),
        ("BACKEND & ARCHITECTURE", TOKENS["bg_canvas"], TOKENS["border"], TOKENS["bg_muted"], TOKENS["ink_primary"], ["Laravel", "NestJS", "Node.js", "REST API", "PostgreSQL RLS"]),
        ("DATABASE & PRODUCT DESIGN", TOKENS["pink_tint"], TOKENS["pink_border"], TOKENS["pink_soft"], TOKENS["pink_ink"], ["MySQL", "MongoDB", "Supabase", "Figma", "Design Systems"]),
    ]
    gy = 112
    for gname, box_bg, box_border, gbg, gfg, items in groups:
        b.rect(f"Group Box {gname}", 32, gy, 700, 102, box_bg, stack_panel, radius=16, stroke=box_border)
        b.text(f"Group Title {gname}", gname, 52, gy + 16, 11, gfg if gfg != TOKENS["ink_primary"] else TOKENS["ink_muted"], stack_panel, family=FONTS["mono"], style="Bold", letter_spacing="6%")
        ix = 52
        for item in items:
            is_accent = item in ("Next.js", "TypeScript", "Figma", "Design Systems")
            _, iw = b.pill(
                f"Tech {item}",
                item,
                ix,
                gy + 44,
                stack_panel,
                gbg if is_accent else TOKENS["bg_surface"],
                gfg if is_accent else TOKENS["ink_primary"],
                border=TOKENS["pink_border"] if item in ("Figma", "Design Systems") else TOKENS["border"],
                h=38,
                pad_x=16,
                size=13,
                style="SemiBold",
            )
            ix += iw + 10
        gy += 116

    # ------------------------------------------------------------------
    # CONTACT & FOOTER SECTION (2470..3060)
    # ------------------------------------------------------------------
    contact_wrap = b.frame(
        "Contact Banner Card",
        64,
        2470,
        1312,
        440,
        TOKENS["bg_surface"],
        parent=desktop,
        stroke=TOKENS["border"],
        radius=28,
        effects=[{"type": "dropShadow", "color": "#11121610", "offset": [0, 16], "radius": 40}],
    )
    b.ellipse(
        "Contact Blue Glow",
        860,
        -110,
        460,
        360,
        [
            {
                "type": "radialGradient",
                "stops": [
                    {"position": 0.0, "color": f"{TOKENS['blue_glow']}58"},
                    {"position": 1.0, "color": f"{TOKENS['blue_glow']}00"},
                ],
            }
        ],
        contact_wrap,
    )
    b.ellipse(
        "Contact Pink Glow",
        970,
        75,
        440,
        380,
        [
            {
                "type": "radialGradient",
                "stops": [
                    {"position": 0.0, "color": f"{TOKENS['pink_glow']}66"},
                    {"position": 1.0, "color": f"{TOKENS['pink_glow']}00"},
                ],
            }
        ],
        contact_wrap,
    )

    b.text("Contact Eyebrow", "03  /  GET IN TOUCH", 52, 46, 12, TOKENS["pink"], contact_wrap, family=FONTS["mono"], style="Bold", letter_spacing="8%")
    b.text("Contact Heading 1", "Let's build", 52, 78, 56, TOKENS["ink_primary"], contact_wrap, family=FONTS["display"], style="Black")
    b.text("Contact Heading 2", "something real.", 52, 144, 58, TOKENS["pink"], contact_wrap, family=FONTS["serif"], style="Italic")
    b.text(
        "Contact Sub",
        "Open for Full-Stack Developer, Front-End Engineer, and freelance UI/UX collaborations.",
        52,
        228,
        15,
        TOKENS["ink_secondary"],
        contact_wrap,
        family=FONTS["sans"],
        width=540,
        line_height="150%",
    )

    b.rect("Email Box", 52, 304, 496, 56, TOKENS["bg_muted"], contact_wrap, radius=14, stroke=TOKENS["border"])
    b.text("Email Value", "dimasbrahmantyaaryasena@gmail.com", 72, 324, 13, TOKENS["ink_primary"], contact_wrap, family=FONTS["mono"], style="Bold")
    b.pill("Copy Email Btn", "Copy", 460, 314, contact_wrap, TOKENS["bg_surface"], TOKENS["ink_primary"], border=TOKENS["border_strong"], h=36, pad_x=16, size=12)
    b.pill("Send Msg CTA", "Send Message", 564, 306, contact_wrap, TOKENS["pink_solid"], TOKENS["bg_surface"], h=52, pad_x=24, size=13, style="SemiBold")

    socials = [
        ("Instagram", "@dimasbas_", TOKENS["pink_soft"], TOKENS["pink_ink"], TOKENS["pink_border"]),
        ("GitHub", "DimasBrahmantya", TOKENS["bg_muted"], TOKENS["ink_primary"], TOKENS["border"]),
        ("LinkedIn", "dimas-brahmantya-aryasena", TOKENS["blue_soft"], TOKENS["blue_ink"], TOKENS["blue_border"]),
        ("WhatsApp", "088980457191", TOKENS["bg_muted"], TOKENS["ink_primary"], TOKENS["border"]),
    ]
    sy = 72
    for s_name, s_val, s_bg, s_fg, s_brd in socials:
        b.rect(f"Social Row {s_name}", 820, sy, 436, 68, TOKENS["bg_surface"], contact_wrap, radius=16, stroke=s_brd)
        b.rect(f"Social Badge {s_name}", 836, sy + 16, 36, 36, s_bg, contact_wrap, radius=10)
        b.text(f"Social Init {s_name}", s_name[:2].upper(), 836, sy + 27, 11, s_fg, contact_wrap, family=FONTS["mono"], style="Bold", width=36, align="center")
        b.text(f"Social Title {s_name}", s_name, 888, sy + 14, 12, TOKENS["ink_muted"], contact_wrap, family=FONTS["sans"])
        b.text(f"Social Val {s_name}", s_val, 888, sy + 33, 14, TOKENS["ink_primary"], contact_wrap, family=FONTS["mono"], style="Bold")
        b.text(f"Social Link {s_name}", "Open", 1184, sy + 26, 12, TOKENS["blue"], contact_wrap, family=FONTS["sans"], style="SemiBold", width=48, align="right")
        sy += 82

    b.text("Footer Left", "Dimas Brahmantya Aryasena  |  Creative & Engineering Portfolio", 64, 2972, 13, TOKENS["ink_muted"], desktop, family=FONTS["sans"])
    b.text("Footer Right", "Malang, East Java  |  Back to Top", 1136, 2972, 13, TOKENS["ink_primary"], desktop, family=FONTS["sans"], style="SemiBold", width=240, align="right")


def build_mobile_artboard(b: FigCraftBuilder) -> None:
    """Artboard 3: Home Mobile Responsive Reflow (390px)."""
    mobile = b.frame(
        "03 Portfolio Editorial Mobile (390px)",
        1520,
        330,
        390,
        1780,
        TOKENS["bg_canvas"],
        stroke=TOKENS["border"],
        radius=28,
    )

    b.text("Mob Brand", "Dimas.", 20, 22, 22, TOKENS["ink_primary"], mobile, family=FONTS["serif"], style="Italic")
    b.ellipse("Mob Brand Pink Dot", 87, 39, 5, 5, TOKENS["pink_solid"], mobile)
    b.pill("Mob Menu", "Menu", 220, 18, mobile, TOKENS["bg_surface"], TOKENS["ink_primary"], border=TOKENS["border"], h=38, pad_x=14, size=12)
    b.pill("Mob Contact", "Contact", 292, 18, mobile, TOKENS["ink_primary"], TOKENS["bg_surface"], h=38, pad_x=16, size=12)

    b.ellipse(
        "Mob Aura Blue",
        18,
        135,
        245,
        245,
        [{"type": "radialGradient", "stops": [{"position": 0.0, "color": f"{TOKENS['blue_glow']}85"}, {"position": 1.0, "color": f"{TOKENS['blue_glow']}00"}]}],
        mobile,
    )
    b.ellipse(
        "Mob Aura Pink",
        125,
        135,
        255,
        255,
        [{"type": "radialGradient", "stops": [{"position": 0.0, "color": f"{TOKENS['pink_glow']}95"}, {"position": 1.0, "color": f"{TOKENS['pink_glow']}00"}]}],
        mobile,
    )
    b.text("Mob Behind Top", "PORTFOLIO", 10, 204, 82, "#11121614", mobile, family=FONTS["condensed"], style="Bold Condensed", width=370, align="center", letter_spacing="6%")
    b.text("Mob Creative", "Creative", 14, 128, 33, TOKENS["ink_primary"], mobile, family=FONTS["serif"], style="Italic")
    b.text("Mob Portfolio", "Portfolio", 214, 128, 33, TOKENS["ink_primary"], mobile, family=FONTS["serif"], style="Italic", width=162, align="right")

    if PORTRAIT_CUTOUT.exists():
        b.image("Mob Portrait", PORTRAIT_CUTOUT, 80, 108, 230, 361, mobile, mode="fit")

    b.pill(
        "Mob Avail",
        "Available for new opportunities",
        20,
        482,
        mobile,
        TOKENS["bg_surface"],
        TOKENS["ink_primary"],
        border=TOKENS["pink_border"],
        h=38,
        pad_x=14,
        size=12,
        dot_color=TOKENS["pink_solid"],
        shadow=True,
    )
    b.text("Mob Name", "I AM DIMAS BAS", 20, 536, 48, TOKENS["ink_primary"], mobile, family=FONTS["condensed"], style="Bold Condensed", line_height="98%")
    b.text("Mob Role", "FULL STACK WEB DEVELOPER", 20, 594, 15, TOKENS["blue"], mobile, family=FONTS["display"], style="Bold")
    b.text("Mob Bio", "Informatics UMM (GPA 3.80). Specialized in Next.js, Laravel, & UI/UX systems.", 20, 624, 13, TOKENS["ink_secondary"], mobile, width=350, line_height="145%")
    _, m1 = b.pill("Mob CTA", "View Works", 20, 680, mobile, TOKENS["blue"], TOKENS["bg_surface"], h=44, pad_x=22, size=13)
    b.pill("Mob Archive", "Archive (10)", 20 + m1 + 10, 680, mobile, TOKENS["pink_tint"], TOKENS["pink_ink"], border=TOKENS["pink_border"], h=44, pad_x=20, size=13)

    b.rect("Mob Div 1", 20, 752, 350, 1, TOKENS["border"], mobile)
    b.text("Mob Works Kicker", "01 / SELECTED WORKS", 20, 774, 11, TOKENS["blue"], mobile, family=FONTS["mono"], style="Bold")
    b.text("Mob Works Title", "Featured Projects.", 20, 794, 28, TOKENS["ink_primary"], mobile, family=FONTS["serif"], style="Bold")

    mob_card = b.frame("Mob Card LoyaltyCard", 20, 840, 350, 326, TOKENS["bg_surface"], parent=mobile, stroke=TOKENS["border"], radius=18)
    b.rect("Mob Img Frame", 12, 12, 326, 156, TOKENS["bg_muted"], mob_card, radius=12)
    lc_img = PROJECTS_DIR / "loyaltycard.png"
    if lc_img.exists():
        b.image("Mob LoyaltyImg", lc_img, 12, 12, 326, 156, mob_card, mode="fill")
    b.pill("Mob Tag", "FLAGSHIP SAAS", 16, 180, mob_card, TOKENS["blue_soft"], TOKENS["blue_ink"], h=26, pad_x=10, size=10, family=FONTS["mono"], style="Bold")
    b.text("Mob Card Title", "LoyaltyCard SaaS", 16, 214, 20, TOKENS["ink_primary"], mob_card, family=FONTS["display"], style="Bold")
    b.text("Mob Card Desc", "Multi-tenant digital stamp card platform for SMEs with QR auto-stamp & PostgreSQL RLS.", 16, 242, 12, TOKENS["ink_muted"], mob_card, width=318, line_height="145%")
    b.text("Mob Card Stack", "#Next.js  #TypeScript  #Supabase", 16, 294, 11, TOKENS["ink_secondary"], mob_card, family=FONTS["mono"], style="Bold")

    mob_about = b.frame("Mob About Card", 20, 1188, 350, 236, TOKENS["bg_surface"], parent=mobile, stroke=TOKENS["border"], radius=18)
    b.text("Mob About Kicker", "02 / ABOUT & STACK", 18, 18, 11, TOKENS["pink"], mob_about, family=FONTS["mono"], style="Bold")
    b.text("Mob About Title", "B.Sc. Informatics UMM (3.80)", 18, 40, 18, TOKENS["ink_primary"], mob_about, family=FONTS["display"], style="Bold")
    b.text("Mob About Text", "Ex-Intern SIMRS Developer at RSUD Grati (Aug 2025 - Sep 2025). Core stack: Next.js, React, TypeScript, NestJS, Figma.", 18, 70, 13, TOKENS["ink_secondary"], mob_about, width=314, line_height="150%")
    _, ms1 = b.pill("Mob Stack 1", "Next.js & React", 18, 146, mob_about, TOKENS["blue_soft"], TOKENS["blue_ink"], h=30, pad_x=12, size=11)
    b.pill("Mob Stack 2", "Laravel & NestJS", 18 + ms1 + 8, 146, mob_about, TOKENS["bg_muted"], TOKENS["ink_primary"], h=30, pad_x=12, size=11)
    b.pill("Mob Stack 3", "Figma UI/UX", 18, 184, mob_about, TOKENS["pink_soft"], TOKENS["pink_ink"], border=TOKENS["pink_border"], h=30, pad_x=12, size=11)

    mob_contact = b.frame("Mob Contact Card", 20, 1446, 350, 270, TOKENS["bg_surface"], parent=mobile, stroke=TOKENS["border"], radius=20)
    b.text("Mob Contact Title", "Let's build\nsomething real.", 22, 24, 28, TOKENS["pink"], mob_contact, family=FONTS["serif"], style="Italic", line_height="112%")
    b.text("Mob Email", "dimasbrahmantyaaryasena@gmail.com", 22, 108, 12, TOKENS["ink_secondary"], mob_contact, family=FONTS["mono"], style="Bold")
    b.pill("Mob Msg Btn", "Send Message", 22, 148, mob_contact, TOKENS["pink_solid"], TOKENS["bg_surface"], h=46, pad_x=22, size=13, min_w=306)
    b.text("Mob Socials", "IG @dimasbas_   |   GH DimasBrahmantya", 22, 214, 11, TOKENS["ink_muted"], mob_contact, family=FONTS["mono"])


def build_archive_desktop_artboard(b: FigCraftBuilder) -> None:
    """Artboard 4: Complete Project Archive Page (/projects) Desktop (1440px)."""
    archive = b.frame(
        "04 Project Archive Desktop (/projects 1440px)",
        2020,
        330,
        1440,
        2140,
        TOKENS["bg_canvas"],
        stroke=TOKENS["border"],
        radius=24,
    )

    # Header ambient dual blue/pink aura behind top page intro
    b.ellipse(
        "Arc Aura Blue",
        380,
        -60,
        420,
        340,
        [{"type": "radialGradient", "stops": [{"position": 0.0, "color": f"{TOKENS['blue_glow']}40"}, {"position": 1.0, "color": f"{TOKENS['blue_glow']}00"}]}],
        archive,
    )
    b.ellipse(
        "Arc Aura Pink",
        650,
        -40,
        440,
        360,
        [{"type": "radialGradient", "stops": [{"position": 0.0, "color": f"{TOKENS['pink_glow']}4D"}, {"position": 1.0, "color": f"{TOKENS['pink_glow']}00"}]}],
        archive,
    )

    # Sticky Editorial Top Bar
    b.pill("Arc Back Home", "<-  Back to Home", 64, 26, archive, TOKENS["bg_surface"], TOKENS["ink_primary"], border=TOKENS["border_strong"], h=42, pad_x=18, size=13)
    b.text("Arc Nav Brand", "Dimas.", 672, 26, 26, TOKENS["ink_primary"], archive, family=FONTS["serif"], style="Italic")
    b.ellipse("Arc Nav Brand Dot", 748, 45, 6, 6, TOKENS["pink_solid"], archive)
    b.pill("Arc Total Badge", "10 Curated Works", 1204, 26, archive, TOKENS["pink_soft"], TOKENS["pink_ink"], border=TOKENS["pink_border"], h=40, pad_x=16, size=12, dot_color=TOKENS["pink_solid"], min_w=172)

    # Archive Page Intro
    b.text("Arc Kicker", "PROJECT ARCHIVE  &  CASE STUDIES", 64, 108, 12, TOKENS["pink"], archive, family=FONTS["mono"], style="Bold", width=1312, align="center", letter_spacing="8%")
    b.text("Arc Title 1", "Project", 456, 134, 56, TOKENS["ink_primary"], archive, family=FONTS["condensed"], style="Bold Condensed")
    b.text("Arc Title 2", "Archive.", 646, 128, 60, TOKENS["pink"], archive, family=FONTS["serif"], style="Italic")
    b.text(
        "Arc Subtitle",
        "Complete collection of 10 production web apps, microservices architectures, and Figma UI/UX systems. Click any card for system specs & live links.",
        320,
        208,
        15,
        TOKENS["ink_secondary"],
        archive,
        family=FONTS["sans"],
        width=800,
        align="center",
        line_height="150%",
    )

    # Search Bar + Category Filter Row
    b.rect("Arc Search Input", 64, 286, 460, 48, TOKENS["bg_surface"], archive, radius=14, stroke=TOKENS["border_strong"])
    b.text("Arc Search Placeholder", "Search title, stack, or role (e.g. Next.js, Figma)...", 86, 302, 13, TOKENS["ink_muted"], archive, family=FONTS["sans"])

    cat_pills = [
        ("All (10)", TOKENS["ink_primary"], TOKENS["bg_surface"], None),
        ("Web App (7)", TOKENS["blue_soft"], TOKENS["blue_ink"], TOKENS["blue_border"]),
        ("UI/UX (3)", TOKENS["pink_soft"], TOKENS["pink_ink"], TOKENS["pink_border"]),
    ]
    cfx = 1044
    for lbl, cbg, cfg, cbrd in cat_pills:
        _, cw = b.pill(f"Arc Cat {lbl}", lbl, cfx, 290, archive, cbg, cfg, border=cbrd, h=40, pad_x=18, size=12)
        cfx += cw + 10

    # Quick Tech Stack Chips Row
    b.text("Arc Quick Label", "Filter by stack:", 64, 360, 12, TOKENS["ink_muted"], archive, family=FONTS["mono"], style="Bold")
    qtx = 194
    quick_chips = [
        ("#Next.js", True, False),
        ("#Supabase", False, False),
        ("#Laravel", False, False),
        ("#NestJS", False, False),
        ("#Figma", False, True),
        ("#MongoDB", False, False),
        ("#TypeScript", False, False),
    ]
    for chip, active_blue, is_pink in quick_chips:
        c_bg = TOKENS["blue"] if active_blue else (TOKENS["pink_tint"] if is_pink else TOKENS["bg_surface"])
        c_fg = TOKENS["bg_surface"] if active_blue else (TOKENS["pink_ink"] if is_pink else TOKENS["ink_secondary"])
        c_brd = None if active_blue else (TOKENS["pink_border"] if is_pink else TOKENS["border"])
        _, qcw = b.pill(f"Arc Chip {chip}", chip, qtx, 352, archive, c_bg, c_fg, border=c_brd, h=32, pad_x=14, size=11, family=FONTS["mono"])
        qtx += qcw + 8

    # 3-Column Grid for All 10 Real Projects (Rows 1..4)
    col_w = 421
    col_gap = 24
    row_h = 372
    row_gap = 24
    grid_y = 412

    for idx, proj in enumerate(ALL_PROJECTS):
        col = idx % 3
        row = idx // 3
        px = 64 + col * (col_w + col_gap)
        py = grid_y + row * (row_h + row_gap)
        is_uiux = proj["category"] == "uiux"

        card = b.frame(
            f"Archive Card {idx+1} {proj['title']}",
            px,
            py,
            col_w,
            row_h,
            TOKENS["bg_surface"],
            parent=archive,
            stroke=TOKENS["pink_border"] if is_uiux else TOKENS["border"],
            radius=20,
            effects=[{"type": "dropShadow", "color": "#1112160A", "offset": [0, 8], "radius": 24}],
        )

        # Preview Image Thumbnail
        b.rect(f"Arc Thumb Bg {idx+1}", 12, 12, col_w - 24, 174, TOKENS["bg_muted"], card, radius=14, stroke=TOKENS["border"])
        if proj["img"].exists():
            b.image(f"Arc Thumb {idx+1}", proj["img"], 12, 12, col_w - 24, 174, card, mode=proj["mode"])

        # Top-Left Type Pill & Top-Right Year
        b.pill(
            f"Arc Type {idx+1}",
            proj["type"].upper(),
            20,
            198,
            card,
            TOKENS["pink_soft"] if is_uiux else TOKENS["blue_soft"],
            TOKENS["pink_ink"] if is_uiux else TOKENS["blue_ink"],
            h=24,
            pad_x=10,
            size=10,
            family=FONTS["mono"],
            style="Bold",
        )
        b.pill(
            f"Arc Year {idx+1}",
            "UI/UX" if is_uiux else "WEB APP",
            col_w - 86,
            198,
            card,
            TOKENS["bg_muted"],
            TOKENS["ink_muted"],
            h=24,
            pad_x=10,
            size=10,
            family=FONTS["mono"],
            style="Bold",
            min_w=68,
        )

        # Title & Description
        b.text(f"Arc Proj Title {idx+1}", proj["title"], 20, 232, 18, TOKENS["ink_primary"], card, family=FONTS["display"], style="Bold", width=col_w - 40)
        b.text(f"Arc Proj Desc {idx+1}", proj["desc"], 20, 260, 12.5, TOKENS["ink_muted"], card, family=FONTS["sans"], width=col_w - 40, line_height="145%")

        # Footer Row: Tech Tags + Actions
        b.rect(f"Arc Card Div {idx+1}", 20, 322, col_w - 40, 1, TOKENS["border"], card)
        tech_str = "  ".join(f"#{t}" for t in proj["tech"][:3])
        b.text(f"Arc Tech {idx+1}", tech_str, 20, 338, 10.5, TOKENS["ink_secondary"], card, family=FONTS["mono"], style="Bold")
        action_lbl = "Figma" if is_uiux else ("Demo" if proj["has_demo"] else "GitHub")
        action_bg = TOKENS["pink_solid"] if is_uiux else (TOKENS["blue"] if proj["has_demo"] else TOKENS["ink_primary"])
        b.pill(f"Arc Act {idx+1}", action_lbl, col_w - 92, 332, card, action_bg, TOKENS["bg_surface"], h=28, pad_x=12, size=10.5, min_w=72)

    # Row 4 Cols 2-3 (866px wide): Editorial CTA Companion Banner filling grid gracefully
    cta_banner = b.frame(
        "Archive CTA Companion Card",
        64 + col_w + col_gap,
        grid_y + 3 * (row_h + row_gap),
        col_w * 2 + col_gap,
        row_h,
        TOKENS["bg_surface"],
        parent=archive,
        stroke=TOKENS["pink_border"],
        radius=24,
        effects=[{"type": "dropShadow", "color": "#1112160D", "offset": [0, 10], "radius": 28}],
    )
    b.ellipse(
        "Arc CTA Blue Glow",
        430,
        -60,
        420,
        320,
        [{"type": "radialGradient", "stops": [{"position": 0.0, "color": f"{TOKENS['blue_glow']}4D"}, {"position": 1.0, "color": f"{TOKENS['blue_glow']}00"}]}],
        cta_banner,
    )
    b.ellipse(
        "Arc CTA Pink Glow",
        520,
        100,
        400,
        320,
        [{"type": "radialGradient", "stops": [{"position": 0.0, "color": f"{TOKENS['pink_glow']}66"}, {"position": 1.0, "color": f"{TOKENS['pink_glow']}00"}]}],
        cta_banner,
    )
    b.pill("Arc CTA Badge", "OPEN FOR COLLABORATION", 44, 42, cta_banner, TOKENS["pink_soft"], TOKENS["pink_ink"], border=TOKENS["pink_border"], h=30, pad_x=14, size=11, family=FONTS["mono"], style="Bold")
    b.text("Arc CTA Head 1", "Need a Full-Stack Engineer", 44, 92, 34, TOKENS["ink_primary"], cta_banner, family=FONTS["display"], style="Bold")
    b.text("Arc CTA Head 2", "or UI/UX partner?", 44, 136, 38, TOKENS["pink"], cta_banner, family=FONTS["serif"], style="Italic")
    b.text(
        "Arc CTA Body",
        "Let's discuss your web product, internal dashboard, or Figma interface prototype. Available for full-time, internship, and freelance projects.",
        44,
        196,
        14,
        TOKENS["ink_secondary"],
        cta_banner,
        width=560,
        line_height="155%",
    )
    _, ab1 = b.pill("Arc CTA Msg", "Send Message", 44, 282, cta_banner, TOKENS["pink_solid"], TOKENS["bg_surface"], h=48, pad_x=24, size=13)
    b.pill("Arc CTA Home", "<-  Back to Home", 44 + ab1 + 12, 282, cta_banner, TOKENS["bg_surface"], TOKENS["ink_primary"], border=TOKENS["border_strong"], h=48, pad_x=22, size=13)

    # Archive Footer
    b.rect("Arc Footer Div", 64, 2036, 1312, 1, TOKENS["border"], archive)
    b.text("Arc Footer L", "Dimas Brahmantya Aryasena  |  Project Archive (10 Works)", 64, 2068, 13, TOKENS["ink_muted"], archive)
    b.text("Arc Footer R", "Back to Home", 1256, 2068, 13, TOKENS["blue"], archive, style="SemiBold", width=120, align="right")


def build_archive_mobile_artboard(b: FigCraftBuilder) -> None:
    """Artboard 5: Project Archive Mobile (/projects 390px)."""
    mob_arc = b.frame(
        "05 Project Archive Mobile (/projects 390px)",
        3540,
        330,
        390,
        1620,
        TOKENS["bg_canvas"],
        stroke=TOKENS["border"],
        radius=28,
    )

    # Mobile Sticky Bar
    b.pill("MArc Back", "<- Home", 20, 18, mob_arc, TOKENS["bg_surface"], TOKENS["ink_primary"], border=TOKENS["border_strong"], h=38, pad_x=14, size=12)
    b.text("MArc Brand", "Dimas.", 162, 22, 22, TOKENS["ink_primary"], mob_arc, family=FONTS["serif"], style="Italic")
    b.pill("MArc Count", "10 Works", 282, 18, mob_arc, TOKENS["pink_soft"], TOKENS["pink_ink"], border=TOKENS["pink_border"], h=36, pad_x=12, size=11, min_w=88)

    # Intro & Controls
    b.text("MArc Kicker", "PROJECT ARCHIVE", 20, 82, 11, TOKENS["pink"], mob_arc, family=FONTS["mono"], style="Bold")
    b.text("MArc Title", "All 10 Works.", 20, 102, 34, TOKENS["ink_primary"], mob_arc, family=FONTS["serif"], style="Bold")
    b.rect("MArc Search", 20, 154, 350, 44, TOKENS["bg_surface"], mob_arc, radius=12, stroke=TOKENS["border_strong"])
    b.text("MArc Search Ph", "Search title or tech...", 36, 169, 13, TOKENS["ink_muted"], mob_arc)

    _, mw1 = b.pill("MArc Cat All", "All (10)", 20, 212, mob_arc, TOKENS["ink_primary"], TOKENS["bg_surface"], h=36, pad_x=14, size=11.5)
    _, mw2 = b.pill("MArc Cat Web", "Web (7)", 20 + mw1 + 8, 212, mob_arc, TOKENS["blue_soft"], TOKENS["blue_ink"], border=TOKENS["blue_border"], h=36, pad_x=14, size=11.5)
    b.pill("MArc Cat UI", "UI/UX (3)", 20 + mw1 + mw2 + 16, 212, mob_arc, TOKENS["pink_soft"], TOKENS["pink_ink"], border=TOKENS["pink_border"], h=36, pad_x=14, size=11.5)

    # Stacked Preview of 3 Representative Cards (Web App, Final Task, UI/UX)
    sample_indices = [0, 1, 4]
    cy = 270
    for idx in sample_indices:
        proj = ALL_PROJECTS[idx]
        is_uiux = proj["category"] == "uiux"
        card = b.frame(
            f"MArc Card {proj['title']}",
            20,
            cy,
            350,
            364,
            TOKENS["bg_surface"],
            parent=mob_arc,
            stroke=TOKENS["pink_border"] if is_uiux else TOKENS["border"],
            radius=18,
        )
        b.rect(f"MArc ThumbBg {idx}", 12, 12, 326, 162, TOKENS["bg_muted"], card, radius=12)
        if proj["img"].exists():
            b.image(f"MArc Thumb {idx}", proj["img"], 12, 12, 326, 162, card, mode=proj["mode"])
        b.pill(
            f"MArc Type {idx}",
            proj["type"].upper(),
            16,
            186,
            card,
            TOKENS["pink_soft"] if is_uiux else TOKENS["blue_soft"],
            TOKENS["pink_ink"] if is_uiux else TOKENS["blue_ink"],
            h=26,
            pad_x=10,
            size=10,
            family=FONTS["mono"],
            style="Bold",
        )
        b.text(f"MArc Title {idx}", proj["title"], 16, 222, 18, TOKENS["ink_primary"], card, family=FONTS["display"], style="Bold")
        b.text(f"MArc Desc {idx}", proj["desc"], 16, 250, 12, TOKENS["ink_muted"], card, width=318, line_height="145%")
        b.pill(
            f"MArc CTA {idx}",
            "Open Figma Prototype" if is_uiux else "View Details & Demo",
            16,
            306,
            card,
            TOKENS["pink_solid"] if is_uiux else TOKENS["ink_primary"],
            TOKENS["bg_surface"],
            h=40,
            pad_x=18,
            size=12,
            min_w=318,
        )
        cy += 382

    # Bottom Return Button
    b.pill("MArc Bottom Back", "<-  Back to Home Portfolio", 20, 1450, mob_arc, TOKENS["bg_surface"], TOKENS["ink_primary"], border=TOKENS["border_strong"], h=46, pad_x=20, size=13, min_w=350)
    b.text("MArc Note", "+ 7 more project cards below in scroll", 20, 1516, 12, TOKENS["ink_muted"], mob_arc, width=350, align="center")


def build_commands() -> list[dict[str, Any]]:
    b = FigCraftBuilder()
    build_tokens_artboard(b)
    build_desktop_artboard(b)
    build_mobile_artboard(b)
    build_archive_desktop_artboard(b)
    build_archive_mobile_artboard(b)
    return b.commands


def _mcp_call(reqs: list[dict[str, Any]], port: int = 7979) -> list[dict[str, Any]]:
    payload = "\n".join(json.dumps(r) for r in reqs) + "\n"
    proc = subprocess.Popen(
        [str(FIGCRAFT_CLI), "mcp", "--attach", str(port)],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    out, err = proc.communicate(payload, timeout=30)
    if proc.returncode != 0 and not out.strip():
        raise RuntimeError(f"FigCraft attach failed: {err.strip()}")
    responses = []
    for line in out.splitlines():
        line = line.strip()
        if line:
            responses.append(json.loads(line))
    return responses


def _port_open(port: int, timeout: float = 0.4) -> bool:
    try:
        with socket.create_connection(("127.0.0.1", port), timeout=timeout):
            return True
    except OSError:
        return False


def ensure_live_figcraft(port: int, out_path: Path) -> None:
    """Launch live FigCraft with --control PORT if not already listening."""
    if _port_open(port):
        return
    if not FIGCRAFT_APP.exists():
        raise FileNotFoundError(f"FigCraft app not found at {FIGCRAFT_APP}")

    args = [str(FIGCRAFT_APP), "--control", str(port)]
    if out_path.exists():
        args.append(str(out_path))

    creationflags = 0
    if os.name == "nt":
        creationflags = (
            getattr(subprocess, "DETACHED_PROCESS", 0)
            | getattr(subprocess, "CREATE_NEW_PROCESS_GROUP", 0)
        )
    subprocess.Popen(
        args,
        cwd=str(FIGCRAFT_APP.parent),
        stdin=subprocess.DEVNULL,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        creationflags=creationflags,
    )
    print(f"Launching live FigCraft on port {port}...")
    deadline = time.monotonic() + 10.0
    while time.monotonic() < deadline:
        if _port_open(port, timeout=0.3):
            return
        time.sleep(0.25)
    raise RuntimeError(f"Timed out waiting for FigCraft --control {port} to start.")


def run_live(commands: list[dict[str, Any]], out_path: Path, port: int = 7979) -> None:
    """Create/refresh document in live FigCraft and save to disk."""
    ensure_live_figcraft(port, out_path)
    init = [
        {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "initialize",
            "params": {
                "protocolVersion": "2024-11-05",
                "capabilities": {},
                "clientInfo": {"name": "portfolio-builder", "version": "1.0"},
            },
        },
        {"jsonrpc": "2.0", "method": "notifications/initialized"},
        {
            "jsonrpc": "2.0",
            "id": 2,
            "method": "tools/call",
            "params": {"name": "run_command", "arguments": {"command": "doc.list", "params": {}}},
        },
    ]
    res = _mcp_call(init, port=port)
    docs = json.loads(res[-1]["result"]["content"][0]["text"])
    target_stem = out_path.stem
    existing = next((d for d in docs if d["name"] == target_stem), None)

    step_reqs: list[dict[str, Any]] = [init[0], init[1]]
    if existing:
        switch_and_inspect = [
            init[0],
            init[1],
            {
                "jsonrpc": "2.0",
                "id": 10,
                "method": "tools/call",
                "params": {
                    "name": "run_command",
                    "arguments": {"command": "doc.switch", "params": {"index": existing["index"]}},
                },
            },
            {
                "jsonrpc": "2.0",
                "id": 11,
                "method": "tools/call",
                "params": {
                    "name": "inspect_document",
                    "arguments": {"depth": 1, "outline": True},
                },
            },
        ]
        inspect_res = _mcp_call(switch_and_inspect, port=port)
        doc_json = json.loads(inspect_res[-1]["result"]["content"][0]["text"])
        cur_page_id = doc_json.get("currentPage")
        pages = doc_json.get("pages", [])
        active_page = next((p for p in pages if p.get("id") == cur_page_id), pages[0] if pages else {})
        top_ids = [c["id"] for c in active_page.get("children", [])]
        if top_ids:
            step_reqs.append(
                {
                    "jsonrpc": "2.0",
                    "id": 12,
                    "method": "tools/call",
                    "params": {
                        "name": "run_command",
                        "arguments": {"command": "edit.delete", "params": {"ids": top_ids}},
                    },
                }
            )
    else:
        step_reqs.append(
            {
                "jsonrpc": "2.0",
                "id": 10,
                "method": "tools/call",
                "params": {
                    "name": "run_command",
                    "arguments": {"command": "file.new", "params": {"name": target_stem}},
                },
            }
        )

    step_reqs.append(
        {
            "jsonrpc": "2.0",
            "id": 20,
            "method": "tools/call",
            "params": {
                "name": "batch",
                "arguments": {"label": "Build Editorial Portfolio & Archive", "commands": commands},
            },
        }
    )
    step_reqs.append(
        {
            "jsonrpc": "2.0",
            "id": 30,
            "method": "tools/call",
            "params": {
                "name": "run_command",
                "arguments": {"command": "file.saveAs", "params": {"path": str(out_path)}},
            },
        }
    )
    step_reqs.append(
        {
            "jsonrpc": "2.0",
            "id": 35,
            "method": "tools/call",
            "params": {
                "name": "run_command",
                "arguments": {"command": "select.none", "params": {}},
            },
        }
    )
    step_reqs.append(
        {
            "jsonrpc": "2.0",
            "id": 36,
            "method": "tools/call",
            "params": {
                "name": "run_command",
                "arguments": {"command": "view.zoomFit", "params": {}},
            },
        }
    )
    step_reqs.append(
        {
            "jsonrpc": "2.0",
            "id": 40,
            "method": "tools/call",
            "params": {
                "name": "run_command",
                "arguments": {"command": "file.fontReport", "params": {}},
            },
        }
    )

    out = _mcp_call(step_reqs, port=port)
    for item in out:
        rid = item.get("id")
        if rid in (20, 30, 40):
            r = item.get("result", {})
            if r.get("isError"):
                raise RuntimeError(f"Step {rid} failed: {r}")
            if rid == 30:
                print("Saved live FigCraft:", r["content"][0]["text"])
            if rid == 40:
                print("Font report:", r["content"][0]["text"])


def run_offline(commands: list[dict[str, Any]], out_path: Path) -> None:
    """Build `.figcraft` file headlessly without needing the GUI open."""
    with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False, encoding="utf-8") as tmp:
        json.dump(commands, tmp)
        tmp_path = tmp.name
    try:
        proc = subprocess.run(
            [str(FIGCRAFT_CLI), "run", tmp_path, "--out", str(out_path)],
            capture_output=True,
            text=True,
            check=True,
        )
        print(f"Built offline {out_path} ({len(commands)} commands)")
        if proc.stderr.strip():
            print(proc.stderr.strip())
    finally:
        os.unlink(tmp_path)


def main() -> None:
    parser = argparse.ArgumentParser(description="Build Dimas Editorial Light Portfolio in FigCraft.")
    parser.add_argument("--offline", action="store_true", help="Build headless without attaching to live FigCraft")
    parser.add_argument("--port", type=int, default=7979, help="FigCraft --control port (default 7979)")
    parser.add_argument("--out", type=Path, default=DEFAULT_OUT, help="Output .figcraft path")
    args = parser.parse_args()

    commands = build_commands()
    if args.offline:
        run_offline(commands, args.out)
    else:
        run_live(commands, args.out, port=args.port)


if __name__ == "__main__":
    main()
