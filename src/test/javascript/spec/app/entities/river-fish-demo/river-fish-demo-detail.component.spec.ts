/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FishingTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RiverFishDemoDetailComponent } from '../../../../../../main/webapp/app/entities/river-fish-demo/river-fish-demo-detail.component';
import { RiverFishDemoService } from '../../../../../../main/webapp/app/entities/river-fish-demo/river-fish-demo.service';
import { RiverFishDemo } from '../../../../../../main/webapp/app/entities/river-fish-demo/river-fish-demo.model';

describe('Component Tests', () => {

    describe('RiverFishDemo Management Detail Component', () => {
        let comp: RiverFishDemoDetailComponent;
        let fixture: ComponentFixture<RiverFishDemoDetailComponent>;
        let service: RiverFishDemoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FishingTestModule],
                declarations: [RiverFishDemoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RiverFishDemoService,
                    JhiEventManager
                ]
            }).overrideTemplate(RiverFishDemoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RiverFishDemoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RiverFishDemoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new RiverFishDemo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.river).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
