import "./css/styles.css";
import { computePosition, flip, shift, offset, arrow } from "@floating-ui/dom";
import "./js/scripts.js";

function tooltipComputePosition() {
  const buttons = document.querySelectorAll(".btn");
  const tooltipElements = document.querySelectorAll(".tooltip");
  const tooltipArrows = document.querySelectorAll(".tooltip-arrow");

  buttons.forEach((button, index) => {
    const tooltipEl = tooltipElements[index];
    const arrowEl = tooltipArrows[index];

    const result = computePosition(button, tooltipEl, {
      placement: "top",
      middleware: [
        flip(),
        shift({ padding: 4 }),
        offset({ mainAxis: 12, crossAxis: 0 }),
        arrow({ element: arrowEl }),
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

      Object.assign(tooltipEl.style, { left: `${x}px`, top: `${y}px` });
      Object.assign(arrowEl.style, {
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
