import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FishFishDemo } from './fish-fish-demo.model';
import { FishFishDemoPopupService } from './fish-fish-demo-popup.service';
import { FishFishDemoService } from './fish-fish-demo.service';

@Component({
    selector: 'jhi-fish-fish-demo-delete-dialog',
    templateUrl: './fish-fish-demo-delete-dialog.component.html'
})
export class FishFishDemoDeleteDialogComponent {

    fish: FishFishDemo;

    constructor(
        private fishService: FishFishDemoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fishService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'fishListModification',
                content: 'Deleted an fish'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fish-fish-demo-delete-popup',
    template: ''
})
export class FishFishDemoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fishPopupService: FishFishDemoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.fishPopupService
                .open(FishFishDemoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
