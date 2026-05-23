# iashok.codes

Personal portfolio + blog of **Ashok Kumar Meena** — full-stack software engineer in Berlin, Germany.

Built with [Hugo](https://gohugo.io/) and the [Congo](https://github.com/jpanther/congo) theme.

## Stack

- **SSG:** Hugo (extended)
- **Theme:** Congo (Tailwind CSS)
- **Content:** Markdown
- **Search:** Fuse.js (client-side, via Congo)
- **Hosting:** Cloudflare Pages / Netlify / Vercel (any static host)

## Local development

Prereqs: Hugo extended (`brew install hugo`), Git.

```bash
git clone --recurse-submodules https://github.com/iashok/iashok.codes
cd iashok.codes
hugo server -D
```

Then open <http://localhost:1313>.

If you forgot `--recurse-submodules` when cloning:

```bash
git submodule update --init --recursive
```

## Project structure

```
.
├── config/_default/      # Site configuration (overrides Congo defaults)
├── content/
│   ├── _index.md         # Homepage intro
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── experience/       # Experience timeline
│   ├── posts/            # Blog posts
│   ├── projects/         # Project case studies
│   └── resume/           # Resume page
├── assets/img/           # Avatar, OG images, etc.
├── static/files/         # Downloadable files (resume PDF, etc.)
└── themes/congo/         # Congo theme (git submodule)
```

## Add a new blog post

```bash
hugo new content posts/your-slug/index.md
```

Edit the frontmatter (`title`, `description`, `date`, `tags`, `categories`) and start writing.

## Add a new project

```bash
hugo new content projects/your-slug/index.md
```

Use the existing project pages under `content/projects/` as templates.

## Replace the resume

Drop the new PDF at:

```
static/files/ashok-kumar-meena-resume.pdf
```

The "Download PDF Resume" button on `/resume/` already links to it.

## Deploy

The `public/` directory contains the built site. Point any static host at the build command:

```bash
hugo --gc --minify
```

Recommended hosts: Cloudflare Pages, Netlify, Vercel.

## License

Content © Ashok Kumar Meena. Theme © its respective author.
