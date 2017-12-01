import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RegionFishDemoComponent } from './region-fish-demo.component';
import { RegionFishDemoDetailComponent } from './region-fish-demo-detail.component';
import { RegionFishDemoPopupComponent } from './region-fish-demo-dialog.component';
import { RegionFishDemoDeletePopupComponent } from './region-fish-demo-delete-dialog.component';

@Injectable()
export class RegionFishDemoResolvePagingParams implements Resolve<any> {

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

export const regionRoute: Routes = [
    {
        path: 'region-fish-demo',
        component: RegionFishDemoComponent,
        resolve: {
            'pagingParams': RegionFishDemoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.region.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'region-fish-demo/:id',
        component: RegionFishDemoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.region.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const regionPopupRoute: Routes = [
    {
        path: 'region-fish-demo-new',
        component: RegionFishDemoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'region-fish-demo/:id/edit',
        component: RegionFishDemoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'region-fish-demo/:id/delete',
        component: RegionFishDemoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
