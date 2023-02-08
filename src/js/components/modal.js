const MODAL_OVERLAY_CLASS = "modal-overlay";
const MODAL_CONTENT_CLASS = "modal-content";
const MODAL_SHOW_CLASS = "show";

export default class Modal {
  isActive = false;
  scrollbarWidth = helpers.getBrwoserScrollbarWidth();
  _html = document.documentElement;

  constructor(modalId) {
    if (!modalId) {
      throw new TypeError("Error: Modal not defined");
    }

    this.modalId = modalId;
    this.modal = document.querySelector(modalId);

    this.overlay = this.modal.querySelector(`.${MODAL_OVERLAY_CLASS}`);
    this.content = this.modal.querySelector(`.${MODAL_CONTENT_CLASS}`);

    if (!this.content) return;

    const openBtns = document.querySelectorAll(
      `[data-toggle="modal"][data-target="${modalId}"]`
    );

    const closeBtns = this.modal.querySelectorAll("[data-close-modal]");

    openBtns.forEach((node) => {
      node.addEventListener("click", () => this.open());
    });

    closeBtns.forEach((node) => {
      node.addEventListener("click", () => this.close());
    });

    if (this.overlay)
      this.overlay.addEventListener("click", () => this.close());
  }

  open() {
    this._html.style.paddingRight = `${this.scrollbarWidth}px`;
    this._html.style.overflow = "hidden";
    this.modal.classList.add(MODAL_SHOW_CLASS);
    this.isActive = true;
  }

  close() {
    if (!this.isActive) return;
    helpers.leaveAnimation(this.modal, () => {
      this.modal.classList.remove(MODAL_SHOW_CLASS);
      this._html.style.removeProperty("padding-right");
      this._html.style.removeProperty("overflow");
      this.isActive = false;
    });
  }
}