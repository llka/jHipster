import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RiverFishDemoComponent } from './river-fish-demo.component';
import { RiverFishDemoDetailComponent } from './river-fish-demo-detail.component';
import { RiverFishDemoPopupComponent } from './river-fish-demo-dialog.component';
import { RiverFishDemoDeletePopupComponent } from './river-fish-demo-delete-dialog.component';

@Injectable()
export class RiverFishDemoResolvePagingParams implements Resolve<any> {

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

export const riverRoute: Routes = [
    {
        path: 'river-fish-demo',
        component: RiverFishDemoComponent,
        resolve: {
            'pagingParams': RiverFishDemoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.river.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'river-fish-demo/:id',
        component: RiverFishDemoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.river.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const riverPopupRoute: Routes = [
    {
        path: 'river-fish-demo-new',
        component: RiverFishDemoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.river.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'river-fish-demo/:id/edit',
        component: RiverFishDemoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.river.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'river-fish-demo/:id/delete',
        component: RiverFishDemoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.river.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
