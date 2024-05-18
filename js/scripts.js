/* PWA Config */

if("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("sw.js")
        .then(() => { 
            console.log("Service Worker Registered");
        })
        .catch((error) => {
            console.log("Service Worker Registration Failed");
        });
}

/* END - PWA Config */

function tooltipComputePosition() {
    const buttons = document.querySelectorAll(".btn");
    const tooltipElements = document.querySelectorAll(".tooltip");
    const tooltipArrows = document.querySelectorAll(".tooltip-arrow");

    buttons.forEach((button, index) => {
        const tooltip = tooltipElements[index];
        const arrow = tooltipArrows[index];

        const result = window.FloatingUIDOM.computePosition(button, tooltip, {
            placement: "top",
            middleware: [
                window.FloatingUIDOM.flip(),
                window.FloatingUIDOM.shift({ padding: 4 }),
                window.FloatingUIDOM.offset({ mainAxis: 12, crossAxis: 0 }),
                window.FloatingUIDOM.arrow({ element: arrow }),
            ],
        });

        result.then(({ x, y, placement, middlewareData }) => {
            const { x: arrowX, y: arrowY } = middlewareData.arrow;
            const staticSide = {
                top: "bottom",
                right: "left",
                bottom: "top",
                left: "right",
            }[placement.split("-")[0]];

            Object.assign(tooltip.style, { left: `${x}px`, top: `${y}px` });
            Object.assign(arrow.style, {
                left: arrowX != null ? `${arrowX}px` : "",
                top: arrowY != null ? `${arrowY}px` : "",
                right: "",
                bottom: "",
                [staticSide]: "-4px",
            });
        });
    });
}

function showTooltip(tooltipElement) {
    tooltipElement.style.visibility = "visible";
}

function hideTooltip(tooltipElement) {
    tooltipElement.style.visibility = "hidden";
}

window.addEventListener("DOMContentLoaded", tooltipComputePosition);

const observer = new ResizeObserver(tooltipComputePosition);
observer.observe(document.body);

// Attach event listeners to all buttons in a single loop
const buttons = document.querySelectorAll(".btn");
const tooltipMap = new Map();

buttons.forEach((button, index) => {
    const tooltip = button.nextElementSibling;
    tooltipMap.set(button, tooltip);

    button.addEventListener("mouseenter", () => showTooltip(tooltip));
    button.addEventListener("mouseleave", () => hideTooltip(tooltip));
});

