'use strict';

let dotsToDays = (daysDiv) => {
  let daysToolTip = daysDiv.getAttribute('data-tooltip');
  let daysStr = daysToolTip.match(/^\d+ days?/g);
  // let daysNumberStr = daysStr[0].match(/^\d+/g)
  // let daysNumber = parseInt(daysNumberStr, 10)
  let daysParent = daysDiv.parentNode;
  daysParent.innerHTML = daysStr;
  daysParent.setAttribute('data-tooltip', daysToolTip);
};

let mainContentObserver = () => {
  let observer = new MutationObserver((mutationList) => {
    mutationList
      .filter((mutation) => mutation.previousSibling === null)
      .filter(
        (mutation) =>
          mutation.target.className === 'ghx-wrap-issue' ||
          mutation.target.id === 'ghx-pool'
      )
      .flatMap((mutation) => Array.from(mutation.addedNodes))
      .flatMap((node) => Array.from(node.getElementsByClassName('ghx-days')))
      .forEach((daysDiv) => {
        dotsToDays(daysDiv);
      });
  });
  let config = { childList: true, subtree: true };
  let target = document.querySelector('#ak-main-content');
  observer.observe(target, config);
};

mainContentObserver();
