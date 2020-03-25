import { html, render, nothing } from "lit-html";
import { classMap, ClassInfo } from "lit-html/directives/class-map";

interface TorradaSettings {
  error: boolean;
  success: boolean;
  dismissable: boolean;
  timeout: number;
  classes: string[];
}

const dismissAnimationOffset = 400;

let root: HTMLDivElement;

const setupRoot = () => {
  root = document.createElement('div');
  root.id = 'torrada-root';
  document.body.appendChild(root);
};

const setupTemplate = (content: string, classes: ClassInfo, dismissable: boolean) => {
  const tryDismiss = dismissable ? {
    handleEvent(e: Event) {
      setTimeout(() => {
        render(nothing, root);
      }, dismissAnimationOffset);
    },
  } : null;
  return html`
  <style>
    .torrada p {
        margin: 0;
        max-width: 19em;
    }

    .torrada {
        background-color: var(--torrada-color-bg, #FEEFB3);
        font-size: 0.75rem;
        color: var(--torrada-color, #704400);
        box-shadow: 1px 1px 8px 0 rgba(79, 79, 79, 0.64);
        box-sizing: border-box;
        padding: 0.8em;
        position: fixed;
        border-radius: 5px;
        display: inline-block;
        right: 1em;
        top: 1em;
        transform: translateX(110%);
        z-index: 5;
        opacity: 0;
        animation: toLeft .4s cubic-bezier(0.68, -0.55, 0.265, 1.55) both, fade .3s both;
    }

    .torrada.erro {
        background-color: var(--torrada-color-error, #e01e1e);
        color: var(--callout-color-error-text, white);
    }

    .torrada.success {
        background-color: var(--torrada-color-success, #5cb85c);
        color: var(--torrada-color-success-text, #0f1d0f);
    }

    .torrada.done {
      animation: toLeft .4s cubic-bezier(0.68, -0.55, 0.265, 1.55) reverse both, fade .3s reverse both;
    }

    @keyframes toLeft {
      to {
        transform: translateX(0%);
      }
    }

    @keyframes fade {
      to {
        opacity: 1;
      }
    }
  </style>
  <div class=${classMap(classes)} @click=${tryDismiss}>
      <p>${content}</p>
  </div>`;
}

const pop = (content: string, settings: TorradaSettings) => {
  const classes = {
    torrada: true,
  };

  const timeout = (settings.timeout || 4500) + dismissAnimationOffset;

  for (const customClass of settings.classes) classes[customClass] = true;

  if (!root) setupRoot();

  render(setupTemplate(content, classes, settings.dismissable), root);

  if (!settings.dismissable) {
    setTimeout(() => {
      render(nothing, root);
    }, timeout);
  }

};

export default pop;