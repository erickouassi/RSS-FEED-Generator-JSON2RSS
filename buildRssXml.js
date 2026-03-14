export function buildRssXml(channel, episodes) {
  const itemsXml = episodes
    .map(
      (ep) => `
    <item>
      <title>${ep.title}</title>
      <link>${ep.link}</link>
      <description><![CDATA[${ep.description}]]></description>

      <enclosure 
        url="${ep.audioUrl}"
        length="${ep.audioLength}"
        type="${ep.audioType}"
      />

      <guid isPermaLink="false">${ep.guid}</guid>
      <pubDate>${ep.pubDate}</pubDate>

      <itunes:author>${ep.author}</itunes:author>
      <itunes:subtitle>${ep.subtitle}</itunes:subtitle>
      <itunes:summary>${ep.summary}</itunes:summary>
      <itunes:duration>${ep.duration}</itunes:duration>
      <itunes:explicit>${ep.explicit}</itunes:explicit>

      <itunes:episode>${ep.episode}</itunes:episode>
      <itunes:season>${ep.season}</itunes:season>
      <itunes:episodeType>${ep.episodeType}</itunes:episodeType>

      <itunes:image href="${ep.image}" />

      <podcast:transcript url="${ep.transcript.url}" type="${ep.transcript.type}" />
    </item>
  `
    )
    .join("");

  const fundingXml = channel.funding
    ? channel.funding
        .map(
          (f) => `
    <podcast:funding url="${f.url}">
      ${f.text}
    </podcast:funding>
  `
        )
        .join("")
    : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:podcast="https://podcastindex.org/namespace/1.0">

  <channel>

    <title>${channel.title}</title>
    <link>${channel.link}</link>
    <language>${channel.language}</language>
    <description><![CDATA[${channel.description}]]></description>

    <atom:link href="${channel.feedUrl}" rel="self" type="application/rss+xml" />

    <itunes:author>${channel.author}</itunes:author>
    <itunes:summary>${channel.summary}</itunes:summary>

    <itunes:owner>
      <itunes:name>${channel.owner.name}</itunes:name>
      <itunes:email>${channel.owner.email}</itunes:email>
    </itunes:owner>

    <itunes:image href="${channel.image}" />

    <itunes:category text="${channel.category.main}">
      <itunes:category text="${channel.category.sub}" />
    </itunes:category>

    <itunes:explicit>${channel.explicit}</itunes:explicit>
    <itunes:type>${channel.type}</itunes:type>

    <podcast:locked>${channel.locked}</podcast:locked>
    <podcast:guid>${channel.podcastGuid}</podcast:guid>

    <copyright>${channel.copyright}</copyright>
    <lastBuildDate>${channel.lastBuildDate}</lastBuildDate>

    ${fundingXml}

    ${itemsXml}

  </channel>
</rss>`;
}
