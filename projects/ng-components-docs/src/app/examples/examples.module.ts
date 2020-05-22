import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RadioGroupModule } from "./components/radio-group/radio-group.module";
import { ButtonsModule } from "./components/buttons/buttons.module";
import { ModalModule } from "./components/modal/modal.module";
import { DropdownModule } from "./components/dropdown/dropdown.module";
import { WizardModule } from "./components/wizard/wizard.module";
import { TextLabelModule } from "./components/textLabels/text-labels.module";
import { PaginationModule } from "./components/pagination/pagination.module";
import { TextAreaModule } from "./components/textArea/textArea.module";
import { TextboxGroupModule } from "./components/textboxGroup/textboxGroup.module";
import { ToggleModule } from "./components/toggle/toggle.module";
import { ChipModule } from "./components/chip/chip.module";
import { TabsModule } from "./components/tabs/tabs.module";
import { BreadcrumbModule } from "./components/breadcrumb/breadcrumb.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RadioGroupModule,
        ButtonsModule,
        ModalModule,
        DropdownModule,
        WizardModule,
        PaginationModule,
        TextAreaModule,
        TextboxGroupModule,
        TextLabelModule,
        ToggleModule,
        ChipModule,
        TabsModule,
        BreadcrumbModule,
    ],
})
export class ExamplesModule {}
