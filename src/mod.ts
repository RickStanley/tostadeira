import { ClassInfo, classMap, randomizeNumber } from "./utils";

interface TorradaSettings {
  error?: boolean;
  success?: boolean;
  dismissable?: boolean;
  timeout?: number;
  classes?: string[];
}

const dismissAnimationOffset = 400;

let root: HTMLDivElement;

const setupRoot = () => {
  root = document.createElement('div');
  root.id = 'torrada-root';

  const style = document.createElement('style');

  style.innerHTML = `
    .torrada p {
      margin: 0;
      max-width: var(--torrada-max-width, 19em);
    }

    .torrada {
        background-color: var(--torrada-color-bg, #FEEFB3);
        font-size: var(--torrada-font-size, 0.75rem);
        color: var(--torrada-color-text, #704400);
        box-shadow: 1px 1px 8px 0 rgba(79, 79, 79, 0.64);
        box-sizing: border-box;
        padding: var(--torrada-padding, 0.8em);
        position: fixed;
        border-radius: var(--torrada-border-radius, 5px);
        display: inline-block;
        right: 1em;
        top: 1em;
        transform: translateX(110%);
        z-index: var(--torrada-z-index, 5);
        opacity: 0;
        transition: transform .4s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity .3s;
    }

    .torrada.erro {
        background-color: var(--torrada-color-bg-error, #e01e1e);
        color: var(--torrada-color-text-error, white);
    }

    .torrada.success {
        background-color: var(--torrada-color-bg-success, #5cb85c);
        color: var(--torrada-color-text-success, #0f1d0f);
    }

    .torrada[active] {
      opacity: 1;
      transform: translateX(0%);
    }`;

  document.head.appendChild(style);

  document.body.appendChild(root);

  root.addEventListener('click', event => {
    const dismissable = (event.target as Element).closest('[dismissable]');
    if (dismissable) {
      dismissable.removeAttribute('active');
      setTimeout(() => {
        dismissable.remove();
      }, dismissAnimationOffset);
    }
  });
};

const setupTemplate = (id: string, content: string, classes: ClassInfo, dismissable: boolean) => {
  return `<div id="${id}" class="${classMap(classes)}" ${dismissable ? 'dismissable' : ''}>
  <p>${content}</p>
</div>`;
}

const pop = (content: string, settings?: TorradaSettings) => {
  const classes = {
    torrada: true,
  };

  const timeout = (settings && settings.timeout || 4500);

  if (settings && settings.classes)
    for (const customClass of settings.classes) classes[customClass] = true;

  if (!root) setupRoot();

  const id = `tmp-${randomizeNumber()}`;

  const templateResult = setupTemplate(id, content, classes, settings && settings.dismissable);

  root.insertAdjacentHTML('beforeend', templateResult);

  const currentTemplate = root.querySelector(`#${id}`);

  requestAnimationFrame(() => {
    currentTemplate.toggleAttribute('active');
  });

  if (!settings || !settings.dismissable) {
    setTimeout(() => {
      currentTemplate.removeAttribute('active');
      setTimeout(() => currentTemplate.remove(), dismissAnimationOffset);
    }, timeout);
  }

};

export default pop;