window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag("js", new Date());
gtag("config", "G-4WMYWY7BSM");

function trackEvent(name, parameters) {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, parameters);
  }
}

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  const link = event.target.closest("a[href]");
  if (!link) return;

  const href = link.href;
  const text = link.textContent?.trim().replace(/\s+/g, " ").slice(0, 100) || "";
  const common = { link_url: href, link_text: text };
  const productName = location.pathname.startsWith("/memorypilot")
    ? "MemoryPilot"
    : location.pathname.startsWith("/jobsearchos")
      ? "JobSearchOS"
      : undefined;

  if (href.startsWith("https://apps.apple.com/")) {
    trackEvent("app_store_click", { ...common, app_name: "MemoryPilot" });
  } else if (href.startsWith("https://buy.stripe.com/")) {
    trackEvent("pro_purchase_click", { ...common, product_name: "MemoryPilot Pro" });
  } else if (href.endsWith(".dmg")) {
    trackEvent("pro_download", { ...common, product_name: "MemoryPilot Pro" });
  } else if (href.startsWith("mailto:support@makealeft.app")) {
    trackEvent("support_contact", { ...common, product_name: productName });
  } else if (href.includes("/memorypilot/guides/")) {
    trackEvent("guide_click", { ...common, product_name: "MemoryPilot" });
  } else if (location.pathname === "/" && href.includes("/memorypilot/")) {
    trackEvent("product_detail_click", { ...common, product_name: "MemoryPilot" });
  } else if (location.pathname === "/" && href.includes("/jobsearchos/")) {
    trackEvent("product_detail_click", { ...common, product_name: "JobSearchOS" });
  } else if (href.includes("github.com/jasonneo99/agent-workflow")) {
    trackEvent("open_source_click", { ...common, project_name: "Agent Workflow" });
  }
});

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
