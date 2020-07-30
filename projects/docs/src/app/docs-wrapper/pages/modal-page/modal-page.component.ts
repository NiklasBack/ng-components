import { Component } from "@angular/core";
import { ModalSize, ModalPosition } from "@sebgroup/ng-components/modal";
import { FormService } from "@common/dynamic-form/form.service";
import { ExtendedFormGroup } from "@common/dynamic-form/model/custom-classes/extended-form-group";
import { DynamicFormOption } from "@common/dynamic-form/model/models";

@Component({
    selector: "app-modal-page",
    templateUrl: "./modal-page.component.html",
    providers: [FormService],
})
export class ModalPageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/modal/modal.component");
    snippet: string = `<sebng-modal [toggle]="toggle" (dismiss)="toggle = false">
    <div header>Title</div>

    <div body>
        <ng-template *ngTemplateOutlet="simpleBody"></ng-template>
    </div>

    <div footer>
        <button type="button" class="btn btn-primary" data-dismiss="modal" (click)="toggle = false">
            Close
        </button>
    </div>
</sebng-modal>`;

    modalTemplate: string = `<sebng-modal>
    <div header>Header</div>
    <div body>body</div>
    <div footer>footer</div>
</sebng-modal>`;
    extendedFormGroup: ExtendedFormGroup;

    toggle: boolean = false;

    sizeList: DynamicFormOption<ModalSize>[] = [
        { key: "", value: null, label: "default" },
        { key: "lg", value: "lg", label: "lg" },
        { key: "sm", value: "sm", label: "sm" },
    ];
    positionList: DynamicFormOption<ModalPosition>[] = [
        { key: "", value: null, label: "default" },
        { key: "right", value: "right", label: "right" },
        { key: "left", value: "left", label: "left" },
    ];

    constructor(private formService: FormService) {
        document.title = "Modal - SEB Angular Components";

        this.extendedFormGroup = this.formService.dynamicFormSectionsToFormGroup([
            {
                key: "controls",
                items: [
                    {
                        key: "size",
                        controlType: "Dropdown",
                        label: "Size:",
                        value: this.sizeList[0],
                        options: this.sizeList,
                    },
                    {
                        key: "position",
                        controlType: "Dropdown",
                        label: "Position:",
                        value: this.positionList[0],
                        options: this.positionList,
                    },
                    {
                        key: "centered",
                        controlType: "Checkbox",
                        label: "Centered",
                        description: "Positions the modal in the middle of the page. Only works with default position.",
                        value: false,
                    },
                    {
                        key: "fullscreen",
                        controlType: "Checkbox",
                        label: "Fullscreen",
                        value: false,
                    },
                    {
                        key: "backdropDismiss",
                        controlType: "Checkbox",
                        label: "Backdrop dismiss",
                        description: "Enables dismissing the modal when the backdrop is clicked",
                        value: true,
                    },
                    {
                        key: "escapeToDismiss",
                        controlType: "Checkbox",
                        label: "Escape to dismiss",
                        description: `Dismisses the modal when the "Escape" key is pressed`,
                        value: true,
                    },
                    {
                        key: "closeButton",
                        controlType: "Checkbox",
                        label: "Close button",
                        description: "Shows a close button at the top right corner to be used to dismiss the modal",
                        value: true,
                    },
                ],
            },
        ]);
    }

    /** Only renders the image when the size is `lg` and the position is aside */
    get shouldRenderImage(): boolean {
        const position: ModalPosition = this.extendedFormGroup.value.controls.position.value;
        const size: ModalSize = this.extendedFormGroup.value.controls.size.value;

        return size === "lg" && ["right", "left"].some(p => p === position);
    }
}
