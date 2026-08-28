window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag("js", new Date());
gtag("config", "G-4WMYWY7BSM");

document.addEventListener("click", function (event) {
  var link = event.target.closest("a");
  if (!link) return;
  var href = link.href || "";
  var destination = "internal";
  if (href.indexOf("apps.apple.com") !== -1) destination = "app_store";
  if (href.indexOf("buy.stripe.com") !== -1) destination = "pro_checkout";
  if (href.indexOf("/downloads/") !== -1) destination = "pro_download";
  if (destination === "internal") return;
  gtag("event", "product_outbound_click", {
    destination: destination,
    link_url: href,
    link_text: (link.textContent || "").trim().slice(0, 100),
    page_path: window.location.pathname
  });
});
