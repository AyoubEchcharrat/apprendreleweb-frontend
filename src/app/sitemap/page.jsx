"use client"

import { useEffect, useState } from 'react';

function Page() {
  const [sitemapContent, setSitemapContent] = useState('');

  useEffect(() => {
    fetch('https://apprendreleweb-backend-61895b6b6b58.herokuapp.com/api/sitemap/sitemap.xml')
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const xmlString = new XMLSerializer().serializeToString(xmlDoc);

        setSitemapContent(xmlString);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du sitemap :', error);
      });
  }, []);

  return (<pre><code>
      {sitemapContent}
  </code></pre>


  );
}

export default Page;