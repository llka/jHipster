import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { FishFishDemo } from './fish-fish-demo.model';
import { FishFishDemoService } from './fish-fish-demo.service';

@Component({
    selector: 'jhi-fish-fish-demo-detail',
    templateUrl: './fish-fish-demo-detail.component.html'
})
export class FishFishDemoDetailComponent implements OnInit, OnDestroy {

    fish: FishFishDemo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private fishService: FishFishDemoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFish();
    }

    load(id) {
        this.fishService.find(id).subscribe((fish) => {
            this.fish = fish;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFish() {
        this.eventSubscriber = this.eventManager.subscribe(
            'fishListModification',
            (response) => this.load(this.fish.id)
        );
    }
}
