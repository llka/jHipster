import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LakeFishDemoComponent } from './lake-fish-demo.component';
import { LakeFishDemoDetailComponent } from './lake-fish-demo-detail.component';
import { LakeFishDemoPopupComponent } from './lake-fish-demo-dialog.component';
import { LakeFishDemoDeletePopupComponent } from './lake-fish-demo-delete-dialog.component';

@Injectable()
export class LakeFishDemoResolvePagingParams implements Resolve<any> {

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

export const lakeRoute: Routes = [
    {
        path: 'lake-fish-demo',
        component: LakeFishDemoComponent,
        resolve: {
            'pagingParams': LakeFishDemoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.lake.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'lake-fish-demo/:id',
        component: LakeFishDemoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.lake.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lakePopupRoute: Routes = [
    {
        path: 'lake-fish-demo-new',
        component: LakeFishDemoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.lake.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lake-fish-demo/:id/edit',
        component: LakeFishDemoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.lake.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lake-fish-demo/:id/delete',
        component: LakeFishDemoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fishingApp.lake.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
