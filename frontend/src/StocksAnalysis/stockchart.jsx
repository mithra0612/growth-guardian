import { useEffect, useRef } from "react";

const TradingViewChart = () => {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: "SILVER",
      width: "100%",
      height: 500,
      theme: "light",
      interval: "D",
      timezone: "Asia/Kolkata",
      style: "1",
      locale: "en",
      enable_publishing: false,
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
    });

    container.current.appendChild(script);
  }, []);

  return <div ref={container} />;
};

export default TradingViewChart;