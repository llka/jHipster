/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FishingTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FishFishDemoDetailComponent } from '../../../../../../main/webapp/app/entities/fish-fish-demo/fish-fish-demo-detail.component';
import { FishFishDemoService } from '../../../../../../main/webapp/app/entities/fish-fish-demo/fish-fish-demo.service';
import { FishFishDemo } from '../../../../../../main/webapp/app/entities/fish-fish-demo/fish-fish-demo.model';

describe('Component Tests', () => {

    describe('FishFishDemo Management Detail Component', () => {
        let comp: FishFishDemoDetailComponent;
        let fixture: ComponentFixture<FishFishDemoDetailComponent>;
        let service: FishFishDemoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FishingTestModule],
                declarations: [FishFishDemoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FishFishDemoService,
                    JhiEventManager
                ]
            }).overrideTemplate(FishFishDemoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FishFishDemoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FishFishDemoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FishFishDemo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.fish).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
