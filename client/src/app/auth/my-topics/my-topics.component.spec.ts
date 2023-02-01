import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTopicsComponent } from './my-topics.component';

describe('MyPostsComponent', () => {
  let component: MyTopicsComponent;
  let fixture: ComponentFixture<MyTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyTopicsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
