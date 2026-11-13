// Deletes files in _site/img that no built page references.
// Keeps the Pages artifact and the S3 image cache free of images from removed posts.
import { readdir, readFile, rm } from "node:fs/promises";
import path from "node:path";

const siteDir = process.argv[2] || "_site";
const imgDir = path.join(siteDir, "img");
const exts = new Set([".html", ".xml", ".css", ".js", ".json", ".txt"]);

async function* walk(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (full !== imgDir) yield* walk(full);
		} else if (exts.has(path.extname(entry.name))) {
			yield full;
		}
	}
}

const referenced = new Set();
const re = /\/img\/([^\s"'()<>,\\?#]+)/g;

for await (const file of walk(siteDir)) {
	const text = await readFile(file, "utf8");
	for (const match of text.matchAll(re)) {
		referenced.add(decodeURIComponent(match[1]));
	}
}

if (referenced.size === 0) {
	console.error("No image references found; refusing to prune.");
	process.exit(1);
}

let removed = 0;
for (const name of await readdir(imgDir)) {
	if (!referenced.has(name)) {
		await rm(path.join(imgDir, name), { recursive: true, force: true });
		removed++;
	}
}

console.log(`Image references: ${referenced.size}, pruned: ${removed}`);
