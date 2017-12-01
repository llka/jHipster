/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FishingTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LakeFishDemoDetailComponent } from '../../../../../../main/webapp/app/entities/lake-fish-demo/lake-fish-demo-detail.component';
import { LakeFishDemoService } from '../../../../../../main/webapp/app/entities/lake-fish-demo/lake-fish-demo.service';
import { LakeFishDemo } from '../../../../../../main/webapp/app/entities/lake-fish-demo/lake-fish-demo.model';

describe('Component Tests', () => {

    describe('LakeFishDemo Management Detail Component', () => {
        let comp: LakeFishDemoDetailComponent;
        let fixture: ComponentFixture<LakeFishDemoDetailComponent>;
        let service: LakeFishDemoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FishingTestModule],
                declarations: [LakeFishDemoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LakeFishDemoService,
                    JhiEventManager
                ]
            }).overrideTemplate(LakeFishDemoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LakeFishDemoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LakeFishDemoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new LakeFishDemo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.lake).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
