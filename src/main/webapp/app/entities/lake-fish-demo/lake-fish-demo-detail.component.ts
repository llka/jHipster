import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { LakeFishDemo } from './lake-fish-demo.model';
import { LakeFishDemoService } from './lake-fish-demo.service';

@Component({
    selector: 'jhi-lake-fish-demo-detail',
    templateUrl: './lake-fish-demo-detail.component.html'
})
export class LakeFishDemoDetailComponent implements OnInit, OnDestroy {

    lake: LakeFishDemo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private lakeService: LakeFishDemoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLakes();
    }

    load(id) {
        this.lakeService.find(id).subscribe((lake) => {
            this.lake = lake;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLakes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'lakeListModification',
            (response) => this.load(this.lake.id)
        );
    }
}
