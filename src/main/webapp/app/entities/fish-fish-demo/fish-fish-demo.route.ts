import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FishFishDemoComponent } from './fish-fish-demo.component';
import { FishFishDemoDetailComponent } from './fish-fish-demo-detail.component';
import { FishFishDemoPopupComponent } from './fish-fish-demo-dialog.component';
import { FishFishDemoDeletePopupComponent } from './fish-fish-demo-delete-dialog.component';

@Injectable()
export class FishFishDemoResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const fishRoute: Routes = [
    {
        path: 'fish-fish-demo',
        component: FishFishDemoComponent,
        resolve: {
            'pagingParams': FishFishDemoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.fish.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'fish-fish-demo/:id',
        component: FishFishDemoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.fish.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fishPopupRoute: Routes = [
    {
        path: 'fish-fish-demo-new',
        component: FishFishDemoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.fish.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fish-fish-demo/:id/edit',
        component: FishFishDemoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.fish.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fish-fish-demo/:id/delete',
        component: FishFishDemoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.fish.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
