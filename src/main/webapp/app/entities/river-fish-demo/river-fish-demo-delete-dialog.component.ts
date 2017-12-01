import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RiverFishDemo } from './river-fish-demo.model';
import { RiverFishDemoPopupService } from './river-fish-demo-popup.service';
import { RiverFishDemoService } from './river-fish-demo.service';

@Component({
    selector: 'jhi-river-fish-demo-delete-dialog',
    templateUrl: './river-fish-demo-delete-dialog.component.html'
})
export class RiverFishDemoDeleteDialogComponent {

    river: RiverFishDemo;

    constructor(
        private riverService: RiverFishDemoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.riverService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'riverListModification',
                content: 'Deleted an river'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-river-fish-demo-delete-popup',
    template: ''
})
export class RiverFishDemoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private riverPopupService: RiverFishDemoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.riverPopupService
                .open(RiverFishDemoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
