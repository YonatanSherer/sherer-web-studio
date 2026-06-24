import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const body = await req.json();

    // Get client IP from standard proxy headers
    const forwarded = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : null;

    // Best-effort IP geolocation (free, HTTPS, no API key needed)
    let geo = {};
    if (clientIp && clientIp !== "::1" && clientIp !== "127.0.0.1" && !clientIp.startsWith("192.168.")) {
      try {
        const geoRes = await fetch(`https://ipwho.is/${clientIp}`);
        const geoData = await geoRes.json();
        if (geoData && geoData.success) {
          geo = {
            country: geoData.country || null,
            region: geoData.region || null,
            city: geoData.city || null,
            timezone: geoData.timezone?.id || geoData.timezone || null,
          };
        }
      } catch {
        // Geolocation is best-effort; fall back to client timezone
      }
    }

    const base44 = createClientFromRequest(req);

    await base44.asServiceRole.entities.AnalyticsEvent.create({
      eventType: body.eventType || "visit",
      inviteCode: body.inviteCode || "direct",
      actionType: body.actionType || null,
      fullUrl: body.fullUrl || null,
      page: body.page || null,
      language: body.language || null,
      referrer: body.referrer || null,
      deviceType: body.deviceType || null,
      browser: body.browser || null,
      os: body.os || null,
      country: geo.country || body.country || null,
      region: geo.region || body.region || null,
      city: geo.city || body.city || null,
      timezone: geo.timezone || body.timezone || null,
      sessionId: body.sessionId || null,
      userAgent: body.userAgent || null,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});