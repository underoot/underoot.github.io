module.exports = {
	tags: ["posts"],
	layout: "layouts/post.njk",
	eleventyComputed: {
		permalink: (data) => {
			const date = data.date;
			if (!date) return undefined;
			const d = new Date(date);
			const year = d.getUTCFullYear();
			const month = String(d.getUTCMonth() + 1).padStart(2, "0");
			const day = String(d.getUTCDate()).padStart(2, "0");
			return `/blog/${year}/${month}/${day}/${data.page.fileSlug}/`;
		},
	},
};
