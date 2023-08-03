import { ElementRef } from "@angular/core"

declare var M: any

export class MaterialService {
    static toast ( message: string) {
        M.toast({html: message})
    }

    static initiaLizeFloatingButton(ref: ElementRef | undefined) {
        M.FloatingActionButton.init(ref?.nativeElement)
    }
}