import { ModalComponent } from "./modal.component";
import { ModalService } from "./modal.service";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { Component, ViewChild, DebugElement } from "@angular/core";
import { ModalSizeType, ModalPositionType } from "./modal.type";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";

@Component({
    template: `<sebng-modal [size]="'modal-lg'" id="test-id" [center]="center" [position]="position" [fullscreen]="fullscreen">
        <div class="custom-body" body>
            Body
        </div>

        <div class="custom-footer" footer>
            <button type="button" class="btn btn-primary" data-dismiss="modal" (click)="closeModal()">
                Close
            </button>
        </div>
    </sebng-modal>`,
})
class TestComponent {
    id?: boolean;
    size?: ModalSizeType;
    center?: boolean;
    position?: ModalPositionType;
    fullscreen?: boolean;
    @ViewChild(ModalComponent) modalChild: ModalComponent;

    closeModal(): void {
        this.modalChild.close();
    }

    openModal(): void {
        this.modalChild.open();
    }
}

describe("Component: ModalComponent", () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule],
            declarations: [TestComponent, ModalComponent],
            providers: [ModalService],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(TestComponent);
                component = fixture.componentInstance;
            });
    }));

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have an id", () => {
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        expect(debugEl.querySelector("#test-id")).toBeDefined();
    });

    it("should be large", () => {
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        expect(debugEl.querySelector(".modal-lg")).toBeDefined();
    });

    it("should be centered", () => {
        component.center = true;
        fixture.detectChanges();
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        expect(debugEl.querySelector(".modal-dialog-centered")).toBeDefined();
    });

    it("footer should not be displayed if no select is passed", () => {
        fixture.detectChanges();
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        expect(getComputedStyle(debugEl.querySelector(".modal-header")).display).toEqual("none");
    });

    it("should render according to the position", () => {
        component.position = "left";
        fixture.detectChanges();
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        expect(debugEl.querySelector(".modal-aside-left")).toBeDefined();
    });

    it("should open in fullscreen", () => {
        component.fullscreen = true;
        fixture.detectChanges();
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        expect(debugEl.querySelector(".modal-aside-left")).toBeDefined();
    });

    it("should open the modal when openModal function is called and backdrop is appended to the body", () => {
        fixture.detectChanges();
        spyOn(component.modalChild, "open");
        fixture.componentInstance.openModal();
        fixture.detectChanges();
        expect(component.modalChild.open).toHaveBeenCalled();
        expect(document.querySelector(".modal-backdrop")).toBeDefined();
    });

    it("should close the modal when closeModal function is called", fakeAsync(() => {
        fixture.detectChanges();
        spyOn(component.modalChild, "close");
        fixture.componentInstance.closeModal();
        fixture.detectChanges();
        expect(component.modalChild.close).toHaveBeenCalled();
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        expect(getComputedStyle(debugEl.querySelector(".modal")).display).toEqual("none");
        fixture.whenStable().then(() => {
            tick(150);
            expect(document.querySelector(".modal-backdrop")).toBeNull();
        });
    }));

    it("should close the modal when backdrop is clicked", async(() => {
        fixture.detectChanges();
        fixture.componentInstance.openModal();
        console.log(fixture.componentInstance);
        spyOn(component.modalChild, "onBackdropClick");
        const modal: DebugElement = fixture.debugElement.query(By.css(".modal"));
        modal.nativeElement.click();
        expect(component.modalChild.onBackdropClick).toHaveBeenCalled();
    }));
});
