import { ElementRef } from "@angular/core"

declare var M: any

export interface MaterialInstance {
    open?(): void
    close?(): void
    destroy?(): void
}

export class MaterialService {
    static toast ( message: string) {
        M.toast({html: message})
    }

    static initiaLizeFloatingButton(ref: ElementRef | undefined) {
        M.FloatingActionButton.init(ref?.nativeElement)
    }

    static updateTextImputs() {
        M.updateTextFields()
    }

    static initModal(ref: ElementRef): MaterialInstance {
        return M.Modal.init(ref.nativeElement)
    }
}