/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FishingTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RegionFishDemoDetailComponent } from '../../../../../../main/webapp/app/entities/region-fish-demo/region-fish-demo-detail.component';
import { RegionFishDemoService } from '../../../../../../main/webapp/app/entities/region-fish-demo/region-fish-demo.service';
import { RegionFishDemo } from '../../../../../../main/webapp/app/entities/region-fish-demo/region-fish-demo.model';

describe('Component Tests', () => {

    describe('RegionFishDemo Management Detail Component', () => {
        let comp: RegionFishDemoDetailComponent;
        let fixture: ComponentFixture<RegionFishDemoDetailComponent>;
        let service: RegionFishDemoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FishingTestModule],
                declarations: [RegionFishDemoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RegionFishDemoService,
                    JhiEventManager
                ]
            }).overrideTemplate(RegionFishDemoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegionFishDemoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegionFishDemoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new RegionFishDemo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.region).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
