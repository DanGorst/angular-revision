import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add valid message', () => {
    expect(service.messages).toEqual([]);
    service.add('test1');
    expect(service.messages).toEqual(['test1']);
  });

  it('should clear messages', () => {
    service.add('test1');
    service.clear();
    expect(service.messages).toEqual([]);
  });

  it('should clear messages without any error even if there are none', () => {
    service.clear();
    expect(service.messages).toEqual([]);
  });
});
