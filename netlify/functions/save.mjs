
export default async (request, context) => {
  console.log('context', context)
  console.log('URL', Netlify.env.get('URL'))
  if (!request.headers.has('Referer') || !request.headers.get('Referer').startsWith(Netlify.env.get('URL'))) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const {html, width, height} = await request.json();

  if (!html || !width || !height) {
    return new Response('Missing required parameter (html, width, height)', { status: 400 });
  }

  const response = await fetch(`https://api.phantomjscloud.com/api/browser/v2/${Netlify.env.get('PHANTOMJSCLOUD_API_KEY') }/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: 'about:blank',
      content: html,
      renderType: 'png',
      renderSettings: {
        clipRectangle: {
          top: 0,
          left: 0,
          height: height,
          width: width
        }
      }
    })
  });

  if (response.ok) {
    const blob = await response.blob();
    return new Response(blob, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="secretbase.png"',
      }
    });
  } else {
    const error = await response.json();
    return Response.json(error, { status: 500 });
  }
}

