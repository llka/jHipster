import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LakeFishDemo } from './lake-fish-demo.model';
import { LakeFishDemoPopupService } from './lake-fish-demo-popup.service';
import { LakeFishDemoService } from './lake-fish-demo.service';

@Component({
    selector: 'jhi-lake-fish-demo-delete-dialog',
    templateUrl: './lake-fish-demo-delete-dialog.component.html'
})
export class LakeFishDemoDeleteDialogComponent {

    lake: LakeFishDemo;

    constructor(
        private lakeService: LakeFishDemoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lakeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'lakeListModification',
                content: 'Deleted an lake'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lake-fish-demo-delete-popup',
    template: ''
})
export class LakeFishDemoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lakePopupService: LakeFishDemoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.lakePopupService
                .open(LakeFishDemoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
