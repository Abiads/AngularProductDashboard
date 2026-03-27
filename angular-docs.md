### Navigate to and run a new Angular project

Source: https://angular.dev/installation

After creating your project, change the directory to your new project folder and use 'npm start' to build and serve your Angular application locally. The output will provide a URL to access your running app.

```bash
cd my-first-angular-app
npm start
```

--------------------------------

### Install Angular CLI using npm, pnpm, yarn, or bun

Source: https://angular.dev/installation

These commands install the Angular Command Line Interface globally on your system. Ensure you have Node.js installed. This tool is essential for creating and managing Angular projects.

```npm
npm install -g @angular/cli
```

```pnpm
pnpm add -g @angular/cli
```

```yarn
yarn global add @angular/cli
```

```bun
bun add -g @angular/cli
```

--------------------------------

### Angular Testing Setup with TestBed

Source: https://angular.dev/guide/testing/utility-apis

Illustrates the basic setup for Angular testing using `TestBed.configureTestingModule`. This example shows how to provide services like `ValueService` and inject them into the test context for component or service verification.

```typescript
import { TestBed } from '@angular/core/testing';
import { ValueService } from './demo';

describe('ValueService', () => {
  let service: ValueService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    });
    service = TestBed.inject(ValueService);
  });

  it('should use ValueService', () => {
    expect(service.getValue()).toBe('real value');
  });
});
```

--------------------------------

### Create a new Angular project

Source: https://angular.dev/installation

Use the Angular CLI command 'ng new' followed by your desired project name to scaffold a new Angular application. The CLI will prompt you for configuration options.

```bash
ng new my-first-angular-app
```

--------------------------------

### Angular Structural Directive Shorthand Examples

Source: https://angular.dev/guide/directives/structural-directives

These examples demonstrate the practical application of Angular's structural directive shorthand syntax. They show various ways to use directives like `*myDir` and `*ngComponentOutlet` with different input configurations.

```plaintext
Shorthand | How Angular interprets the syntax
---|---
`*myDir="let item of [1,2,3]"` | `
*myDir="let item of [1,2,3] as items; trackBy: myTrack; index as i"` | `
*ngComponentOutlet="componentClass";` | `
*ngComponentOutlet="componentClass; inputs: myInputs";` | `
*myDir="exp as value"` | ``
```

--------------------------------

### Angular Structural Directive: Basic Setup

Source: https://angular.dev/guide/directives/structural-directives

This TypeScript code demonstrates the basic setup for an Angular structural directive. It imports necessary modules (`Directive`, `TemplateRef`, `ViewContainerRef`), injects them into the directive class, and defines the directive's selector.

```typescript
import { Directive, TemplateRef, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[select]',
})
export class SelectDirective {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
}
```

--------------------------------

### MasterService Setup Function for Testing

Source: https://angular.dev/guide/testing/services

Provides a `setup` function used in tests for MasterService. This function encapsulates the creation of the MasterService instance and its dependencies, returning them in an object for easy access in tests.

```typescript
function setup() {
  const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
  const stubValue = 'stub value';
  const masterService = new MasterService(valueServiceSpy);
  valueServiceSpy.getValue.and.returnValue(stubValue);
  return {masterService, stubValue, valueServiceSpy};
}
```

--------------------------------

### Testing MasterService with Setup Function and Spy

Source: https://angular.dev/guide/testing/services

Tests the MasterService using a helper setup function that creates a Jasmine spy for ValueService and configures its return value. This approach simplifies test setup by encapsulating dependency creation and stubbing logic.

```typescript
describe('MasterService (no beforeEach)', () => {
  it('#getValue should return stubbed value from a spy', () => {
    const {masterService, stubValue, valueServiceSpy} = setup();
    expect(masterService.getValue()).withContext('service returned stub value').toBe(stubValue);
    expect(valueServiceSpy.getValue.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
    expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe(stubValue);
  });

  function setup() {
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    const stubValue = 'stub value';
    const masterService = new MasterService(valueServiceSpy);
    valueServiceSpy.getValue.and.returnValue(stubValue);
    return {masterService, stubValue, valueServiceSpy};
  }
});
```

--------------------------------

### Angular Welcome Component Setup and Tests

Source: https://angular.dev/guide/testing/components-scenarios

Sets up the testing environment for the Welcome Component using Angular's `TestBed`. It includes creating the component fixture, detecting changes, and injecting the `UserService`. The setup retrieves the component instance, the `UserService` injected into the component, the `UserService` from the root injector, and the 'welcome' DOM element. It also includes placeholder comments for various test cases.

```typescript
import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {UserService} from '../model/user.service';
import {WelcomeComponent} from './welcome.component';

class MockUserService {
  isLoggedIn = true;
  user = {name: 'Test User'};
}

describe('WelcomeComponent', () => {
  let comp: WelcomeComponent;
  let fixture: ComponentFixture;
  let componentUserService: UserService; // the actually injected service
  let userService: UserService; // the TestBed injected service
  let el: HTMLElement; // the DOM element with the welcome message

  beforeEach(() => {
    // ... (other setup code if any)
    fixture = TestBed.createComponent(WelcomeComponent);
    fixture.autoDetectChanges();
    comp = fixture.componentInstance;

    // UserService actually injected into the component
    userService = fixture.debugElement.injector.get(UserService);
    componentUserService = userService;

    // UserService from the root injector
    userService = TestBed.inject(UserService);

    // get the "welcome" element by CSS selector (e.g., by class name)
    el = fixture.nativeElement.querySelector('.welcome');
  });

  it('should welcome the user', async () => {
    // ... test implementation
  });

  it('should welcome "Bubba"', async () => {
    // ... test implementation
  });

  it('should request login if not logged in', async () => {
    // ... test implementation
  });

  it("should inject the component's UserService instance", inject( [UserService],
    (service: UserService) => {
      expect(service).toBe(componentUserService);
    },
  ));

  it('TestBed and Component UserService should be the same', () => {
    expect(userService).toBe(componentUserService);
  });
});
```

--------------------------------

### Install Angular CDK for Component Harnesses

Source: https://angular.dev/guide/testing/creating-component-harnesses

Installs the Angular Component Dev Kit (CDK), which provides the necessary tools for creating component test harnesses. This command should be run from your project's terminal.

```bash
ng add @angular/cdk
```

--------------------------------

### Angular Banner Component Minimal Test Setup

Source: https://angular.dev/guide/testing/components-basics

Demonstrates a minimal setup for testing an Angular Banner Component, focusing on creating the component instance and asserting its existence.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BannerComponent} from './banner-initial.component';

describe('BannerComponent (minimal)', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [BannerComponent]
    });
    const fixture = TestBed.createComponent(BannerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
```

--------------------------------

### Angular Component Test Setup and Basic Assertions

Source: https://angular.dev/guide/testing/components-basics

Demonstrates the standard setup for Angular component testing using TestBed, including fixture creation and component instantiation. It includes basic tests to verify component creation and content presence.

```typescript
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {BannerComponent} from './banner-initial.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BannerComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});

describe('BannerComponent (minimal)', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [BannerComponent]
    });
    const fixture = TestBed.createComponent(BannerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});

describe('BannerComponent (with beforeEach)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BannerComponent]
    });
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
```

--------------------------------

### Create and Test Banner Component (Jasmine)

Source: https://angular.dev/guide/testing/components-basics

Demonstrates basic Angular component testing setup. It configures the testing module, creates a component fixture, and asserts that the component instance is defined upon creation. This is a standard starting point for component unit tests.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BannerComponent} from './banner-initial.component';

describe('BannerComponent (minimal)', () => {
  it('should create', () => {
    TestBed.configureTestingModule({imports: [BannerComponent]});
    const fixture = TestBed.createComponent(BannerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
```

--------------------------------

### Angular Shared Module Setup for HeroDetailComponent

Source: https://angular.dev/guide/testing/components-scenarios

Configuration for setting up a shared module setup including `HeroDetailComponent` and other shared imports. It configures routing for `HeroDetailComponent` and provides `HttpClient` and `HttpClientTesting` services. This setup is used to test the display of hero names.

```typescript
function sharedModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [HeroDetailComponent, sharedImports],
        providers: [
          provideRouter([{path: 'heroes/:id', component: HeroDetailComponent}]),
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      }),
    );
  });

  it("should display 1st hero's name", async () => {
    const expectedHero = firstHero;
    await createComponent(expectedHero.id).then(() => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });
  });
}
```

--------------------------------

### Angular Banner Component Setup and Tests

Source: https://angular.dev/guide/testing/components-scenarios

This snippet shows the setup for testing an Angular Banner Component and a series of tests to verify its title display. It uses `TestBed` to create the component and `fixture.nativeElement.querySelector` to access the H1 element. The tests cover the initial state before data binding, the display of the default title, and the display of a modified title.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BannerComponent} from './banner.component';

describe('BannerComponent (inline template)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let h1: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance; // BannerComponent test instance
    h1 = fixture.nativeElement.querySelector('h1');
  });

  it('no title in the DOM after createComponent()', () => {
    expect(h1.textContent).toEqual('');
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(h1.textContent).toContain(component.title);
  });

  it('should display original title after detectChanges()', () => {
    fixture.detectChanges();
    expect(h1.textContent).toContain(component.title);
  });

  it('should display a different test title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    expect(h1.textContent).toContain('Test Title');
  });
});
```

--------------------------------

### Angular: Expect and Respond to HTTP GET Request with Mock Data

Source: https://angular.dev/guide/http/testing

Demonstrates testing an Angular service that makes an HTTP GET request. It sets up `TestBed`, injects `HttpTestingController`, triggers the service method (which makes the request), uses `httpTesting.expectOne()` to assert the request details, `req.flush()` to provide a mock response, and `httpTesting.verify()` to ensure no unexpected requests were made. The example uses `firstValueFrom` to handle the observable response.

```typescript
import { TestBed } from '@angular/core/testing';
import { provideHttpClient, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

// Assuming ConfigService and DEFAULT_CONFIG are defined elsewhere

// ... inside your test suite
TestBed.configureTestingModule({
  providers: [
    ConfigService, // The service to test
    provideHttpClient(),
    provideHttpClientTesting(),
  ],
});

const httpTesting = TestBed.inject(HttpTestingController);
const service = TestBed.inject(ConfigService);

// Trigger the service method that makes the HTTP request
const config$ = service.getConfig();
const configPromise = firstValueFrom(config$);

// Assert the request was made and mock the response
const req = httpTesting.expectOne('/api/config', 'Request to load the configuration');
expect(req.request.method).toBe('GET');
req.flush(DEFAULT_CONFIG); // Provide mock data

// Verify the response and that no other requests were made
expect(await configPromise).toEqual(DEFAULT_CONFIG);
httpTesting.verify();
```

--------------------------------

### Basic Angular Component Test Setup (TypeScript)

Source: https://angular.dev/guide/testing/components-basics

This code demonstrates the fundamental setup for testing an Angular component. It includes configuring the testing module, creating a component fixture, and detecting changes. Basic assertions like checking if the component is defined are shown.

```typescript
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {BannerComponent} from './banner-initial.component';

describe('BannerComponent (initial CLI generated)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({imports: [BannerComponent]});
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});

describe('BannerComponent (minimal)', () => {
  it('should create', () => {
    TestBed.configureTestingModule({imports: [BannerComponent]});
    const fixture = TestBed.createComponent(BannerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});

describe('BannerComponent (with beforeEach)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [BannerComponent]});
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
```

--------------------------------

### Angular Async Testing: Basic Setup and Usage

Source: https://angular.dev/guide/testing/components-scenarios

Demonstrates the fundamental setup for asynchronous testing in Angular using `beforeEach`, `afterEach`, and `DoneFn`. It covers basic tests, `setTimeout`, `setInterval`, Promises, and RxJS observables with `async` and `waitForAsync`.

```typescript
import {fakeAsync, tick, waitForAsync} from '@angular/core/testing';
import {interval, of} from 'rxjs';
import {delay, take} from 'rxjs/operators';

describe('Angular async helper', () => {
  describe('async', () => {
    let actuallyDone = false;
    beforeEach(() => {
      actuallyDone = false;
    });
    afterEach(() => {
      expect(actuallyDone).withContext('actuallyDone should be true').toBe(true);
    });

    it('should run normal test', () => {
      actuallyDone = true;
    });

    it('should run normal async test', (done: DoneFn) => {
      setTimeout(() => {
        actuallyDone = true;
        done();
      }, 0);
    });

    it('should run async test with task', waitForAsync(() => {
      setTimeout(() => {
        actuallyDone = true;
      }, 0);
    }));

    it('should run async test with task', waitForAsync(() => {
      const id = setInterval(() => {
        actuallyDone = true;
        clearInterval(id);
      }, 100);
    }));

    it('should run async test with successful promise', waitForAsync(() => {
      const p = new Promise((resolve) => {
        setTimeout(resolve, 10);
      });
      p.then(() => {
        actuallyDone = true;
      });
    }));

    it('should run async test with failed promise', waitForAsync(() => {
      const p = new Promise((resolve, reject) => {
        setTimeout(reject, 10);
      });
      p.catch(() => {
        actuallyDone = true;
      });
    }));

    // Use done. Can also use async or fakeAsync.
    it('should run async test with successful delayed Observable', (done: DoneFn) => {
      const source = of(true).pipe(delay(10));
      source.subscribe({
        next: (val) => (actuallyDone = true),
        error: (err) => fail(err),
        complete: done,
      });
    });

    it('should run async test with successful delayed Observable', waitForAsync(() => {
      const source = of(true).pipe(delay(10));
      source.subscribe({
        next: (val) => (actuallyDone = true),
        error: (err) => fail(err),
      });
    }));

    it('should run async test with successful delayed Observable', fakeAsync(() => {
      const source = of(true).pipe(delay(10));
      source.subscribe({
        next: (val) => (actuallyDone = true),
        error: (err) => fail(err),
      });
      tick(10);
    }));
  });

  describe('fakeAsync', () => {
    it('should run timeout callback with delay after call tick with millis', fakeAsync(() => {
      let called = false;
      setTimeout(() => {
        called = true;
      }, 100);
      tick(100);
      expect(called).toBe(true);
    }));

    it('should run new macro task callback with delay after call tick with millis', fakeAsync(() => {
      function nestedTimer(cb: () => any): void {
        setTimeout(() => setTimeout(() => cb()));
      }
      const callback = jasmine.createSpy('callback');
      nestedTimer(callback);
      expect(callback).not.toHaveBeenCalled();
      tick(0); // the nested timeout will also be triggered
      expect(callback).toHaveBeenCalled();
    }));

    it('should not run new macro task callback with delay after call tick with millis', fakeAsync(() => {
      function nestedTimer(cb: () => any): void {
        setTimeout(() => setTimeout(() => cb()));
      }
      const callback = jasmine.createSpy('callback');
      nestedTimer(callback);
      expect(callback).not.toHaveBeenCalled();
      tick(0, {processNewMacroTasksSynchronously: false}); // the nested timeout will not be triggered
      expect(callback).not.toHaveBeenCalled();
      tick(0);
      expect(callback).toHaveBeenCalled();
    }));

    it('should get Date diff correctly in fakeAsync', fakeAsync(() => {
      const start = Date.now();
      tick(100);
      const end = Date.now();
      expect(end - start).toBe(100);
    }));

    it('should get Date diff correctly in fakeAsync with rxjs scheduler', fakeAsync(() => {
      // need to add `import 'zone.js/plugins/zone-patch-rxjs-fake-async'`
      // to patch rxjs scheduler
      let result = '';
      of('hello')
        .pipe(delay(1000))
        .subscribe((v) => {
          result = v;
        });
      expect(result).toBe('');
      tick(1000);
      expect(result).toBe('hello');

      const start = new Date().getTime();
      let dateDiff = 0;
      interval(1000)
        .pipe(take(2))
        .subscribe(() => (dateDiff = new Date().getTime() - start));
      tick(1000);
      expect(dateDiff).toBe(1000);
      tick(1000);
      expect(dateDiff).toBe(2000);
    }));
  });
});

```

--------------------------------

### Setup Angular Testing Module with HTTP Mocking and Routing (TypeScript)

Source: https://angular.dev/guide/testing/components-scenarios

This setup configures the Angular testing module, providing necessary imports like HeroDetailComponent and HeroListComponent. It includes HttpClient, HttpHandler, and configurations for the router to handle hero-related routes. Crucially, it overrides the HeroDetailService to use a mock implementation.

```typescript
beforeEach(async () => {
  await TestBed.configureTestingModule(
    Object.assign({}, appConfig, {
      imports: [HeroDetailComponent, HeroListComponent],
      providers: [
        provideRouter([
          {path: 'heroes', component: HeroListComponent},
          {path: 'heroes/:id', component: HeroDetailComponent},
        ]),
        HttpClient,
        HttpHandler,
        // HeroDetailService at this level is IRRELEVANT!
        {provide: HeroDetailService, useValue: {}},
      ],
    }),
  )
  .overrideComponent(HeroDetailComponent, {
    set: {providers: [{provide: HeroDetailService, useClass: HeroDetailServiceSpy}]},
  });
});
```

--------------------------------

### Install Vitest Coverage Package

Source: https://angular.dev/guide/testing/code-coverage

Install the necessary Vitest package for generating code coverage reports. This is a prerequisite for using the coverage features.

```bash
npm install --save-dev @vitest/coverage-v8
```

```bash
yarn add --dev @vitest/coverage-v8
```

```bash
pnpm add --save-dev @vitest/coverage-v8
```

```bash
bun add --dev @vitest/coverage-v8
```

--------------------------------

### GET Request for JSON Data

Source: https://angular.dev/guide/http/making-requests

Demonstrates how to fetch JSON data from an API endpoint using `HttpClient.get()`. The example shows how to specify a generic type for the expected response.

```APIDOC
## GET /api/config

### Description
Fetches configuration data from a specified API endpoint.

### Method
GET

### Endpoint
`/api/config`

### Parameters
#### Query Parameters
- **None**

#### Request Body
- **None**

### Request Example
```typescript
http.get<Config>('/api/config').subscribe(config => {
  // process the configuration.
});
```

### Response
#### Success Response (200)
- **config** (Config) - The configuration data returned from the server.

#### Response Example
```json
{
  "setting1": "value1",
  "setting2": 123
}
```
```

--------------------------------

### Angular Test Setup and Basic Creation Test

Source: https://angular.dev/guide/forms

This code block sets up the testing environment for the `FavoriteColorTemplateComponent` using `TestBed.configureTestingModule`. It also includes a basic 'should create' test to ensure the component instance is successfully created. Dependencies include `waitForAsync`, `TestBed`, and the component itself.

```typescript
describe('FavoriteColorComponent', () => {
  let component: FavoriteColorTemplateComponent;
  let fixture: ComponentFixture<FavoriteColorTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteColorTemplateComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteColorTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

--------------------------------

### GET Request with Different Response Types

Source: https://angular.dev/guide/http/making-requests

Explains how to handle non-JSON responses by specifying the `responseType` option in `HttpClient.get()`. Examples include 'text', 'arraybuffer', and 'blob'.

```APIDOC
## GET /images/dog.jpg

### Description
Downloads the raw bytes of an image file from a URL.

### Method
GET

### Endpoint
`/images/dog.jpg`

### Parameters
#### Query Parameters
- **None**

#### Request Body
- **None**

### Request Example
```typescript
http.get('/images/dog.jpg', { responseType: 'arraybuffer' }).subscribe(buffer => {
  console.log('The image is ' + buffer.byteLength + ' bytes large');
});
```

### Response
#### Success Response (200)
- **buffer** (ArrayBuffer) - The raw byte data of the image.

#### Response Example
```javascript
// Example log output:
The image is 12345 bytes large
```

### Note on `responseType`
When not using a literal object for request options, ensure `responseType` has a literal type, e.g., `responseType: 'text' as const`.
```

--------------------------------

### Angular Component Test Setup

Source: https://angular.dev/guide/testing/components-basics

Standard setup for an Angular component test suite, including configuring the testing module, creating a component fixture, and detecting changes. This sets the stage for individual tests.

```typescript
import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BannerComponent} from './banner-initial.component';

describe('BannerComponent (initial CLI generated)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BannerComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});

describe('BannerComponent (minimal)', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [BannerComponent]
    });
    const fixture = TestBed.createComponent(BannerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});

describe('BannerComponent (with beforeEach)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BannerComponent]
    });
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should contain "banner works!"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('banner works!');
  });

  it('should have a "banner works!" paragraph', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelector('p')!;
    expect(p.textContent).toEqual('banner works!');
  });
});

```

--------------------------------

### Angular Component Harness Test Setup and Usage

Source: https://angular.dev/guide/testing/using-component-harnesses

Illustrates a typical Angular component harness test setup using `ComponentFixture` and `HarnessLoader`. It shows how to obtain loaders for the fixture's root element and the document's root, and then use them to load harnesses for different components, including those outside the fixture's direct DOM.

```typescript
let fixture: ComponentFixture;
let loader: HarnessLoader;
let rootLoader: HarnessLoader;

beforeEach(() => {
  fixture = TestBed.createComponent(MyDialogButton);
  loader = TestbedHarnessEnvironment.loader(fixture);
  rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
});

it('loads harnesses', async () => {
  // Load harness for the bootstrapped component
  const dialogButtonHarness = await TestbedHarnessEnvironment.harnessForFixture(fixture, MyDialogButtonHarness);

  // Load harness for a component within the fixture's root element
  const buttonHarness = await loader.getHarness(MyButtonHarness);
  await buttonHarness.click();

  // Load harness for a component outside the fixture's root (e.g., appended to body)
  const dialogHarness = await rootLoader.getHarness(MyDialogHarness);
  // ... assertions ...
});
```

--------------------------------

### Angular NgClass and NgStyle Setup

Source: https://angular.dev/guide/directives

Shows how to set up and use Angular's NgClass and NgStyle directives in a component. NgClass allows for dynamic application of CSS classes, while NgStyle enables setting inline styles based on component state. The example includes importing these directives and defining methods to update class and style properties.

```typescript
import {Component, OnInit} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {NgIf} from '@angular/common';
import {NgFor} from '@angular/common';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {NgStyle} from '@angular/common';
import {NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Item} from './item';
import {ItemDetailComponent} from './item-detail.component';
import {ItemSwitchComponents} from './item-switch.component';
import {StoutItemComponent} from './item-switch.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    NgIf, // <-- import into the component
    NgFor, // <-- import into the component
    ...
    NgStyle, // <-- import into the component
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgClass, // <-- import into the component
    FormsModule, // <--- import into the component
    JsonPipe,
    ItemDetailComponent,
    ItemSwitchComponents,
    StoutItemComponent,
    ...
  ],
  ...
})
export class AppComponent implements OnInit {
  canSave = true;
  isSpecial = true;
  isUnchanged = true;
  isActive = true;
  nullCustomer: string | null = null;
  currentCustomer = {
    name: 'Laura',
  };
  item!: Item;
  // defined to demonstrate template context precedence
  items: Item[] = [];
  currentItem!: Item;
  // trackBy change counting
  itemsNoTrackByCount = 0;
  itemsWithTrackByCount = 0;
  itemsWithTrackByCountReset = 0;
  itemIdIncrement = 1;
  currentClasses: Record<string, boolean> = {};
  currentStyles: Record<string, string> = {};

  ngOnInit() {
    this.resetItems();
    this.setCurrentClasses();
    this.setCurrentStyles();
    this.itemsNoTrackByCount = 0;
  }

  setUppercaseName(name: string) {
    this.currentItem.name = name.toUpperCase();
  }

  setCurrentClasses() {
    // CSS classes: added/removed per current state of component properties
    this.currentClasses = {
      saveable: this.canSave,
      modified: !this.isUnchanged,
      special: this.isSpecial,
    };
  }

  setCurrentStyles() {
    // CSS styles: set per current state of component properties
    this.currentStyles = {
      'font-style': this.canSave ? 'italic' : 'normal',
      'font-weight': !this.isUnchanged ? 'bold' : 'normal',
      'font-size': this.isSpecial ? '24px' : '12px',
    };
  }

  isActiveToggle() {
    this.isActive = !this.isActive;
  }

  giveNullCustomerValue() {
    this.nullCustomer = 'Kelly';
  }

  resetItems() {
    this.items = Item.items.map((item) => item.clone());
    this.currentItem = this.items[0];
    this.item = this.currentItem;
  }

  resetList() {
    this.resetItems();
    this.itemsWithTrackByCountReset = 0;
    this.itemsNoTrackByCount = ++this.itemsNoTrackByCount;
  }

  changeIds() {
    this.items.forEach((i) => (i.id += 1 * this.itemIdIncrement));
    this.itemsWithTrackByCountReset = -1;
    this.itemsNoTrackByCount = ++this.itemsNoTrackByCount;
    this.itemsWithTrackByCount = ++this.itemsWithTrackByCount;
  }

  clearTrackByCounts() {
    this.resetItems();
    this.itemsNoTrackByCount = 0;
    this.itemsWithTrackByCount = 0;
    this.itemIdIncrement = 1;
  }

  trackByItems(index: number, item: Item): number {
    return item.id;
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  ...
}
```

```html
Are you as bright as {{ currentItem.name }}?

<!-- Example for NgClass -->
<div [ngClass]="currentClasses">This div has dynamic classes.</div>

<!-- Example for NgStyle -->
<div [ngStyle]="currentStyles">This div has dynamic styles.</div>
```

--------------------------------

### Angular formsModule Setup for HeroDetailComponent

Source: https://angular.dev/guide/testing/components-scenarios

Configuration for setting up Angular's `FormsModule` and `HeroDetailComponent` for testing. It includes providing `HttpClient` and `HttpClientTesting` services, and configuring routing for the `HeroDetailComponent`. This setup is used to test the display of hero names.

```typescript
function formsModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [FormsModule, HeroDetailComponent, TitleCasePipe],
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          provideRouter([{path: 'heroes/:id', component: HeroDetailComponent}]),
        ],
      }),
    );
  });

  it("should display 1st hero's name", async () => {
    const expectedHero = firstHero;
    await createComponent(expectedHero.id).then(() => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });
  });
}
```

--------------------------------

### Shared Module Setup for Hero Detail

Source: https://angular.dev/guide/testing/components-scenarios

Configures the testing module to include HeroDetailComponent and shared imports. This setup is part of a larger module configuration process, likely for testing components that rely on shared modules or services.

```typescript
import { TestBed } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { appConfig } from '../app.config';
import { provideRouter } from '@angular/router';

// Assuming sharedImports is defined elsewhere and includes necessary modules/components
const sharedImports: any[] = []; 

function sharedModuleSetup() {
  beforeEach(async () => {
    // Configure the testing module with application configuration, HeroDetailComponent, and shared imports
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [HeroDetailComponent, ...sharedImports], // Include HeroDetailComponent and any shared imports
        providers: [
          provideRouter([
            // Define routes, potentially including the hero detail route
          ]),
        ],
      }),
    );
  });
}

```

--------------------------------

### Define Angular Component Styles Externally

Source: https://angular.dev/guide/components/styling

This example demonstrates referencing external CSS files for component styling using 'styleUrl' in the @Component decorator. Angular compiles these external styles along with the component's JavaScript.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'profile-photo',
  templateUrl: 'profile-photo.html',
  styleUrl: 'profile-photo.css',
})
export class ProfilePhoto {
}
```

--------------------------------

### Using `inject` for Dependency Injection in Angular Tests

Source: https://angular.dev/guide/testing/services

This example demonstrates how to use the `inject` function within an Angular test to get access to services. It configures `TestBed` with `ValueService` and then uses `inject` inside an `it` block to retrieve an instance of `ValueService` and test its methods.

```typescript
describe('use inject within `it`', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [ValueService]});
  });

  it('should use modified providers', inject([ValueService], (service: ValueService) => {
    service.setValue('value modified in beforeEach');
    expect(service.getValue()).toBe('value modified in beforeEach');
  }));
});
```

--------------------------------

### Angular: Create and Test Banner Component Instance

Source: https://angular.dev/guide/testing/components-basics

Demonstrates the basic setup for testing an Angular component. It configures the TestBed, creates a component fixture, and asserts that the component instance is defined. This is a fundamental step in Angular component testing.

```typescript
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {BannerComponent} from './banner-initial.component';

describe('BannerComponent (initial CLI generated)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BannerComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
describe('BannerComponent (minimal)', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [BannerComponent]
    });
    const fixture = TestBed.createComponent(BannerComponent);
    const component = fixture.componentInstance;
    // ... expect(component).toBeDefined();
  });
});
describe('BannerComponent (with beforeEach)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BannerComponent]
    });
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
```

--------------------------------

### Configure Imgix Loader for NgOptimizedImage

Source: https://angular.dev/guide/image-optimization

Provides an example of configuring the Imgix loader for NgOptimizedImage by adding the 'provideImgixLoader' provider to the application's providers array with the base URL.

```typescript
providers: [
  provideImgixLoader('https://my.base.url/'),
],

```

--------------------------------

### Angular Shared Module Setup for HeroDetailComponent

Source: https://angular.dev/guide/testing/components-scenarios

Configures the testing module with shared imports and the HeroDetailComponent. It sets up the router and HTTP testing modules to simulate API interactions. This setup is useful for testing the component when it relies on shared modules.

```typescript
import {sharedImports} from '../shared/shared';

function sharedModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [HeroDetailComponent, sharedImports],
        providers: [
          provideRouter([{path: 'heroes/:id', component: HeroDetailComponent}]),
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      }),
    );
  });

  it("should display 1st hero's name", async () => {
    const expectedHero = firstHero;
    await createComponent(expectedHero.id).then(() => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });
  });
}
```

--------------------------------

### Hero Module Setup and Routing

Source: https://angular.dev/guide/testing/components-scenarios

Sets up the testing module for hero-related components, including HeroDetailComponent and HeroListComponent. It configures routing for hero lists and detail views and provides HTTP testing modules.

```typescript
import { getTestHeroes } from '../model/testing/test-hero.service';
const firstHero = getTestHeroes()[0];

function heroModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig,
        {
          imports: [HeroDetailComponent, HeroListComponent],
          providers: [
            provideRouter([
              { path: 'heroes/:id', component: HeroDetailComponent },
              { path: 'heroes', component: HeroListComponent },
            ]),
            provideHttpClient(),
            provideHttpClientTesting(),
          ],
        }
      )
    );
  });

  describe('when navigate to existing hero', () => {
    let expectedHero: Hero;
    beforeEach(async () => {
      expectedHero = firstHero;
      await createComponent(expectedHero.id);
    });

    it("should display that hero's name", () => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });

    it('should navigate when click cancel', () => {
      click(page.cancelBtn);
      expect(TestBed.inject(Router).url).toEqual(`/heroes/${expectedHero.id}`);
    });

    it('should save when click save but not navigate immediately', () => {
      click(page.saveBtn);
      expect(TestBed.inject(HttpTestingController).expectOne({ method: 'PUT', url: 'api/heroes' }));
      expect(TestBed.inject(Router).url).toEqual('/heroes/41');
    });

    it('should navigate when click save and save resolves', fakeAsync(() => {
      click(page.saveBtn);
      tick(); // wait for async save to complete
      expect(TestBed.inject(Router).url).toEqual('/heroes/41');
    }));

    it('should convert hero name to Title Case', async () => {
      harness.fixture.autoDetectChanges(); // get the name's input and display elements from the DOM
      const hostElement: HTMLElement = harness.routeNativeElement!;
      const nameInput: HTMLInputElement = hostElement.querySelector('input')!;
      const nameDisplay: HTMLElement = hostElement.querySelector('span')!;
      // simulate user entering a new name into the input box
      nameInput.value = 'quick BROWN fOx';
      // Dispatch a DOM event so that Angular learns of input value change.
      nameInput.dispatchEvent(new Event('input'));
      // Wait for Angular to update the display binding through the title pipe
      await harness.fixture.whenStable();
      expect(nameDisplay.textContent).toBe('Quick Brown Fox');
    });
  });

  describe('when navigate to non-existent hero id', () => {
    beforeEach(async () => {
      await createComponent(999);
    });

    it('should try to navigate back to hero list', () => {
      expect(TestBed.inject(Router).url).toEqual('/heroes');
    });
  });
}

```

--------------------------------

### Angular AppComponent Setup and Tests

Source: https://angular.dev/guide/testing/components-scenarios

Sets up the Angular testing module for AppComponent, configures providers, overrides components with stubs, and defines common test functions. It includes tests for component instantiation and verification of router links.

```typescript
import {Component, DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {provideRouter, Router, RouterLink, RouterOutlet} from '@angular/router';
import {AppComponent} from './app.component';
import {appConfig} from './app.config';
import {UserService} from './model';
import {WelcomeComponent} from './welcome/welcome.component';

@Component({selector: 'app-banner', template: ''})
class BannerStubComponent {}

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent {}

@Component({selector: 'app-welcome', template: ''})
class WelcomeStubComponent {}

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent & TestModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        providers: [provideRouter([]), UserService],
      }),
    ).overrideComponent(AppComponent, {
      set: {
        imports: [BannerStubComponent, RouterLink, RouterOutletStubComponent, WelcomeStubComponent],
      },
    });
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  tests();
});

//////// Testing w/ NO_ERRORS_SCHEMA //////
describe('AppComponent & NO_ERRORS_SCHEMA', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        providers: [provideRouter([]), UserService],
      }),
    ).overrideComponent(AppComponent, {
      set: {
        imports: [],
        schemas: [NO_ERRORS_SCHEMA],
      },
    });
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  tests();
});

describe('AppComponent & NO_ERRORS_SCHEMA', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        providers: [provideRouter([]), UserService],
      }),
    ).overrideComponent(AppComponent, {
      remove: {
        imports: [RouterOutlet, WelcomeComponent],
      },
      set: {
        schemas: [NO_ERRORS_SCHEMA],
      },
    });
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  tests();
});

function tests() {
  let routerLinks: RouterLink[];
  let linkDes: DebugElement[];

  beforeEach(() => {
    fixture.detectChanges(); // trigger initial data binding

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));

    // get attached link directive instances
    // using each DebugElement's injector
    routerLinks = linkDes.map((de) => de.injector.get(RouterLink));
  });

  it('can instantiate the component', () => {
    expect(comp).not.toBeNull();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).withContext('should have 3 routerLinks').toBe(3);
    expect(routerLinks[0].href).toBe('/dashboard');
    expect(routerLinks[1].href).toBe('/heroes');
    expect(routerLinks[2].href).toBe('/about');
  });

  it('can click Heroes link in template', fakeAsync(() => {
    const heroesLinkDe = linkDes[1]; // heroes link DebugElement
    TestBed.inject(Router).resetConfig([{path: '**', children: []}]);
    heroesLinkDe.triggerEventHandler('click', {button: 0});
    tick();
    fixture.detectChanges();
    expect(TestBed.inject(Router).url).toBe('/heroes');
  }));
}

```

--------------------------------

### Angular CLI: Serve Application

Source: https://angular.dev/guide/routing/routing-with-urlmatcher

This command starts the Angular development server, allowing you to test your application locally. It compiles the application and serves it from a development server, typically at http://localhost:4200.

```bash
ng serve

```

--------------------------------

### Angular Component with viewProviders for AnimalService

Source: https://angular.dev/guide/di/hierarchical-dependency-injection

An example of an Angular root component (`app.component.ts`) that configures `viewProviders` to provide a specific value for `AnimalService`. This setup is often used in conjunction with other components to test dependency injection behavior.

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [
    {
      provide: AnimalService,
      useValue: { emoji: '🦔' },
    },
  ],
})
```

--------------------------------

### Setup and Initialization for DashboardComponent Tests

Source: https://angular.dev/guide/testing/components-scenarios

A helper function to configure TestBed, compile, and create the DashboardComponent for testing. It includes setting up routing, HTTP testing, and injecting necessary services like HeroService. This function is used by both shallow and routed component tests.

```typescript
function compileAndCreate() {
  beforeEach(async () => {
    TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        providers: [
          provideRouter([{ path: '**', component: DashboardComponent }]),
          provideHttpClient(),
          provideHttpClientTesting(),
          HeroService,
        ],
      }),
    );
    harness = await RouterTestingHarness.create();
    comp = await harness.navigateByUrl('/', DashboardComponent);
    TestBed.inject(HttpTestingController).expectOne('api/heroes').flush(getTestHeroes());
  });
}
```

--------------------------------

### Angular Structural Directive Example Usage

Source: https://angular.dev/guide/directives/structural-directives

Demonstrates how to use a custom structural directive named 'SelectDirective' with an input property 'selectFrom' to conditionally render content when data is available. The directive wraps its content in an ng-template.

```html
<ng-container [selectFrom]="'someDataSource'">
  The data is: {{ data }}
</ng-container>
```

--------------------------------

### Angular Banner Component Test with beforeEach

Source: https://angular.dev/guide/testing/components-basics

This snippet illustrates testing an Angular Banner Component using `beforeEach` for setup. It covers component creation and text content assertions.

```typescript
import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BannerComponent} from './banner-initial.component';

describe('BannerComponent (with beforeEach)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BannerComponent]
    });
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should contain "banner works!"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('banner works!');
  });

  it('should have "banner works!"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelector('p')!;
    expect(p.textContent).toEqual('banner works!');
  });

  it('should find the DebugElement with fixture.nativeElement', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const p = bannerEl.querySelector('p')!;
    expect(p.textContent).toEqual('banner works!');
  });

  it('should find the DebugElement with fixture.debugElement.query(By.css)', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const paragraphDe = bannerDe.query(By.css('p'));
    const p: HTMLElement = paragraphDe.nativeElement;
    expect(p.textContent).toEqual('banner works!');
  });
});
```

--------------------------------

### Angular Structural Directive Shorthand Syntax

Source: https://angular.dev/guide/directives/structural-directives

Illustrates the shorthand syntax for applying structural directives in Angular. The asterisk (*) prefix transforms the directive into an ng-template, simplifying the markup. This example uses the '*select' shorthand for the 'SelectDirective'.

```html
<div *select="'someDataSource' as data">
  The data is: {{ data }}
</div>
```

--------------------------------

### Functional Interceptor Configuration - Angular Testing

Source: https://angular.dev/guide/http/testing

Provides an example of configuring a functional interceptor using `provideHttpClient(withInterceptors([...]))` in `TestBed`. This setup is used to test interceptors that modify outgoing requests, such as adding authentication tokens.

```typescript
export function authInterceptor(request: HttpRequest, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const clonedRequest = request.clone({
    headers: request.headers.append('X-Authentication-Token', authService.getAuthToken()),
  });
  return next(clonedRequest);
}

TestBed.configureTestingModule({
  providers: [
    AuthService,
    // Testing one interceptor at a time is recommended.
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClientTesting(),
  ],
});
```

--------------------------------

### Angular HeroDetailComponent Testing Setup (TypeScript)

Source: https://angular.dev/guide/testing/components-scenarios

Sets up the testing module for HeroDetailComponent using `TestBed.configureTestingModule`. It configures routing, imports necessary components and modules, and provides HTTP testing services. This is a common pattern for Angular component integration tests.

```typescript
beforeEach(async () => {
  await TestBed.configureTestingModule(
    Object.assign({}, appConfig,
      {
        imports: [HeroDetailComponent, sharedImports],
        providers: [
          provideRouter([{path: 'heroes/:id', component: HeroDetailComponent}]),
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      }),
  );
});
```

--------------------------------

### Angular Component Test Setup with Mock Service

Source: https://angular.dev/guide/testing/components-scenarios

Sets up an Angular testing module and component fixture, injecting a mock TwainService. It configures a spy on the service's `getQuote` method to return predefined synchronous data, enabling tests for immediate rendering after initialization. Dependencies include `@angular/core/testing` and `rxjs/of`.

```typescript
const errorMessage = () => { const el = fixture.nativeElement.querySelector('.error'); return el ? el.textContent : null; };

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [TwainService],
  });
  testQuote = 'Test Quote'; // Create a fake TwainService object with a `getQuote()` spy
  const twainService = TestBed.inject(TwainService);
  // Make the spy return a synchronous Observable with the test data
  getQuoteSpy = spyOn(twainService, 'getQuote').and.returnValue(of(testQuote));
  fixture = TestBed.createComponent(TwainComponent);
  fixture.autoDetectChanges();
  component = fixture.componentInstance;
  quoteEl = fixture.nativeElement.querySelector('.twain');
});
```

--------------------------------

### Get Component Harnesses with HarnessLoader

Source: https://angular.dev/guide/testing/using-component-harnesses

Demonstrates using HarnessLoader to get specific ComponentHarness instances. `getHarness()` retrieves the first matching harness, while `getAllHarnesses()` retrieves all matching harnesses for a given component.

```typescript
const myComponentHarness = await loader.getHarness(MyComponent);
const myComponentHarnesses = await loader.getHarnesses(MyComponent);
```

--------------------------------

### Shared Module Setup for Angular Testing

Source: https://angular.dev/guide/testing/components-scenarios

Configures the testing module for shared components and utilities in Angular. This setup integrates HeroDetailComponent and other shared imports, ensuring that components relying on shared modules can be tested effectively. It utilizes TestBed and routing configurations.

```typescript
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';
import {sharedImports} from '../shared/shared.module';
import {appConfig} from '../app.config';
function sharedModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      Object.assign({}, appConfig, {
        imports: [HeroDetailComponent, sharedImports],
        providers: [
          provideRouter([{path: 'heroes/:id', component: HeroDetailComponent}]),
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      }),
    });
  });
  // ... it block for tests
```

--------------------------------

### Override HTTP Caching for a Specific Request

Source: https://angular.dev/guide/hybrid-rendering

Override the global caching behavior for a specific HTTP request using the `transferCache` request option. This example includes 'CustomHeader' for a specific GET request.

```typescript
http.get('/api/profile', {
  transferCache: {
    includeHeaders: ['CustomHeader']
  }
});
```

--------------------------------

### Testing Basic Service Functionality in Angular

Source: https://angular.dev/guide/testing/services

This example shows how to test a basic Angular service (`ValueService`) using `TestBed`. It covers injecting the service, testing synchronous methods (`getValue`), and handling asynchronous methods that return promises (`getPromiseValue`) and observables (`getObservableValue`, `getObservableDelayValue`). It also demonstrates testing when a service is not provided.

```typescript
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ValueService, NotProvided } from './demo';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ValueService] });
    service = TestBed.inject(ValueService);
  });

  it('should use ValueService', () => {
    expect(service.getValue()).toBe('real value');
  });

  it('can inject a default value when service is not provided', () => {
    // Attempt to inject a service that is not configured in TestBed providers
    expect(TestBed.inject(NotProvided, null)).toBeNull();
  });

  it('test should wait for ValueService.getPromiseValue', waitForAsync(() => {
    service.getPromiseValue().then((value) => expect(value).toBe('promise value'));
  }));

  it('test should wait for ValueService.getObservableValue', waitForAsync(() => {
    service.getObservableValue().subscribe((value) => expect(value).toBe('observable value'));
  }));

  // Must use done. See https://github.com/angular/angular/issues/10127
  it('test should wait for ValueService.getObservableDelayValue', (done: DoneFn) => {
    service.getObservableDelayValue().subscribe((value) => {
      expect(value).toBe('observable delay value');
      done();
    });
  });
});

```

--------------------------------

### Application Bootstrap Providers in main.ts

Source: https://angular.dev/guide/di/dependency-injection-providers

This example demonstrates how to configure application-level providers during the Angular application bootstrap process. These providers are typically singletons available throughout the application and are suitable for global services, configuration, and error handling.

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: API_BASE_URL, useValue: 'https://api.example.com' },
    { provide: INTERCEPTOR_TOKEN, useClass: AuthInterceptor, multi: true },
    LoggingService, // Used throughout the app
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
});

```

--------------------------------

### Angular Component Binding Example

Source: https://angular.dev/guide/testing/components-scenarios

This snippet demonstrates how to bind a dynamic title to an Angular component's template. It shows the component definition and the template where the 'title' property is bound to display the dynamic content. This is a fundamental example for component testing.

```typescript
import {Component, signal} from '@angular/core';
@Component({
  selector: 'app-banner',
  template: '<h2>{{ title }}</h2>'
})
export class BannerComponent {
  title = 'Test Tour of Heroes';
}
```

--------------------------------

### Test Banner Component with beforeEach Setup (Jasmine)

Source: https://angular.dev/guide/testing/components-basics

Refactors common testing setup into a `beforeEach` block for reusability. It configures the testing module and creates the component fixture and instance before each test. This improves test organization and reduces code duplication.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BannerComponent} from './banner-initial.component';

describe('BannerComponent (with beforeEach)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [BannerComponent]});
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
```

--------------------------------

### Angular Forms Module Setup for HeroDetailComponent

Source: https://angular.dev/guide/testing/components-scenarios

Sets up the testing module with FormsModule, HeroDetailComponent, and TitleCasePipe. It configures the router and HTTP testing modules to mock API requests for hero data. This setup is used to test the component's functionality when forms are involved.

```typescript
import {FormsModule} from '@angular/forms';
import {TitleCasePipe} from '../shared/title-case.pipe';
import {appConfig} from '../app.config';

function formsModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [FormsModule, HeroDetailComponent, TitleCasePipe],
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          provideRouter([{path: 'heroes/:id', component: HeroDetailComponent}]),
        ],
      }),
    );
  });

  it("should display 1st hero's name", async () => {
    const expectedHero = firstHero;
    await createComponent(expectedHero.id).then(() => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });
  });
}
```

--------------------------------

### Angular Test: Asynchronous Observable Setup

Source: https://angular.dev/guide/testing/components-scenarios

Configures a spy on the `getQuote` method to return an asynchronous Observable using a helper function `asyncData`. This setup is used to test scenarios where data is not immediately available upon component initialization. Dependencies include RxJS operators and testing utilities.

```typescript
describe('when test with asynchronous observable', () => {
  beforeEach(() => {
    // Simulate delayed observable values with the `asyncData()` helper
    getQuoteSpy.and.returnValue(asyncData(testQuote));
  });
  // ... other tests in this block
```

--------------------------------

### GET Request with URL Parameters

Source: https://angular.dev/guide/http/making-requests

Shows how to include URL parameters in a GET request using either an object literal or HttpParams.

```APIDOC
## GET /api/config with URL Parameters

### Description
Retrieves configuration data with optional filtering. URL parameters can be set using an object literal or the `HttpParams` class for more control.

### Method
GET

### Endpoint
/api/config

#### Parameters

#### Query Parameters
- **filter** (string) - Optional - Filters the configuration data.
- **details** (string) - Optional - Request additional details.

### Request Example (Object Literal)
```javascript
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

getConfig(filterValue: string) {
  this.http.get('/api/config', {
    params: { filter: filterValue } 
  }).subscribe(config => {
    console.log('Config:', config);
  });
}
```

### Request Example (HttpParams)
```javascript
import { HttpClient, HttpParams } from '@angular/common/http';

constructor(private http: HttpClient) {}

getConfigWithHttpParams(filterValue: string, detailsEnabled: boolean) {
  const baseParams = new HttpParams().set('filter', filterValue);
  const params = detailsEnabled ? baseParams.append('details', 'enabled') : baseParams;
  
  this.http.get('/api/config', {
    params: params
  }).subscribe(config => {
    console.log('Config:', config);
  });
}
```

### Response
#### Success Response (200)
- **config** (any) - The configuration data.

#### Response Example
```json
{
  "setting1": "value1",
  "setting2": "value2"
}
```
```

--------------------------------

### Setup HeroModule for HeroDetailComponent Testing

Source: https://angular.dev/guide/testing/components-scenarios

Configures the testing module with HeroDetailComponent, HeroListComponent, routing, and necessary HTTP services for testing hero data interactions.

```typescript
beforeEach(async () => {
  await TestBed.configureTestingModule(
    Object.assign({}, appConfig,
      {
        imports: [HeroDetailComponent, HeroListComponent],
        providers: [
          provideRouter([
            {path: 'heroes/:id', component: HeroDetailComponent},
            {path: 'heroes', component: HeroListComponent},
          ]),
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      }
    )
  );
});

```

--------------------------------

### Angular Expression Context Example

Source: https://angular.dev/guide/templates/expression-syntax

Illustrates how Angular expressions are evaluated within the component class context. 'this' is implied when referencing class members, but explicit use is recommended when template variables shadow class members, such as in @let declarations.

```html
<div *ngIf="this.myCondition">...</div>
<button (click)="this.save()">Save</button>
```

--------------------------------

### WelcomeComponent Unit Tests with TestBed and MockUserService

Source: https://angular.dev/guide/testing/components-scenarios

Unit tests for WelcomeComponent using Angular's TestBed. It demonstrates setting up the testing module, providing a mock UserService, and asserting the component's behavior based on different user states.

```typescript
import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {UserService} from '../model/user.service';
import {WelcomeComponent} from './welcome.component';

class MockUserService {
  isLoggedIn = true;
  user = {name: 'Test User'};
}

describe('WelcomeComponent', () => {
  let comp: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let componentUserService: UserService; // the actually injected service
  let userService: UserService; // the TestBed injected service
  let el: HTMLElement; // the DOM element with the welcome message

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    fixture.autoDetectChanges();
    comp = fixture.componentInstance;

    // UserService actually injected into the component
    userService = fixture.debugElement.injector.get(UserService);
    componentUserService = userService;

    // UserService from the root injector
    userService = TestBed.inject(UserService);

    // get the "welcome" element by CSS selector (e.g., by class name)
    el = fixture.nativeElement.querySelector('.welcome');
  });

  it('should welcome the user', async () => {
    await fixture.whenStable();
    const content = el.textContent;
    expect(content).withContext('"Welcome ..."').toContain('Welcome');
    expect(content).withContext('expected name').toContain('Test User');
  });

  it('should welcome "Bubba"', async () => {
    userService.user.set({name: 'Bubba'});
    // welcome message hasn't been shown yet
    await fixture.whenStable();
    expect(el.textContent).toContain('Bubba');
  });

  it('should request login if not logged in', async () => {
    userService.isLoggedIn.set(false);
    // welcome message hasn't been shown yet
    await fixture.whenStable();
    const content = el.textContent;
    expect(content).withContext('not welcomed').not.toContain('Welcome');
    expect(content)
      .withContext('"log in"')
      .toMatch(/log in/i);
  });

  it("should inject the component's UserService instance", inject([UserService], (service: UserService) => {
    expect(service).toBe(componentUserService);
  }));

  it('TestBed and Component UserService should be the same', () => {
    expect(userService).toBe(componentUserService);
  });
});

```

--------------------------------

### Angular Banner Component Initial CLI Test

Source: https://angular.dev/guide/testing/components-basics

This snippet shows the initial test setup for an Angular Banner Component generated by the CLI. It includes basic component creation and assertion.

```typescript
import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BannerComponent} from './banner-initial.component';

describe('BannerComponent (initial CLI generated)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BannerComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
```

--------------------------------

### Define User Profile Route with Parameter in Angular

Source: https://angular.dev/guide/routing/define-routes

This example shows how to define a route that accepts a user ID parameter from the URL. The `UserProfile` component will be rendered, and it can access the `id` parameter for fetching data. Route parameter names must start with a letter and can contain letters, numbers, underscores, and hyphens.

```typescript
import { Routes } from '@angular/router';
import { UserProfile } from './user-profile/user-profile';

const routes: Routes = [
  { path: 'user/:id', component: UserProfile }
];
```

--------------------------------

### Setup Shared Module for Angular Testing

Source: https://angular.dev/guide/testing/pipes

Configures the testing module for shared Angular components. It imports HeroDetailComponent and other shared imports, and sets up routing and HTTP providers. This setup is useful for testing components that rely on shared modules and services.

```typescript
function sharedModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig,
        {
          imports: [HeroDetailComponent, sharedImports],
          providers: [
            provideRouter([{path: 'heroes/:id', component: HeroDetailComponent}]),
            provideHttpClient(),
            provideHttpClientTesting()
          ]
        }
      )
    );
  });

  it("should display 1st hero's name", async () => {
    const expectedHero = firstHero;
    await createComponent(expectedHero.id).then(() => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });
  });
}
```

--------------------------------

### Displaying Nested Routes Content in Angular Component

Source: https://angular.dev/guide/routing/define-routes

Provides an example of how to render nested route content within a parent component using the `<router-outlet>` tag. This setup enables dynamic display of child route components within the parent's template.

```html
<p>Product {{ id }}</p>

<router-outlet></router-outlet>
```

--------------------------------

### Angular Router Basic View Transitions Setup

Source: https://angular.dev/guide/routing/route-transition-animations

Sets up Angular Router with view transitions enabled using `withViewTransitions` for smoother route changes. This is the foundational configuration for enabling animated transitions between views.

```typescript
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';

bootstrapApplication(MyApp, {
  providers: [
    provideRouter(routes, withViewTransitions()),
  ]
});
```

```typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableViewTransitions: true })
  ]
})
export class AppRouting {}
```

--------------------------------

### Setup TestBed for HTTP Client Testing in Angular

Source: https://angular.dev/guide/http/testing

Configures the Angular `TestBed` to use a testing backend for `HttpClient`. It includes `provideHttpClient()` and `provideHttpClientTesting()` to enable request interception and response mocking. `HttpTestingController` is injected for test interactions. Ensure `provideHttpClient()` is provided before `provideHttpClientTesting()` to avoid test disruptions.

```typescript
import { TestBed } from '@angular/core/testing';
import { provideHttpClient, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';

// ... inside your test suite
TestBed.configureTestingModule({
  providers: [
    // ... other test providers
    provideHttpClient(),
    provideHttpClientTesting(),
  ],
});
const httpTesting = TestBed.inject(HttpTestingController);
```

--------------------------------

### Example Test Using MyButtonComponent Harness

Source: https://angular.dev/guide/testing/component-harnesses-overview

This snippet demonstrates how a test author can use a component harness to interact with a 'MyButtonComponent'. It shows how to retrieve the harness instance and assert the button's text content, abstracting away the underlying DOM structure.

```typescript
it('should load button with exact text', async () => {
  const button = await loader.getHarness(MyButtonComponentHarness);
  expect(await button.getText()).toBe('Confirm');
});
```

--------------------------------

### Create a New Angular Project with SSR

Source: https://angular.dev/guide/hybrid-rendering

Initialize a new Angular project with server-side rendering enabled, setting up a foundation for hybrid rendering.

```bash
ng new --ssr
```

--------------------------------

### Test Angular Service with Jasmine and TestBed

Source: https://angular.dev/guide/testing/services

Demonstrates testing an Angular service (ValueService) using Jasmine and Angular's TestBed. It sets up the testing module, injects the service, and verifies its methods and asynchronous return values. Includes examples for promises and observables.

```typescript
import { TestBed } from '@angular/core/testing';
import { ValueService } from './demo';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ValueService] });
    service = TestBed.inject(ValueService);
  });

  it('should use ValueService', () => {
    expect(service.getValue()).toBe('real value');
  });

  it('test should wait for ValueService.getPromiseValue', waitForAsync(() => {
    service.getPromiseValue().then((value) => expect(value).toBe('promise value'));
  }));

  it('test should wait for ValueService.getObservableValue', waitForAsync(() => {
    service.getObservableValue().subscribe((value) => expect(value).toBe('observable value'));
  }));

  it('test should wait for ValueService.getObservableDelayValue', (done: DoneFn) => {
    service.getObservableDelayValue().subscribe((value) => {
      expect(value).toBe('observable delay value');
      done();
    });
  });
});

export class NotProvided extends ValueService { /* example below */ }

describe('ValueService (with NotProvided)', () => {
  it('can inject a default value when service is not provided', () => {
    expect(TestBed.inject(NotProvided, null)).toBeNull();
  });
});

describe('ValueService (with fakeAsync)', () => {
  it('should allow the use of fakeAsync', fakeAsync(() => {
    let value;
    // ... fakeAsync logic here
  }));
});

```

--------------------------------

### Forms Module Setup with Hero Detail

Source: https://angular.dev/guide/testing/components-scenarios

Configures the testing module to include FormsModule for data binding, HeroDetailComponent, and the TitleCasePipe. It sets up HTTP clients and routing for the hero detail view, then tests the display of the first hero's name.

```typescript
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '../shared/title-case.pipe';
import { appConfig } from '../app.config';

function formsModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig,
        {
          imports: [FormsModule, HeroDetailComponent, TitleCasePipe],
          providers: [
            provideHttpClient(),
            provideHttpClientTesting(),
            provideRouter([{ path: 'heroes/:id', component: HeroDetailComponent }]),
          ],
        }
      )
    );
  });

  it("should display 1st hero's name", async () => {
    const expectedHero = firstHero;
    await createComponent(expectedHero.id).then(() => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });
  });
}

```

--------------------------------

### Install Playwright Browser Provider for Vitest

Source: https://angular.dev/guide/testing

Installs Playwright and its Vitest browser integration as development dependencies using npm. This enables running Vitest tests in a Chromium browser.

```bash
npm install --save-dev @vitest/browser-playwright playwright
```

--------------------------------

### Angular HttpResponse Constructor Example

Source: https://angular.dev/guide/http/interceptors

Demonstrates the basic instantiation of an Angular HttpResponse object, typically used when creating mock responses or within testing scenarios. It shows how to provide a response body during construction.

```typescript
const resp = new HttpResponse({ body: 'response body' });
```

--------------------------------

### GET Request with Request Headers

Source: https://angular.dev/guide/http/making-requests

Illustrates how to add custom headers to a GET request using either an object literal or HttpHeaders.

```APIDOC
## GET /api/config with Request Headers

### Description
Retrieves configuration data with custom headers for debugging or authentication. Headers can be set using an object literal or the `HttpHeaders` class.

### Method
GET

### Endpoint
/api/config

#### Parameters

#### Query Parameters
None

#### Request Headers
- **X-Debug-Level** (string) - Optional - Specifies the debug level for the request.

### Request Example (Object Literal)
```javascript
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

getConfigWithHeaders(debugLevel: string) {
  this.http.get('/api/config', {
    headers: { 'X-Debug-Level': debugLevel } 
  }).subscribe(config => {
    console.log('Config:', config);
  });
}
```

### Request Example (HttpHeaders)
```javascript
import { HttpClient, HttpHeaders } from '@angular/common/http';

constructor(private http: HttpClient) {}

getConfigWithHttpHeaders(debugLevel: string) {
  const baseHeaders = new HttpHeaders().set('X-Debug-Level', 'minimal');
  const headers = baseHeaders.set('X-Debug-Level', debugLevel);
  
  this.http.get('/api/config', {
    headers: headers
  }).subscribe(config => {
    console.log('Config:', config);
  });
}
```

### Response
#### Success Response (200)
- **config** (any) - The configuration data.

#### Response Example
```json
{
  "setting1": "value1",
  "setting2": "value2"
}
```
```

--------------------------------

### Hero Module Setup and Routing

Source: https://angular.dev/guide/testing/components-scenarios

Configures the testing module for hero-related components, including HeroDetailComponent and HeroListComponent. It sets up routing for hero details and lists, provides HttpClient and HttpClientTesting for API interactions, and tests navigation and data saving scenarios.

```typescript
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpTestingController } from '@angular/common/http/testing';
import { Hero } from '../model/hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroListComponent } from './hero-list.component';
import { appConfig } from '../app.config';
import { getTestHeroes } from '../model/testing/test-hero.service';
import { createComponent, Page } from './testing/hero-detail.component.spec'; // Assuming createComponent and Page are exported from here
import { click } from './testing/hero-detail.component.spec'; // Assuming click is exported from here
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

const firstHero = getTestHeroes()[0];

function heroModuleSetup() {
  beforeEach(async () => {
    // Configure the testing module with application configuration and specific imports/providers
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [HeroDetailComponent, HeroListComponent], // Import relevant components
        providers: [
          provideRouter([
            { path: 'heroes/:id', component: HeroDetailComponent },
            { path: 'heroes', component: HeroListComponent },
          ]), // Configure routing
          provideHttpClient(), // Provide HttpClient
          provideHttpClientTesting(), // Provide HttpClient testing support
        ],
      }),
    );
  });

  describe('when navigate to existing hero', () => {
    let expectedHero: Hero;
    beforeEach(async () => {
      expectedHero = firstHero;
      await createComponent(expectedHero.id); // Create component instance for the hero
    });

    it("should display that hero's name", () => {
      // Verify that the displayed name matches the expected hero's name
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });

    it('should navigate when click cancel', () => {
      click(page.cancelBtn); // Simulate clicking the cancel button
      // Verify that the router navigates to the hero detail URL (unchanged)
      expect(TestBed.inject(Router).url).toEqual(`/heroes/${expectedHero.id}`);
    });

    it('should save when click save but not navigate immediately', () => {
      click(page.saveBtn); // Simulate clicking the save button
      // Expect an HTTP PUT request to the heroes API
      expect(TestBed.inject(HttpTestingController).expectOne({ method: 'PUT', url: 'api/heroes' }));
      // Verify that the router URL is updated to the hero's ID
      expect(TestBed.inject(Router).url).toEqual('/heroes/41');
    });

    it('should navigate when click save and save resolves', fakeAsync(() => {
      click(page.saveBtn); // Simulate clicking the save button
      tick(); // Advance timers to simulate async save completion
      // Verify that the router navigates to the hero's ID after the save operation resolves
      expect(TestBed.inject(Router).url).toEqual('/heroes/41');
    }));

    it('should convert hero name to Title Case', async () => {
      harness.fixture.autoDetectChanges(); // Ensure changes are detected
      const hostElement: HTMLElement = harness.routeNativeElement!;
      const nameInput: HTMLInputElement = hostElement.querySelector('input')!;
      const nameDisplay: HTMLElement = hostElement.querySelector('span')!;

      nameInput.value = 'quick BROWN fOx';
      nameInput.dispatchEvent(new Event('input')); // Dispatch input event

      await harness.fixture.whenStable(); // Wait for Angular's stable state
      // Verify that the name displayed is converted to Title Case
      expect(nameDisplay.textContent).toBe('Quick Brown Fox');
    });
  });

  describe('when navigate to non-existent hero id', () => {
    beforeEach(async () => {
      await createComponent(999); // Attempt to create a component for a non-existent hero ID
    });

    it('should try to navigate back to hero list', () => {
      // Verify that the router navigates back to the heroes list
      expect(TestBed.inject(Router).url).toEqual('/heroes');
    });
  });
}

// Placeholder for harness and Page object (assuming these are defined elsewhere)
let harness: any; // Mock harness
class Page {
  get nameDisplay(): HTMLElement { return document.createElement('span'); }
  get nameInput(): HTMLInputElement { return document.createElement('input'); }
  get saveBtn(): HTMLElement { return document.createElement('button'); }
  get cancelBtn(): HTMLElement { return document.createElement('button'); }
}

```

--------------------------------

### Angular TestBed Configuration and Component Testing

Source: https://angular.dev/guide/testing/components-scenarios

Configures the Angular testing module with necessary components, routes, and HTTP testing utilities. Includes an example test case to verify the display of a hero's name by creating the component and asserting its content.

```typescript
const { TestBed } = require('@angular/core/testing');
const { provideRouter } = require('@angular/router');
const { provideHttpClient, withInterceptors } = require('@angular/common/http');
const { provideHttpClientTesting } = require('@angular/common/http/testing');
const { HeroDetailComponent } = require('./hero-detail.component');
const { firstHero, getTestHeroes } = require('../model/testing');
const { RouterTestingHarness } = require('@angular/router/testing');


// Mock appConfig if not defined elsewhere
const appConfig = {
  imports: [],
  providers: []
};

// Mock sharedImports if not defined elsewhere
const sharedImports = [];


// Mock Page class if not defined elsewhere
class Page {
  // Mock properties and methods
  get buttons() { return []; }
  get saveBtn() { return null; }
  get cancelBtn() { return null; }
  get nameDisplay() { return { textContent: '' }; }
  get nameInput() { return null; }
  query(selector) { return null; }
  queryAll(selector) { return []; }
}

// Mock harness if not defined elsewhere
let harness;
let component;
let page;

describe('HeroDetailComponent Tests', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule( Object.assign({}, appConfig, {
      imports: [HeroDetailComponent, sharedImports],
      providers: [
        provideRouter([{ path: 'heroes/:id', component: HeroDetailComponent }]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }) );
  });

  it('should display 1st hero\'s name', async () => {
    const expectedHero = firstHero;
    await createComponent(expectedHero.id).then(() => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });
  });
});

/////////// Helpers //////
/** Create the HeroDetailComponent, initialize it, set test variables */
async function createComponent(id) {
  harness = await RouterTestingHarness.create();
  component = await harness.navigateByUrl(`/heroes/${id}`, HeroDetailComponent);
  page = new Page();
  const request = TestBed.inject(HttpTestingController).expectOne(`api/heroes/?id=${id}`);
  const hero = getTestHeroes().find((h) => h.id === Number(id));
  request.flush(hero ? [hero] : []);
  harness.detectChanges();
  return page; // Return page object for chaining
}

// Mock Page class implementation
class Page {
  // getter properties wait to query the DOM until called.
  get buttons() {
    return this.queryAll('button');
  }
  get saveBtn() {
    return this.buttons[0];
  }
  get cancelBtn() {
    return this.buttons[1];
  }
  get nameDisplay() {
    return this.query('span');
  }
  get nameInput() {
    return this.query('input');
  }

  //// query helpers ////
  private query(selector) {
    return harness.routeNativeElement.querySelector(selector);
  }
  private queryAll(selector) {
    return harness.routeNativeElement.querySelectorAll(selector);
  }
}

// Mock getTestHeroes and firstHero if not defined elsewhere
function getTestHeroes() {
  return [{ id: 1, name: 'Test Hero' }];
}
const firstHero = { id: 1, name: 'Test Hero' };

```

--------------------------------

### Get Slider Value using MatSliderHarness (TypeScript)

Source: https://angular.dev/guide/testing/using-component-harnesses

This example demonstrates how to use the MatSliderHarness to retrieve the value of the slider's end thumb. It assumes the existence of a 'loader' object and the MatSliderHarness. The function returns a Promise resolving to the slider's thumb value.

```TypeScript
it('should get value of slider thumb', async () => {
  const slider = await loader.getHarness(MatSliderHarness);
  const thumb = await slider.getEndThumb();
  expect(await thumb.getValue()).toBe(50);
});
```

--------------------------------

### Angular Component Testing Setup with Jasmine Spy

Source: https://angular.dev/guide/testing/components-scenarios

This snippet demonstrates setting up an Angular testing module and mocking the TwainService using a Jasmine spy. It configures providers, creates a fake service, spies on its getQuote method, and initializes the component fixture for testing.

```typescript
import {fakeAsync, ComponentFixture, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {asyncData, asyncError} from '../../testing';
import {Subject, defer, of, throwError} from 'rxjs';
import {last} from 'rxjs/operators';
import {TwainComponent} from './twain.component';
import {TwainService} from './twain.service';

describe('TwainComponent', () => {
  let component: TwainComponent;
  let fixture: ComponentFixture;
  let getQuoteSpy: jasmine.Spy;
  let quoteEl: HTMLElement;
  let testQuote: string;

  // Helper function to get the error message element value
  // An *ngIf keeps it out of the DOM until there is an error
  const errorMessage = () => {
    const el = fixture.nativeElement.querySelector('.error');
    return el ? el.textContent : null;
  };

  beforeEach(() => {
    // ... TestBed.configureTestingModule({ providers: [TwainService] });
    testQuote = 'Test Quote';
    // Create a fake TwainService object with a `getQuote()` spy
    const twainService = TestBed.inject(TwainService);
    // Make the spy return a synchronous Observable with the test data
    getQuoteSpy = spyOn(twainService, 'getQuote').and.returnValue(of(testQuote));

    fixture = TestBed.createComponent(TwainComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
    quoteEl = fixture.nativeElement.querySelector('.twain');
  });

  // ... rest of the tests
```

--------------------------------

### Test HeroModule Setup for HeroDetailComponent in Angular

Source: https://angular.dev/guide/testing/components-scenarios

This snippet configures the testing module for `HeroDetailComponent` using `TestBed.configureTestingModule`. It includes `HeroDetailComponent` and `HeroListComponent` in `imports` and sets up routing with `provideRouter`. `provideHttpClient` and `provideHttpClientTesting` are included for mocking HTTP requests. The tests cover navigation and saving hero data.

```typescript
import {getTestHeroes} from '../model/testing/test-hero.service';

const firstHero = getTestHeroes()[0];

function heroModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [HeroDetailComponent, HeroListComponent],
        providers: [
          provideRouter([
            {path: 'heroes/:id', component: HeroDetailComponent},
            {path: 'heroes', component: HeroListComponent},
          ]),
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      })
    );
  });

  describe('when navigate to existing hero', () => {
    let expectedHero: Hero;
    beforeEach(async () => {
      expectedHero = firstHero;
      await createComponent(expectedHero.id);
    });

    it("should display that hero's name", () => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });

    it('should navigate when click cancel', () => {
      click(page.cancelBtn);
      expect(TestBed.inject(Router).url).toEqual(`/heroes/${expectedHero.id}`);
    });

    it('should save when click save but not navigate immediately', () => {
      click(page.saveBtn);
      expect(TestBed.inject(HttpTestingController).expectOne({method: 'PUT', url: 'api/heroes'}));
      expect(TestBed.inject(Router).url).toEqual('/heroes/41');
    });

    it('should navigate when click save and save resolves', fakeAsync(() => {
      click(page.saveBtn);
      tick(); // wait for async save to complete
      expect(TestBed.inject(Router).url).toEqual('/heroes/41');
    }));

    it('should convert hero name to Title Case', async () => {
      harness.fixture.autoDetectChanges(); // get the name's
    });
  });
}

```

--------------------------------

### Angular HashLocationStrategy URL Example

Source: https://angular.dev/guide/routing/common-router-tasks

Demonstrates a URL using the HashLocationStrategy, which utilizes the URL hash ('#') to manage client-side routing, particularly for older browsers or specific server configurations.

```text
localhost:3002/src/#/crisis-center
```

--------------------------------

### Type Directive Context with `ngTemplateContextGuard` (TypeScript)

Source: https://angular.dev/guide/directives/structural-directives

This example demonstrates how to correctly type the context of a structural directive's template using `ngTemplateContextGuard`. It uses the directive's generic type `T` to infer the type of `$implicit` within the template context, ensuring type safety for generic directives.

```typescript
export interface SelectTemplateContext<T> {
  $implicit: T;
}

@Directive<{
  // The directive's generic type `T` will be inferred from the `DataSource` type
  // passed to the input.
  T: 
}>({ 
  selector: '[[selectFrom]]',
  standalone: true
})
export class SelectDirective<T> {
  selectFrom = input.required<DataSource<T>>();

  static ngTemplateContextGuard<T>(dir: SelectDirective<T>, ctx: any): ctx is SelectTemplateContext<T> {
    // As before the guard body is not used at runtime, and included only to avoid
    // TypeScript errors.
    return true;
  }
}
```

--------------------------------

### Angular Forms Module Setup for Hero Detail

Source: https://angular.dev/guide/testing/components-scenarios

Configures the testing module to include FormsModule for data binding and the TitleCasePipe for formatting. It then tests displaying the first hero's name using the configured module.

```typescript
import {FormsModule} from '@angular/forms';
import {TitleCasePipe} from '../shared/title-case.pipe';
import {appConfig} from '../app.config';

function formsModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [FormsModule, HeroDetailComponent, TitleCasePipe],
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          provideRouter([{path: 'heroes/:id', component: HeroDetailComponent}]),
        ],
      })
    );
  });

  it("should display 1st hero's name", async () => {
    const expectedHero = firstHero;
    await createComponent(expectedHero.id).then(() => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });
  });
}

```

--------------------------------

### Providing Different Service Implementations Conditionally

Source: https://angular.dev/guide/di/dependency-injection-providers

This example shows how to conditionally provide a service implementation based on an environment variable. It uses `useClass` to select between `CloudStorageService` and `LocalStorageService` for `StorageService`.

```typescript
import { environment } from './environment';

providers: [
  {
    provide: StorageService,
    useClass: environment.production ? CloudStorageService : LocalStorageService
  }
]
```

--------------------------------

### Integrate Server Routes with Server Rendering (TypeScript)

Source: https://angular.dev/guide/prerendering

Example of integrating the server route configuration into the Angular application's server configuration using `provideServerRendering` and `withRoutes`. This applies the defined rendering strategies.

```typescript
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';
import { ApplicationConfig } from '@angular/core';

// app.config.server.ts
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    // ... other providers ...
  ],
};
```

--------------------------------

### Example Custom Image Loader Function with loaderParams

Source: https://angular.dev/guide/image-optimization

An example of a custom image loader function that utilizes the `loaderParams` to control advanced CDN features, such as rounded corners. The function constructs a URL with query parameters based on image source, width, and provided loader parameters.

```typescript
import { ImageLoaderConfig } from '@angular/common';

const myCustomLoader = (config: ImageLoaderConfig) => {
  let url = `https://example.com/images/${config.src}?`;
  let queryParams = [];

  if (config.width) {
    queryParams.push(`w=${config.width}`);
  }

  if (config.loaderParams?.roundedCorners) {
    queryParams.push('mask=corners&corner-radius=5');
  }

  return url + queryParams.join('&');
};

```

--------------------------------

### Angular Hero Module Setup and Integration Tests

Source: https://angular.dev/guide/testing/components-scenarios

Sets up the testing module for hero features, including navigation and HTTP interactions. It then runs integration tests for navigating to existing heroes, saving changes, and handling non-existent hero IDs.

```typescript
import {getTestHeroes} from '../model/testing/test-hero.service';
const firstHero = getTestHeroes()[0];

function heroModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [HeroDetailComponent, HeroListComponent],
        providers: [
          provideRouter([
            {path: 'heroes/:id', component: HeroDetailComponent},
            {path: 'heroes', component: HeroListComponent},
          ]),
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      })
    );
  });

  describe('when navigate to existing hero', () => {
    let expectedHero: Hero;

    beforeEach(async () => {
      expectedHero = firstHero;
      await createComponent(expectedHero.id);
    });

    it("should display that hero's name", () => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });

    it('should navigate when click cancel', () => {
      click(page.cancelBtn);
      expect(TestBed.inject(Router).url).toEqual(`/heroes/${expectedHero.id}`);
    });

    it('should save when click save but not navigate immediately', () => {
      click(page.saveBtn);
      expect(TestBed.inject(HttpTestingController).expectOne({method: 'PUT', url: 'api/heroes'}));
      expect(TestBed.inject(Router).url).toEqual('/heroes/41');
    });

    it('should navigate when click save and save resolves', fakeAsync(() => {
      click(page.saveBtn);
      tick(); // wait for async save to complete
      expect(TestBed.inject(Router).url).toEqual('/heroes/41');
    }));

    it('should convert hero name to Title Case', async () => {
      // ...
      harness.fixture.autoDetectChanges();
      // get the name's input and display elements from the DOM
      const hostElement: HTMLElement = harness.routeNativeElement!;
      const nameInput: HTMLInputElement = hostElement.querySelector('input')!;
      const nameDisplay: HTMLElement = hostElement.querySelector('span')!;

      // simulate user entering a new name into the input box
      nameInput.value = 'quick BROWN fOx';
      // Dispatch a DOM event so that Angular learns of input value change.
      nameInput.dispatchEvent(new Event('input'));

      // Wait for Angular to update the display binding through the title pipe
      await harness.fixture.whenStable();

      expect(nameDisplay.textContent).toBe('Quick Brown Fox');
    });
  });

  describe('when navigate to non-existent hero id', () => {
    beforeEach(async () => {
      await createComponent(999);
    });

    it('should try to navigate back to hero list', () => {
      expect(TestBed.inject(Router).url).toEqual('/heroes');
    });
  });
}

```

--------------------------------

### Hero Module Setup for Angular Testing

Source: https://angular.dev/guide/testing/components-scenarios

Configures the testing module for the Hero feature, including routing, components, and HTTP testing. It sets up the environment to test hero-related functionalities and navigation within the application. Dependencies include TestBed, Router, HttpClient, and Hero components.

```typescript
import {getTestHeroes} from '../model/testing/test-hero.service';
const firstHero = getTestHeroes()[0];
function heroModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      Object.assign({}, appConfig, {
        imports: [HeroDetailComponent, HeroListComponent],
        providers: [
          provideRouter([
            {path: 'heroes/:id', component: HeroDetailComponent},
            {path: 'heroes', component: HeroListComponent},
          ]),
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      }),
    });
  });
  // ... describe blocks for tests
```

--------------------------------

### Adding Preconnect Resource Hint (HTML)

Source: https://angular.dev/guide/image-optimization

This snippet illustrates how to manually add a `preconnect` resource hint to your `index.html` file. This is crucial for ensuring that the Largest Contentful Paint (LCP) image loads as quickly as possible by establishing an early connection to the image origin.

```html
<head>
  <link rel="preconnect" href="https://your-image-domain.com" />
</head>

```

--------------------------------

### Angular HeroDetailComponent HTTP and Router Testing Setup

Source: https://angular.dev/guide/testing/components-scenarios

Sets up testing for HeroDetailComponent with mocked HTTP client and router services. It includes providers for `HttpClientTestingModule`, `RouterTestingModule`, and custom spies for `HeroDetailService` to control its behavior during tests.

```typescript
import {HttpClient, HttpHandler, provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {provideRouter, Router} from '@angular/router';
import {RouterTestingHarness} from '@angular/router/testing';
import {asyncData, click} from '../../testing'; // Assuming asyncData and click are utility functions
import {Hero} from '../model/hero';
import {sharedImports} from '../shared/shared'; // Assuming sharedImports are defined elsewhere
import {HeroDetailComponent} from './hero-detail.component';
import {HeroDetailService} from './hero-detail.service';
import {HeroListComponent} from './hero-list.component';

////// Testing Vars //////
let component: HeroDetailComponent;
let harness: RouterTestingHarness;
let page: Page; // Assuming 'Page' is a Page Object model

////// Tests //////
describe('HeroDetailComponent', () => {
  describe('with HeroModule setup', heroModuleSetup); // Placeholder for other test suites
  describe('when override its provided HeroDetailService', overrideSetup);
  describe('with FormsModule setup', formsModuleSetup); // Placeholder for other test suites
  describe('with SharedModule setup', sharedModuleSetup); // Placeholder for other test suites
});

///////////////////
const testHero = getTestHeroes()[0]; // Assuming getTestHeroes() is defined elsewhere

function overrideSetup() {
  class HeroDetailServiceSpy {
    testHero: Hero = {...testHero}; // emit cloned test hero
    getHero = jasmine
      .createSpy('getHero')
      .and.callFake(() => asyncData(Object.assign({}, this.testHero))); // emit clone of test hero
    saveHero = jasmine
      .createSpy('saveHero')
      .and.callFake((hero: Hero) => asyncData(Object.assign(this.testHero, hero))); // emit clone of test hero, with changes merged in
  }

  beforeEach(async () => { // Setup for tests within this describe block
    // ... other test setup code ...
  });
}

```

--------------------------------

### Angular BannerComponent Tests (CLI Generated)

Source: https://angular.dev/guide/testing/components-basics

Demonstrates the initial test structure generated by the Angular CLI for the BannerComponent. It includes setup using TestBed and waitForAsync, and a basic 'should create' assertion.

```typescript
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {BannerComponent} from './banner-initial.component';

describe('BannerComponent (initial CLI generated)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BannerComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
```

--------------------------------

### Advanced NgOptimizedImage 'sizes' Attribute Usage

Source: https://angular.dev/guide/image-optimization

Shows an example of using the 'sizes' attribute with media query syntax to define image dimensions based on screen width. This is useful for responsive layouts.

```html
<img [src]="'path/to/image.jpg'" 
     alt="My Image"
     width="800"
     height="600"
     [sizes]="'(min-width: 768px) 50vw, 100vw'">

```

--------------------------------

### Actor Form Component Setup (TypeScript)

Source: https://angular.dev/guide/forms/template-driven-forms

Sets up the Angular component for the actor form. It includes initializing form data, defining available skills, and handling form submission and reset logic. It imports FormsModule and JsonPipe for form handling and data display.

```typescript
import { Component } from '@angular/core';
import { Actor } from '../actor';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  imports: [FormsModule, JsonPipe],
})
export class ActorFormComponent {
  skills = ['Method Acting', 'Singing', 'Dancing', 'Swordfighting'];
  model = new Actor(18, 'Tom Cruise', this.skills[3], 'CW Productions');
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  newActor() {
    this.model = new Actor(42, '', '');
  }

  heroine(): Actor {
    const myActress = new Actor(42, 'Marilyn Monroe', 'Singing');
    console.log('My actress is called ' + myActress.name);
    return myActress;
  }

  // Helper to inspect form controls (not shown in main documentation)
  showFormControls(form: any) {
    return form && form.controls.name && form.controls.name.value;
  }
}
```

--------------------------------

### Provide Server Rendering Configuration (TypeScript)

Source: https://angular.dev/guide/hybrid-rendering

Configures the Angular application to use server rendering with custom server routes, integrating the hybrid rendering setup.

```typescript
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';

// app.config.server.ts
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    // ... other providers ...
  ],
};
```

--------------------------------

### Keep Lifecycle Methods Simple (TypeScript)

Source: https://next.angular.dev/style-guide

This example contrasts a preferred approach of keeping Angular lifecycle methods concise by delegating complex logic to separate, well-named methods, versus an an anti-pattern of packing extensive logic directly into lifecycle hooks.

```typescript
// PREFER
ngOnInit(): void {
  this.startLogging();
  this.runBackgroundTask();
}

startLogging(): void { /* ... */ }
runBackgroundTask(): void { /* ... */ }

// AVOID
ngOnInit(): void {
  this.logger.setMode('info');
  this.logger.monitorErrors();
  // ... and all the rest of the code that would be unrolled from these methods.
}
```

--------------------------------

### Hero Detail Component Testing Setup

Source: https://angular.dev/guide/testing/components-scenarios

Sets up the testing environment for the HeroDetailComponent using RouterTestingHarness. It configures dependencies like HeroDetailServiceSpy and simulates navigation to a specific hero route. The tests verify interactions with the service and component, including data retrieval, display, and saving.

```typescript
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroDetailService } from './hero-detail.service';
import { HeroDetailServiceSpy } from './hero-detail.service.spy';
import { Page } from './page.po';
import { appConfig } from './app.config';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Routes } from '@angular/router';

const testHero: Hero = {
  id: 42,
  name: 'Test Hero',
};

const routes: Routes = [
  { path: 'heroes', component: AppComponent }, // Placeholder for component
  { path: 'heroes/:id', component: HeroDetailComponent },
];

let harness: RouterTestingHarness;
let component: HeroDetailComponent;
let page: Page;

describe('HeroDetailComponent', () => {
  beforeEach(async () => {
    // Configure TestBed with necessary providers and components
    await TestBed.configureTestingModule({
      imports: [HeroDetailComponent, AppComponent], // Include necessary components
      providers: [
        provideRouter(routes), // Configure routing
        provideHttpClient(withInterceptorsFromDi()), // Provide HttpClient
        provideHttpClientTesting(), // Provide HttpClient testing support
        { provide: HeroDetailService, useValue: {} } // Mock HeroDetailService
      ]
    })
    // Override HeroDetailComponent to use a spy for HeroDetailService
    .overrideComponent(HeroDetailComponent, {
      set: {
        providers: [
          { provide: HeroDetailService, useClass: HeroDetailServiceSpy } 
        ]
      }
    });
  });

  let hdsSpy: HeroDetailServiceSpy;
  beforeEach(async () => {
    harness = await RouterTestingHarness.create();
    // Navigate to a specific hero detail route
    component = await harness.navigateByUrl(`/heroes/${testHero.id}`, HeroDetailComponent);
    page = new Page(); // Instantiate Page object for DOM interaction
    // Get the injected HeroDetailServiceSpy from the component's injector
    hdsSpy = harness.routeDebugElement!.injector.get(HeroDetailService) as any;
    harness.detectChanges(); // Detect changes in the component
  });

  it('should have called `getHero`', () => {
    // Verify that the getHero method of the spy was called exactly once
    expect(hdsSpy.getHero.calls.count())
      .withContext('getHero called once')
      .toBe(1, 'getHero called once');
  });

  it("should display stub hero's name", () => {
    // Check if the displayed name matches the hero's name from the spy
    expect(page.nameDisplay.textContent).toBe(hdsSpy.testHero.name);
  });

  it('should save stub hero change', fakeAsync(() => {
    const origName = hdsSpy.testHero.name;
    const newName = 'New Name';
    page.nameInput.value = newName;
    page.nameInput.dispatchEvent(new Event('input')); // Notify Angular of the input change

    // Verify component's hero name is updated immediately
    expect(component.hero.name).withContext('component hero has new name').toBe(newName);
    // Verify service hero is unchanged before save
    expect(hdsSpy.testHero.name).withContext('service hero unchanged before save').toBe(origName);

    click(page.saveBtn); // Simulate clicking the save button
    expect(hdsSpy.saveHero.calls.count()).withContext('saveHero called once').toBe(1);
    tick(); // Simulate the passage of time for async operations

    // Verify service hero is updated after save and navigation to /heroes
    expect(hdsSpy.testHero.name).withContext('service hero has new name after save').toBe(newName);
    expect(TestBed.inject(Router).url).toEqual('/heroes');
  }));
});

// Helper function to simulate button clicks
function click(el: HTMLElement) {
  el.click();
}

// Placeholder for Page object and its properties (assuming these are defined elsewhere)
class Page {
  get nameInput(): HTMLInputElement { return document.createElement('input'); } // Mock implementation
  get nameDisplay(): HTMLElement { return document.createElement('span'); } // Mock implementation
  get saveBtn(): HTMLElement { return document.createElement('button'); } // Mock implementation
  get cancelBtn(): HTMLElement { return document.createElement('button'); } // Mock implementation
}

```

--------------------------------

### Compose Directive Behaviors in Angular

Source: https://angular.dev/guide/directives/directive-composition-api

This example demonstrates composing directive behaviors in Angular by adding 'hostDirectives' to another directive. 'MenuWithTooltip' composes 'Menu' and 'Tooltip' directives, and this composition is then applied to 'SpecializedMenuWithTooltip'.

```typescript
@Directive({})
export class Menu { }

@Directive({})
export class Tooltip { }

@Directive({
  hostDirectives: [Menu, Tooltip],
})
export class MenuWithTooltip { }

@Component({
  selector: 'specialized-menu-with-tooltip',
  template: '...',
  hostDirectives: [MenuWithTooltip],
})
export class SpecializedMenuWithTooltip { }
```

--------------------------------

### Full Provider Configuration for a Service

Source: https://angular.dev/guide/di/dependency-injection-providers

This example illustrates the full provider configuration object in Angular, explicitly defining the `provide` property and its corresponding value using `useClass`. This is equivalent to the shorthand `providers: [LocalService]`.

```typescript
providers: [
  {
    provide: LocalService,
    useClass: LocalService
  }
]
```

--------------------------------

### Angular Service Injection Example with HttpClient

Source: https://angular.dev/guide/di/dependency-injection

Demonstrates injecting Angular's `HttpClient` into a service (`MyService`) using the `inject()` function. This pattern is common for making HTTP requests within services.

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  // ✅ In a service
  private http = inject(HttpClient);
}
```

--------------------------------

### Providing an Alias to an Existing Provider

Source: https://angular.dev/guide/di/dependency-injection-providers

This example demonstrates using `useExisting` to create an alias for an existing provider. This is useful for providing an alternative token that resolves to the same underlying service instance.

```typescript
import { Logger } from './logger';

providers: [
  Logger, // Primary provider
  {
    provide: 'SimpleLogger',
    useExisting: Logger
  }
]
```

--------------------------------

### Bootstrapping an Angular Application

Source: https://angular.dev/guide/di/hierarchical-dependency-injection

Demonstrates how to bootstrap an Angular application using the `bootstrapApplication` method from `@angular/core`. This method creates the root EnvironmentInjector, configured by the provided `ApplicationConfig`. It's the entry point for standalone applications.

```typescript
import { bootstrapApplication } from "@angular/core";
import { AppComponent } from "./app.component";
import { appConfig } from "./app.config";

bootstrapApplication(AppComponent, appConfig);

```

--------------------------------

### Angular FormControl with Nullability

Source: https://angular.dev/guide/forms/typed-forms

Shows how an Angular FormControl can become null, for example, after calling the reset() method. TypeScript enforces handling of this nullability, ensuring robust code. The example demonstrates the default null behavior.

```typescript
const email = new FormControl('angularrox@gmail.com');
email.reset();
console.log(email.value); // null
```

--------------------------------

### Platform Server Specifics

Source: https://angular.dev/api

APIs for server-side rendering (SSR) and bootstrapping applications on the server.

```APIDOC
## Platform Server API

### Description
APIs for server-side rendering (SSR) and bootstrapping Angular applications on the server.

### Endpoints

- **`renderApplication(ngModule, options)`**: Renders an Angular application on the server.
- **`provideServerRendering()`**: Provides server rendering capabilities.
- **`PlatformConfig`**: Configuration options for the platform server.

### Example Usage (Conceptual)
```typescript
import { renderApplication } from '@angular/platform-server';
import { AppServerModule } from './app.server.module';

// Example of server-side rendering
renderApplication(AppServerModule, {
  // ... options
}).then(html => {
  // Send html to the client
});
```
```

--------------------------------

### CSS Transition Properties

Source: https://angular.dev/guide/animations/css

Demonstrates the use of CSS transition properties to animate changes to element styles. It includes examples of individual properties like 'transition-duration', 'transition-delay', 'transition-timing-function', and 'transition-property', as well as the 'transition' shorthand.

```css
.example-element {
  transition-duration: 1s;
  transition-delay: 500ms;
  transition-timing-function: ease-in-out;
  transition-property: margin-right;
}
.example-shorthand {
  transition: margin-right 1s ease-in-out 500ms;
}
```

--------------------------------

### GET Request with Custom Parameter Encoding

Source: https://angular.dev/guide/http/making-requests

Demonstrates how to use a custom HttpParameterCodec for advanced URL parameter encoding.

```APIDOC
## GET /api/items with Custom Parameter Encoding

### Description
Searches for items with URL parameters that require custom encoding. This uses a custom `HttpParameterCodec` to handle special characters.

### Method
GET

### Endpoint
/api/items

#### Parameters

#### Query Parameters
- **email** (string) - Required - The email address for searching.
- **q** (string) - Required - The query string, potentially with special characters.

### Request Example
```javascript
import { HttpClient, HttpParams, HttpParameterCodec } from '@angular/common/http';
import { inject } from '@angular/core';

export class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string { return encodeURIComponent(key); }
  encodeValue(value: string): string { return encodeURIComponent(value); }
  decodeKey(key: string): string { return decodeURIComponent(key); }
  decodeValue(value: string): string { return decodeURIComponent(value); }
}

export class ApiService {
  private http = inject(HttpClient);

  searchItems(email: string, query: string) {
    const params = new HttpParams({
      encoder: new CustomHttpParamEncoder(),
    })
    .set('email', email)
    .set('q', query);

    return this.http.get('/api/items', { params });
  }
}

// Usage:
// const apiService = new ApiService();
// apiService.searchItems('dev+alerts@example.com', 'a & b? c/d = e').subscribe(...);
```

### Response
#### Success Response (200)
- **items** (array) - A list of items matching the search criteria.

#### Response Example
```json
[
  {
    "id": 1,
    "name": "Example Item"
  }
]
```
```

--------------------------------

### Angular PathLocationStrategy URL Example

Source: https://angular.dev/guide/routing/common-router-tasks

Represents a URL generated using the PathLocationStrategy, which employs HTML5 pushState for clean, server-request-free URL updates. This is the default strategy in Angular.

```text
localhost:3002/crisis-center
```

--------------------------------

### Configure Server Routes for Hybrid Rendering (TypeScript)

Source: https://angular.dev/guide/prerendering

Example of configuring server routes in an Angular application using `ServerRoute` objects. This allows defining different rendering modes (Client, Prerender, Server) for various routes.

```typescript
// app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', // This renders the "/" route on the client (CSR)
    renderMode: RenderMode.Client,
  },
  {
    path: 'about', // This page is static, so we prerender it (SSG)
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'profile', // This page requires user-specific data, so we use SSR
    renderMode: RenderMode.Server,
  },
  {
    path: '**', // All other routes will be rendered on the server (SSR)
    renderMode: RenderMode.Server,
  },
];
```

--------------------------------

### HighlightDirective Component Setup (TypeScript)

Source: https://angular.dev/guide/testing/attribute-directives

Sets up the testing module and component for testing the HighlightDirective. It imports necessary Angular testing modules and defines a simple component with a template that utilizes the HighlightDirective. This is a prerequisite for running the directive's unit tests.

```TypeScript
import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {HighlightDirective} from './highlight.directive';

@Component({
  template: `
    <!-- Template content would go here, likely using HighlightDirective -->
  `
})
class TestComponent {}
```

--------------------------------

### Angular Directive Injection Example

Source: https://angular.dev/guide/di/dependency-injection

Shows how to inject dependencies, such as `ElementRef`, into an Angular directive using the `inject()` function within a class field initializer.

```typescript
@Directive({...})
export class MyDirective {
  // ✅ In class field initializer
  private element = inject(ElementRef);
}
```

--------------------------------

### Content Projection Example in Angular

Source: https://angular.dev/guide/di/hierarchical-dependency-injection

Demonstrates content projection in Angular, showing how projected content is rendered. It highlights that projected content sees the content of its original location, not its projected location, unless nested within a VIEW container.

```html
Emoji from AnimalService: {{animal.emoji}} (🐳)

<#VIEW @Inject(AnimalService) animal=>
Emoji from AnimalService: {{animal.emoji}} (🐶)
```

--------------------------------

### Navigate with Matrix Parameters

Source: https://angular.dev/guide/routing/read-route-state

Demonstrates how to navigate to a route and include matrix parameters, which are segment-specific. This example shows passing 'view' and 'filter' parameters to the '/awesome-products' route.

```typescript
// URL format: /path;key=value
// Multiple parameters: /path;key1=value1;key2=value2

// Navigate with matrix parameters
this.router.navigate(['/awesome-products', { view: 'grid', filter: 'new' }]);
// Results in URL: /awesome-products;view=grid;filter=new
```

--------------------------------

### Example `ng test` Console Output

Source: https://angular.dev/guide/testing

This output shows the typical console log when running `ng test`. It indicates which test files are being processed, the status of individual tests (passed/failed), and summary statistics like total tests, duration, and time spent on different stages of the test execution.

```bash
✓ src/app/app.spec.ts (3)
✓ AppComponent should create the app
✓ AppComponent should have as title 'my-app'
✓ AppComponent should render title
Test Files 1 passed (1)
Tests 3 passed (3)
Start at 18:18:01
Duration 2.46s (transform 615ms, setup 2ms, collect 2.21s, tests 5ms)
```

--------------------------------

### Testing with jasmine.clock() in Angular

Source: https://angular.dev/guide/testing/components-scenarios

Demonstrates how to use `jasmine.clock()` for synchronous testing of timers within Angular, often used in conjunction with zone.js/testing. It requires installing and uninstalling the clock before and after tests respectively.

```typescript
// need to config __zone_symbol__fakeAsyncPatchLock flag
// before loading zone.js/testing
beforeEach(() => {
  jasmine.clock().install();
});
afterEach(() => {
  jasmine.clock().uninstall();
});

it('should auto enter fakeAsync', () => {
  // is in fakeAsync now, don't need to call fakeAsync(testFn)
  let called = false;
  setTimeout(() => {
    called = true;
  }, 100);
  jasmine.clock().tick(100);
  expect(called).toBe(true);
});
```

--------------------------------

### Providing a Service using an Injection Token

Source: https://angular.dev/guide/di/dependency-injection-providers

This example demonstrates how to configure a provider in an Angular component using a previously defined InjectionToken. It specifies `useClass` to provide `LocalDataService` when the `DATA_SERVICE_TOKEN` is requested.

```typescript
import { Component, inject } from '@angular/core';
import { LocalDataService } from './local-data-service';
import { DATA_SERVICE_TOKEN } from './tokens';

@Component({
  selector: 'app-example',
  providers: [
    {
      provide: DATA_SERVICE_TOKEN,
      useClass: LocalDataService
    }
  ]
})
export class ExampleComponent {
  private dataService = inject(DATA_SERVICE_TOKEN);
}
```

--------------------------------

### Angular BannerComponent Tests with beforeEach

Source: https://angular.dev/guide/testing/components-basics

Utilizes the beforeEach block for setting up the TestBed and component fixture, allowing for multiple tests to share the same setup. Asserts component creation and verifies the presence of specific text content.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BannerComponent} from './banner-initial.component';

describe('BannerComponent (with beforeEach)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BannerComponent]
    });
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should contain "banner works!"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('banner works!');
  });

  it('should have "banner works!" in paragraph', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelector('p')!;
    expect(p.textContent).toEqual('banner works!');
  });
});
```

--------------------------------

### Create Angular Service with @Injectable Decorator (TypeScript)

Source: https://angular.dev/guide/di/creating-injectable-service

Example of manually creating an Angular service using the @Injectable decorator. The 'providedIn: 'root'' option makes the service a singleton, available application-wide and enabling tree-shaking.

```typescript
// 📄 src/app/basic-data-store.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasicDataStore {
  private data: string[] = [];

  addData(item: string): void {
    this.data.push(item);
  }

  getData(): string[] {
    return [...this.data];
  }
}
```

--------------------------------

### Angular TestBed Component Creation and Querying

Source: https://angular.dev/guide/testing/utility-apis

Demonstrates creating a component using Angular's TestBed and querying its child components and references using DebugElement. Useful for testing component composition and template interactions.

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellComponent } from './shell.component'; // Assuming ShellComponent is defined elsewhere

describe('ShellComponent', () => {
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShellComponent ]
    }).compileComponents();
  });

  it('should create shell and check children', () => {
    fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    const el = fixture.debugElement.children[0];
    const comp = el.componentInstance;

    expect(comp.children.toArray().length).toBe(4); // Example assertion
    expect(el.references['nc']).toBe(comp); // Example assertion for reference

    const contentRefs = el.queryAll((de) => de.references['content']);
    expect(contentRefs.length).toBe(4); // Example assertion for content references
  });
});
```

--------------------------------

### Library Author 'provide' Pattern

Source: https://angular.dev/guide/di/dependency-injection-providers

This code snippet introduces the 'provide' pattern commonly used by Angular library authors. It involves exporting functions that return provider configurations, allowing consumers to easily integrate library features with flexible setup options.

```typescript
// 📁 /libs/analytics/src/provide
export function provideAnalytics() {
  return [
    // ... provider configurations for the analytics library
  ];
}

```

--------------------------------

### Configure Angular TestBed with FormsModule for Hero Components

Source: https://angular.dev/guide/testing/components-scenarios

This setup function configures the Angular TestBed for testing components that utilize FormsModule, HeroDetailComponent, and TitleCasePipe. It includes necessary providers for HTTP client testing and routing, setting up the testing environment for components requiring form handling and specific pipes.

```typescript
function formsModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [FormsModule, HeroDetailComponent, TitleCasePipe],
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          provideRouter([{ path: 'heroes/:id', component: HeroDetailComponent }]),
        ],
      }),
    );
  });

  it("should display 1st hero's name", async () => {
    const expectedHero = firstHero;
    await createComponent(expectedHero.id).then(() => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });
  });
}
```

--------------------------------

### Angular Router navigateByUrl() Examples

Source: https://angular.dev/guide/routing/navigate-to-routes

Illustrates the use of `router.navigateByUrl()` for direct navigation using full URL path strings. This method supports standard routes, nested routes, and URLs with query parameters, fragments, and matrix parameters, making it suitable for deep linking and absolute navigation.

```typescript
// Standard route navigation
router.navigateByUrl('/products');
// Navigate to nested router
router.navigateByUrl('/products/featured');
// Complete URL with parameters and fragment
router.navigateByUrl('/products/123?view=details#reviews');
// Navigate with query parameters
router.navigateByUrl('/search?category=books&sortBy=price');
// With matrix parameters
router.navigateByUrl('/sales-awesome;isOffer=true;showModal=false')

```

--------------------------------

### Angular Component Test Helper: Create and Initialize Component

Source: https://angular.dev/guide/testing/components-scenarios

This asynchronous helper function facilitates the creation and initialization of an Angular component within a testing environment. It uses RouterTestingHarness to navigate to a specific route, injects the component, sets up a Page object for DOM querying, and mocks an HTTP request to provide test data. This streamlines the setup for individual component tests.

```typescript
async function createComponent(id: number) {
  harness = await RouterTestingHarness.create();
  component = await harness.navigateByUrl(`/heroes/${id}`, HeroDetailComponent);
  page = new Page();

  const request = TestBed.inject(HttpTestingController).expectOne(`api/heroes/?id=${id}`);
  const hero = getTestHeroes().find((h) => h.id === Number(id));
  request.flush(hero ? [hero] : []);

  harness.detectChanges();
}
```

--------------------------------

### Define Angular Route with URL Parameters

Source: https://angular.dev/guide/routing/define-routes

This example illustrates how to define a route with dynamic URL parameters in Angular. The colon (:) prefix indicates a parameter, allowing multiple URLs to map to the same component.

```typescript
// Example of a route path with a parameter
// e.g., '/users/:userId'
{
  path: 'users/:userId',
  component: UserProfileComponent
}
```

--------------------------------

### Configure HttpClient Caching with HttpTransferCacheOptions

Source: https://angular.dev/guide/prerendering

Customize Angular's HttpClient caching for SSR and hydration. This example configures which headers to include, filters specific URLs, and enables POST requests for caching.

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    provideClientHydration(
      withHttpTransferCacheOptions({
        includeHeaders: ['ETag', 'Cache-Control'],
        filter: (req) => !req.url.includes('/api/profile'),
        includePostRequests: true,
        includeRequestsWithAuthHeaders: false,
      }),
    ),
  ],
});
```

--------------------------------

### Using Jasmine Clock for Async Tests

Source: https://angular.dev/guide/testing/components-scenarios

Demonstrates how to use `jasmine.clock()` to install and manage the test clock, enabling synchronous execution of timers within `fakeAsync` tests without explicitly calling `fakeAsync`.

```typescript
describe('use jasmine.clock()', () => {
  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should auto enter fakeAsync', () => {
    let called = false;
    setTimeout(() => {
      called = true;
    }, 100);
    jasmine.clock().tick(100);
    expect(called).toBe(true);
  });
});
```

--------------------------------

### Component Override (One-Deep) with TestBed

Source: https://angular.dev/guide/testing/services

Demonstrates how to override a component's dependencies for testing purposes. This example overrides ParentComponent to use FakeChildComponent instead of its default child.

```typescript
describe('nested (one-deep) component override', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ParentComponent, FakeChildComponent],
    }).overrideComponent(ParentComponent, {
      set: { imports: [FakeChildComponent] },
    });
  });

  it('ParentComp should use Fake Child component', () => {
    const fixture = TestBed.createComponent(ParentComponent);
    fixture.detectChanges();
    expect(fixture).toHaveText('Parent(Fake Child)');
  });
});
```

--------------------------------

### Navigate with Query Parameters

Source: https://angular.dev/guide/routing/read-route-state

Illustrates how to navigate to a route and include query parameters for filtering or sorting. This example shows how to pass single or multiple parameters like category, sort order, and page number.

```typescript
// Single parameter structure
// /products?category=electronics
router.navigate(['/products'], { queryParams: { category: 'electronics' }});

// Multiple parameters
// /products?category=electronics&sort=price&page=1
router.navigate(['/products'], { queryParams: { category: 'electronics', sort: 'price', page: 1 }});
```

--------------------------------

### Angular Structural Directive Syntax Translation

Source: https://angular.dev/guide/directives/structural-directives

This table illustrates how Angular translates the shorthand syntax of structural directives into standard binding syntax. It covers cases with naked expressions, key-expressions, and let declarations.

```plaintext
Shorthand | Translation
---|---
`prefix` and naked `expression` | `[prefix]="expression"`
`keyExp` | `[prefixKey]="expression"` (The `prefix` is added to the `key`)
`let local` | `let-local="export"`
```

--------------------------------

### Angular Structural Directive Grammar Patterns

Source: https://angular.dev/guide/directives/structural-directives

These patterns further break down the grammar for Angular structural directives, defining the specific structures for 'as' clauses and key-expression pairs.

```plaintext
as = :export "as" :local ";"?
keyExp = :key ":"? :expression ("as" :local)? ";"?
let = "let" :local "=" :export ";"?
```

--------------------------------

### DashboardComponent Routing and HttpClient Testing Setup (TypeScript)

Source: https://angular.dev/guide/testing/components-scenarios

Sets up the testing environment for the `DashboardComponent` including routing and HTTP client mocking. It uses `provideRouter` for routing tests and `provideHttpClientTesting` to mock HTTP requests, allowing for isolation of component logic. Dependencies include Angular testing modules and router testing utilities.

```typescript
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationEnd, provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { firstValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators';
import { addMatchers, click } from '../../testing';
import { HeroService } from '../model/hero.service';
import { getTestHeroes } from '../model/testing/test-heroes';
import { DashboardComponent } from './dashboard.component';
import { appConfig } from '../app.config';
import { HeroDetailComponent } from '../hero/hero-detail.component';

beforeEach(addMatchers);

let comp: DashboardComponent;
let harness: RouterTestingHarness;

// Assuming compileAndCreate and tests are defined elsewhere for deep testing
// function compileAndCreate() { ... }
// function tests(clickForDeep) { ... }

describe('DashboardComponent (deep)', () => {
  // compileAndCreate(); // Assuming this setup function is defined
  // tests(clickForDeep); // Assuming this test runner function is defined

  // Example setup using provideRouter and provideHttpClientTesting
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DashboardComponent], // Import the component under test
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([{ path: 'dashboard', component: DashboardComponent }]), // Example route
        HeroService // Assuming HeroService is needed
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unrecognized elements
    });
    // Potentially create component instance and harness here
  }));
});

```

--------------------------------

### Prefer class and style Bindings over NgClass and NgStyle (HTML/Angular)

Source: https://next.angular.dev/style-guide

This example implicitly advises against using `ngClass` and `ngStyle` directives by highlighting the preference for standard `class` and `style` attribute bindings in Angular templates. This approach offers simpler syntax and better performance.

```html
<!-- PREFER -->
<div class="active" [style.color.red]="isError">...</div>

<!-- AVOID -->
<div ngClass="{'active': isActive}" [ngStyle]="{'color': 'red'}">...</div>
```

--------------------------------

### Nested Routes with Child Routes in Angular

Source: https://angular.dev/guide/routing/show-routes-with-outlets

This example illustrates setting up nested routes (child routes) in Angular. It shows how a component like 'Settings' can have its own RouterOutlet to display relative content based on further URL segments, enabling partial view updates.

```typescript
// Example of defining child routes within a parent route configuration
// (Specific implementation details for the child component's template would be needed)

// In the parent component's template (e.g., settings.component.html):
// <router-outlet></router-outlet>

// In the child routes array (e.g., within the settings routing module):
// const settingsRoutes: Routes = [
//   { path: 'profile', component: ProfileComponent },
//   { path: 'security', component: SecurityComponent }
// ];
```

--------------------------------

### Configure Angular TestBed with SharedModule for Hero Components

Source: https://angular.dev/guide/testing/components-scenarios

This setup function configures the Angular TestBed for testing components that rely on SharedModule, HeroDetailComponent, and routing. It ensures the necessary HTTP testing providers and router configurations are in place, preparing the environment for components that utilize shared UI elements and services.

```typescript
function sharedModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [HeroDetailComponent, sharedImports],
        providers: [
          provideRouter([{ path: 'heroes/:id', component: HeroDetailComponent }]),
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      }),
    );
  });

  it("should display 1st hero's name", async () => {
    const expectedHero = firstHero;
    await createComponent(expectedHero.id).then(() => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });
  });
}
```

--------------------------------

### Configure HttpClient XSRF Protection

Source: https://angular.dev/guide/http/setup

The `withXsrfConfiguration()` function allows for customization of Angular's `HttpClient` built-in XSRF security features. Refer to the security guide for detailed information on configuration options.

```typescript
import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withXsrfConfiguration({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }))
  ]
});
```

--------------------------------

### Forms Module Setup for Angular Testing

Source: https://angular.dev/guide/testing/components-scenarios

Sets up the testing module for Angular forms, incorporating the FormsModule and HeroDetailComponent. This configuration is used to test form interactions and data binding, particularly for the hero detail form. It relies on TestBed, FormsModule, and HTTP testing utilities.

```typescript
import {FormsModule} from '@angular/forms';
import {TitleCasePipe} from '../shared/title-case.pipe';
import {appConfig} from '../app.config';
function formsModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      Object.assign({}, appConfig, {
        imports: [FormsModule, HeroDetailComponent, TitleCasePipe],
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          provideRouter([{path: 'heroes/:id', component: HeroDetailComponent}]),
        ],
      }),
    });
  });
  // ... it block for tests
```

--------------------------------

### Enable Hydration in Angular (NgModules)

Source: https://angular.dev/guide/hydration

This code snippet shows how to enable hydration for Angular applications using NgModules. It imports `provideClientHydration` and includes it in the `providers` array of the root application module.

```typescript
import { provideClientHydration } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app/app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

```

--------------------------------

### TestBed Class Summary

Source: https://angular.dev/guide/testing/utility-apis

Overview of the TestBed class, a principal Angular testing utility, and its configuration methods.

```APIDOC
## TestBed class summary

The `TestBed` class is one of the principal Angular testing utilities. Its API is quite large and can be overwhelming until you've explored it, a little at a time.

### `TestModuleMetadata` Type

The module definition passed to `configureTestingModule` is a subset of the `@NgModule` metadata properties:

```typescript
type TestModuleMetadata = {
  providers?: any[];
  declarations?: any[];
  imports?: any[];
  schemas?: Array<any>;
};
```

### `MetadataOverride` Type

Each override method takes a `MetadataOverride` where `T` is the kind of metadata appropriate to the method, that is, the parameter of an `@NgModule`, `@Component`, `@Directive`, or `@Pipe`.

```typescript
type MetadataOverride<T = any> = {
  add?: Partial<T>;
  remove?: Partial<T>;
  set?: Partial<T>;
};
```

### `TestBed` Static Methods

The `TestBed` API consists of static class methods that either update or reference a _global_ instance of the `TestBed`. Internally, all static methods cover methods of the current runtime `TestBed` instance, which is also returned by the `getTestBed()` function. Call `TestBed` methods _within_ a `beforeEach()` to ensure a fresh start before each individual test.

#### Key Static Methods:

*   **`configureTestingModule(moduleDef: TestModuleMetadata)`**
    *   **Description**: Establishes the initial test environment and a default testing module. The default testing module is configured with basic declaratives and some Angular service substitutes that every tester needs. Call `configureTestingModule` to refine the testing module configuration.
```

--------------------------------

### Forms Module Setup for Hero Detail

Source: https://angular.dev/guide/testing/components-scenarios

Configures the testing module to include FormsModule for data binding, HeroDetailComponent, and TitleCasePipe for text transformation. It sets up routing and HTTP testing, then verifies that the correct hero's name is displayed when navigating to their detail page.

```typescript
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '../shared/title-case.pipe';
import { HeroDetailComponent } from './hero-detail.component';
import { appConfig } from '../app.config';
import { getTestHeroes } from '../model/testing/test-hero.service';
import { createComponent, Page } from './testing/hero-detail.component.spec'; // Assuming createComponent and Page are exported
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

const firstHero = getTestHeroes()[0];

function formsModuleSetup() {
  beforeEach(async () => {
    // Configure the testing module with application configuration, FormsModule, and Hero components
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [FormsModule, HeroDetailComponent, TitleCasePipe], // Include FormsModule and TitleCasePipe
        providers: [
          provideHttpClient(), // Provide HttpClient
          provideHttpClientTesting(), // Provide HttpClient testing support
          provideRouter([{ path: 'heroes/:id', component: HeroDetailComponent }]), // Configure routing for hero detail
        ],
      }),
    );
  });

  it("should display 1st hero's name", async () => {
    const expectedHero = firstHero;
    // Create the component and then assert that the displayed name matches the first hero's name
    await createComponent(expectedHero.id).then(() => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });
  });
}

// Placeholder for Page object (assuming it's defined elsewhere)
class Page {
  get nameDisplay(): HTMLElement { return document.createElement('span'); }
}

```

--------------------------------

### Angular Component Injection Examples

Source: https://angular.dev/guide/di/dependency-injection

Illustrates how to inject dependencies within an Angular component using `inject()`. Dependencies can be injected directly into class field initializers or within the constructor body.

```typescript
@Component({...})
export class MyComponent {
  // ✅ In class field initializer
  private service = inject(MyService);

  // ✅ In constructor body
  private anotherService: MyService;
  constructor() {
    this.anotherService = inject(MyService);
  }
}
```

--------------------------------

### Configure Angular Unit Tests with Providers File

Source: https://angular.dev/guide/testing

Configures the Angular build unit test architect in `angular.json` to use a specified file for test providers. It also sets up test file inclusion, setup files, coverage, and browser targets.

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {
            "include": ["src/**/*.spec.ts"],
            "setupFiles": ["src/test-setup.ts"],
            "providersFile": "src/test-providers.ts",
            "coverage": true,
            "browsers": ["chromium"]
          }
        }
      }
    }
  }
}
```

--------------------------------

### Configure TestBed for DashboardComponent Shallow Tests

Source: https://angular.dev/guide/testing/components-scenarios

Sets up the testing module for shallow testing of the DashboardComponent. It configures necessary imports, providers, and routing for the test environment. This setup allows for isolated testing of the DashboardComponent.

```typescript
describe('DashboardComponent (shallow)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [DashboardComponent, HeroDetailComponent],
        providers: [provideRouter([{ path: 'heroes/:id', component: HeroDetailComponent }])],
        schemas: [NO_ERRORS_SCHEMA],
      }),
    );
  });
  compileAndCreate();
  tests(clickForShallow);

  function clickForShallow() {
    // get first DebugElement
    const heroDe = harness.routeDebugElement!.query(By.css('dashboard-hero'));
    heroDe.triggerEventHandler('selected', comp.heroes[0]);
    return Promise.resolve();
  }
});
```

--------------------------------

### Defining and Injecting AdvancedDataStore in BasicDataStore

Source: https://angular.dev/guide/di/creating-injectable-service

This example demonstrates defining a service (BasicDataStore) that itself injects another service (AdvancedDataStore) using the inject() function. Both services are marked with @Injectable and provided in 'root'.

```typescript
import { inject, Injectable } from '@angular/core';
import { AdvancedDataStore } from './advanced-data-store';

@Injectable({
  providedIn: 'root',
})
export class BasicDataStore {
  private advancedDataStore = inject(AdvancedDataStore);
  private data: string[] = [];

  addData(item: string): void {
    this.data.push(item);
  }

  getData(): string[] {
    return [...this.data, ...this.advancedDataStore.getData()];
  }
}
```

--------------------------------

### Angular Structural Directive Syntax Reference

Source: https://angular.dev/guide/directives/structural-directives

This is a general reference for the syntax used in Angular structural directives. It defines patterns for prefixes, keys, local variables, exports, and expressions, which are used in template shorthand.

```plaintext
_:prefix="( :let | :expression ) (';' | ',')? ( :let | :as | :keyExp )_"
```

--------------------------------

### Angular Component Testing with UserService

Source: https://angular.dev/guide/testing/components-scenarios

Tests for an Angular component that utilizes a UserService. It includes checks for initial setup, user login status, and verifies that the correct UserService instance is injected. Uses Jasmine for testing.

```typescript
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { UserService } from '../user.service'; // Assuming UserService is in the parent directory
import { Component } from '@angular/core';

// Mock UserService for testing
class MockUserService {
  isLoggedIn = { set: (value: boolean) => {} };
}

@Component({
  selector: 'app-test-component',
  template: '<div>{{ greeting }}</div>'
})
class TestComponent {
  greeting = '';
  userService: UserService;
  componentUserService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
    this.componentUserService = userService;
  }
}

describe('Component Tests', () => {
  let userService: UserService;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [
        { provide: UserService, useClass: MockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display welcome message with user name', async () => {
    userService.isLoggedIn.set({ name: 'Bubba' });
    await fixture.whenStable();
    expect(el.textContent).toContain('Bubba');
  });

  it('should request login if not logged in', async () => {
    userService.isLoggedIn.set(false);
    await fixture.whenStable();
    const content = el.textContent;
    expect(content).withContext('not welcomed').not.toContain('Welcome');
    expect(content).withContext('"log in"').toMatch(/log in/i);
  });

  it("should inject the component's UserService instance", inject([UserService], (service: UserService) => {
    expect(service).toBe(component.componentUserService);
  }));

  it('TestBed and Component UserService should be the same', () => {
    expect(userService).toBe(component.userService);
  });
});

```

--------------------------------

### NgFor Binding - List Rendering

Source: https://angular.dev/guide/directives

Shows how to use the NgFor structural directive to iterate over a collection and render a list of elements in an Angular template. Includes examples with and without the index.

```html
<div *ngFor="let item of items">
  {{ item.name }}
</div>

<app-item-detail *ngFor="let item of items"></app-item-detail>

<!-- *ngFor with index -->
<!-- with _semi-colon_ separator -->
<div *ngFor="let item of items; let i = index">
  {{ i + 1 }} - {{ item.name }}
</div>

<!-- with _comma_ separator -->
<div *ngFor="let item of items, let i = index">
  {{ i + 1 }} - {{ item.name }}
</div>
```

--------------------------------

### Run Vitest Tests in Browser

Source: https://angular.dev/guide/testing

Executes Angular unit tests using Vitest, specifying the browser environment to run the tests in. Examples show how to target Chromium with Playwright and Chrome with WebdriverIO.

```bash
# Example for Playwright
ng test --browsers=chromium

# Example for WebdriverIO
ng test --browsers=chrome
```

--------------------------------

### HttpClientModule Equivalents with provideHttpClient

Source: https://angular.dev/guide/http/setup

This snippet demonstrates the equivalents of legacy `HttpClientModule`-based configurations when using the newer `provideHttpClient()` function. It maps `HttpClientModule` to `provideHttpClient(withInterceptorsFromDi())`, `HttpClientJsonpModule` to `withJsonpSupport()`, and `HttpClientXsrfModule` options to their respective `provideHttpClient` configuration functions.

```typescript
// NgModule | provideHttpClient() equivalent
// HttpClientModule | provideHttpClient(withInterceptorsFromDi())
// HttpClientJsonpModule | withJsonpSupport()
// HttpClientXsrfModule.withOptions(...) | withXsrfConfiguration(...)
// HttpClientXsrfModule.disable() | withNoXsrfProtection()
```

--------------------------------

### Angular @defer with 'hydrate on immediate'

Source: https://angular.dev/guide/incremental-hydration

This example shows an Angular @defer block using the 'hydrate on immediate' trigger. Content hydration occurs immediately after all non-deferred content has finished rendering.

```typescript
@defer (hydrate on immediate) {
}
@placeholder {

Large component placeholder

}

```

--------------------------------

### Angular Route Guard with inject()

Source: https://angular.dev/guide/di/dependency-injection

An example of a functional route guard in Angular that uses the `inject()` function to access services like `AuthService` for authentication checks before allowing navigation.

```typescript
import { inject } from '@angular/core';
import { AuthService } from './auth.service'; // Assuming AuthService exists

export const authGuard = () => {
  // ✅ In a route guard
  const auth = inject(AuthService);
  return auth.isAuthenticated();
}
```

--------------------------------

### DashboardComponent Deep Test Setup

Source: https://angular.dev/guide/testing/components-scenarios

Configures the testing module for a deep integration test of the DashboardComponent. It sets up routing to the DashboardComponent and provides necessary services like HeroService, HttpClient, and HttpClientTesting. It also creates the RouterTestingHarness and navigates to the root URL.

```typescript
function compileAndCreate() {
 beforeEach(async () => {
 TestBed.configureTestingModule(
 Object.assign({}, appConfig, {
 providers: [
 provideRouter([{path: '**', component: DashboardComponent}]),
 provideHttpClient(),
 provideHttpClientTesting(),
 HeroService,
 ],
 }),
 );
 harness = await RouterTestingHarness.create();
 comp = await harness.navigateByUrl('/', DashboardComponent);
 TestBed.inject(HttpTestingController).expectOne('api/heroes').flush(getTestHeroes());
 });
}
```

--------------------------------

### Configure HTTP Cache to Include Specific Headers

Source: https://angular.dev/guide/hybrid-rendering

Specify which headers from the server response should be included in cached entries. By default, no headers are included. This example includes 'ETag' and 'Cache-Control' headers.

```typescript
withHttpTransferCacheOptions({
  includeHeaders: ['ETag', 'Cache-Control'],
});
```

--------------------------------

### Angular Test Helper: Create Component

Source: https://angular.dev/guide/testing/pipes

Asynchronously creates and initializes the HeroDetailComponent for testing purposes. It navigates to the component's URL, sets up mock HTTP requests, and returns the component instance. This function is crucial for setting up the test environment for component interactions.

```typescript
async function createComponent(id: number) {
  harness = await RouterTestingHarness.create();
  component = await harness.navigateByUrl(`/heroes/${id}`, HeroDetailComponent);
  page = new Page();
  const request = TestBed.inject(HttpTestingController).expectOne(`api/heroes/?id=${id}`);
  const hero = getTestHeroes().find((h) => h.id === Number(id));
  request.flush(hero ? [hero] : []);
  harness.detectChanges();
}
```

--------------------------------

### Angular FormGroup Initialization (Typed)

Source: https://angular.dev/guide/forms/typed-forms

Example of initializing a FormGroup with typed FormControls for email and password. This demonstrates the basic structure for typed forms, allowing for type-safe access to control values and methods.

```typescript
const login = new FormGroup({
  email: new FormControl(''),
  password: new FormControl(''),
});
```

--------------------------------

### Display Angular Profile Editor Component

Source: https://angular.dev/guide/forms/reactive-forms

An example of how to include the ProfileEditor component within another component's template, typically the main application component. This makes the profile editing form accessible to the user.

```html
Reactive Forms
==============

<app-profile-editor></app-profile-editor>
```

--------------------------------

### Create Harness Loader for Unit Tests (TestBed)

Source: https://angular.dev/guide/testing/using-component-harnesses

Demonstrates how to create a harness loader for unit tests using Angular's TestBed. This loader is rooted at the component fixture's root element and is used to get harness instances.

```typescript
const fixture = TestBed.createComponent(MyComponent);
const loader = TestbedHarnessEnvironment.loader(fixture);
const myComponentHarness = await loader.getHarness(MyComponent);
```

--------------------------------

### Configure Default CDN Loader with provideImgixLoader

Source: https://angular.dev/guide/image-optimization

Shows how to configure a specific CDN loader, like the one for Imgix, using a dedicated provider function. This method helps in generating preconnect links for the specified image domain during static analysis.

```typescript
import { provideImgixLoader } from '@angular/common';

...

providers: [
  provideImgixLoader('https://my.base.url/'),
]
```

--------------------------------

### DashboardComponent Shallow Test Setup

Source: https://angular.dev/guide/testing/components-scenarios

Sets up the testing module for a shallow test of the DashboardComponent, including its direct dependencies like HeroDetailComponent. It configures routing to display the HeroDetailComponent for a specific hero ID and uses NO_ERRORS_SCHEMA to ignore unrecognized elements.

```typescript
describe('DashboardComponent (shallow)', () => {
 beforeEach(() => {
 TestBed.configureTestingModule(
 Object.assign({}, appConfig, {
 imports: [DashboardComponent, HeroDetailComponent],
 providers: [
 provideRouter([{path: 'heroes/:id', component: HeroDetailComponent}])
 ],
 schemas: [NO_ERRORS_SCHEMA],
 }),
 );
 });
 compileAndCreate();
 tests(clickForShallow);
 function clickForShallow() {
 // get first DebugElement
 const heroDe = harness.routeDebugElement!.query(By.css('dashboard-hero'));
 heroDe.triggerEventHandler('selected', comp.heroes[0]);
 return Promise.resolve();
 }
});
```

--------------------------------

### Provide HttpClient in Application Config (TypeScript)

Source: https://angular.dev/guide/http/setup

Demonstrates how to provide the HttpClient service using the `provideHttpClient` function within the application's configuration file (`app.config.ts`). This is the standard way to set up HttpClient for an Angular application.

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
  ]
};
```

--------------------------------

### Angular TestBed Override Component Providers

Source: https://angular.dev/guide/testing/services

Illustrates overriding a component's providers using TestBed. This example demonstrates removing an existing service provider and adding a mock implementation using `useClass` for testing purposes.

```typescript
it("should override TestProvidersComp's ValueService provider", () => {
    const fixture = TestBed.configureTestingModule({
      imports: [TestProvidersComponent],
    })
    .overrideComponent(TestProvidersComponent, {
      remove: {providers: [ValueService]},
      add: {providers: [{provide: ValueService, useClass: FakeValueService}]}
    })
    .createComponent(TestProvidersComponent);
    fixture.detectChanges();
  });
```

--------------------------------

### Class-Based Interceptor Configuration - Angular Testing

Source: https://angular.dev/guide/http/testing

Presents an example of configuring a class-based interceptor using `HTTP_INTERCEPTORS` token and `useClass`. This approach is common for more complex interceptor logic and requires specific `TestBed` configuration.

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const clonedRequest = request.clone({
      headers: request.headers.append('X-Authentication-Token', this.authService.getAuthToken()),
    });
    return next.handle(clonedRequest);
  }
}

TestBed.configureTestingModule({
  providers: [
    AuthService,
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClientTesting(),
    // We rely on the HTTP_INTERCEPTORS token to register the AuthInterceptor as an HttpInterceptor
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
});
```

--------------------------------

### Enable Hydration in Angular (Bootstrap Application)

Source: https://angular.dev/guide/hydration

This code snippet demonstrates how to manually enable hydration in an Angular application when bootstrapping the application. It imports `provideClientHydration` from '@angular/platform-browser' and adds it to the application's providers list.

```typescript
import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideClientHydration()
  ]
});

```

--------------------------------

### Setup Forms Module for Angular Testing

Source: https://angular.dev/guide/testing/pipes

Configures the testing module for Angular forms. It imports FormsModule, HeroDetailComponent, and TitleCasePipe, and sets up HTTP providers. This function is typically used within a beforeEach block for testing components that utilize forms.

```typescript
function formsModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig,
        {
          imports: [FormsModule, HeroDetailComponent, TitleCasePipe],
          providers: [
            provideHttpClient(),
            provideHttpClientTesting(),
            provideRouter([{path: 'heroes/:id', component: HeroDetailComponent}])
          ]
        }
      )
    );
  });

  it("should display 1st hero's name", async () => {
    const expectedHero = firstHero;
    await createComponent(expectedHero.id).then(() => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });
  });
}
```

--------------------------------

### Manage Multiple Routes in an Angular Application

Source: https://angular.dev/guide/routing/define-routes

This example demonstrates how to define a collection of routes for an Angular application using the `Routes` type from '@angular/router'. It includes a root path ('') and an 'admin' path.

```typescript
import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page.component';
import { AdminPage } from './about-page/admin-page.component';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'admin', component: AdminPage },
];
```

--------------------------------

### Angular Component with Crisis Center Routes

Source: https://angular.dev/guide/routing/common-router-tasks

A basic Angular component definition that sets up routes exclusively for the Crisis Center. This example shows how to define a component's template to include routing configurations.

```typescript
@Component({
  template: `
    <h1>Crisis Center</h1>
    <a routerLink="/">Home</a>
    <a routerLink="/crisis-center">Crisis Center</a>
    <a routerLink="/crisis-center/1">Dragon Crisis</a>
    <a routerLink="/crisis-center/2">Shark Crisis</a>
  `
})
export class AppComponent {}
```

--------------------------------

### Overriding Component View Providers with TestBed

Source: https://angular.dev/guide/testing/utility-apis

This example demonstrates overriding a component's view providers. Similar to overriding regular providers, this allows for testing components with specific view-level dependencies replaced by mock or fake implementations.

```typescript
it("should override TestViewProvidersComp's ValueService viewProvider", () => {
  const fixture = TestBed.configureTestingModule({
    imports: [TestViewProvidersComponent],
  })
  .overrideComponent(TestViewProvidersComponent, {
    // remove: { viewProviders: [ValueService]},
    // add: { viewProviders: [{ provide: ValueService, useClass: FakeValueService }] //
    // },
    // Or replace them all (this component has only one viewProvider)
    set: { viewProviders: [{ provide: ValueService, useClass: FakeValueService }] },
  })
  .createComponent(TestViewProvidersComponent);
  fixture.detectChanges();
  expect(fixture).toHaveText('injected value: faked value');
});
```

--------------------------------

### Testing Component Properties and Styles with TestBed

Source: https://angular.dev/guide/testing/utility-apis

This snippet shows how to use TestBed to create an Angular component and assert various properties of its rendered element, including its context, attributes, classes, and styles. It verifies that the component instance and its properties are correctly reflected in the DOM.

```typescript
describe('BankAccountComponent', () => {
  it('should have a BankAccountComponent instance', () => {
    const fixture = TestBed.createComponent(BankAccountComponent);
    fixture.detectChanges(); // trigger change detection, so that component's properties are applied into the DOM
    const comp = fixture.componentInstance;
    const el = fixture.debugElement;
    const childComp = el.query(By.directive(BankAccountComponent)).componentInstance as BankAccountComponent;
    expect(childComp).toEqual(jasmine.any(BankAccountComponent));
    expect(el.context).withContext('context is the child component').toBe(childComp);
    expect(el.attributes['account']).withContext('account attribute').toBe(childComp.id);
    expect(el.attributes['bank']).withContext('bank attribute').toBe(childComp.bank);
    expect(el.classes['closed']).withContext('closed class').toBe(true);
    expect(el.classes['open']).withContext('open class').toBeFalsy();
    expect(el.styles['color']).withContext('color style').toBe(comp.color);
    expect(el.styles['width']).withContext('width style').toBe(comp.width + 'px');
  });
});
```

--------------------------------

### Disable HttpClient XSRF Protection

Source: https://angular.dev/guide/http/setup

The `withNoXsrfProtection()` function disables the built-in XSRF security functionality of Angular's `HttpClient`. Consult the security guide for more details on XSRF protection.

```typescript
import { provideHttpClient, withNoXsrfProtection } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withNoXsrfProtection())
  ]
});
```

--------------------------------

### Angular Configuration-Based API Client (useFactory)

Source: https://angular.dev/guide/di/dependency-injection-providers

Presents a practical example of using `useFactory` to create an `ApiClient` that depends on runtime configuration. The factory function injects `HttpClient` and `UserService` to determine the base URL and rate limit, showcasing dynamic service instantiation based on application state.

```typescript
import { Injectable, Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Mock UserService and HttpClient for demonstration
class UserService {
  getApiBaseUrl() { return 'https://api.dynamic.com'; }
  getRateLimit() { return 200; } // in milliseconds
}

class HttpClient {
  get(url: string) {
    console.log(`HTTP GET request to: ${url}`);
    return Promise.resolve({ data: 'mock data' });
  }
}

// Service that needs runtime configuration
@Injectable()
class ApiClient {
  constructor(
    private http: HttpClient,
    private baseUrl: string,
    private rateLimitMs: number
  ) {}

  async fetchData(endpoint: string) {
    await this.applyRateLimit();
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }

  private async applyRateLimit() {
    console.log(`Applying rate limit of ${this.rateLimitMs}ms`);
    return new Promise(resolve => setTimeout(resolve, this.rateLimitMs));
  }
}

// Factory function that configures based on user tier
const apiClientFactory = () => {
  const http = inject(HttpClient);
  const userService = inject(UserService);
  const baseUrl = userService.getApiBaseUrl();
  const rateLimitMs = userService.getRateLimit();
  return new ApiClient(http, baseUrl, rateLimitMs);
};

// Provider configuration
const apiClientProvider = {
  provide: ApiClient,
  useFactory: apiClientFactory
};

// Usage in component
@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [
    UserService,      // Provide UserService
    HttpClient,       // Provide HttpClient
    apiClientProvider   // Provide ApiClient using the factory
  ],
  template: '<div>Dashboard Component</div>'
})
export class DashboardComponent {
  private apiClient = inject(ApiClient);

  constructor() {
    this.apiClient.fetchData('users').then(data => {
      console.log('Fetched data:', data);
    });
  }
}

```

--------------------------------

### NgModel Examples - Data Binding

Source: https://angular.dev/guide/directives

Demonstrates different ways to use the NgModel directive for two-way data binding in Angular. It shows basic binding, triggering change events, and updating component properties.

```html
<input [(ngModel)]="currentItem.name">

<input [ngModel]="currentItem.name">

<input (ngModelChange)="...name=$event">
<input (ngModelChange)="setUppercaseName($event)">
```

--------------------------------

### Overriding Component Templates with TestBed

Source: https://angular.dev/guide/testing/utility-apis

This example demonstrates how to override a component's template using `TestBed.overrideComponent`. This is useful for isolating components and testing them with a simplified or alternative template, ensuring that the overridden template renders as expected.

```typescript
it("should override Child1Component's template", () => {
  const fixture = TestBed.configureTestingModule({
    imports: [Child1Component],
  })
  .overrideComponent(Child1Component, {
    set: { template: 'Fake' },
  })
  .createComponent(Child1Component);
  fixture.detectChanges();
  expect(fixture).toHaveText('Fake');
});
```

--------------------------------

### Stagger Animation Example with Angular

Source: https://next.angular.dev/guide/animations/migration

This Angular component utilizes the 'animations' package to create a staggering effect for a list of items. It defines a 'pageAnimations' trigger with a ':enter' transition that queries for '.item' elements and applies a staggered animation to them.

```typescript
import {Component, HostBinding, signal} from '@angular/core';
import {trigger, transition, animate, style, query, stagger} from '@angular/animations';

@Component({
  selector: 'app-stagger',
  templateUrl: 'stagger.component.html',
  styleUrls': ['stagger.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.item', [
          style({opacity: 0, transform: 'translateY(-10px)'}),
          stagger(200, [
            animate('500ms ease-in', style({opacity: 1, transform: 'none'}))
          ]),
        ]),
      ]),
    ]),
  ],
})
export class StaggerComponent {
  @HostBinding('@pageAnimations') items = [1, 2, 3];
}
```

--------------------------------

### Unsupported Declarations in Angular Expressions

Source: https://angular.dev/guide/templates/expression-syntax

Demonstrates declarations that are not supported within Angular expressions. This includes variable declarations (let, const), function declarations, arrow function declarations, and class declarations.

```html
<!-- Unsupported: Variable declaration -->
<!-- let label = 'abc' -->

<!-- Unsupported: Function declaration -->
<!-- function myCustomFunction() { } -->

<!-- Unsupported: Arrow function -->
<!-- () => { } -->

<!-- Unsupported: Class declaration -->
<!-- class Rectangle { } -->
```

--------------------------------

### Override Component View Providers with TestBed

Source: https://angular.dev/guide/testing/services

This example shows how to override the `viewProviders` of a component using `TestBed.overrideComponent`. It replaces the `ValueService` with a `FakeValueService` specifically for the view. This is important when testing components that rely on view-specific injections.

```typescript
const fixture = TestBed.configureTestingModule({
  imports: [TestViewProvidersComponent],
}).overrideComponent(TestViewProvidersComponent, {
  set: { viewProviders: [{ provide: ValueService, useClass: FakeValueService }] },
}).createComponent(TestViewProvidersComponent);
fixture.detectChanges();
expect(fixture).toHaveText('injected value: faked value');
```

--------------------------------

### Angular TestBed Component Provider Override

Source: https://angular.dev/guide/testing/services

Illustrates overriding a component's providers using TestBed.configureTestingModule. This example shows how to remove an existing provider (ValueService) and add a new one, useful for dependency injection testing.

```typescript
it("should override TestProvidersComp's ValueService provider", () => {
    const fixture = TestBed.configureTestingModule({
      imports: [TestProvidersComponent],
    })
      .overrideComponent(TestProvidersComponent, {
        remove: { providers: [ValueService] },
        add: { providers: [{provide: ValueServi
```

--------------------------------

### Basic View Transitions API Structure

Source: https://angular.dev/guide/routing/route-transition-animations

This JavaScript snippet illustrates the fundamental structure of the browser's native `document.startViewTransition` API. It shows how to capture the current state, execute DOM updates within a callback, capture the new state, and then play the transition animation. This forms the basis for animations in supported browsers.

```javascript
document.startViewTransition(async () => {
  await updateTheDOMSomehow();
});

```

--------------------------------

### Override Component View Providers with TestBed (TypeScript)

Source: https://angular.dev/guide/testing/services

This example illustrates overriding a component's view providers using TestBed. It replaces the default `ValueService` with `FakeValueService` specifically for the view and asserts the expected text content.

```typescript
it("should override TestViewProvidersComp's ValueService viewProvider", () => {
  const fixture = TestBed.configureTestingModule({
    imports: [TestViewProvidersComponent],
  })
  .overrideComponent(TestViewProvidersComponent, {
    // remove: { viewProviders: [ValueService]},
    // add: { viewProviders: [{ provide: ValueService, useClass: FakeValueService }] // },
    // Or replace them all (this component has only one viewProvider)
    set: {viewProviders: [{provide: ValueService, useClass: FakeValueService}]},
  })
  .createComponent(TestViewProvidersComponent);

  fixture.detectChanges();
  expect(fixture).toHaveText('injected value: faked value');
});
```

--------------------------------

### Use Lifecycle Hook Interfaces (TypeScript)

Source: https://next.angular.dev/style-guide

This snippet shows the recommended way to implement Angular lifecycle hooks by importing and implementing the corresponding TypeScript interfaces (e.g., `OnInit`). This ensures correct method naming and helps prevent typos.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  template: ``, // Template content omitted for brevity
})
export class UserProfile implements OnInit {
  // The `OnInit` interface ensures this method is named correctly.
  ngOnInit(): void {
    // Initialization logic here
  }
}
```

--------------------------------

### Angular NgSwitch Directive Example

Source: https://angular.dev/guide/directives

Illustrates the usage of Angular's NgSwitch directive for conditional rendering of template content. It demonstrates how to use `*ngSwitch`, `*ngSwitchCase`, and `*ngSwitchDefault` to display different views based on a bound variable.

```html
<div [ngSwitch]="currentItem">
  <div *ngSwitchCase="'item1'">{{ i.name }}</div>
  <div *ngSwitchDefault>Are you as bright as {{ currentItem.name }}?</div>
</div>
```

--------------------------------

### Provide Test HTTP Client and Testing

Source: https://angular.dev/guide/testing

Sets up providers for Angular's `HttpClient` and `HttpClientTestingModule`, essential for mocking HTTP requests in tests. This file is referenced in `angular.json`.

```typescript
import { Provider } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

const testProviders: Provider[] = [
  provideHttpClient(),
  provideHttpClientTesting(),
];

export default testProviders;
```

--------------------------------

### Verify Provider Hierarchy with TestBed (TypeScript)

Source: https://angular.dev/guide/testing/services

This test case verifies that different providers for the same service (`ValueService`) at different levels (module, component, child component) are distinct. It uses `inject` and `get` to retrieve service instances and compares them.

```typescript
it("injected provider should not be same as component's provider", () => {
  // TestComponent is parent of TestProvidersComponent
  @Component({
    template: '',
    imports: [TestProvidersComponent],
  })
  class TestComponent {}

  // 3 levels of ValueService provider: module, TestComponent, TestProvidersComponent
  const fixture = TestBed.configureTestingModule({
    imports: [TestComponent, TestProvidersComponent],
    providers: [ValueService],
  })
  .overrideComponent(TestComponent, {
    set: {providers: [{provide: ValueService, useValue: {}} vitals.js]}
  })
  .overrideComponent(TestProvidersComponent, {
    set: {providers: [{provide: ValueService, useClass: FakeValueService}]},
  })
  .createComponent(TestComponent);

  let testBedProvider!: ValueService;
  // `inject` uses TestBed's injector
  inject([ValueService], (s: ValueService) => (testBedProvider = s))();

  const tcProvider = fixture.debugElement.injector.get(ValueService) as ValueService;
  const tpcProvider = fixture.debugElement.children[0].injector.get(
    ValueService,
  ) as FakeValueService;

  expect(testBedProvider).withContext('testBed/tc not same providers').not.toBe(tcProvider);
  expect(testBedProvider).withContext('testBed/tpc not same providers').not.toBe(tpcProvider);
  expect(testBedProvider instanceof ValueService)
    .withContext('testBedProvider is ValueService')
    .toBe(true);
  expect(tcProvider)
    .withContext('tcProvider is {}')
    .toEqual({} as ValueService);
  expect(tpcProvider instanceof FakeValueService)
    .withContext('tpcProvider is FakeValueService')
    .toBe(true);
});
```

--------------------------------

### Override Component View Providers with TestBed (TypeScript)

Source: https://angular.dev/guide/testing/services

This example illustrates how to override the `viewProviders` of an Angular component using `TestBed.overrideComponent`. It shows how to replace all `viewProviders` with a new configuration, ensuring the component renders correctly with the faked value.

```typescript
it("should override TestViewProvidersComp's ValueService viewProvider", () => {
  const fixture = TestBed.configureTestingModule({
    imports: [TestViewProvidersComponent],
  })
  .overrideComponent(TestViewProvidersComponent, {
    // remove: { viewProviders: [ValueService] },
    // add: { viewProviders: [{ provide: ValueService, useClass: FakeValueService }] // },
    // Or replace them all (this component has only one viewProvider)
    set: { viewProviders: [{ provide: ValueService, useClass: FakeValueService }] },
  })
  .createComponent(TestViewProvidersComponent);
  fixture.detectChanges();
  expect(fixture).toHaveText('injected value: faked value');
});
```

--------------------------------

### TestBed Provider Isolation and Hierarchy

Source: https://angular.dev/guide/testing/services

This example verifies the isolation of providers across different levels (TestBed, component, and child component) when using `overrideComponent`. It demonstrates that providers set at different scopes do not conflict.

```typescript
@Component({
  template: '',
  imports: [TestProvidersComponent],
})
class TestComponent {}

const fixture = TestBed.configureTestingModule({
  imports: [TestComponent, TestProvidersComponent],
  providers: [ValueService],
})
.overrideComponent(TestComponent, {
  set: {providers: [{provide: ValueService, useValue: {}}]
},
})
.overrideComponent(TestProvidersComponent, {
  set: {providers: [{provide: ValueService, useClass: FakeValueService}
]},
})
.createComponent(TestComponent);

let testBedProvider!: ValueService;
inject([ValueService], (s: ValueService) => (testBedProvider = s))();

const tcProvider = fixture.debugElement.injector.get(ValueService) as ValueService;
const tpcProvider = fixture.debugElement.children[0].injector.get(
  ValueService,
) as FakeValueService;

expect(testBedProvider).withContext('testBed/tc not same providers').not.toBe(tcProvider);
expect(testBedProvider).withContext('testBed/tpc not same providers').not.toBe(tpcProvider);
expect(testBedProvider instanceof ValueService)
  .withContext('testBedProvider is ValueService')
  .toBe(true);
expect(tcProvider)
  .withContext('tcProvider is {}')
  .toEqual({} as ValueService);
expect(tpcProvider instanceof FakeValueService)
  .withContext('tpcProvider is FakeValueService')
  .toBe(true);
```

--------------------------------

### Angular @loading with minimum and after parameters

Source: https://angular.dev/guide/templates/defer

Demonstrates advanced configuration of the @loading block in an Angular @defer block using 'minimum' and 'after' parameters. These help control the display duration of the loading indicator to prevent flickering. Timers start after loading is triggered.

```html
@defer {
  // Deferred content
}
@loading (after 100ms; minimum 1s) {
  // Loading indicator
}
@placeholder {
  // Placeholder content
}
```

--------------------------------

### Angular Template for innerHTML Binding Example

Source: https://angular.dev/best-practices/security

This HTML template illustrates two ways of displaying a variable `htmlSnippet`: using interpolation `{{ htmlSnippet }}` and binding to the `[innerHTML]` property. Interpolation escapes HTML, while `innerHTML` interprets it, making it vulnerable if not sanitized.

```html
<h3>Binding innerHTML</h3>
<p>Bound value:</p>
<p class="e2e-inner-html-interpolated">{{ htmlSnippet }}</p>
<p>Result of binding to innerHTML:</p>
<p class="e2e-inner-html-bound" [innerHTML]="htmlSnippet"></p>
```

--------------------------------

### Responsive Image with 'sizes="50vw"'

Source: https://angular.dev/guide/image-optimization

This example shows a responsive image configuration where the `sizes` attribute is set to `50vw`. This indicates that the image will occupy approximately half the viewport width, prompting the browser to download a smaller, more appropriately sized image from the `srcset`.

```html
<img ngSrc="image.jpg" width="300" height="200" sizes="50vw" />

```

--------------------------------

### Angular Inject Function in Tests

Source: https://angular.dev/guide/testing/utility-apis

Illustrates using the `inject` function within an `it` block to get access to services provided by `TestBed`. This allows for cleaner injection of dependencies directly within test cases.

```typescript
describe('use inject within `it`', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ValueService] });
  });

  it('should use modified providers', inject([ValueService], (service: ValueService) => {
    service.setValue('value modified in beforeEach');
    expect(service.getValue()).toBe('value modified in beforeEach');
  }));
});
```

--------------------------------

### Enable Hydration and Event Replay in Angular

Source: https://angular.dev/guide/hydration

This code demonstrates how to enable both client-side hydration and the Event Replay feature during application bootstrap. It's essential for ensuring a smooth user experience with server-side rendering by capturing and replaying events that occur before the DOM is fully hydrated.

```typescript
import {bootstrapApplication} from '@angular/platform-browser';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {App} from './app';

bootstrapApplication(App, {
  providers: [
    provideClientHydration(withEventReplay())
  ]
});
```

--------------------------------

### Commit changes with Git

Source: https://github.com/angular/angular/blob/main/CONTRIBUTING

Commit your changes using a descriptive message that follows the project's conventions. The `--all` flag stages all modified and deleted files.

```git
git commit --all
```

--------------------------------

### Configure Angular View Encapsulation

Source: https://angular.dev/guide/components/styling

This code illustrates how to set the view encapsulation mode for an Angular component using the 'encapsulation' property within the @Component decorator. It shows setting the mode to ViewEncapsulation.None.

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'profile-photo',
  template: `...`,
  styles: [
    `...`
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ProfilePhoto {
}
```

--------------------------------

### CSS Animations: Keyframes and Transitions

Source: https://next.angular.dev/guide/animations/migration

Demonstrates native CSS animations using `@keyframes` for defining animation sequences and `transition` properties for smooth style changes. This approach avoids Angular's animation module for simpler effects.

```css
@keyframes sharedAnimation {
  to {
    height: 0;
    opacity: 1;
    background-color: 'red';
  }
}

.animated-class {
  animation: sharedAnimation 1s;
}

.open {
  height: '200px';
  opacity: 1;
  background-color: 'yellow';
  transition: all 1s;
}

.closed {
  height: '100px';
  opacity: 0.8;
  background-color: 'blue';
  transition: all 1s;
}

.example-element {
  animation-duration: 1s;
  animation-delay: 500ms;
  animation-timing-function: ease-in-out;
}

.example-shorthand {
  animation: exampleAnimation 1s ease-in-out 500ms;
}

.example-element {
  transition-duration: 1s;
  transition-delay: 500ms;
  transition-timing-function: ease-in-out;
  transition-property: margin-right;
}

.example-shorthand {
  transition: margin-right 1s ease-in-out 500ms;
}
```

--------------------------------

### Testing Zone-Awareness with Promises and JSONP

Source: https://angular.dev/guide/testing/components-scenarios

Illustrates testing scenarios involving zone-awareness, specifically with Promises and a simulated JSONP request. It shows how Angular's async utilities ensure that asynchronous operations, even those not explicitly managed by Zone.js, are correctly handled.

```typescript
describe('test jsonp', () => {
  function jsonp(url: string, callback: () => void) {
    // do a jsonp call which is not zone aware
  }

  // need to config __zone_symbol__supportWaitUnResolvedChainedPromise flag
  // before loading zone.js/testing
  it('should wait until promise.then is called', waitForAsync(() => {
    let finished = false;
    new Promise((res) => {
      jsonp('localhost:8080/jsonp', () => {
        // success callback and resolve the promise
        finished = true;
        res();
      });
    }).then(() => {
      // async will wait until promise.then is called
      // if __zone_symbol__supportWaitUnResolvedChainedPromise is set
      expect(finished).toBe(true);
    });
  }));
});

```

--------------------------------

### Define Basic Component Harness (TypeScript)

Source: https://angular.dev/guide/testing/creating-component-harnesses

This snippet shows the minimal definition of a ComponentHarness, which requires a static hostSelector property to identify the component's host element. This is the starting point for creating reusable test harnesses.

```typescript
class MyPopupHarness extends ComponentHarness {
  static hostSelector = 'my-popup';
}
```

--------------------------------

### NgIf Binding - Conditional Rendering

Source: https://angular.dev/guide/directives

Demonstrates the NgIf structural directive for conditionally rendering elements in an Angular template. Includes examples of rendering components, handling null values, and using the template syntax.

```html
<app-item-detail *ngIf="isActive"></app-item-detail>

<p *ngIf="currentCustomer">Hello, {{ currentCustomer.name }}</p>

<p *ngIf="nullCustomer">Hello, {{ nullCustomer }}</p>

<ng-template [ngIf]="currentItem.name">Add {{ currentItem.name }} with template</ng-template>
```

--------------------------------

### Angular HeroDetailComponent Service Override Setup

Source: https://angular.dev/guide/testing/components-scenarios

Demonstrates how to override the HeroDetailService for testing purposes. A spy service `HeroDetailServiceSpy` is created to mock the `getHero` and `saveHero` methods, allowing for controlled testing of the component's interactions with its service.

```typescript
import {HeroDetailService} from './hero-detail.service';
import {Hero} from '../model/hero';
import {asyncData} from '../../testing';

function overrideSetup() {
  class HeroDetailServiceSpy {
    testHero: Hero = {...testHero};
    /* emit cloned test hero */
    getHero = jasmine
      .createSpy('getHero')
      .and.callFake(() => asyncData(Object.assign({}, this.testHero)));
    /* emit clone of test hero, with changes merged in */
    saveHero =
      jasmine.createSpy('saveHero').and.callFake((hero: Hero) => asyncData(Object.assign(this.testHero, hero)));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [HeroDetailComponent, HeroListComponent],
        providers: [
          // Override HeroDetailService with the spy version
          { provide: HeroDetailService, useValue: new HeroDetailServiceSpy() },
          provideRouter([{path: 'heroes/:id', component: HeroDetailComponent}]),
        ],
      }),
    );
  });
// ... rest of the tests for this describe block
}
```

--------------------------------

### Enable JSONP Support with HttpClient

Source: https://angular.dev/guide/http/setup

The `withJsonpSupport()` function enables the `.jsonp()` method on `HttpClient`, facilitating GET requests using the JSONP convention for cross-domain data loading. It's recommended to prefer CORS over JSONP for cross-domain requests when possible.

```typescript
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withJsonpSupport())
  ]
});
```

--------------------------------

### Define Angular Component Styles Inline

Source: https://angular.dev/guide/components/styling

This snippet shows how to define CSS styles directly within the @Component decorator using the 'styles' property. These styles are scoped to the component and are compiled with its JavaScript.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'profile-photo',
  template: `![Your profile photo](profile-photo.jpg)`,
  styles: [
    `img { border-radius: 50%; }`
  ],
})
export class ProfilePhoto {
}
```

--------------------------------

### Generate Angular Directive using CLI

Source: https://angular.dev/guide/directives/structural-directives

This command uses the Angular CLI to generate a new directive named 'select'. The CLI creates the directive class file and sets up the basic structure, including the CSS selector.

```bash
ng generate directive select
```

--------------------------------

### Route Providers for Feature-Specific Services

Source: https://angular.dev/guide/di/dependency-injection-providers

This example illustrates how to configure providers directly on specific routes in Angular. These providers are scoped to the routes and their associated lazy-loaded modules, making them suitable for feature-specific services and configurations.

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    providers: [
      AdminService, // Only loaded with admin routes
      { provide: FEATURE_FLAGS, useValue: { adminMode: true } }
    ],
    loadChildren: () => import('./admin/admin.routes')
  },
  {
    path: 'shop',
    providers: [
      ShoppingCartService, // Isolated shopping state
      PaymentService
    ],
    loadChildren: () => import('./shop/shop.routes')
  }
];

```

--------------------------------

### HTML: NgIf Conditional Rendering Example

Source: https://angular.dev/guide/directives

HTML template demonstrating the NgIf directive for conditional rendering. It shows how to conditionally display content based on boolean component properties and how to handle null values to prevent errors.

```html
If isActive is true, app-item-detail will render:

Toggle app-item-detail

If currentCustomer isn't null, say hello to Laura:

Hello, {{ currentCustomer.name }}

nullCustomer is null by default. NgIf guards against null. Give it a value to show it:

Hello, {{ nullCustomer }}

Give nullCustomer a value
```

--------------------------------

### POST Request with Request Body

Source: https://angular.dev/guide/http/making-requests

Demonstrates how to make a POST request using HttpClient, including providing a request body and subscribing to the observable.

```APIDOC
## POST /api/config

### Description
Sends data to the server to update configuration. The `body` argument can be various types, which HttpClient serializes accordingly (e.g., JSON for objects, plain text for strings).

### Method
POST

### Endpoint
/api/config

#### Parameters

#### Query Parameters
None

#### Request Body
- **newConfig** (any) - Required - The configuration data to send.

### Request Example
```javascript
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

updateConfig(newConfig: any) {
  this.http.post('/api/config', newConfig).subscribe(config => {
    console.log('Updated config:', config);
  });
}
```

### Response
#### Success Response (200)
- **config** (any) - The updated configuration data.

#### Response Example
```json
{
  "message": "Configuration updated successfully"
}
```
```

--------------------------------

### Override Component Providers with TestBed (TypeScript)

Source: https://angular.dev/guide/testing/services

This snippet demonstrates how to override the providers for a component within a test setup using Angular's TestBed. It shows how to replace a service with a fake implementation and verifies the injected value.

```typescript
it("should override TestProvidersComp's ValueService provider", () => {
  const fixture = TestBed.configureTestingModule({
    // Import the component to be tested
    imports: [TestProvidersComponent],
  }).overrideComponent(TestProvidersComponent, {
    // Replace the existing providers with a new configuration
    // set: { providers: [{ provide: ValueService, useClass: FakeValueService }] },
    // Or replace them all (this component has only one provider)
    set: { providers: [{ provide: ValueService, useClass: FakeValueService }] },
  }).createComponent(TestProvidersComponent);

  fixture.detectChanges();
  expect(fixture).toHaveText('injected value: faked value', 'text');

  // Explore the providerTokens
  const tokens = fixture.debugElement.providerTokens;
  expect(tokens).withContext('component ctor').toContain(fixture.componentInstance.constructor);
  expect(tokens).withContext('TestProvidersComp').toContain(TestProvidersComponent);
  expect(tokens).withContext('ValueService').toContain(ValueService);
});
```

--------------------------------

### Platform Browser Specifics

Source: https://angular.dev/api

APIs related to bootstrapping applications in the browser, managing DOM, and handling browser-specific events.

```APIDOC
## Platform Browser API

### Description
Provides functionalities for bootstrapping Angular applications in a browser environment, managing DOM manipulation, and handling browser events.

### Endpoints

- **`bootstrapApplication(appComponent, options)`**: Bootstraps an Angular application.
- **`Title`**: Service for managing the browser document title.
- **`DomSanitizer`**: Sanitizes HTML, URLs, and other values to prevent XSS vulnerabilities.
- **`EventManager`**: Manages browser events.

### Example Usage (Conceptual)
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
```
```

--------------------------------

### Angular @defer with 'hydrate on interaction'

Source: https://angular.dev/guide/incremental-hydration

This code example illustrates an Angular @defer block with the 'hydrate on interaction' trigger. Dependencies are loaded and content hydrated upon user interaction (click or keydown) with a specified element.

```typescript
@defer (hydrate on interaction) {
}
@placeholder {

Large component placeholder

}

```

--------------------------------

### Angular Component for innerHTML Binding Example

Source: https://angular.dev/best-practices/security

This TypeScript component demonstrates how Angular handles binding a potentially unsafe HTML snippet to the `innerHTML` property. Angular automatically sanitizes the input, removing script tags while preserving safe content.

```typescript
import {Component} from '@angular/core';
@Component({
  selector: 'app-inner-html-binding',
  templateUrl: './inner-html-binding.component.html',
})
export class InnerHtmlBindingComponent {
  // For example, a user/attacker-controlled value from a URL.
  htmlSnippet = 'Template <script>alert("0wned")</script>';
}
```

--------------------------------

### Angular Factory Provider for Dynamic Services (useFactory)

Source: https://angular.dev/guide/di/dependency-injection-providers

Shows how to use Angular's `useFactory` provider to create services dynamically. The factory function can have its own dependencies, allowing for complex initialization logic. This example demonstrates creating a `LoggerService` using configuration values provided by `APP_CONFIG`.

```typescript
import { InjectionToken, Injectable, Component, inject } from '@angular/core';

// Assume AppConfig and APP_CONFIG are defined as in the useValue example
interface AppConfig { logLevel: string; endpoint: string; }
const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// A mock LoggerService that takes configuration
@Injectable()
class LoggerService {
  constructor(private logLevel: string, private endpoint: string) {
    console.log(`LoggerService initialized with level: ${logLevel}, endpoint: ${endpoint}`);
  }
  log(message: string) {
    console.log(`[${this.logLevel}] ${message} (to ${this.endpoint})`);
  }
}

// Factory function to create LoggerService
export const loggerFactory = (config: AppConfig) => {
  return new LoggerService(config.logLevel, config.endpoint);
};

// Provider configuration using useFactory
const loggerServiceProvider = {
  provide: LoggerService,
  useFactory: loggerFactory,
  deps: [APP_CONFIG] // Dependencies for the factory function
};

// Example component using the factory-provided service
@Component({
  selector: 'app-factory-logger',
  standalone: true,
  imports: [], // Import necessary modules if any
  providers: [
    // Provide mock AppConfig for demonstration
    { provide: APP_CONFIG, useValue: { logLevel: 'INFO', endpoint: '/api/logs' } },
    loggerServiceProvider
  ],
  template: '<div>Check console for logger output.</div>'
})
export class FactoryLoggerComponent {
  private loggerService = inject(LoggerService);

  constructor() {
    this.loggerService.log('Factory logger is working!');
  }
}

```

--------------------------------

### Overriding Component Providers with a Spy (TypeScript)

Source: https://angular.dev/guide/testing/components-scenarios

Demonstrates how to override the `providers` of a specific component (`HeroDetailComponent`) during testing. This example replaces the default `HeroDetailService` with a `HeroDetailServiceSpy`, a mock object that allows spying on method calls.

```typescript
describe('when override its provided HeroDetailService', overrideSetup);

function overrideSetup() {
  class HeroDetailServiceSpy {
    testHero: Hero = { ...testHero }; /* emit cloned test hero */
    getHero = jasmine
      .createSpy('getHero')
      .and.callFake(() => asyncData(Object.assign({}, this.testHero)));
    /* emit clone of test hero, with changes merged in */
    saveHero =
      jasmine.createSpy('saveHero')
        .and.callFake((hero: Hero) => asyncData(Object.assign(this.testHero, hero)));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig,
        {
          imports: [HeroDetailComponent, HeroListComponent],
          providers: [
            provideRouter([
              { path: 'heroes', component: HeroListComponent },
              { path: 'heroes/:id', component: HeroDetailComponent },
            ]),
            HttpClient,
            HttpHandler,
            // HeroDetailService at this level is IRRELEVANT!
            { provide: HeroDetailService, useValue: {} },
          ],
        }),
    )
    .overrideComponent(HeroDetailComponent, {
      set: { providers: [{ provide: HeroDetailService, useClass: HeroDetailS }]
    });
  });
}
```

--------------------------------

### WelcomeComponent Implementation

Source: https://angular.dev/guide/testing/components-scenarios

The WelcomeComponent displays a welcome message based on the user's login status retrieved from the UserService. It utilizes Angular signals for state management.

```typescript
import {Component, inject, signal} from '@angular/core';
import {UserService} from '../model/user.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  template: '{{welcome()}}',
})
export class WelcomeComponent {
  welcome = signal('');
  private userService = inject(UserService);

  constructor() {
    this.welcome.set(
      this.userService.isLoggedIn() ? 'Welcome, ' + this.userService.user().name : 'Please log in.'
    );
  }
}
```

--------------------------------

### Define Angular Component with Separate Template and Style Files

Source: https://angular.dev/guide/components

This example shows how to define an Angular component by referencing external HTML and CSS files for its template and styles. This approach separates presentation from behavior, improving project organization. The `templateUrl` and `styleUrl` properties point to the respective files, relative to the component's directory.

```typescript
@Component({
  selector: 'profile-photo',
  templateUrl: 'profile-photo.html',
  styleUrl: 'profile-photo.css'
})
export class ProfilePhoto { }
```

--------------------------------

### Reactive Forms: Single Control Setup in Angular

Source: https://angular.dev/guide/forms

Demonstrates setting up a single form control using Angular's reactive forms. It defines a FormControl instance directly in the component class and links it to a form element in the template using the `formControl` directive. This approach makes the component class the source of truth for the form model.

```typescript
import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-reactive-favorite-color',
  template: `
    Favorite Color:
    <input type="text" [formControl]="favoriteColorControl">
  `,
  imports: [ReactiveFormsModule]
})
export class FavoriteColorReactiveComponent {
  favoriteColorControl = new FormControl('');
}
```

--------------------------------

### Angular HeroDetailComponent Test Suite

Source: https://angular.dev/guide/testing/components-scenarios

The main test suite for the HeroDetailComponent. It organizes tests into different describe blocks, including setups for HeroModule, service overrides, FormsModule, and SharedModule. This provides a comprehensive test coverage for the component.

```typescript
describe('HeroDetailComponent', () => {
  describe('with HeroModule setup', heroModuleSetup);
  describe('when override its provided HeroDetailService', overrideSetup);
  describe('with FormsModule setup', formsModuleSetup);
  describe('with SharedModule setup', sharedModuleSetup);
});
```

--------------------------------

### Angular Route Matching Order Example

Source: https://angular.dev/guide/routing/define-routes

This code illustrates the importance of route order in Angular's first-match wins strategy. More specific routes, like `users/new` and `users/:id`, should precede less specific ones like `users`. The wildcard route `**` must always be the last entry to ensure it only matches unhandled routes.

```typescript
const routes: Routes = [
  { path: '', component: HomeComponent }, // Empty path
  { path: 'users/new', component: NewUserComponent }, // Static, most specific
  { path: 'users/:id', component: UserDetailComponent }, // Dynamic
  { path: 'users', component: UsersComponent }, // Static, less specific
  { path: '**', component: NotFoundComponent } // Wildcard - always last
];
```

--------------------------------

### Access Query Parameters in Component

Source: https://angular.dev/guide/routing/read-route-state

Shows how to access query parameters within an Angular component using the 'queryParams' observable from ActivatedRoute. This example dynamically loads products based on 'sort' and 'page' query parameters.

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  template: `
    <div>
      <select (change)="updateSort($event)">
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>
    </div>
  `,
})
export class ProductListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    // Access query parameters reactively
    this.route.queryParams.subscribe(params => {
      const sort = params['sort'] || 'price';
      const page = Number(params['page']) || 1;
      this.loadProducts(sort, page);
    });
  }

  updateSort(event: Event) {
    const sort = (event.target as HTMLSelectElement).value;
    // Update URL with new query parameter
    this.router.navigate([], {
      queryParams: { sort },
      queryParamsHandling: 'merge' // Preserve other query parameters
    });
  }

  loadProducts(sort: string, page: number) {
    console.log(`Loading products: sort=${sort}, page=${page}`);
    // Actual product loading logic would go here
  }
}
```

--------------------------------

### Configure Trusted Types Headers for Angular

Source: https://angular.dev/best-practices/security

Examples of Content-Security-Policy headers configured for Trusted Types in Angular applications. These headers specify which Angular policies are enabled, such as 'angular', 'angular#unsafe-bypass', 'angular#unsafe-jit', and 'angular#bundler', to enforce security and prevent XSS vulnerabilities.

```nginx
Content-Security-Policy: trusted-types angular; require-trusted-types-for 'script';
```

```nginx
Content-Security-Policy: trusted-types angular angular#unsafe-bypass; require-trusted-types-for 'script';
```

```nginx
Content-Security-Policy: trusted-types angular angular#unsafe-jit; require-trusted-types-for 'script';
```

```nginx
Content-Security-Policy: trusted-types angular angular#bundler; require-trusted-types-for 'script';
```

--------------------------------

### HTML: NgClass Binding Example

Source: https://angular.dev/guide/directives

HTML template illustrating the use of the NgClass directive to dynamically apply CSS classes to an element based on component state. It shows how to bind an object of class names to the directive.

```html
currentClasses is {{ currentClasses | json }}

This div is initially saveable, unchanged, and special.

*   saveable 
*   modified: 
*   special: 

Refresh currentClasses

This div should be {{ canSave ? "": "not"}} saveable, {{ isUnchanged ? "unchanged" : "modified" }} and {{ isSpecial ? "": "not"}} special after clicking "Refresh".

  
  
...
```

--------------------------------

### Supported Operators in Angular Expressions

Source: https://angular.dev/guide/templates/expression-syntax

Angular expressions support most standard JavaScript operators for arithmetic, logical operations, comparisons, and assignments. It also includes Angular-specific operators like pipe and optional chaining.

```typescript
// Arithmetic and Concatenation
const sum = 1 + 2;
const remainder = 17 % 5;
const exponent = 10 ** 3;

// Logical Operators
const logicalAnd = a && b;
const logicalOr = a || b;
const logicalNot = !a;

// Comparison Operators
const greaterThan = a > b;
const equalTo = a === b;

// Conditional (Ternary) Operator
const conditionResult = a > b ? true : false;

// Nullish Coalescing
const defaultValue = possiblyNullValue ?? 'default';

// Property Accessor
const personName = person['name'];

// Assignment Operators
a = b;
a += b;

// Angular Specific Operators
const formattedTotal = total | currency;
const nestedValue = someObj.someProp?.nestedProp;
const nonNullValue = someObj!.someProp;

```

--------------------------------

### Override Angular Component Provider with TestBed

Source: https://angular.dev/guide/testing/services

Illustrates overriding a component's providers during testing using `TestBed.configureTestingModule` and `overrideComponent`. This example shows how to remove a specific provider (`ValueService`) from a component's configuration, which can be useful for isolating dependencies.

```typescript
it("should override TestProvidersComp's ValueService provider", () => {
  const fixture = TestBed.configureTestingModule({
      imports: [TestProvidersComponent],
    })
    .overrideComponent(TestProvidersComponent, {
      remove: { providers: [ValueSe

```

--------------------------------

### Expose Inputs and Outputs from Host Directives in Angular

Source: https://angular.dev/guide/directives/directive-composition-api

This example shows how to explicitly include inputs and outputs from a host directive ('MenuBehavior') into the public API of an Angular component ('AdminMenu'). This allows consumers of 'AdminMenu' to bind to these specific inputs and outputs in their templates.

```typescript
@Component({
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [
    {
      directive: MenuBehavior,
      inputs: ['menuId'],
      outputs: ['menuClosed'],
    },
  ],
})
export class AdminMenu { }
```

--------------------------------

### Angular Defer Prefetch Trigger

Source: https://angular.dev/guide/templates/defer

Allows prefetching of JavaScript for deferred blocks before they are shown. Combines a main trigger with a prefetch trigger using a semicolon. Example shows prefetching on idle and rendering on interaction.

```typescript
@defer (on interaction; prefetch on idle) { }
@placeholder {

Large component placeholder

}
```

--------------------------------

### Angular Structural Directive: Adding Input

Source: https://angular.dev/guide/directives/structural-directives

This TypeScript code shows how to add a required input property named 'selectFrom' to an Angular structural directive. This input will be used to pass data into the directive for processing.

```typescript
import { Directive, TemplateRef, ViewContainerRef, inject, input } from '@angular/core';

@Directive({
  selector: '[select]',
})
export class SelectDirective {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  selectFrom = input.required();
}
```

--------------------------------

### Mutate Server State with HttpClient POST

Source: https://angular.dev/guide/http/making-requests

Explains how to modify data on the server using `HttpClient.post()`. This method is typically used for creating new resources or updating existing ones. It requires a URL and a request body containing the data to be sent. The example demonstrates a basic POST request, with the understanding that further configuration like headers and parameters can be added.

```typescript
import { HttpClient } from '@angular/common/http';

// Assuming http is an instance of HttpClient

interface NewUserData {
  name: string;
  email: string;
}

const newUser: NewUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com'
};

// Create a new user on the server
http.post('/api/users', newUser).subscribe(response => {
  console.log('User created:', response);
});

// Example with a specific response type
interface UserCreationResponse {
  id: number;
  message: string;
}

http.post<UserCreationResponse>('/api/users', newUser).subscribe(response => {
  console.log(`User with ID ${response.id} created successfully.`);
});
```

--------------------------------

### Angular @defer with combined triggers

Source: https://angular.dev/guide/incremental-hydration

This example shows an Angular @defer block using both a regular trigger ('on idle') and a hydration trigger ('hydrate on interaction'). Hydration triggers are primarily for initial load optimization.

```typescript
@defer (on idle; hydrate on interaction) {
}
@placeholder{

Example Placeholder

```

--------------------------------

### Configure Secondary Routes with Named Outlets

Source: https://angular.dev/guide/routing/show-routes-with-outlets

This example shows how to configure secondary routes using named outlets. By assigning a unique name to the `outlet` property in the route definition, you can direct content to specific named outlets within your application's templates.

```typescript
{
  path: 'user/:id',
  component: UserDetails,
  outlet: 'additional-actions'
}
```

--------------------------------

### Implementing Input Transforms in Angular

Source: https://angular.dev/guide/components/inputs

Demonstrates how to use an input transform function with the @Input decorator to modify input values when they are set. This example shows a `trimString` function to remove leading/trailing whitespace from a string input.

```typescript
@Component({
  selector: 'custom-slider',
  ...
})
export class CustomSlider {
  @Input({transform: trimString})
  label = '';
}

function trimString(value: string | undefined) {
  return value?.trim() ?? '';
}
```

--------------------------------

### Enable Caching for POST Requests

Source: https://angular.dev/guide/hybrid-rendering

By default, only GET and HEAD requests are cached. This configuration enables caching for POST requests, which should only be used when POST requests are idempotent and safe to reuse between server and client renders, such as for GraphQL queries.

```typescript
withHttpTransferCacheOptions({
  includePostRequests: true,
});
```

--------------------------------

### Angular Structural Directive Shorthand Equivalence

Source: https://angular.dev/guide/directives/structural-directives

Shows two equivalent ways to apply a structural directive. The first uses the ng-template explicitly, while the second uses the shorthand syntax with an asterisk. Both achieve the same result of applying the directive and its bindings.

```html
<ng-template [select]="'someDataSource' as data">
  The data is: {{ data }}
</ng-template>

<div *select="'someDataSource' as data">
  The data is: {{ data }}
</div>
```

--------------------------------

### Compose Harnesses for Subcomponents (TypeScript)

Source: https://angular.dev/guide/testing/creating-component-harnesses

This example shows how a parent component's harness can leverage harnesses of its subcomponents. MyMenuHarness uses locatorFor to find MyPopupHarness and locatorForAll to find MyMenuItemHarness instances, enabling interaction with nested components.

```typescript
class MyMenuItemHarness extends ComponentHarness {
  static hostSelector = 'my-menu-item';
}

class MyMenuHarness extends ComponentHarness {
  static hostSelector = 'my-menu';
  protected getPopupHarness = this.locatorFor(MyPopupHarness);

  /**
   * Gets the currently shown menu items (empty list if menu is closed).
   */
  getItems = this.locatorForAll(MyMenuItemHarness);

  /**
   * Toggles open state of the menu.
   */
  async toggle(): Promise<void> {
    const popupHarness = await this.getPopupHarness();
    return popupHarness.toggle();
  }
}
```

--------------------------------

### Create Hero Detail Component Test

Source: https://angular.dev/guide/testing/components-scenarios

Sets up the testing environment and creates an instance of the HeroDetailComponent for testing. It uses HttpTestingController to mock HTTP requests and verifies that the component displays the correct hero name.

```typescript
it("should display 1st hero's name", async () => {
  const expectedHero = firstHero;
  await createComponent(expectedHero.id).then(() => {
    expect(page.nameDisplay.textContent).toBe(expectedHero.name);
  });
});

/////////// Helpers //////
/** Create the HeroDetailComponent, initialize it, set test variables */
async function createComponent(id: number) {
  harness = await RouterTestingHarness.create();
  component = await harness.navigateByUrl(`/heroes/${id}`, HeroDetailComponent);
  page = new Page();
  const request = TestBed.inject(HttpTestingController).expectOne(`api/heroes/?id=${id}`);
  const hero = getTestHeroes().find((h) => h.id === Number(id));
  request.flush(hero ? [hero] : []);
  harness.detectChanges();
}
```

--------------------------------

### Template-Driven Forms: Single Control Setup in Angular

Source: https://angular.dev/guide/forms

Illustrates setting up a single form control using Angular's template-driven forms. The `NgModel` directive in the template implicitly creates and manages a FormControl instance. The template serves as the source of truth for the form model in this approach.

```typescript
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-template-favorite-color',
  template: `
    Favorite Color:
    <input type="text" [(ngModel)]="favoriteColor">
  `,
  imports: [FormsModule]
})
export class FavoriteColorTemplateComponent {
  favoriteColor = '';
}
```

--------------------------------

### Eagerly Load Components in Angular Routes

Source: https://angular.dev/guide/routing/define-routes

This example demonstrates eager component loading. When a route is defined with the `component` property, the component's code is included in the same JavaScript bundle as the route configuration. This means components are available immediately upon initial page load, leading to faster transitions but potentially slower initial load times.

```typescript
import { Routes } from "@angular/router";
import { HomePage } from "./components/home/home-page"
import { LoginPage } from "./components/auth/login-page"

export const routes: Routes = [
  // HomePage and LoginPage are both directly referenced in this config,
  // so their code is eagerly included in the same JavaScript bundle as this file.
  { path: "", component: HomePage },
  { path: "login", component: LoginPage }
]
```

--------------------------------

### Reorder List Animation with Angular Animations Package

Source: https://next.angular.dev/guide/animations/migration

Demonstrates how to animate items in a reordering list using Angular's `animations` package. It defines enter and leave transitions to animate items as the list is shuffled.

```typescript
import {Component, signal} from '@angular/core';
import {trigger, transition, animate, query, style} from '@angular/animations';

@Component({
  selector: 'app-reorder',
  templateUrl: './reorder.component.html',
  styleUrls: ['./reorder.component.css'],
  animations: [
    trigger('itemAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(-10px)'}),
        animate('300ms', style({opacity: 1, transform: 'translateX(none)'})),
      ]),
      transition(':leave', [
        style({opacity: 1, transform: 'translateX(none)'}),
        animate('300ms', style({opacity: 0, transform: 'translateX(-10px)'})),
      ]),
    ]),
  ],
})
export class ReorderComponent {
  show = signal(true);
  items = ['stuff', 'things', 'cheese', 'paper', 'scissors', 'rock'];

  randomize() {
    const randItems = [...this.items];
    const newItems = [];
    for (let i of this.items) {
      const max: number = this.items.length - newItems.length;
      const randNum = Math.floor(Math.random() * max);
      newItems.push(...randItems.splice(randNum, 1));
    }
    this.items = newItems;
  }
}
```

```html
Reordering List Example
=======================

Randomize

@for(item of items; track item) {
*   {{ item }}
}
```

```css
.items { list-style: none; padding: 0; margin: 0;}
```

--------------------------------

### HTML: NgFor Binding Example

Source: https://angular.dev/guide/directives

HTML template using the NgFor directive to iterate over a collection and render a list of items. It demonstrates basic list rendering and also shows variations with index access using different separators.

```html
{{ item.name }}

*ngFor with ItemDetailComponent element

#### *ngFor with index

with _semi-colon_ separator

{{ i + 1 }} - {{ item.name }}

with _comma_ separator

{{ i + 1 }} - {{ item.name }}
```

--------------------------------

### Create a new Git branch for changes

Source: https://github.com/angular/angular/blob/main/CONTRIBUTING

Before making changes, create a new git branch from the main branch in your forked repository. This isolates your work and makes it easier to manage.

```git
git checkout -b my-fix-branch main
```

--------------------------------

### Angular InjectionToken with Factory for Global Dependencies

Source: https://angular.dev/guide/di/dependency-injection-providers

Provides global dependencies using InjectionToken and factory functions, ideal when a class cannot be used. It supports injecting other services and is tree-shakeable. This example demonstrates creating a type-safe logger function, providing browser Storage APIs, and complex configurations with runtime logic.

```typescript
import { InjectionToken, inject } from '@angular/core';
import { APP_CONFIG } from './config.token';

// Logger function type
export type LoggerFn = (level: string, message: string) => void;

// Global logger function with dependencies
export const LOGGER_FN = new InjectionToken('logger.function', {
  providedIn: 'root',
  factory: () => {
    const config = inject(APP_CONFIG);
    return (level: string, message: string) => {
      if (config.features.logging !== false) {
        console[level](`[${new Date().toISOString()}] ${message}`);
      }
    };
  }
});

// Providing browser APIs as tokens
export const LOCAL_STORAGE = new InjectionToken('localStorage', {
  factory: () => window.localStorage
});

export const SESSION_STORAGE = new InjectionToken('sessionStorage', {
  providedIn: 'root',
  factory: () => window.sessionStorage
});

// Complex configuration with runtime logic
export const FEATURE_FLAGS = new InjectionToken('feature.flags', {
  providedIn: 'root',
  factory: () => {
    const flags = new Map();
    // Parse from environment or URL params
    const urlParams = new URLSearchParams(window.location.search);
    const enableBeta = urlParams.get('beta') === 'true';
    flags.set('betaFeatures', enableBeta);
    flags.set('darkMode', true);
    flags.set('newDashboard', false);
    return flags;
  }
});
```

--------------------------------

### Enable i18n Support for Hydration in Angular

Source: https://angular.dev/guide/hydration

By default, Angular skips hydration for components with i18n blocks. This code snippet shows how to enable hydration for i18n blocks by including `withI18nSupport` in the `provideClientHydration` configuration.

```typescript
import { bootstrapApplication, provideClientHydration, withI18nSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideClientHydration(withI18nSupport())
  ]
});
```

--------------------------------

### Angular Component Testing with DebugElement and References

Source: https://angular.dev/guide/testing/services

Demonstrates advanced Angular component testing techniques using `DebugElement` to inspect component structure, query elements, and access template references. It shows how to create a component, detect changes, access child components, and verify template reference variables (`#nc`, `#content`).

```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ShellComponent } from './demo';

describe('ShellComponent testing', () => {
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShellComponent] // Assuming ShellComponent is declared here
    }).compileComponents();
  });

  it('should render child components and check references', () => {
    fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    // NeedsContentComp is the child of ShellComp
    const el = fixture.debugElement.children[0];
    const comp = el.componentInstance;

    expect(comp.children.toArray().length)
      .withContext('three different child components and an ElementRef with #content')
      .toBe(4);

    expect(el.references['nc']).withContext('#nc reference to component').toBe(comp);

    // Filter for DebugElements with a #content reference
    const contentRefs = el.queryAll((de) => de.references['content']);
    expect(contentRefs.length).withContext('elements w/ a #content reference').toBe(4);
  });
});

```

--------------------------------

### HTML: NgIf Binding with Template Example

Source: https://angular.dev/guide/directives

HTML template showcasing NgIf directive usage with a template tag for conditional rendering. It illustrates how to conditionally display content without using the asterisk (*) prefix by employing the <ng-template> element.

```html
Add {{ currentItem.name }} with template
```

--------------------------------

### Configuring Angular Testing Modules (TypeScript)

Source: https://angular.dev/guide/testing/utility-apis

Demonstrates how to configure the testing environment for Angular applications. The `configureTestingModule` method sets up the initial test module with essential declaratives and service substitutes.

```typescript
TestBed.configureTestingModule({
  // Metadata overrides go here
});
```

--------------------------------

### Using viewProviders with skipSelf in Angular

Source: https://angular.dev/guide/di/hierarchical-dependency-injection

Shows how `viewProviders` in a component, combined with `skipSelf`, influences dependency injection. The example demonstrates that when `skipSelf` is used, the injector looks beyond the current component's `viewProviders` to find the requested service.

```typescript
@Component({
  selector: 'app-child',
  …
  viewProviders: [
    {
      provide: AnimalService,
      useValue: { emoji: '🐶' },
    },
  ],
})
```

--------------------------------

### Using Inject for Service Dependency Injection in Tests

Source: https://angular.dev/guide/testing/services

This example shows how to use the `inject` function within an `it` block to obtain an instance of `ValueService`. The service's value is modified in a `beforeEach` block, and the test verifies that the injected service reflects this modification.

```typescript
describe('use inject within \`it\`', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [ValueService]});
  });

  it('should use modified providers', inject([ValueService], (service: ValueService) => {
    service.setValue('value modified in beforeEach');
    expect(service.getValue()).toBe('value modified in beforeEach');
  }));
});
```

--------------------------------

### HTML: NgStyle Binding Example

Source: https://angular.dev/guide/directives

HTML template demonstrating the NgStyle directive for applying dynamic inline styles to an element. It shows how to bind a map of CSS property-value pairs to the directive, allowing styles to change based on component state.

```html
This div is x-large or smaller.

#### [ngStyle] binding to currentStyles - CSS property names

currentStyles is {{ currentStyles | json }}

This div is initially italic, normal weight, and extra large (24px).

  
italic:  |normal:  |xlarge: Refresh currentStyles  
  

This div should be {{ canSave ? "italic": "plain"}}, {{ isUnchanged ? "normal weight" : "bold" }} and, {{ isSpecial ? "extra large": "normal size"}} after clicking "Refresh".

* * *
```

--------------------------------

### Disabling Blur Effect for Placeholders

Source: https://angular.dev/guide/image-optimization

This example shows how to configure NgOptimizedImage to render image placeholders without a blur effect. By providing a `placeholderConfig` object with the `blur` property set to `false`, the placeholder image will appear sharp.

```typescript
image.component.ts

import {
  NgOptimizedImage
} from '@angular/common';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `<img ngSrc="path/to/image.jpg" [placeholderConfig]="{ blur: false }" />`
})
export class ImageComponent {}

```

--------------------------------

### Event Listener Statements in Angular

Source: https://angular.dev/guide/templates/expression-syntax

Explains that event handlers in Angular are treated as statements, not expressions. They support assignment operators (excluding destructuring assignments) but do not support pipes. The syntax is otherwise similar to Angular expressions.

```html
<button (click)="count = count + 1">Increment</button>
<button (click)="user.name = 'New Name'">Change Name</button>

<!-- Unsupported: Destructuring assignment in statements -->
<!-- (click)="[a, b] = [1, 2]" -->

<!-- Unsupported: Pipes in statements -->
<!-- (click)="value | uppercase" -->
```

--------------------------------

### Angular QuestionService for Dynamic Forms

Source: https://angular.dev/guide/forms/dynamic-forms

The `QuestionService` provides an array of different question types (Dropdown, Textbox) to build dynamic forms. It fetches questions from a remote source in a real-world scenario but uses hardcoded data for this example. The questions are sorted by their order property before being returned as an Observable.

```typescript
import { Injectable } from '@angular/core';
import { DropdownQuestion } from './question-dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { of } from 'rxjs';

@Injectable()
export class QuestionService {
  // TODO: get from a remote source of question metadata
  getQuestions() {
    const questions: QuestionBase[] = [
      new DropdownQuestion({
        key: 'favoriteAnimal',
        label: 'Favorite Animal',
        options: [
          { key: 'cat', value: 'Cat' },
          { key: 'dog', value: 'Dog' },
          { key: 'horse', value: 'Horse' },
          { key: 'capybara', value: 'Capybara' },
        ],
        order: 3,
      }),
      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Alex',
        required: true,
        order: 1,
      }),
      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2,
      }),
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }
}
```

--------------------------------

### Angular HeroService Testing (Spies)

Source: https://angular.dev/guide/testing/services

Tests for the HeroService using Jasmine spies to mock the HttpClient. This approach verifies that the service correctly calls the HttpClient's get method and handles expected data or errors.

```typescript
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';// Other importsimport {TestBed} from '@angular/core/testing';import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';import {asyncData, asyncError} from '../../testing/async-observable-helpers';import {Hero} from './hero';import {HeroService} from './hero.service';describe('HeroesService (with spies)', () => { let httpClientSpy: jasmine.SpyObj; ... let heroService: HeroService; beforeEach(() => { // TODO: spy on other methods too httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']); heroService = new HeroService(httpClientSpy); }); it('should return expected heroes (HttpClient called once)', (done: DoneFn) => { const expectedHeroes: Hero[] = [ {id: 1, name: 'A'}, {id: 2, name: 'B'}, ]; httpClientSpy.get.and.returnValue(asyncData(expectedHeroes)); heroService.getHeroes().subscribe({ next: (heroes) => { expect(heroes).withContext('expected heroes').toEqual(expectedHeroes); done(); }, error: done.fail, }); expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1); }); it('should return an error when the server returns a 404', (done: DoneFn) => { const errorResponse = new HttpErrorResponse({ error: 'test 404 error', status: 404, statusText: 'Not Found', }); httpClientSpy.get.and.returnValue(asyncError(errorResponse)); heroService.getHeroes().subscribe({ next: (heroes) => done.fail('expected an error, not heroes'), error: (error) => { expect(error.message).toContain('test 404 error'); done(); }, }); });});
```

--------------------------------

### Define Reactive Form Structure

Source: https://angular.dev/guide/forms/form-validation

Set up the basic structure for an Angular reactive form using the FormGroup and FormControl classes. This example defines controls for 'name', 'role', and 'skill', which can then be used for data binding and validation.

```typescript
import {FormGroup, FormControl} from '@angular/forms';

const actorForm = new FormGroup({
  'name': new FormControl(),
  'role': new FormControl(),
  'skill': new FormControl(),
});
```

--------------------------------

### Angular Component with External Template and Styles

Source: https://angular.dev/guide/testing/components-scenarios

Demonstrates defining Angular components using external template and style files via templateUrl and styleUrls properties. Highlights the need for `TestBed.compileComponents()` in non-CLI environments to compile these external resources before tests run.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner-external.component.html',
  styleUrls: ['./banner-external.component.css'],
})
export class BannerComponent {
  title = 'Test Tour of Heroes';
}

```

--------------------------------

### Angular Router navigate() with Parameters

Source: https://angular.dev/guide/routing/navigate-to-routes

Demonstrates how to use the `router.navigate()` method in Angular to navigate to different routes. This includes simple navigation, navigation with route parameters, query parameters, and matrix parameters. It's a versatile method for controlling application flow.

```typescript
this.router.navigate(['/profile']);
// With route parameters
this.router.navigate(['/users', userId]);
// With query parameters
this.router.navigate(['/search'], { queryParams: { category: 'books', sort: 'price' } });
// With matrix parameters
this.router.navigate(['/products', { featured: true, onSale: true }]);

```

--------------------------------

### Test DashboardHeroComponent within a Host (Angular)

Source: https://angular.dev/guide/testing/components-scenarios

Tests the DashboardHeroComponent when used within a TestHostComponent. This setup verifies how the component interacts with its parent, including input binding and output event handling. It uses the host component's properties to assert the outcome.

```typescript
describe('DashboardHeroComponent when inside a test host', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture;
  let heroEl: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({ ... providers: appProviders });
  }));

  beforeEach(() => {
    // create TestHostComponent instead of DashboardHeroComponent
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    heroEl = fixture.nativeElement.querySelector('.hero');
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should display hero name', () => {
    const expectedPipedName = testHost.hero.name.toUpperCase();
    expect(heroEl.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    click(heroEl); // selected hero should be the same data bound hero
    expect(testHost.selectedHero).toBe(testHost.hero);
  });
});
```

--------------------------------

### Angular Optional Factory Dependencies (useFactory)

Source: https://angular.dev/guide/di/dependency-injection-providers

Illustrates how to handle optional dependencies within an Angular `useFactory` provider. It shows a factory function that accepts a required service and an optional service. If the optional service is not provided, a default implementation is used, demonstrating flexible service creation.

```typescript
import { InjectionToken, Injectable, Component, inject, Optional } from '@angular/core';

// Define mock services
@Injectable({ providedIn: 'root' })
class RequiredService { }

@Injectable({ providedIn: 'root' })
class OptionalService { }

@Injectable({ providedIn: 'root' })
class DefaultService { }

// Define a service that uses the factory
@Injectable()
class MyService {
  constructor(private required: RequiredService, private optional: OptionalService | DefaultService) {
    console.log('MyService instantiated');
  }
}

// Factory function with optional dependency handling
const myServiceFactory = (
  required: RequiredService,
  optional?: OptionalService
) => {
  return new MyService(required, optional || new DefaultService());
};

// Provider configuration with optional dependency
const myServiceProvider = {
  provide: MyService,
  useFactory: myServiceFactory,
  deps: [
    RequiredService,
    [new Optional(), OptionalService] // Mark OptionalService as optional
  ]
};

// Example component using the service
@Component({
  selector: 'app-optional-deps',
  standalone: true,
  providers: [
    RequiredService, // Provide the required service
    // OptionalService is not provided here, so the default will be used
    myServiceProvider
  ],
  template: '<div>Check console for MyService instantiation.</div>'
})
export class OptionalDepsComponent {
  private myService = inject(MyService);
}

```

--------------------------------

### Understanding Route Snapshots in Angular

Source: https://angular.dev/guide/routing/read-route-state

This example shows how to access route information using ActivatedRouteSnapshot, which provides a static view of the route's state at a specific moment. It's useful for accessing parameters, query parameters, and URL segments without relying on observables.

```typescript
import { Component, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  ...
})
export class UserProfileComponent {
  readonly userId: string;
  private route = inject(ActivatedRoute);

  constructor() {
    // Example URL: https://www.angular.dev/users/123?role=admin&status=active#contact
    // Access route parameters from snapshot
    this.userId = this.route.snapshot.paramMap.get('id');

    // Access multiple route elements
    const snapshot = this.route.snapshot;
    console.log({
      url: snapshot.url, // https://www.angular.dev
      // Route parameters object: {id: '123'}
      params: snapshot.params,
      // Query parameters object: {role: 'admin', status: 'active'}
      queryParams: snapshot.queryParams,
    });
  }
}
```

--------------------------------

### Inject Outlet Data in Routed Components

Source: https://angular.dev/guide/routing/show-routes-with-outlets

This example demonstrates how a routed component can inject and use contextual data passed via `routerOutletData`. It uses the `inject` function and the `ROUTER_OUTLET_DATA` token to access the data, here expected to have a `layout` property.

```typescript
import { Component, inject, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';

@Component({
  selector: 'app-stats',
  template: `
    Stats view (layout: {{ outletData().layout }})
  `,
})
export class StatsComponent {
  outletData = inject(ROUTER_OUTLET_DATA) as Signal<{ layout: string }>;
}
```

--------------------------------

### Basic Async Testing with fakeAsync and waitForAsync

Source: https://angular.dev/guide/testing/components-scenarios

Demonstrates running asynchronous tests using Angular's fakeAsync and waitForAsync utilities. It covers scenarios with simple timeouts, promises, and RxJS Observables, ensuring that asynchronous operations complete before assertions are made.

```typescript
import {fakeAsync, tick, waitForAsync} from '@angular/core/testing';
import {interval, of} from 'rxjs';
import {delay, take} from 'rxjs/operators';

describe('Angular async h', () => {
  let actuallyDone: boolean;

  beforeEach(() => {
    actuallyDone = false;
  });

  afterEach(() => {
    expect(actuallyDone).withContext('actuallyDone should be true').toBe(true);
  });

  it('should run normal test', () => {
    actuallyDone = true;
  });

  it('should run normal async test', (done: DoneFn) => {
    setTimeout(() => {
      actuallyDone = true;
      done();
    }, 0);
  });

  it('should run async test with task', waitForAsync(() => {
    setTimeout(() => {
      actuallyDone = true;
    }, 0);
  }));

  it('should run async test with task', waitForAsync(() => {
    const id = setInterval(() => {
      actuallyDone = true;
      clearInterval(id);
    }, 100);
  }));

  it('should run async test with successful promise', waitForAsync(() => {
    const p = new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    p.then(() => {
      actuallyDone = true;
    });
  }));

  it('should run async test with failed promise', waitForAsync(() => {
    const p = new Promise((resolve, reject) => {
      setTimeout(reject, 10);
    });
    p.catch(() => {
      actuallyDone = true;
    });
  }));

  // Use done. Can also use async or fakeAsync.
  it('should run async test with successful delayed Observable', (done: DoneFn) => {
    const source = of(true).pipe(delay(10));
    source.subscribe({
      next: (val) => (actuallyDone = true),
      error: (err) => fail(err),
      complete: done,
    });
  });

  it('should run async test with successful delayed Observable', waitForAsync(() => {
    const source = of(true).pipe(delay(10));
    source.subscribe({
      next: (val) => (actuallyDone = true),
      error: (err) => fail(err),
    });
  }));

  it('should run async test with successful delayed Observable', fakeAsync(() => {
    const source = of(true).pipe(delay(10));
    source.subscribe({
      next: (val) => (actuallyDone = true),
      error: (err) => fail(err),
    });
    tick(10);
  }));
});

```

--------------------------------

### Implement Wildcard Route for 404 Not Found in Angular

Source: https://angular.dev/guide/routing/define-routes

This example configures a wildcard route using `**` to catch any URL that does not match the preceding routes. The `NotFound` component is displayed when a user navigates to an undefined path, providing a user-friendly error page. Wildcard routes are typically placed at the end of the routes array.

```typescript
import { Home } from './home/home.component';
import { UserProfile } from './user-profile/user-profile.component';
import { NotFound } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'user/:id', component: UserProfile },
  { path: '**', component: NotFound }
];
```

--------------------------------

### Testing ValueService with Real and Fake Dependencies

Source: https://angular.dev/guide/testing/services

Contains unit tests for the ValueService using Angular's TestBed. It demonstrates injecting the service, testing asynchronous operations (promises, observables), and using fakeAsync with tick for time-based operations.

```typescript
describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ValueService] });
    service = TestBed.inject(ValueService);
  });

  it('should use ValueService', () => {
    service = TestBed.inject(ValueService);
    expect(service.getValue()).toBe('real value');
  });

  it('can inject a default value when service is not provided', () => {
    expect(TestBed.inject(NotProvided, null)).toBeNull();
  });

  it('test should wait for ValueService.getPromiseValue', waitForAsync(() => {
    service.getPromiseValue().then((value) => expect(value).toBe('promise value'));
  }));

  it('test should wait for ValueService.getObservableValue', waitForAsync(() => {
    service.getObservableValue().subscribe((value) => expect(value).toBe('observable value'));
  }));

  // Must use done. See https://github.com/angular/angular/issues/10127
  it('test should wait for ValueService.getObservableDelayValue', (done: DoneFn) => {
    service.getObservableDelayValue().subscribe((value) => {
      expect(value).toBe('observable delay value');
      done();
    });
  });

  it('should allow the use of fakeAsync', fakeAsync(() => {
    let value: any;
    service.getPromiseValue().then((val: any) => (value = val));
    tick(); // Trigger JS engine cycle until all promises resolve.
    expect(value).toBe('promise value');
  }));
});

export class NotProvided extends ValueService {
  /* example below */
}
```

--------------------------------

### TypeScript: Component Logic for Directive Examples

Source: https://angular.dev/guide/directives

TypeScript code demonstrating component properties and methods used to control the behavior of Angular directives like NgClass, NgStyle, and NgIf. It includes logic for updating component states that affect conditional styling and rendering.

```typescript
setCurrentClasses() {
  // CSS classes: added/removed per current state of component properties
  this.currentClasses = {
    saveable: this.canSave,
    modified: !this.isUnchanged,
    special: this.isSpecial,
  };
}

setCurrentStyles() {
  // CSS styles: set per current state of component properties
  this.currentStyles = {
    'font-style': this.canSave ? 'italic' : 'normal',
    'font-weight': !this.isUnchanged ? 'bold' : 'normal',
    'font-size': this.isSpecial ? '24px' : '12px',
  };
}

isActiveToggle() {
  this.isActive = !this.isActive;
}

giveNullCustomerValue() {
  this.nullCustomer = 'Kelly';
}

resetItems() {
  this.items = Item.items.map((item) => item.clone());
  this.currentItem = this.items[0];
  this.item = this.currentItem;
}

resetList() {
  this.resetItems();
  this.itemsWithTrackByCountReset = 0;
  this.itemsNoTrackByCount = ++this.itemsNoTrackByCount;
}

changeIds() {
  this.items.forEach((i) => (i.id += 1 * this.itemIdIncrement));
  this.itemsWithTrackByCountReset = -1;
  this.itemsNoTrackByCount = ++this.itemsNoTrackByCount;
  this.itemsWithTrackByCount = ++this.itemsWithTrackByCount;
}

clearTrackByCounts() {
  this.resetItems();
  this.itemsNoTrackByCount = 0;
  this.itemsWithTrackByCount = 0;
  this.itemIdIncrement = 1;
}

trackByItems(index: number, item: Item): number {
  return item.id;
}

trackById(index: number, item: any): number {
  return item.id;
}

getValue(event: Event): string {
  return (event.target as HTMLInputElement).value;
}

setUppercaseName(name: string) {
  this.currentItem.name = name.toUpperCase();
}
```

--------------------------------

### Unsupported Operators in Angular Expressions

Source: https://angular.dev/guide/templates/expression-syntax

Angular expressions do not support certain JavaScript operators, including all bitwise operators, object and array destructuring, and the comma operator. These must be handled outside of Angular's expression context.

```typescript
// Bitwise operators are not supported
// const bitwiseAnd = a & b;

// Object destructuring is not supported
// const { name } = person;

// Array destructuring is not supported
// const [firstItem] = items;

// Comma operator is not supported
// x = 1, 2;

```

--------------------------------

### Fetch JSON Data with HttpClient GET

Source: https://angular.dev/guide/http/making-requests

Demonstrates fetching JSON data from a specified endpoint using the `HttpClient.get()` method. It shows how to subscribe to the returned Observable and optionally specify a generic type argument for the expected response data. If the type argument is omitted, the data defaults to the `Object` type. Using `unknown` is recommended for uncertain data structures.

```typescript
import { HttpClient } from '@angular/common/http';

// Assuming http is an instance of HttpClient

// Fetch configuration data, expecting a Config type
http.get<Config>('/api/config').subscribe(config => {
  // process the configuration.
});

// Fetch data without a specific type (defaults to Object)
http.get('/api/data').subscribe(data => {
  // process the data as an Object.
});

// Fetch data with 'unknown' type for uncertain structures
http.get<unknown>('/api/uncertain').subscribe(data => {
  // process the data as unknown, with type guards.
});
```

--------------------------------

### Accessibility Enhancement for @defer Blocks with Live Regions

Source: https://angular.dev/guide/templates/defer

Provides an example of how to enhance accessibility for @defer blocks by wrapping them in a `div` with a `role='alert'` and `aria-live='polite'`. This ensures screen readers announce changes when transitions occur between placeholder, loading, and content/error states.

```html
<div role="alert" aria-live="polite">
  @defer (on timer(2000)) {
    <div>User profile loaded</div>
  } @placeholder {
    Loading user profile...
  } @loading {
    Please wait...
  } @error {
    Failed to load profile
  }
</div>

```

--------------------------------

### Declare and Initialize FormControl in Angular Component

Source: https://angular.dev/guide/forms/reactive-forms

This code demonstrates how to declare a `FormControl` instance within an Angular component. It initializes the control with an empty string and imports `ReactiveFormsModule` for form handling. This setup allows for direct interaction with the form input's state, including listening, updating, and validation.

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css'],
  imports: [ReactiveFormsModule],
})
export class NameEditorComponent {
  name = new FormControl('');

  updateName() {
    this.name.setValue('Nancy');
  }
}
```

--------------------------------

### Angular Logger Service Hierarchy (useClass)

Source: https://angular.dev/guide/di/dependency-injection-providers

Demonstrates a logger service hierarchy in Angular using `useClass`. It shows a base `Logger` and enhanced versions like `BetterLogger` and `EvenBetterLogger` that extend it. The `ExampleComponent` injects the `Logger` token, which resolves to the `EvenBetterLogger` instance via the provided configuration.

```typescript
import { Injectable, inject, Component } from '@angular/core';

// Assume UserService is defined elsewhere and provides user context
class UserService { user = { name: 'Test User' }; getApiBaseUrl() { return 'https://api.example.com'; } getRateLimit() { return 100; } }

// Base logger
@Injectable()
export class Logger {
  log(message: string) {
    console.log(message);
  }
}

// Enhanced logger with timestamp
@Injectable()
export class BetterLogger extends Logger {
  override log(message: string) {
    super.log(`[${new Date().toISOString()}] ${message}`);
  }
}

// Logger that includes user context
@Injectable()
export class EvenBetterLogger extends Logger {
  private userService = inject(UserService);
  override log(message: string) {
    const name = this.userService.user.name;
    super.log(`Message to ${name}: ${message}`);
  }
}

// In your component
@Component({
  selector: 'app-example',
  standalone: true, // Assuming standalone component for simplicity
  providers: [
    UserService, // EvenBetterLogger needs this
    {
      provide: Logger, // The token being provided
      useClass: EvenBetterLogger // The implementation class
    }
  ],
  template: '<div>Example Component</div>'
})
export class ExampleComponent {
  private logger = inject(Logger); // Gets EvenBetterLogger instance

  constructor() {
    this.logger.log('Component initialized');
  }
}
```

--------------------------------

### HeroDetailComponent Implementation with Angular Services

Source: https://angular.dev/guide/testing/components-scenarios

The Angular component for displaying and editing hero details. It injects ActivatedRoute to get the hero ID from route parameters and HeroDetailService to fetch and save hero data. It handles navigation back to the hero list.

```typescript
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Hero } from '../model/hero';
import { sharedImports } from '../shared/shared';
import { HeroDetailService } from './hero-detail.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  providers: [HeroDetailService],
  imports: [...sharedImports],
})
export class HeroDetailComponent {
  private heroDetailService = inject(HeroDetailService);
  // ...
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  hero!: Hero;

  constructor() {
    // get hero when `id` param changes
    this.route.paramMap.subscribe((pmap) => this.getHero(pmap.get('id')));
  }

  private getHero(id: string | null): void {
    // when no id or id===0, create new blank hero
    if (!id) {
      this.hero = { id: 0, name: '' } as Hero;
      return;
    }

    this.heroDetailService.getHero(id).subscribe((hero) => {
      if (hero) {
        this.hero = hero;
      } else {
        this.gotoList(); // id not found; navigate to list
      }
    });
  }

  save(): void {
    this.heroDetailService.saveHero(this.hero).subscribe(() => this.gotoList());
  }

  cancel() {
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

```

--------------------------------

### Provide HttpClient in NgModule (TypeScript)

Source: https://angular.dev/guide/http/setup

Shows how to provide the HttpClient service using `provideHttpClient` for applications that use NgModule-based bootstrap. This configuration is added to the providers of the application's root NgModule.

```typescript
import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  providers: [
    provideHttpClient(),
    // ... other application configuration
  ]
})
export class AppModule {}
```

--------------------------------

### Configure Angular Testing Options in `angular.json`

Source: https://angular.dev/guide/testing

Key testing behaviors for Vitest can be modified within the `test` target of your `angular.json` file. Options include specifying which files to include/exclude, setting up global setup files, defining a providers file for the test environment, enabling code coverage, and specifying browsers for test execution.

```json
{
  "test": {
    "include": [
      "**/*.spec.ts",
      "**/*.test.ts"
    ],
    "exclude": [],
    "setupFiles": [],
    "providersFile": "src/test.providers.ts",
    "coverage": false,
    "browsers": []
  }
}
```

--------------------------------

### Test Case: Displaying First Hero Name (Forms Module)

Source: https://angular.dev/guide/testing/components-scenarios

Tests that the first hero's name is displayed correctly when using the forms module setup. This involves creating the component with a specific hero ID and asserting the text content of the name display element.

```typescript
it("should display 1st hero's name", async () => {
  const expectedHero = firstHero;
  await createComponent(expectedHero.id).then(() => {
    expect(page.nameDisplay.textContent).toBe(expectedHero.name);
  });
});
```

--------------------------------

### Angular HeroTaxReturnService for Managing Tax Return Edits

Source: https://angular.dev/guide/di/hierarchical-dependency-injection

An example of a service designed to manage a single hero's tax return data, including caching, change tracking, saving, and restoring. It injects a global `HeroesService` for persistence operations.

```typescript
import { inject, Injectable } from '@angular/core';
import { HeroTaxReturn } from './hero';
import { HeroesService } from './heroes.service';

@Injectable()
export class HeroTaxReturnService {
  private currentTaxReturn!: HeroTaxReturn;
  private originalTaxReturn!: HeroTaxReturn;
  private heroService = inject(HeroesService);

  set taxReturn(htr: HeroTaxReturn) {
    this.originalTaxReturn = htr;
    this.currentTaxReturn = htr.clone();
  }

  get taxReturn(): HeroTaxReturn {
    return this.currentTaxReturn;
  }

  restoreTaxReturn() {
    this.taxReturn = this.originalTaxReturn;
  }

  saveTaxReturn() {
    this.taxReturn = this.currentTaxReturn;
    this.heroService.saveTaxReturn(this.currentTaxReturn).subscribe();
  }
}
```

--------------------------------

### Generate Angular Service with CLI

Source: https://angular.dev/guide/di/creating-injectable-service

Command to generate a new service file using the Angular CLI. This command creates a dedicated TypeScript file for the service within the 'src' directory.

```bash
ng generate service CUSTOM_NAME
```

--------------------------------

### HTML: NgModel Two-Way Binding Example

Source: https://angular.dev/guide/directives

HTML template demonstrating NgModel for two-way data binding in Angular. It shows how to bind an input element's value to a component property, allowing changes in the input to update the component and vice-versa.

```html
Current item name: {{ currentItem.name }}

without NgModel: 

[(ngModel)]: 

(ngModelChange)="...name=$event": 

(ngModelChange)="setUppercaseName($event)"
```

--------------------------------

### Applying Multiple Animations - CSS

Source: https://angular.dev/guide/animations/css

Demonstrates how to apply multiple CSS animations to a single element using the `animation` shorthand property. Each animation can have independent durations and delays, allowing for complex composed effects. Example shown with `rotate` and `fade-in`.

```css
.target-element { animation: rotate 3s, fade-in 2s;}
```

--------------------------------

### Angular App Component for Dynamic Forms

Source: https://angular.dev/guide/forms/dynamic-forms

The `AppComponent` serves as the root of the application and is responsible for fetching the questions using the `QuestionService`. It then passes this list of questions to the `DynamicFormComponent` for rendering. It imports `AsyncPipe` for handling observables and `DynamicFormComponent` for displaying the form.

```typescript
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { QuestionService } from './question.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <h1>Job Application for Heroes</h1>
    <dynamic-form [questions]="questions$"></dynamic-form>
  `,
  providers: [QuestionService],
  imports: [AsyncPipe, DynamicFormComponent],
})
export class AppComponent {
  questions$: Observable<any[]> = inject(QuestionService).getQuestions();
}
```

--------------------------------

### Test DashboardHeroComponent within a Test Host (Angular)

Source: https://angular.dev/guide/testing/components-scenarios

Tests the DashboardHeroComponent integrated within a TestHostComponent. This setup verifies how the component interacts with its parent, including input binding and event handling. It checks if the selected hero data is correctly passed back to the host.

```typescript
import {Component} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {click} from '../../testing';
import {appProviders} from '../app.config';
import {Hero} from '../model/hero';
import {DashboardHeroComponent} from './dashboard-hero.component';

@Component({
  template: `<app-dashboard-hero [hero]=hero (selected)="onSelected($event)"></app-dashboard-hero>`,
  imports: [DashboardHeroComponent],
})
class TestHostComponent {
  hero: Hero = {id: 42, name: 'Test Name'};
  selectedHero: Hero | undefined;

  onSelected(hero: Hero) {
    this.selectedHero = hero;
  }
}

describe('DashboardHeroComponent when inside a test host', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture;
  let heroEl: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: appProviders,
    });
  }));

  beforeEach(() => {
    // create TestHostComponent instead of DashboardHeroComponent
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    heroEl = fixture.nativeElement.querySelector('.hero');
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should display hero name', () => {
    const expectedPipedName = testHost.hero.name.toUpperCase();
    expect(heroEl.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    click(heroEl); // selected hero should be the same data bound hero
    expect(testHost.selectedHero).toBe(testHost.hero);
  });
});

```

--------------------------------

### Angular @defer with 'hydrate when'

Source: https://angular.dev/guide/incremental-hydration

This code example shows an Angular @defer block using the 'hydrate when' trigger with a custom condition. Hydration occurs when the condition evaluates to truthy. Note: This trigger only works for the top-most dehydrated @defer block.

```typescript
@defer (hydrate when condition) {
}
@placeholder {

Large component placeholder

}

```

--------------------------------

### Override HttpClient Caching Behavior for a Specific Request

Source: https://angular.dev/guide/ssr

This example demonstrates how to override the global caching behavior for a specific HTTP request using the `transferCache` option within the request configuration. This allows for fine-grained control over caching on a per-request basis.

```typescript
// Include specific headers for this request
http.get('/api/profile', {
  transferCache: {
    includeHeaders: ['CustomHeader']
  }
});
```

--------------------------------

### Angular Welcome Component Specific Tests

Source: https://angular.dev/guide/testing/components-scenarios

Contains specific test cases for the Angular Welcome Component. It verifies the initial welcome message with default user data, updates the message when the user's name changes, and checks the behavior when the user is not logged in, expecting a 'log in' prompt. It also includes tests for `UserService` injection.

```typescript
import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {UserService} from '../model/user.service';
import {WelcomeComponent} from './welcome.component';

class MockUserService {
  isLoggedIn = true;
  user = {name: 'Test User'};
}

describe('WelcomeComponent', () => {
  let comp: WelcomeComponent;
  let fixture: ComponentFixture;
  let componentUserService: UserService; // the actually injected service
  let userService: UserService; // the TestBed injected service
  let el: HTMLElement; // the DOM element with the welcome message

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    fixture.autoDetectChanges();
    comp = fixture.componentInstance;
    // UserService actually injected into the component
    userService = fixture.debugElement.injector.get(UserService);
    componentUserService = userService;
    // UserService from the root injector
    userService = TestBed.inject(UserService);
    // get the "welcome" element by CSS selector (e.g., by class name)
    el = fixture.nativeElement.querySelector('.welcome');
  });

  it('should welcome the user', async () => {
    await fixture.whenStable();
    const content = el.textContent;
    expect(content).withContext('"Welcome ..."').toContain('Welcome');
    expect(content).withContext('expected name').toContain('Test User');
  });

  it('should welcome "Bubba"', async () => {
    userService.user.set({name: 'Bubba'}); // welcome message hasn't been shown yet
    await fixture.whenStable();
    expect(el.textContent).toContain('Bubba');
  });

  it('should request login if not logged in', async () => {
    userService.isLoggedIn.set(false); // welcome message hasn't been shown yet
    await fixture.whenStable();
    const content = el.textContent;
    expect(content).withContext('not welcomed').not.toContain('Welcome');
    expect(content)
      .withContext('"log in"')
      .toMatch(/log in/i);
  });

  it("should inject the component's UserService instance", inject( [UserService],
    (service: UserService) => {
      expect(service).toBe(componentUserService);
    },
  ));

  it('TestBed and Component UserService should be the same', () => {
    expect(userService).toBe(componentUserService);
  });
});
```

--------------------------------

### Angular Structural Directive: Business Logic

Source: https://angular.dev/guide/directives/structural-directives

This TypeScript code implements the core business logic for an Angular structural directive. It asynchronously loads data using the 'selectFrom' input and then creates an embedded view using the template and the loaded data.

```typescript
import { Directive, TemplateRef, ViewContainerRef, inject, input, OnInit } from '@angular/core';

@Directive({
  selector: '[select]',
})
export class SelectDirective implements OnInit {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  selectFrom = input.required<{ load: () => Promise<any> }>();

  async ngOnInit() {
    const data = await this.selectFrom().load();
    this.viewContainerRef.createEmbeddedView(this.templateRef, {
      $implicit: data,
    });
  }
}
```

--------------------------------

### Injecting Services with TestBed.inject()

Source: https://angular.dev/guide/testing/services

Demonstrates how to inject services into tests using TestBed.inject(). This method is the recommended replacement for the deprecated TestBed.get().

```typescript
// Then inject it inside a test by calling `TestBed.inject()` with the service class as the argument.
// **HELPFUL:** `TestBed.get()` was deprecated as of Angular version 9. To help minimize breaking changes, Angular introduces a new function called `TestBed.inject()`, which you should use instead.
```

--------------------------------

### Applying Composed Host Directives in Angular

Source: https://angular.dev/guide/directives/directive-composition-api

Demonstrates how to apply composed host directives, such as `MenuWithTooltip`, to a new directive. This allows for the re-use of combined behaviors. The `SpecializedMenuWithTooltip` directive leverages the behaviors defined in `MenuWithTooltip`.

```typescript
import { Directive } from "@angular/core";

@Directive({
  selector: "[menu]",
  standalone: true,
})
export class Menu {}

@Directive({
  selector: "[tooltip]",
  standalone: true,
})
export class Tooltip {}

@Directive({
  selector: "[menu-with-tooltip]",
  standalone: true,
  hostDirectives: [Tooltip, Menu],
})
export class MenuWithTooltip {}

@Directive({
  selector: "[specialized-menu-with-tooltip]",
  standalone: true,
  hostDirectives: [MenuWithTooltip],
})
export class SpecializedMenuWithTooltip {}
```

--------------------------------

### Use Component in HTML Template

Source: https://angular.dev/guide/components/selectors

Shows how to use an Angular component within another component's HTML template. The component is invoked by creating an HTML element that matches its defined selector. This example uses the 'profile-photo' component within the 'UserProfile' component's template.

```html
import { Component } from '@angular/core';

@Component({
  selector: 'user-profile',
  template: `
    <div>
      <h2>User Profile</h2>
      <profile-photo></profile-photo> <!-- Using the component -->
      <p>Upload a new profile photo</p>
    </div>
  `,
  // ... other configuration
})
export class UserProfile { }
```

--------------------------------

### Generated srcset for Fixed-Size Images

Source: https://angular.dev/guide/image-optimization

This example shows an automatically generated `srcset` attribute for a fixed-size image. NgOptimizedImage derives the `srcset` from the image's `width` and `height` attributes, ensuring the browser requests the appropriate resolution without requiring manual `sizes` configuration.

```html
<img ngSrc="image.jpg" width="300" height="200" />

<!-- Example generated srcset: -->
<img ngSrc="image.jpg" width="300" height="200" srcset="image.jpg?width=300&amp;height=200 1x, image.jpg?width=600&amp;height=400 2x" />

```

--------------------------------

### Test Hero Detail Component with Router and Services (TypeScript)

Source: https://angular.dev/guide/testing/components-scenarios

Tests the Hero Detail Component's interaction with HeroDetailService and Router. It sets up the testing environment, navigates to a hero, and verifies service calls and component display. Dependencies include RouterTestingHarness, HeroDetailService, and Angular TestBed.

```typescript
import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingHarness } from '@angular/router/testing';

import { Hero } from '../model/hero';
import { HeroDetailService } from '../hero-detail.service';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service'; // Assuming HeroService is needed for other tests
import { MockHeroService } from '../testing/mock-hero.service';

import { Page } from './page.po'; // Assuming Page object is defined elsewhere for DOM interaction
import { click } from '../testing/test-util'; // Assuming click helper is defined elsewhere

import { firstHero } from '../model/testing/test-hero.service'; // Assuming test heroes are defined here
import { appConfig } from '../app.config';

let harness: RouterTestingHarness;
let component: HeroDetailComponent;
let page: Page;

// Mock HeroDetailService with spy methods
class HeroDetailServiceSpy extends HeroDetailService {
  getHero = jasmine.createSpy('getHero');
  saveHero = jasmine.createSpy('saveHero');
  testHero: Hero = { ...firstHero }; // Provide a default test hero
}

// Setup function for hero module tests
function heroModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [HeroDetailComponent, RouterTestingModule, HttpClientTestingModule],
        providers: [
          provideRouter([
            { path: 'heroes/:id', component: HeroDetailComponent },
            { path: 'heroes', component: HeroListComponent } // Assuming HeroListComponent is also imported and available
          ]),
          provideHttpClient(),
          provideHttpClientTesting(),
          // Mock HeroService if needed by HeroDetailComponent
          { provide: HeroService, useClass: MockHeroService },
        ],
      })
    );

    harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl(`/heroes/${firstHero.id}`, HeroDetailComponent);
    page = new Page();

    // Get the component's injected HeroDetailServiceSpy
    hdsSpy = harness.routeDebugElement!.injector.get(HeroDetailService) as HeroDetailServiceSpy;
    hdsSpy.testHero = { ...firstHero }; // Ensure spy has a test hero

    harness.detectChanges();
  });

  describe('when navigate to existing hero', () => {
    let expectedHero: Hero;
    beforeEach(async () => {
      expectedHero = firstHero; // Use the imported firstHero
      await createComponent(expectedHero.id);
    });

    it("should display that hero's name", () => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });

    it('should navigate when click cancel', () => {
      click(page.cancelBtn);
      expect(TestBed.inject(Router).url).toEqual(`/heroes/${expectedHero.id}`);
    });

    it('should save when click save but not navigate immediately', () => {
      click(page.saveBtn);
      expect(TestBed.inject(HttpTestingController).expectOne({ method: 'PUT', url: 'api/heroes' }));
      expect(TestBed.inject(Router).url).toEqual('/heroes/41');
    });

    it('should navigate when click save and save resolves', fakeAsync(() => {
      click(page.saveBtn);
      tick(); // wait for async save to complete
      expect(TestBed.inject(Router).url).toEqual('/heroes/41');
    }));

    it('should convert hero name to Title Case', async () => {
      harness.fixture.autoDetectChanges();
      const hostElement: HTMLElement = harness.routeNativeElement!;
      const nameInput: HTMLInputElement = hostElement.querySelector('input')!;
      const nameDisplay: HTMLElement = hostElement.querySelector('span')!;

      nameInput.value = 'quick BROWN fOx';
      nameInput.dispatchEvent(new Event('input'));

      await harness.fixture.whenStable();
      expect(nameDisplay.textContent).toBe('Quick Brown Fox');
    });
  });

  describe('when navigate to non-existent hero id', () => {
    beforeEach(async () => {
      await createComponent(999);
    });

    it('should try to navigate back to hero list', () => {
      expect(TestBed.inject(Router).url).toEqual('/heroes');
    });
  });
}

// Helper to create component instance
async function createComponent(id: number) {
  harness = await RouterTestingHarness.create();
  component = await harness.navigateByUrl(`/heroes/${id}`, HeroDetailComponent);
  page = new Page();
  hdsSpy = harness.routeDebugElement!.injector.get(HeroDetailService) as HeroDetailServiceSpy;
  hdsSpy.testHero = { ...firstHero }; // Ensure spy has a test hero
  harness.detectChanges();
  return component;
}

// Placeholder for Page object and click function if not defined elsewhere
class Page {
  get nameDisplay() { return { textContent: '' }; } // Mock implementation
  get nameInput() { return { value: '', dispatchEvent: () => {} }; } // Mock implementation
  get saveBtn() { return {}; } // Mock implementation
  get cancelBtn() { return {}; } // Mock implementation
}

let hdsSpy: HeroDetailServiceSpy; // Declare hdsSpy here

// Dummy imports for compilation
class HeroListComponent {}
function provideRouter(routes: any[]) { return {}; }
function provideHttpClient() { return {}; }
function provideHttpClientTesting() { return {}; }

// Call the setup function to run the tests
heroModuleSetup();

```

--------------------------------

### Injecting Local Service Provider (Angular)

Source: https://angular.dev/guide/di/hierarchical-dependency-injection

Illustrates using the `@Self()` decorator in a constructor to inject a service, ensuring that Angular only looks for the provider within the current component's injector. This example also shows how to provide a specific value for the service locally.

```typescript
import { Component, Self } from '@angular/core';
import { FlowerService } from './flower.service'; // Assuming FlowerService is defined elsewhere

@Component({
  selector: 'app-self',
  templateUrl: './self.component.html',
  styleUrls: ['./self.component.css'],
  providers: [
    { provide: FlowerService, useValue: { emoji: '🌷' } }
  ],
})
export class SelfComponent {
  constructor(@Self() public flower: FlowerService) {}
}
```

--------------------------------

### Asserting Injection Context with `assertInInjectionContext`

Source: https://angular.dev/guide/di/dependency-injection-context

Illustrates using `assertInInjectionContext` to ensure code is running within a valid injection context. If not, it throws a descriptive error, preventing common DI issues. The example shows a helper function `injectNativeElement` that asserts context before injecting `ElementRef`.

```typescript
import { ElementRef, assertInInjectionContext, inject } from '@angular/core';

// Helper function to inject native element, asserting context
export function injectNativeElement<T extends Element = Element>(): T {
  assertInInjectionContext(injectNativeElement);
  return inject(ElementRef).nativeElement;
}

// Example Usage within a Component
import { Component } from '@angular/core';
import { injectNativeElement } from './dom-helpers'; // Assuming dom-helpers.ts contains the function

@Component({
  selector: 'app-preview-card',
  template: '<div #host></div>'
})
export class PreviewCard {
  // Field initializer runs in an injection context, so this is valid
  readonly hostEl = injectNativeElement();

  onAction() {
    // This call would fail because 'onAction' might not be in an injection context
    // const anotherRef = injectNativeElement(); 
    console.log('Host element:', this.hostEl);
  }
}
```

--------------------------------

### Use protected for Template-Only Class Members (TypeScript)

Source: https://next.angular.dev/style-guide

This example demonstrates using the `protected` access modifier for class members that are exclusively used within the component's template. This clarifies that such members are not part of the component's public API but are intended for internal template use.

```typescript
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  template: `
    {{ fullName() }}
  `,
})
export class UserProfile {
  firstName = input<string>();
  lastName = input<string>();

  // `fullName` is not part of the component's public API, but is used in the template.
  protected fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
}
```

--------------------------------

### Create a fixup commit and push

Source: https://github.com/angular/angular/blob/main/CONTRIBUTING

When addressing review feedback, create a 'fixup' commit to amend the last commit. This helps keep the commit history clean and organized.

```git
git commit --all --fixup HEAD
git push
```

--------------------------------

### Initialize AppComponent Color Property

Source: https://angular.dev/guide/directives/attribute-directives

This TypeScript code snippet defines the AppComponent class in Angular. It initializes the 'color' property to an empty string, which is used for binding purposes in the component's template. This setup is part of configuring the component to work with attribute directives.

```typescript
import {Component} from '@angular/core';
import {HighlightDirective} from './highlight.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HighlightDirective],
})
export class AppComponent {
  color = '';
}
```

--------------------------------

### Angular TestBed Configuration for Overriding HeroDetailService

Source: https://angular.dev/guide/testing/components-scenarios

This setup demonstrates how to override a component's specific service (HeroDetailService) during testing using TestBed. It defines a spy service with mock implementations for its methods ('getHero', 'saveHero') that return observable data. This allows testing the HeroDetailComponent's interaction with its service without relying on the actual service implementation.

```typescript
describe('when override its provided HeroDetailService', overrideSetup);

function overrideSetup() {
  class HeroDetailServiceSpy {
    testHero: Hero = {...testHero}; /* emit cloned test hero */
    getHero = jasmine
      .createSpy('getHero')
      .and.callFake(() => asyncData(Object.assign({}, this.testHero)));
    /* emit clone of test hero, with changes merged in */
    saveHero = jasmine
      .createSpy('saveHero')
      .and.callFake((hero: Hero) => asyncData(Object.assign(this.testHero, hero)));
  }

  beforeEach(() => {
    // ... TestBed configuration with HeroDetailServiceSpy provided ...
  });

  // ... tests using the spy service ...
}
```

--------------------------------

### Displaying Injected Service Data in Angular Template

Source: https://angular.dev/guide/di/hierarchical-dependency-injection

Displays data from injected services within an Angular component's template using interpolation. This example shows how to render the `emoji` property of the `animal` service in both the child and root components.

```html
<!-- In ChildComponent template -->
Emoji from AnimalService: {{animal.emoji}}
```

```html
<!-- In AppComponent template -->
Emoji from AnimalService: {{animal.emoji}}
```

```html
<!-- In InspectorComponent template -->
Emoji from FlowerService: {{flower.emoji}}
Emoji from AnimalService: {{animal.emoji}}
```

--------------------------------

### Run Angular Tests with `ng test`

Source: https://angular.dev/guide/testing

The `ng test` command builds the Angular application in watch mode and launches the Vitest test runner. It executes tests defined in `.spec.ts` or `.test.ts` files and provides real-time feedback on test results. Changes to application files will automatically re-run the tests.

```bash
ng test
```

--------------------------------

### Angular TitleCasePipe for Text Formatting

Source: https://angular.dev/guide/testing/components-scenarios

Demonstrates the usage of Angular's `TitleCasePipe` within the testing setup. This pipe is used to transform input strings into title case, as shown in the test case for converting hero names. It's imported alongside `FormsModule` and `HeroDetailComponent` for testing purposes.

```typescript
import {FormsModule} from '@angular/forms';
import {TitleCasePipe} from '../shared/title-case.pipe';
import {appConfig} from '../app.config';
// ... other imports and functions
```

--------------------------------

### Angular: Prevent Default Event Behavior in Template

Source: https://angular.dev/guide/templates/event-listeners

This example demonstrates how to prevent the default browser behavior for an event within an Angular template. By calling `event.preventDefault()` on the event object, you can override native actions like form submission.

```typescript
@Component({
  template: `<form (submit)="onSubmit($event)">...</form>`,
  ...
})
export class AppComponent {
  onSubmit(event: Event): void {
    event.preventDefault();
    // Custom submission logic here
  }
}
```

--------------------------------

### Toggle Open/Close Animation in Angular (Animations Package)

Source: https://next.angular.dev/guide/animations/migration

Demonstrates how to create an open/close animation using Angular's animations package. It defines states for 'open' and 'closed' with specific styles and uses keyframes for a custom transition. This approach requires importing animation-related modules.

```typescript
import {Component, signal} from '@angular/core';
import {trigger, transition, state, animate, style, keyframes} from '@angular/animations';

@Component({
  selector: 'app-open-close',
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow',
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green',
      })),
      // ...
      transition('* => *', [
        animate('1s', keyframes([
          style({opacity: 0.1, offset: 0.1}),
          style({opacity: 0.6, offset: 0.2}),
          style({opacity: 1, offset: 0.5}),
          style({opacity: 0.2, offset: 0.7}),
        ])),
      ]),
    ]),
  ],
  templateUrl: 'open-close.component.html',
  styleUrl: 'open-close.component.css',
})
export class OpenCloseComponent {
  isOpen = signal(false);

  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
```

--------------------------------

### HTML: NgIf Show/Hide Comparison Example

Source: https://angular.dev/guide/directives

HTML template comparing methods for showing/hiding elements using CSS classes and inline styles versus using the NgIf directive. It highlights that NgIf removes/adds elements from the DOM, while CSS/style methods only alter visibility.

```html
Show with class

Hide with class

ItemDetail is in the DOM but hidden

Show with style

Hide with style
```

--------------------------------

### Custom Validator Using isFormArray in Angular

Source: https://angular.dev/guide/forms/reactive-forms

Example of a custom validator function 'positiveValues' that checks if an AbstractControl is a FormArray and validates its nested controls. It returns an error object if any control's value is negative, otherwise null. This is useful for type-specific validation within reactive forms.

```typescript
import { AbstractControl, isFormArray } from '@angular/forms';

export function positiveValues(control: AbstractControl) {
  if (!isFormArray(control)) {
    return null; // Not a FormArray: validator is not applicable.
  }
  // Safe to access FormArray-specific API after narrowing.
  const hasNegative = control.controls.some(c => c.value < 0);
  return hasNegative ? { positiveValues: true } : null;
}
```

--------------------------------

### Angular Profile Editor Component Setup

Source: https://angular.dev/guide/forms/reactive-forms

Defines the Angular ProfileEditor component using FormBuilder for creating reactive forms. It includes form controls for personal information, address, and aliases, along with methods to update the profile, add aliases, and handle form submission. Uses Validators.required for the first name.

```typescript
import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Validators} from '@angular/forms';
import {FormArray} from '@angular/forms';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
  imports: [ReactiveFormsModule, JsonPipe],
})
export class ProfileEditorComponent {
  private formBuilder = inject(FormBuilder);

  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    aliases: this.formBuilder.array([
      this.formBuilder.control('')
    ]),
  });

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }

  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}
```

--------------------------------

### Angular Component Selector with Combined Selectors

Source: https://angular.dev/guide/components/selectors

Demonstrates combining multiple CSS selectors within a single Angular component definition to match elements more precisely. This example shows matching a `button` element that also has the `type="reset"` attribute.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'button[type="reset"]',
  template: '...'
})
export class ResetButton { }
```

--------------------------------

### Displaying Form Model Data with JSON Pipe in Angular

Source: https://angular.dev/guide/forms/template-driven-forms

This example shows how to use the `json` pipe in an Angular template to serialize and display the entire form's data model as a JSON string. This is useful for debugging and confirming that two-way data binding is correctly updating the model.

```html
<div>{{ model | json }}</div>
```

--------------------------------

### Create and use an Angular Resource for async data fetching

Source: https://angular.dev/guide/signals/resource

This snippet demonstrates how to create a `Resource` using the `resource` function in Angular. It defines reactive parameters based on a `userId` signal and an asynchronous `loader` function to fetch user data. It also shows how to create a computed signal that safely accesses the resource's value, handling states where the value might be undefined or the resource might be in an error state.

```typescript
import { resource, Signal, computed } from '@angular/core';

// Assume these functions are defined elsewhere:
// declare function getUserId(): Signal<number>;
// declare function fetchUser(params: { id: number }): Promise<{ firstName: string }>;

const userId: Signal = getUserId();

const userResource = resource({
  // Define a reactive computation for parameters.
  // The `params` value recomputes whenever any read signals change.
  params: () => ({ id: userId() }),

  // Define an async loader that retrieves data.
  // The resource calls this function every time the `params` value changes.
  loader: ({ params }) => fetchUser(params),
});

// Create a computed signal based on the result of the resource's loader function.
const firstName = computed(() => {
  if (userResource.hasValue()) {
    // `hasValue` serves 2 purposes:
    // - It acts as type guard to strip `undefined` from the type
    // - It protects against reading a throwing `value` when the resource is in an error state
    return userResource.value().firstName;
  }
  // fallback in case the resource value is `undefined` or if the resource is in error state
  return undefined;
});

```

--------------------------------

### Angular RouterTestingHarness and Page Object for Component Testing

Source: https://angular.dev/guide/testing/components-scenarios

Helper functions and classes for testing Angular components, specifically `HeroDetailComponent`. `createComponent` initializes the component, sets up routing, and mocks HTTP requests. The `Page` class provides a convenient way to access DOM elements like buttons and input fields within the component's test environment.

```typescript
/**
 * Create the HeroDetailComponent, initialize it, set test variables
 */
async function createComponent(id: number) {
  harness = await RouterTestingHarness.create();
  component = await harness.navigateByUrl(`/heroes/${id}`, HeroDetailComponent);
  page = new Page();
  const request = TestBed.inject(HttpTestingController).expectOne(`api/heroes/?id=${id}`);
  const hero = getTestHeroes().find((h) => h.id === Number(id));
  request.flush(hero ? [hero] : []);
  harness.detectChanges();
}

class Page {
  // getter properties wait to query the DOM until called.
  get buttons() {
    return this.queryAll<HTMLButtonElement>('button');
  }
  get saveBtn() {
    return this.buttons[0];
  }
  get cancelBtn() {
    return this.buttons[1];
  }
  get nameDisplay() {
    return this.query<HTMLSpanElement>('span');
  }
  get nameInput() {
    return this.query<HTMLInputElement>('input');
  }

  //// query helpers ////
  private query<T>(selector: string): T {
    return harness.routeNativeElement!.querySelector(selector)! as T;
  }
  private queryAll<T>(selector: string): T[] {
    return harness.routeNativeElement!.querySelectorAll(selector) as any as T[];
  }
}
```

--------------------------------

### Narrow Input Type Based on Truthiness (TypeScript)

Source: https://angular.dev/guide/directives/structural-directives

This directive uses a static property `'binding'` assigned to `ngTemplateGuard_` to signal that the template should only render if the input binding expression is truthy. This simplifies guards for conditions that rely on the inherent truthiness of a value.

```typescript
@Directive({
  selector: '[customIf]'
})
class CustomIf {
  condition = input.required();
  static ngTemplateGuard_condition: 'binding';
}
```

--------------------------------

### Animate Element Enter/Leave in Angular (Animations Package)

Source: https://next.angular.dev/guide/animations/migration

Demonstrates how to animate an element entering and leaving the view using Angular's animations package. It utilizes the ':enter' and ':leave' transition aliases with specific styles for opacity changes, requiring animation module imports.

```typescript
import {Component} from '@angular/core';
import {trigger, transition, animate, style} from '@angular/animations';

@Component({
  selector: 'app-insert-remove',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({opacity: 0}),
        animate('200ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('200ms', style({opacity: 0}))
      ]),
    ]),
  ],
  templateUrl: 'insert-remove.component.html',
  styleUrls: ['insert-remove.component.css'],
})
export class InsertRemoveComponent {
  isShown = false;

  toggle() {
    this.isShown = !this.isShown;
  }
}
```

--------------------------------

### Handle Request Timeouts with HttpClient

Source: https://angular.dev/guide/http/making-requests

This example shows how to set a timeout for an Angular HttpClient request. If the backend request doesn't complete within the specified milliseconds, it will be aborted and an error emitted. The 'timeout' option is applied to the HTTP request itself, not the entire interceptor chain.

```typescript
this.http.get('/api/config', {
  timeout: 3000
}).subscribe({
  next: config => {
    console.log('Config fetched successfully:', config);
  },
  error: err => {
    // Handle timeout error here
    console.error('Request timed out:', err);
  }
});
```

--------------------------------

### Generate Angular Project and Component - Angular CLI

Source: https://angular.dev/guide/routing/routing-with-urlmatcher

This snippet demonstrates the Angular CLI commands to create a new Angular project named 'angular-custom-route-match' with routing enabled and CSS as the stylesheet format. It then shows how to generate a 'profile' component within the project.

```bash
ng new angular-custom-route-match 
# When prompted with "Would you like to add Angular routing?", select "Y".
# When prompted with "Which stylesheet format would you like to use?", select "CSS".

cd angular-custom-route-match

generate component profile
```

--------------------------------

### Configure HTTP Caching Options for Client Hydration

Source: https://angular.dev/guide/hybrid-rendering

Customize Angular's HttpClient caching during SSR and browser hydration. This example shows how to configure `HttpTransferCacheOptions` globally using `provideClientHydration` and `withHttpTransferCacheOptions`, specifying headers to include, filtering requests, and enabling POST requests.

```typescript
import {
  bootstrapApplication,
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    provideClientHydration(
      withHttpTransferCacheOptions({
        includeHeaders: ['ETag', 'Cache-Control'],
        filter: (req) => !req.url.includes('/api/profile'),
        includePostRequests: true,
        includeRequestsWithAuthHeaders: false,
      }),
    ),
  ],
});
```

--------------------------------

### Angular NgSwitch Example

Source: https://angular.dev/guide/directives

Illustrates the usage of Angular's NgSwitch directive for conditional rendering of elements based on a variable's value. It includes NgSwitch, NgSwitchCase, and NgSwitchDefault to handle different scenarios. This directive is useful for displaying different UI elements based on specific conditions.

```html
<div [ngSwitch]="currentItem.name">
  <div *ngSwitchCase="'World'">Hello World!</div>
  <div *ngSwitchCase="'Angular'">Hello Angular!</div>
  <div *ngSwitchDefault>Hello ??</div>
</div>

Pick your favorite item

{{ i.name }}
```

--------------------------------

### Reordering List Animations - Angular TypeScript

Source: https://angular.dev/guide/animations/css

TypeScript component for a reordering list example in Angular. It uses signals for state management and includes a `randomize` function to shuffle the list items. This component's structure supports entry and exit animations for list items.

```typescript
import {Component, signal} from '@angular/core';@Component({
  selector: 'app-reorder',
  templateUrl: './reorder.component.html',
  styleUrls: ['reorder.component.css'],
})
export class ReorderComponent {
  show = signal(true);
  items = ['stuff', 'things', 'cheese', 'paper', 'scissors', 'rock'];

  randomize() {
    const randItems = [...this.items];
    const newItems = [];
    for (let i of this.items) {
      const max: number = this.items.length - newItems.length;
      const randNum = Math.floor(Math.random() * max);
      newItems.push(...randItems.splice(randNum, 1));
    }
    this.items = newItems;
  }
}
```

--------------------------------

### Constructor Injection and Content Query Preventing Tree-Shaking (TypeScript)

Source: https://angular.dev/guide/di/lightweight-injection-tokens

Demonstrates how using a component as a constructor injection parameter or in a content query prevents it from being tree-shaken. The compiler retains references in value positions, increasing application size unnecessarily.

```typescript
class MyComponent {
  constructor(@Optional() other: OtherComponent) {}

  @ContentChild(OtherComponent)
  other: OtherComponent | null;
}
```

--------------------------------

### DashboardComponent within Test Host Component (TypeScript)

Source: https://angular.dev/guide/testing/components-scenarios

Tests the DashboardComponent when hosted by a `TestHostComponent`. This setup verifies the interaction between the `DashboardHeroComponent` and its parent, specifically checking if the displayed hero name is correct and if the 'selected' event is properly bound and handled by the host. It uses `TestBed.createComponent` with `TestHostComponent` and checks native element properties.

```typescript
describe('DashboardHeroComponent when inside a test host', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let heroEl: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({ providers: appProviders }); // Assume appProviders are defined
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    heroEl = fixture.nativeElement.querySelector('.hero');
    fixture.detectChanges();
  });

  it('should display hero name', () => {
    const expectedPipedName = testHost.hero.name.toUpperCase();
    expect(heroEl.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    click(heroEl); // selected hero should be the same data bound hero
    expect(testHost.selectedHero).toBe(testHost.hero);
  });
});
```

--------------------------------

### Testing @defer Blocks with Manual Control in Angular

Source: https://angular.dev/guide/templates/defer

Demonstrates how to test Angular's @defer blocks by configuring TestBed for manual control of defer block states. This allows stepping through placeholder, loading, and complete states for verification. It requires Angular's testing utilities.

```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DeferBlockBehavior, DeferBlockState } from '@angular/core';

describe('Defer Block Testing', () => {
  it('should render a defer block in different states', async () => {
    // Configures the defer block behavior to start in "paused" state for manual control.
    TestBed.configureTestingModule({
      deferBlockBehavior: DeferBlockBehavior.Manual
    });

    @Component({
      selector: 'app-test-component',
      template: `
        @defer {
          <div>Content loaded</div>
        } @placeholder {
          Placeholder
        } @loading {
          Loading...
        } @error {
          Error loading content
        }
      `
    })
    class TestComponent {}

    // Create component fixture.
    const componentFixture = TestBed.createComponent(TestComponent);
    await componentFixture.whenStable(); // Ensure initial rendering is complete

    // Retrieve the list of all defer block fixtures and get the first block.
    const deferBlockFixture = (await componentFixture.getDeferBlocks())[0];

    // Renders placeholder state by default.
    expect(componentFixture.nativeElement.innerHTML).toContain('Placeholder');

    // Render loading state and verify rendered output.
    await deferBlockFixture.render(DeferBlockState.Loading);
    expect(componentFixture.nativeElement.innerHTML).toContain('Loading');

    // Render final state and verify the output.
    await deferBlockFixture.render(DeferBlockState.Complete);
    // Assuming 'large works!' is part of the complete content for this example.
    // In a real scenario, you'd check for the actual content within the @defer block.
    expect(componentFixture.nativeElement.innerHTML).toContain('Content loaded');
  });
});

```

--------------------------------

### Configure Angular SSR Request Handler for Non-Node.js Environments

Source: https://angular.dev/guide/hybrid-rendering

This example demonstrates setting up an Angular SSR request handler for non-Node.js environments using `@angular/ssr`. It utilizes the standard Web API `Request` and `Response` objects and the `AngularAppEngine` to render the Angular application on various server platforms.

```typescript
// server.ts
import { AngularAppEngine, createRequestHandler } from '@angular/ssr';

const angularApp = new AngularAppEngine();

/**
 * This is a request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(async (req: Request) => {
  const res: Response | null = await angularApp.render(req); 
  // ...
});
```

--------------------------------

### Define Component Selector in Angular

Source: https://angular.dev/guide/components/selectors

Demonstrates how to define a component's selector using the `@Component` decorator in Angular. The `selector` property specifies the CSS selector that will be used to identify and instantiate the component in HTML templates. This example uses a custom element selector 'profile-photo'.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'profile-photo',
  template: '...', // Component template
  // ... other configuration
})
export class ProfilePhoto { }
```

--------------------------------

### Parallel Property Reading with Harnesses (TypeScript)

Source: https://angular.dev/guide/testing/using-component-harnesses

This example illustrates using the 'parallel' function to simultaneously read multiple properties from a harness, such as the 'checked' and 'indeterminate' states of a checkbox. It enhances test readability and efficiency by performing asynchronous operations concurrently, similar to Promise.all but with optimized change detection.

```TypeScript
it('reads properties in parallel', async () => {
  const checkboxHarness = loader.getHarness(MyCheckboxHarness);
  // Read the checked and intermediate properties simultaneously.
  const [checked, indeterminate] = await parallel(() => [
    checkboxHarness.isChecked(),
    checkboxHarness.isIndeterminate()
  ]);
  expect(checked).toBe(false);
  expect(indeterminate).toBe(true);
});
```

--------------------------------

### Generate Code Coverage Report

Source: https://angular.dev/guide/testing/code-coverage

Generate a code coverage report by adding the --coverage flag to the ng test command. This will create a 'coverage/' directory with an index.html report upon completion.

```bash
ng test --coverage
```

--------------------------------

### Disable Angular Component Style Encapsulation with ::ng-deep

Source: https://angular.dev/guide/components/styling

This snippet shows the use of the ::ng-deep pseudo-class in Angular component styles to disable style encapsulation for specific rules, effectively making them global. The Angular team discourages new usage of ::ng-deep.

```css
/* Example of ::ng-deep usage - discouraged */
:host ::ng-deep .some-element {
  color: red; /* This style will apply globally */
}
```

--------------------------------

### Angular Component Selector with Comma-Separated List

Source: https://angular.dev/guide/components/selectors

Shows how to define multiple selectors for a single Angular component using a comma-separated list. Angular will create an instance of the component if an element matches *any* of the selectors in the list. This example allows the component to be selected by either a custom element `drop-zone` or an attribute `[dropzone]`.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'drop-zone, [dropzone]', // Matches 'drop-zone' element or elements with the '[dropzone]' attribute
  template: '...'
})
export class DropZone { }
```

--------------------------------

### Angular Submit Button for Profile Form

Source: https://angular.dev/guide/forms/reactive-forms

An HTML snippet showing the submit button for the Angular profile editor form. The button is configured to trigger the form submission upon clicking and can be dynamically disabled based on the form's validity, although validation is not fully implemented in this example.

```html
<button type="submit">Submit</button>
```

--------------------------------

### Angular Component Creation Test

Source: https://angular.dev/guide/testing/components-basics

Tests the basic instantiation of the Banner Component. It configures the testing module, creates a component fixture, and asserts that the component instance is defined.

```typescript
describe('BannerComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({imports: [BannerComponent]});
    const fixture = TestBed.createComponent(BannerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
```

--------------------------------

### Angular: Bind Route Parameters to Component Inputs

Source: https://angular.dev/guide/routing/common-router-tasks

This example shows how to define a component that accepts route parameters as inputs using Angular's `input()` signal. The `input.required()` is used here, and it's demonstrated how to handle potentially undefined values and provide default values using `transform` or by managing local state with `linkedSignal`.

```typescript
import { Component, input, computed } from '@angular/core';

@Component({
  // ... component metadata
})
export class EditGroceryItemComponent {
  id = input.required<string>();
  hero = computed(() => this.service.getHero(this.id()));

  // Example with default value using transform
  optionalId = input<string | undefined, string | undefined>({
    transform: (maybeUndefined: string | undefined) => maybeUndefined ?? '0',
  });

  // Example with default value using linkedSignal
  routeId = input<string | undefined>();
  internalId = linkedSignal(() => this.routeId() ?? getDefaultId());

  // ... other component logic
}
```

--------------------------------

### Angular Component with Service Dependency

Source: https://angular.dev/guide/testing/components-scenarios

Illustrates an Angular component, `WelcomeComponent`, that depends on an injected `UserService` to display a personalized welcome message. This showcases how to handle service dependencies within components for dynamic content rendering.

```typescript
import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../model/user.service';

@Component({
  selector: 'app-welcome',
  template: `
    <div class="welcome-message">
      Welcome {{ userName() }}!
    </div>
  `
})
export class WelcomeComponent implements OnInit {
  private userService = inject(UserService);
  userName = signal<string>('');

  ngOnInit(): void {
    this.userName.set(this.userService.user);
  }
}

```

--------------------------------

### Injecting BasicDataStore in ExampleComponent

Source: https://angular.dev/guide/di/creating-injectable-service

This snippet shows how to inject the BasicDataStore service into an Angular component using the inject() function. The BasicDataStore is provided at the root level.

```typescript
import { inject, Injectable } from '@angular/core';
import { BasicDataStore } from './basic-data-store';

export class ExampleComponent {
  dataStore = inject(BasicDataStore);
}
```

--------------------------------

### Angular: Configure Routes with Custom URL Matcher

Source: https://angular.dev/guide/routing/routing-with-urlmatcher

This snippet configures the Angular router by importing necessary functions and defining application routes. It includes a custom URL matcher to identify and extract a username starting with '@' from the URL, binding it as a route parameter.

```typescript
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {routes} from './app.routes';

// In providers array of app.config.ts:
// provideRouter(routes, withComponentInputBinding())

```

```typescript
import {Routes, UrlSegment} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';

export const routes: Routes = [
  {
    // Custom matcher to identify username starting with '@'
    matcher: (url) => {
      if (url.length === 1 && url[0].path.match(/^@\w+$/gm)) {
        return {consumed: url, posParams: {username: new UrlSegment(url[0].path.slice(1), {})}};
      }
      return null;
    },
    component: ProfileComponent,
  },
];

```

--------------------------------

### Query Paragraph Element by Native Element (Jasmine)

Source: https://angular.dev/guide/testing/components-basics

Tests querying a specific paragraph element within the Banner Component using `fixture.nativeElement`. It gets the native element, uses `querySelector` to find the 'p' tag, and asserts its text content matches 'banner works!'.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BannerComponent} from './banner-initial.component';

describe('BannerComponent (with beforeEach)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [BannerComponent]});
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
  });

  it('should have "banner works!"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelector('p')!;
    expect(p.textContent).toEqual('banner works!');
  });
});
```

--------------------------------

### Specify Output Alias in @Component Decorator (TypeScript)

Source: https://angular.dev/guide/components/outputs

Demonstrates specifying an output alias directly in the `@Component` decorator's `outputs` property. This allows an inherited output property to be exposed with a different name in the template, for example, 'valueChanged' is aliased to 'volumeChanged'.

```typescript
import { Component } from '@angular/core';
import { BaseSlider } from './base-slider'; // Assuming BaseSlider defines 'valueChanged'

@Component({
  selector: 'app-custom-slider',
  template: `...`,
  outputs: ['valueChanged: volumeChanged'] // Aliases 'valueChanged' to 'volumeChanged' in the template
})
export class CustomSlider extends BaseSlider {
  // Inherits 'valueChanged' from BaseSlider, exposed as 'volumeChanged'
}
```

--------------------------------

### Angular Host Directive Execution Order Example

Source: https://angular.dev/guide/directives/directive-composition-api

Illustrates the execution order of host directives relative to the component they are applied to. The host directive (`MenuBehavior`) executes its lifecycle hooks and applies host bindings *before* the host component (`AdminMenu`). This allows the host component to override bindings from the host directive.

```typescript
import { Component, Directive, OnInit } from "@angular/core";

@Directive({
  selector: "[menu-behavior]",
  standalone: true,
})
export class MenuBehavior implements OnInit {
  ngOnInit() {
    console.log("MenuBehavior ngOnInit");
  }
  // ... host bindings would be defined here
}

@Component({
  selector: "admin-menu",
  standalone: true,
  imports: [MenuBehavior],
  template: "<div>Admin Menu</div>",
  hostDirectives: [MenuBehavior],
})
export class AdminMenu implements OnInit {
  ngOnInit() {
    console.log("AdminMenu ngOnInit");
  }
}
```

--------------------------------

### Implement Actions and State Checks in Harness (TypeScript)

Source: https://angular.dev/guide/testing/creating-component-harnesses

This snippet illustrates how to provide methods for interacting with the component and observing its state through the harness. It includes an async toggle() method to simulate a click on the trigger and an async isOpen() method to check the visibility of the content element, using TestElement's methods.

```typescript
class MyPopupHarness extends ComponentHarness {
  static hostSelector = 'my-popup';
  protected getTriggerElement = this.locatorFor('button');
  protected getContentElement = this.locatorForOptional('.my-popup-content');

  /**
   * Toggles the open state of the popup.
   */
  async toggle(): Promise<void> {
    const trigger = await this.getTriggerElement();
    return trigger.click();
  }

  /**
   * Checks if the popup is open.
   */
  async isOpen(): Promise<boolean> {
    const content = await this.getContentElement();
    return !!content;
  }
}
```

--------------------------------

### Locate Elements within Component Harness (TypeScript)

Source: https://angular.dev/guide/testing/creating-component-harnesses

This example demonstrates how to define methods within a ComponentHarness to locate specific elements inside the component's DOM. It uses locatorFor and locatorForOptional to find the trigger and content elements, respectively. These methods return functions to ensure tests always reference the current DOM state.

```typescript
class MyPopupHarness extends ComponentHarness {
  static hostSelector = 'my-popup';

  // Gets the trigger element
  getTriggerElement = this.locatorFor('button');

  // Gets the content element.
  getContentElement = this.locatorForOptional('.my-popup-content');
}
```

--------------------------------

### Configure Non-Node.js Server for Angular SSR

Source: https://angular.dev/guide/prerendering

Implement Angular SSR on platforms other than Node.js using the core `@angular/ssr` package. This method leverages standard Web API `Request` and `Response` objects, allowing integration into various server environments. The `createRequestHandler` function is key for this setup.

```typescript
// server.ts
import { AngularAppEngine, createRequestHandler } from '@angular/ssr';

const angularApp = new AngularAppEngine();

/**
 * This is a request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(async (req: Request) => {
  const res: Response | null = await angularApp.render(req);
  // ...
});
```

--------------------------------

### Custom Signal Equality Function with Lodash

Source: https://angular.dev/guide/signals

Shows how to provide a custom equality function when creating a signal. This example uses Lodash's `isEqual` to perform a deep comparison for array values, preventing updates if the content is the same, even if it's a new array instance.

```typescript
import _ from 'lodash';

// Assuming 'signal' is imported from '@angular/core'
const data = signal(['test'], { equal: _.isEqual });

// This set operation will not trigger an update because _.isEqual considers ['test'] and ['test'] to be equal.
data.set(['test']);

// This set operation would trigger an update if the value changed.
// data.set(['new test']);
```

--------------------------------

### Conditional Submit Button and Success Message in Angular

Source: https://angular.dev/guide/forms/form-validation

This example shows how to control the visibility of a 'Submit' button and display a personalized success message after form submission in an Angular template. The success message includes the submitted actor's name.

```html
Complete the form to enable the Submit button.

Submit Reset

@if (actorForm.submitted) {

You've submitted your actor, {{ actorForm.value.name }}!

Add new actor

}
```

--------------------------------

### Stubbing Nested Components in AppComponent Tests (Angular TypeScript)

Source: https://angular.dev/guide/testing/components-scenarios

This TypeScript code demonstrates how to test the AppComponent by stubbing its nested components (BannerComponent, RouterOutlet, WelcomeComponent). It configures the TestBed to use stub components and optionally uses NO_ERRORS_SCHEMA to ignore unknown elements, simplifying the test setup by focusing only on the AppComponent itself.

```typescript
import {Component, DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {provideRouter, Router, RouterLink, RouterOutlet} from '@angular/router';
import {AppComponent} from './app.component';
import {appConfig} from './app.config';
import {UserService} from './model';
import {WelcomeComponent} from './welcome/welcome.component';

@Component({selector: 'app-banner', template: ''})
class BannerStubComponent {}

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent {}

@Component({selector: 'app-welcome', template: ''})
class WelcomeStubComponent {}

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent & TestModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        providers: [provideRouter([]), UserService],
      })
    )
    .overrideComponent(AppComponent, {
      set: {
        imports: [BannerStubComponent, RouterLink, RouterOutletStubComponent, WelcomeStubComponent],
      },
    });
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  // tests(); // Assuming 'tests()' is a function containing the actual test cases
});

//////// Testing w/ NO_ERRORS_SCHEMA //////
describe('AppComponent & NO_ERRORS_SCHEMA', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        providers: [provideRouter([]), UserService],
      })
    )
    .overrideComponent(AppComponent, {
      set: {
        imports: [], // resets all imports
        schemas: [NO_ERRORS_SCHEMA],
      },
    });
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  // tests(); // Assuming 'tests()' is a function containing the actual test cases
});

describe('AppComponent & NO_ERRORS_SCHEMA', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        providers: [provideRouter([]), UserService],
      })
    )
  });
});
```

--------------------------------

### Test ValueService with TestBed

Source: https://angular.dev/guide/testing/services

Tests the 'ValueService' using Angular's TestBed. It covers basic injection, retrieving values, and handling asynchronous operations like Promises and Observables using waitForAsync.

```typescript
describe('ValueService', () => {
  let service: ValueService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ValueService] });
    service = TestBed.inject(ValueService);
  });

  it('should use ValueService', () => {
    service = TestBed.inject(ValueService);
    expect(service.getValue()).toBe('real value');
  });

  it('can inject a default value when service is not provided', () => {
    expect(TestBed.inject(NotProvided, null)).toBeNull();
  });

  it('test should wait for ValueService.getPromiseValue', waitForAsync(() => {
    service.getPromiseValue().then((value) => expect(value).toBe('promise value'));
  }));

  it('test should wait for ValueService.getObservableValue', waitForAsync(() => {
    service.getObservableValue().subscribe((value) => expect(value).toBe('observable value'));
  }));

  it('test should wait for ValueService.getObservableDelayValue', (done: DoneFn) => {
    service.getObservableDelayValue().subscribe((value) => {
      expect(value).toBe('observable delay value');
      done();
    });
  });
});
```

--------------------------------

### Angular @defer with @placeholder

Source: https://angular.dev/guide/templates/defer

Demonstrates the basic usage of Angular's @defer block with an optional @placeholder. The @placeholder content is displayed before the deferred content is loaded. Dependencies of the @placeholder are eagerly loaded.

```html
@defer {
  // Deferred content
}
@placeholder {
  // Placeholder content
}
```

--------------------------------

### Angular Router Guard with `inject` Function

Source: https://angular.dev/guide/di/dependency-injection-context

Example of an Angular router guard (`CanActivateFn`) demonstrating how to use the `inject` function to access services like `PermissionsService` and `UserToken` directly within the guard logic. This is possible because router guards operate within an injection context.

```typescript
import { inject, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/core';
import { PermissionsService } from './permissions.service'; // Assuming these services exist
import { UserToken } from './user-token.model'; // Assuming this token exists

const canActivateTeam: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PermissionsService).canActivate(inject(UserToken), route.params.id);
};
```

--------------------------------

### Angular Aliasing Providers with useExisting

Source: https://angular.dev/guide/di/dependency-injection-providers

Demonstrates how to use Angular's `useExisting` provider to create an alias for an existing provider. This ensures that both the original token and the alias token resolve to the exact same service instance, creating a reference or synonym. It's important not to confuse this with `useClass`, which creates separate instances.

```typescript
import { Injectable, Component, inject } from '@angular/core';

// Define a new logger service
@Injectable({
  providedIn: 'root'
})
class NewLogger {
  log(message: string) {
    console.log(`[NewLogger] ${message}`);
  }
}

// Define an older logger token (could be a class or InjectionToken)
@Injectable({
  providedIn: 'root'
})
class OldLogger {
  log(message: string) {
    console.warn(`[OldLogger] ${message}`);
  }
}

// Component that injects both
@Component({
  selector: 'app-alias-example',
  standalone: true,
  providers: [
    NewLogger, // The actual service instance
    {
      provide: OldLogger, // The alias token
      useExisting: NewLogger // Alias points to the NewLogger instance
    }
  ],
  template: '<div>Check console for logs.</div>'
})
export class AliasExampleComponent {
  private newLogger = inject(NewLogger);
  private oldLogger = inject(OldLogger); // Injects the same instance as NewLogger

  constructor() {
    this.newLogger.log('Logging via NewLogger');
    this.oldLogger.log('Logging via OldLogger (alias)');

    // Verify they are the same instance
    console.log('Are loggers the same instance?', this.newLogger === this.oldLogger);
  }
}

```

--------------------------------

### Angular: linkedSignal with Dynamic State Updates

Source: https://angular.dev/guide/signals/linked-signal

Shows a practical example of `linkedSignal` where the linked state's value changes dynamically based on updates to its source signal. This demonstrates how `linkedSignal` ensures the dependent state always reflects a valid value.

```javascript
const shippingOptions = signal(['Ground', 'Air', 'Sea']);
const selectedOption = linkedSignal(() => shippingOptions()[0]);

console.log(selectedOption()); // 'Ground'

selectedOption.set(shippingOptions()[2]);
console.log(selectedOption()); // 'Sea'

shippingOptions.set(['Email', 'Will Call', 'Postal service']);
console.log(selectedOption()); // 'Email'
```

--------------------------------

### NgFor: Iterating Over Collections in Angular

Source: https://angular.dev/guide/directives

Shows how to render a list of items using the NgFor directive. It covers iterating over arrays, accessing item index, and using the trackBy function for performance optimization. Examples include different separator styles for index and name display.

```html
<div *ngFor="let item of items; let i=index">
  {{ i }}: {{ item.name }}
</div>
```

```html
<div *ngFor="let item of items; let i=index; separator=';'">
  {{ i + 1 }}; {{ item.name }}
</div>
```

```html
<div *ngFor="let item of items; let i=index; separator=','">
  {{ i + 1 }}, {{ item.name }}
</div>
```

```html
<div *ngFor="let item of items; trackBy: trackById">
  ({{item.id}}) {{ item.name }}
</div>
```

```html
<div *ngFor="let item of items; trackBy: trackById; separator=';'">
  ({{ item.id }}); {{ item.name }}
</div>
```

```html
<div *ngFor="let item of items; trackBy: trackById; separator=','">
  ({{ item.id }}), {{ item.name }}
</div>
```

```html
<div *ngFor="let item of items; trackBy: trackById; separator=' '">
  ({{ item.id }}) {{ item.name }}
</div>
```

```html
<ng-template ngFor let-hero [ngForOf]="heroes" let-i="index" [ngForTrackBy]="trackById">
  <div>({{i}}) {{hero.name}}</div>
</ng-template>
```

--------------------------------

### Disable Caching for Individual HTTP Request in Angular

Source: https://angular.dev/guide/hybrid-rendering

This example shows how to disable caching for a single HTTP request by specifying the `transferCache: false` option directly within the `HttpRequest` configuration. This approach is suitable when you need to selectively disable caching for specific API calls.

```typescript
httpClient.get('/api/sensitive-data', { transferCache: false });
```

--------------------------------

### Angular Text Interpolation with Signals for Reactive Updates

Source: https://angular.dev/guide/templates/binding

Bind dynamic text using text interpolation {{ }} with Angular signals. Signals enable Angular to track dependencies and automatically update the rendered page when signal values change. This example demonstrates binding both a string property and a signal.

```typescript
@Component({
  template: `
    {{ welcomeMessage }}
    Your color preference is {{ theme() }}.
  `,
  ...})
export class AppComponent {
  welcomeMessage = "Welcome, enjoy this app that we built for you";
  theme = signal('dark');
}
```

--------------------------------

### Angular HeroDetailComponent Test Helper Function

Source: https://angular.dev/guide/testing/components-scenarios

A helper function to create and initialize the HeroDetailComponent for testing. It uses RouterTestingHarness to navigate to a specific hero URL, injects HttpTestingController to mock HTTP requests, and sets up a Page object for DOM element querying.

```typescript
async function createComponent(id: number) {
  // ... harness = await RouterTestingHarness.create();
  // component = await harness.navigateByUrl(`/heroes/${id}`, HeroDetailComponent);
  // page = new Page();
  // const request = TestBed.inject(HttpTestingController).expectOne(`api/heroes/?id=${id}`);
  // const hero = getTestHeroes().find((h) => h.id === Number(id));
  // request.flush(hero ? [hero] : []);
  // harness.detectChanges();
}
```

--------------------------------

### Get Document Root Locator Factory in Angular Component Harness

Source: https://angular.dev/guide/testing/creating-component-harnesses

Demonstrates how to obtain a LocatorFactory rooted at the document's root element using `documentRootLocatorFactory()`. This is useful for accessing elements not directly within the component's template, such as overlay content. It returns a HarnessLoader for a specified selector relative to the document root.

```typescript
class MyPopupHarness extends ComponentHarness {
  static hostSelector = 'my-popup';
  async getHarnessLoaderForContent(): Promise {
    const rootLocator = this.documentRootLocatorFactory();
    return rootLocator.harnessLoaderFor('my-popup-content');
  }
}
```

--------------------------------

### Mocking Service Dependencies with Jasmine Spies in Angular

Source: https://angular.dev/guide/testing/services

This snippet shows how to mock a dependency (`ValueService`) using Jasmine spies within an Angular TestBed setup. It injects a `MasterService` that relies on `ValueService` and verifies that the spy method (`getValue`) is called and returns a stubbed value.

```typescript
describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [MasterService, {provide: ValueService, useValue: spy}]
    });

    // Inject both the service-to-test and its (spy) dependency
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj;
  });

  it('#getValue should return stubbed value from a spy', () => {
    const stubValue = 'stub value';
    valueServiceSpy.getValue.and.returnValue(stubValue);

    expect(masterService.getValue()).withContext('service returned stub value').toBe(stubValue);
    expect(valueServiceSpy.getValue.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
    expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe(stubValue);
  });
});
```

--------------------------------

### Angular Async Helpers: async, fakeAsync, waitForAsync

Source: https://angular.dev/guide/testing/components-scenarios

Demonstrates the usage of Angular's core asynchronous testing utilities: async, fakeAsync, and waitForAsync. These functions help manage and test asynchronous operations like setTimeout, Promises, and Observables within Angular tests.

```typescript
import {fakeAsync, tick, waitForAsync} from '@angular/core/testing';
import {interval, of} from 'rxjs';
import {delay, take} from 'rxjs/operators';

describe('Angular async helper', () => {
  describe('async', () => {
    let actuallyDone = false;
    beforeEach(() => {
      actuallyDone = false;
    });
    afterEach(() => {
      expect(actuallyDone).withContext('actuallyDone should be true').toBe(true);
    });
    it('should run normal test', () => {
      actuallyDone = true;
    });
    it('should run normal async test', (done: DoneFn) => {
      setTimeout(() => {
        actuallyDone = true;
        done();
      }, 0);
    });
    it('should run async test with task', waitForAsync(() => {
      setTimeout(() => {
        actuallyDone = true;
      }, 0);
    }));
    it('should run async test with task', waitForAsync(() => {
      const id = setInterval(() => {
        actuallyDone = true;
        clearInterval(id);
      }, 100);
    }));
    it('should run async test with successful promise', waitForAsync(() => {
      const p = new Promise((resolve) => {
        setTimeout(resolve, 10);
      });
      p.then(() => {
        actuallyDone = true;
      });
    }));
    it('should run async test with failed promise', waitForAsync(() => {
      const p = new Promise((resolve, reject) => {
        setTimeout(reject, 10);
      });
      p.catch(() => {
        actuallyDone = true;
      });
    }));
    it('should run async test with successful delayed Observable', (done: DoneFn) => {
      const source = of(true).pipe(delay(10));
      source.subscribe({
        next: (val) => (actuallyDone = true),
        error: (err) => fail(err),
        complete: done,
      });
    });
    it('should run async test with successful delayed Observable', waitForAsync(() => {
      const source = of(true).pipe(delay(10));
      source.subscribe({
        next: (val) => (actuallyDone = true),
        error: (err) => fail(err),
      });
    }));
    it('should run async test with successful delayed Observable', fakeAsync(() => {
      const source = of(true).pipe(delay(10));
      source.subscribe({
        next: (val) => (actuallyDone = true),
        error: (err) => fail(err),
      });
      tick(10);
    }));
  });

  describe('fakeAsync', () => {
    it('should run timeout callback with delay after call tick with millis', fakeAsync(() => {
      let called = false;
      setTimeout(() => {
        called = true;
      }, 100);
      tick(100);
      expect(called).toBe(true);
    }));
    it('should run new macro task callback with delay after call tick with millis', fakeAsync(() => {
      function nestedTimer(cb: () => any): void {
        setTimeout(() => setTimeout(() => cb()));
      }
      const callback = jasmine.createSpy('callback');
      nestedTimer(callback);
      expect(callback).not.toHaveBeenCalled();
      tick(0); // the nested timeout will also be triggered
      expect(callback).toHaveBeenCalled();
    }));
    it('should not run new macro task callback with delay after call tick with millis', fakeAsync(() => {
      function nestedTimer(cb: () => any): void {
        setTimeout(() => setTimeout(() => cb()));
      }
      const callback = jasmine.createSpy('callback');
      nestedTimer(callback);
      expect(callback).not.toHaveBeenCalled();
      tick(0, {processNewMacroTasksSynchronously: false}); // the nested timeout will not be triggered
      expect(callback).not.toHaveBeenCalled();
      tick(0);
      expect(callback).toHaveBeenCalled();
    }));
    it('should get Date diff correctly in fakeAsync', fakeAsync(() => {
      const start = Date.now();
      tick(100);
      const end = Date.now();
      expect(end - start).toBe(100);
    }));
    it('should get Date diff correctly in fakeAsync with rxjs scheduler', fakeAsync(() => {
      // need to add `import 'zone.js/plugins/zone-patch-rxjs-fake-async'`
      // to patch rxjs scheduler
      let result = '';
      of('hello')
        .pipe(delay(1000))
        .subscribe((v) => {
          result = v;
        });
      expect(result).toBe('');
      tick(1000);
      expect(result).toBe('hello');
      const start = new Date().getTime();
      let dateDiff = 0;
      interval(1000)
        .pipe(take(2))
        .subscribe(() => (dateDiff = new Date().getTime() - start));
      tick(1000);
      expect(dateDiff).toBe(1000);
      tick(1000);
      expect(dateDiff).toBe(2000);
    }));
  });
});
```

--------------------------------

### Angular: Use Multiple Key Modifiers in Event Binding

Source: https://angular.dev/guide/templates/event-listeners

This example demonstrates combining multiple key modifiers (e.g., 'alt', 'shift', 'control', 'meta') with keyboard event bindings in Angular templates. This allows for precise event handling based on specific key combinations.

```typescript
@Component({
  template: `<input (keydown.alt.shift)="updateField()">`,
  ...
})
export class AppComponent {
  // Method to handle the event when Alt + Shift are pressed
}
```

--------------------------------

### Angular Component Styling (CSS)

Source: https://next.angular.dev/guide/animations/migration

Provides styling for the increment/decrement component, including layout, borders, text formatting, and button appearance. It defines styles for the host element and internal sections. No external dependencies are required beyond standard CSS.

```css
:host {
  display: block;
  font-size: 32px;
  margin: 20px;
  text-align: center;
}
section {
  border: 1px solid lightgray;
  border-radius: 50px;
}
p {
  display: inline-block;
  margin: 2rem 0;
  text-transform: uppercase;
}
.controls {
  padding-bottom: 2rem;
}
button {
  font: inherit;
  border: 0;
  background: lightgray;
  width: 50px;
  border-radius: 10px;
}
button + button {
  margin-left: 10px;
}
```

--------------------------------

### Adding Headers to HTTP Requests in Angular

Source: https://angular.dev/guide/http/interceptors

This example demonstrates how to add a custom header to an outgoing HTTP request. Since HttpRequest objects are immutable, a new request instance is created using the `.clone()` method with the updated headers. This is a common pattern for authentication or metadata.

```typescript
const reqWithHeader = req.clone({
  headers: req.headers.set('X-New-Header', 'new header value'),
});
```

--------------------------------

### Controlling Injection Scope with skipSelf in Angular

Source: https://angular.dev/guide/di/hierarchical-dependency-injection

Illustrates how the `skipSelf` option in the `inject()` function alters the search path for dependency injection tokens. When `skipSelf` is true, the injector skips the current injector and starts searching from its parent, affecting which service instance is resolved.

```typescript
flower = inject(FlowerService, { skipSelf: true })
```

--------------------------------

### Setting URL Parameters with HttpParams in Angular HttpClient

Source: https://angular.dev/guide/http/making-requests

Shows how to append URL parameters to an HTTP GET request using Angular's HttpClient. It illustrates using an object literal for simple cases and HttpParams for more complex scenarios, including immutability and chaining mutation methods like `append()` or `set()`. Custom parameter encoding can also be configured.

```typescript
import { HttpClient, HttpParams, HttpParameterCodec } from '@angular/common/http';
import { inject } from '@angular/core';

// Simple parameter setting using object literal
// http.get('/api/config', { params: {filter: 'all'},}).subscribe(config => {
//   // ...
// });

// Using HttpParams for more control
// const baseParams = new HttpParams().set('filter', 'all');
// http.get('/api/config', {
//   params: baseParams.set('details', 'enabled'),
// }).subscribe(config => {
//   // ...
// });

// Custom parameter encoding
export class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }
  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}

export class ApiService {
  private http = inject(HttpClient);
  search() {
    const params = new HttpParams({
      encoder: new CustomHttpParamEncoder(),
    })
    .set('email', 'dev+alerts@example.com')
    .set('q', 'a & b? c/d = e');
    return this.http.get('/api/items', { params });
  }
}
```

--------------------------------

### Import and Use Standalone Angular Component

Source: https://angular.dev/guide/components

This code illustrates how to make a component available for use within another component's template by importing it into the `@Component` decorator's `imports` array. This is particularly relevant for standalone components, which can be directly imported. The example shows importing the `ProfilePhoto` component into the `UserProfile` component.

```typescript
import {ProfilePhoto} from './profile-photo';

@Component({
  // Import the `ProfilePhoto` component in
  // order to use it in this component's template.
  imports: [ProfilePhoto],
  /* ... */
})
export class UserProfile { }
```

--------------------------------

### Implement request abortion in an Angular Resource loader

Source: https://angular.dev/guide/signals/resource

This example shows how to handle request abortion within an Angular `Resource` loader. It utilizes the `abortSignal` provided in the `ResourceLoaderParams` to cancel ongoing asynchronous operations, such as network requests made with the native `fetch` function. This prevents race conditions and unnecessary processing when parameters change rapidly.

```typescript
import { resource, Signal } from '@angular/core';

// Assume these functions are defined elsewhere:
// declare function getUserId(): Signal<number>;

const userId: Signal = getUserId();

const userResource = resource({
  params: () => ({ id: userId() }),
  loader: async ({ params, abortSignal }) => {
    // Use the abortSignal with the fetch function to cancel the request if params change.
    const response = await fetch(`/api/users/${params.id}`, {
      signal: abortSignal as AbortSignal, // Type assertion might be needed depending on TS config
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
});

```

--------------------------------

### Test MasterService with Real, Fake, and Mocked ValueService

Source: https://angular.dev/guide/testing/services

Demonstrates testing MasterService by injecting different implementations of ValueService. It covers using the real service, a fake service (`FakeValueService`), and a simple object literal acting as a mock.

```typescript
describe('MasterService without Angular testing support', () => {
  let masterService: MasterService;
  it('#getValue should return real value from the real service', () => {
    masterService = new MasterService(new ValueService());
    expect(masterService.getValue()).toBe('real value');
  });
  it('#getValue should return faked value from a fakeService', () => {
    masterService = new MasterService(new FakeValueService());
    expect(masterService.getValue()).toBe('faked service value');
  });
  it('#getValue should return faked value from a fake object', () => {
    const fake = {getValue: () => 'fake value'};
    masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  });
});
```

--------------------------------

### Angular Canvas Drawing Component

Source: https://angular.dev/guide/testing/components-scenarios

An Angular component that draws a red rectangle on an HTML canvas element upon initialization. It uses the 'sampleCanvas' template reference to access the canvas and its 2D rendering context. The 'toBlob' method is used to get the blob size of the canvas content.

```typescript
import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-canvas',
  template: '<canvas #sampleCanvas width="200" height="200"></canvas>',
})
export class CanvasComponent implements AfterViewInit {
  blobSize = 0;
  @ViewChild('sampleCanvas') sampleCanvas!: ElementRef;

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.sampleCanvas.nativeElement;
    const context = canvas.getContext('2d')!;
    context.clearRect(0, 0, 200, 200);
    context.fillStyle = '#FF1122';
    context.fillRect(0, 0, 200, 200);
    canvas.toBlob((blob) => {
      this.blobSize = blob?.size ?? 0;
    });
  }
}

```

--------------------------------

### Router Testing Utilities

Source: https://angular.dev/api

Provides tools for testing Angular Router configurations and navigation flows within your application.

```APIDOC
## Router Testing Utilities

### Description
Tools to facilitate testing of routing configurations and navigation logic.

### Endpoints

- **`RouterTestingModule`**: A testing module that provides router directives and services for testing.
- **`RouterTestingHarness`**: A harness for interacting with the router's testing environment.

### Example Usage (Conceptual)
```typescript
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('Router Testing', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])] // Configure with your routes
    });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to a path', fakeAsync(() => {
    router.navigate(['/test']);
    tick(); // Advance timers
    expect(location.path()).toBe('/test');
  }));
});
```
```

--------------------------------

### Test DashboardHeroComponent Within a Host Component (TypeScript)

Source: https://angular.dev/guide/testing/components-scenarios

Tests the DashboardHeroComponent when integrated into a parent 'TestHostComponent'. This setup allows testing the interaction between the host and the child component, specifically verifying data binding and event propagation. It checks if the hero's name is displayed and if the 'selected' event is correctly handled by the host.

```TypeScript
import {Component} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {addMatchers, click} from '../../testing';
import {appProviders} from '../app.config';
import {Hero} from '../model/hero';
import {DashboardHeroComponent} from './dashboard-hero.component';

@Component({
  imports: [DashboardHeroComponent],
  template: `<dashboard-hero [hero]='hero' (selected)='onSelected($event)'></dashboard-hero>`
})
class TestHostComponent {
  hero: Hero = {id: 42, name: 'Test Name'};
  selectedHero: Hero | undefined;
  onSelected(hero: Hero) {
    this.selectedHero = hero;
  }
}

describe('DashboardHeroComponent when inside a test host', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let heroEl: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: appProviders,
      declarations: [TestHostComponent, DashboardHeroComponent] // Declare both host and component
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    heroEl = fixture.nativeElement.querySelector('.hero');
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should display hero name', () => {
    const expectedPipedName = testHost.hero.name.toUpperCase();
    expect(heroEl.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    click(heroEl); // selected hero should be the same data bound hero
    expect(testHost.selectedHero).toBe(testHost.hero);
  });
});

```

--------------------------------

### Angular: Access Event Argument in Template Listener

Source: https://angular.dev/guide/templates/event-listeners

This example shows how to access the event object within an Angular template event listener. The '$event' variable provides a reference to the native browser event, allowing access to event properties like 'key'.

```typescript
@Component({
  template: `<input (keyup)="updateField($event)">`,
  ...
})
export class AppComponent {
  updateField(event: KeyboardEvent): void {
    console.log(`The user pressed: ${event.key}`);
  }
}
```

--------------------------------

### Redirect Handling

Source: https://angular.dev/guide/http/making-requests

Specify how the client should handle HTTP redirects from the server.

```APIDOC
## GET /api/resource (Follow Redirects)

### Description
Automatically follows HTTP redirect responses. This is the default behavior, allowing the client to navigate to the final destination without manual intervention.

### Method
GET

### Endpoint
/api/resource

### Parameters
#### Query Parameters
- **redirect** (string) - Optional - Set to 'follow' to automatically follow redirects.

### Request Example
```javascript
http.get('/api/resource', { redirect: 'follow' }).subscribe(data => { /* ... */ });
```

### Response
#### Success Response (200)
- **data** (any) - The final response after following redirects.

#### Response Example
```json
{
  "finalDestination": true
}
```

## GET /api/resource (Manual Redirect Handling)

### Description
Prevents automatic redirection. The client will receive the redirect response itself, allowing for custom logic to handle the redirect, such as modifying headers or choosing a different URL.

### Method
GET

### Endpoint
/api/resource

### Parameters
#### Query Parameters
- **redirect** (string) - Optional - Set to 'manual' to disable automatic redirection.

### Request Example
```javascript
http.get('/api/resource', { redirect: 'manual' }).subscribe(response => { /* Handle redirect manually */ });
```

### Response
#### Success Response (301, 302, etc.)
- **response** (object) - The redirect response object, including location and status code.

#### Response Example
```json
{
  "status": 301,
  "headers": {
    "location": "/new-url"
  }
}
```

## GET /api/resource (Error on Redirect)

### Description
Treats any HTTP redirect response as an error. This is useful when redirects are not expected or indicate a problem in the request flow.

### Method
GET

### Endpoint
/api/resource

### Parameters
#### Query Parameters
- **redirect** (string) - Optional - Set to 'error' to treat redirects as errors.

### Request Example
```javascript
http.get('/api/resource', { redirect: 'error' }).subscribe({
  next: data => { /* Success response */ },
  error: err => { /* Redirect responses will trigger this error handler */ }
});
```

### Response
#### Error Response (3xx)
- **err** (Error) - An error object when a redirect occurs.

#### Response Example
```json
{
  "message": "Redirect error occurred."
}
```
```

--------------------------------

### Overriding Component Imports in Angular TestBed

Source: https://angular.dev/guide/testing/services

Shows how to override the `imports` array of a component during testing using `TestBed.overrideComponent`. This is useful for substituting child components with mock or fake versions during tests to isolate the parent component's behavior. The example demonstrates a two-deep override scenario.

```typescript
import { TestBed } from '@angular/core/testing';
import { ParentComponent, FakeChildWithGrandchildComponent, FakeGrandchildComponent } from './demo';

describe('nested (two-deep) component override', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ParentComponent, FakeChildWithGrandchildComponent, FakeGrandchildComponent],
    }).overrideComponent(ParentComponent, {
      set: {
        imports: [FakeChildWithGrandchildComponent, FakeGrandchildComponent]
      },
    });
  });

  it('should use Fake Grandchild component', () => {
    const fixture = TestBed.createComponent(ParentComponent);
    fixture.detectChanges();
    expect(fixture).toHaveText('Parent(Fake Child(Fake Grandchild))');
  });
});

```

--------------------------------

### Angular HighlightDirective Unit Tests

Source: https://angular.dev/guide/testing/attribute-directives

These tests are written using Jasmine and Karma for an Angular HighlightDirective. They ensure the directive correctly applies background colors based on provided values or default settings. The tests utilize `TestBed` for component setup and `DebugElement` for interacting with the DOM, simulating user interactions like input changes.

```typescript
describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[]; // the three elements w/ the directive
  let bareH2: DebugElement; // the w/o the directive

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [HighlightDirective, TestComponent]
    }).createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached HighlightDirective
    des = fixture.debugElement.queryAll(By.directive(HighlightDirective));

    // the h2 without the HighlightDirective
    bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));
  });

  // color tests
  it('should have three highlighted elements', () => {
    expect(des.length).toBe(3);
  });

  it('should color 1st background "yellow"', () => {
    const bgColor = des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('yellow');
  });

  it('should color 2nd background w/ default color', () => {
    const dir = des[1].injector.get(HighlightDirective) as HighlightDirective;
    const bgColor = des[1].nativeElement.style.backgroundColor;
    expect(bgColor).toBe(dir.defaultColor);
  });

  it('should bind background to value color', () => {
    // easier to work with nativeElement
    const input = des[2].nativeElement as HTMLInputElement;
    expect(input.style.backgroundColor).withContext('initial backgroundColor').toBe('cyan');

    input.value = 'green';
    // Dispatch a DOM event so that Angular responds to the input value change.
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.style.backgroundColor).withContext('changed backgroundColor').toBe('green');
  });

  it('bare should not have a customProperty', () => {
    expect(bareH2.properties['customProperty']).toBeUndefined();
  });

  // injected directive
  // attached HighlightDirective can be injected
  it('can inject `HighlightDirective` in 1st', () => {
    const dir = des[0].injector.get(HighlightDirective) as HighlightDirective;
    expect(dir).toBeDefined();
  });
});

// Assuming TestComponent and HighlightDirective are defined elsewhere and imported
// For example:
// @Component({ template: `...` })
// class TestComponent {
//   @Input() highlight: string;
//   defaultColor: string = 'red';
// }
//
// @Directive({ selector: '[highlight]' })
// class HighlightDirective {
//   @Input() defaultColor: string = 'red';
//   @Input('highlight') color: string;
//   constructor(public elementRef: ElementRef) {}
//   ngOnInit() {
//     this.elementRef.nativeElement.style.backgroundColor = this.color || this.defaultColor;
//   }
// }

```

--------------------------------

### Skipping Self for Parent Service Injection (Angular)

Source: https://angular.dev/guide/di/hierarchical-dependency-injection

Demonstrates the use of the `@SkipSelf()` decorator to inject a service, forcing Angular to start the search from the parent injector rather than the current component's injector. This is useful when a parent component provides a desired service value.

```typescript
import { Component, SkipSelf } from '@angular/core';
import { LeafService } from './leaf.service'; // Assuming LeafService is defined elsewhere

@Component({
  selector: 'app-skipself',
  templateUrl: './skipself.component.html',
  styleUrls: ['./skipself.component.css'],
  // providers: [
  //   { provide: LeafService, useValue: { emoji: '🍁' } } // Example of a local override
  // ],
})
export class SkipSelfComponent {
  constructor(@SkipSelf() public leaf: LeafService) {}
}
```

--------------------------------

### Configure HttpClient with Fetch API (TypeScript)

Source: https://angular.dev/guide/http/setup

Configures HttpClient to use the `fetch` API instead of the default `XMLHttpRequest`. This is done by passing `withFetch()` to the `provideHttpClient` function. Note that `fetch` has limitations, such as not providing upload progress events.

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
    ),
  ]
};
```

--------------------------------

### Setting Static Page Titles for Angular Routes

Source: https://angular.dev/guide/routing/define-routes

Demonstrates how to associate a static page title with an Angular route using the `title` property. Angular automatically updates the document title when a route becomes active, enhancing accessibility and SEO. This example sets a simple string title for the home and about routes.

```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Us',
  },
];
```

--------------------------------

### Declare Input Property Without Default Value (Angular)

Source: https://angular.dev/guide/components/inputs

This example demonstrates declaring an Angular input property without a default value. The type is explicitly specified using a generic parameter. If the input is not provided when the component is used, its value will be 'undefined'.

```typescript
import {Component, input} from '@angular/core';

@Component({
  selector: 'app-custom-slider',
  template: '...' // Template where the input can be used
})
export class CustomSlider {
  // Declare an input that may not be set, returning an InputSignal.
  // Explicitly typed as a string.
  name = input<string>();
}
```

--------------------------------

### Displaying Validation Error Messages Conditionally

Source: https://angular.dev/guide/forms/template-driven-forms

This example demonstrates how to show or hide validation error messages based on the state of an input control. It uses a template reference variable (`#name="ngModel"`) to access the control's state and conditionally binds the `hidden` property of a paragraph element.

```html
<div class="form-group">
  <label for="name">Name</label>
  <input type="text" id="name" class="form-control" name="name" [(ngModel)]="actor.name" #name="ngModel" required>
  <div [hidden]="name.valid || name.pristine" class="alert alert-danger">
    Name is required
  </div>
</div>
```

--------------------------------

### Angular @defer with Nested Hydration Triggers

Source: https://angular.dev/guide/incremental-hydration

Demonstrates nested @defer blocks with different hydration triggers. The outer block hydrates on interaction, and the inner block hydrates on hover. When the inner block is hovered, hydration starts from the outermost dehydrated @defer block downwards.

```typescript
@defer (hydrate on interaction) {
  @defer (hydrate on hover) {
    // Inner content
  }
  @placeholder {
    Child placeholder
  }
}
@placeholder {
  Parent Placeholder
}
```

--------------------------------

### Angular NgClass with Component Method

Source: https://angular.dev/guide/directives

Shows how to apply dynamic CSS classes to an HTML element using Angular's NgClass directive. The example binds `ngClass` to a component property (`currentClasses`) which is populated by a component method (`setCurrentClasses`), allowing classes to be added or removed based on component state.

```typescript
import {Component, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ NgClass ], // <-- import into the component
})
export class AppComponent implements OnInit {
  canSave = true;
  isSpecial = true;
  isUnchanged = true;
  currentClasses: Record<string, boolean> = {};

  ngOnInit() {
    this.setCurrentClasses();
  }

  setCurrentClasses() {
    // CSS classes: added/removed per current state of component properties
    this.currentClasses = {
      saveable: this.canSave,
      modified: !this.isUnchanged,
      special: this.isSpecial,
    };
  }
  // ... other methods
}

```

```html
<div [ngClass]="currentClasses">My element with dynamic classes</div>
```

--------------------------------

### Configuring Build-Time Prerendering with Parameterized Routes

Source: https://angular.dev/guide/prerendering

Illustrates how to use the `getPrerenderParams` function for routes with `RenderMode.Prerender`. This function, which can use `inject` for dependencies, returns an array of parameter objects to generate separate prerendered documents for different route parameters, including catch-all routes.

```typescript
import { RenderMode, ServerRoute, inject } from '@angular/ssr';

// Assuming PostService is defined elsewhere and can be injected
// import { PostService } from './post.service'; 

export const serverRoutes: ServerRoute[] = [
  {
    path: 'post/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      // const dataService = inject(PostService);
      // const ids = await dataService.getIds(); // Assuming this returns ['1', '2', '3']
      const ids = ['1', '2', '3']; // Mock data for example
      return ids.map(id => ({ id })); // Generates paths like: /post/1, /post/2, /post/3
    },
  },
  {
    path: 'post/:id/**',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { id: '1', '**': 'foo/3' },
        { id: '2', '**': 'bar/4' },
      ]; // Generates paths like: /post/1/foo/3, /post/2/bar/4
    },
  },
];
```

--------------------------------

### Accessing Native HTML Element in Angular Tests

Source: https://angular.dev/guide/testing/components-basics

This snippet shows how to retrieve the native HTML element of an Angular component in a test environment. It uses `fixture.nativeElement` to get the root DOM element and then employs `querySelector` to find a specific paragraph element within it.

```typescript
import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BannerComponent} from './banner-initial.component';

describe('BannerComponent (with beforeEach)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BannerComponent]
    });
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should contain "banner works!"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('banner works!');
  });

  it('should have "banner works!"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelector('p')!;
    expect(p.textContent).toEqual('banner works!');
  });

  it('should find the', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const p = bannerEl.querySelector('p')!;
    expect(p.textContent).toEqual('banner works!');
  });

  it('should find the', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const paragraphDe = bannerDe.query(By.css('p'));
    const p: HTMLElement = paragraphDe.nativeElement;
    expect(p.textContent).toEqual('banner works!');
  });
});
```

--------------------------------

### Angular Http Interceptor: Track Redirects with HttpClient Fetch

Source: https://angular.dev/guide/http/interceptors

An example of an Angular Http functional interceptor that utilizes the `withFetch` provider. This interceptor checks for the `redirected` property on the response event and logs information about the redirect. It's useful for analytics or security checks on redirected requests.

```typescript
export function redirectTrackingInterceptor(req: HttpRequest, next: HttpHandlerFn): Observable<httpEvent > { 
  return next(req).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response && event.redirected) {
        console.log('Request to', req.url, 'was redirected to', event.url);
      }
    })
  );
}
```

--------------------------------

### Angular Reactive Form Validation Setup

Source: https://angular.dev/guide/forms/form-validation

Demonstrates setting up validators for a form control in an Angular reactive form. It includes built-in validators (`Validators.required`, `Validators.minLength`) and a custom validator (`forbiddenNameValidator`). Validators are passed as an array to the `FormControl` constructor. Getter methods are included for easier template access.

```typescript
import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {forbiddenNameValidator} from '../shared/forbidden-name.directive';

@Component({
  selector: 'app-actor-form-reactive',
  templateUrl: './actor-form-reactive.component.html',
  styleUrls: ['./actor-form-reactive.component.css'],
  imports: [ReactiveFormsModule],
})
export class HeroFormReactiveComponent {
  skills = ['Method Acting', 'Singing', 'Dancing', 'Swordfighting'];
  actor = {name: 'Tom Cruise', role: 'Romeo', skill: this.skills[3]};

  actorForm = new FormGroup({
    name: new FormControl(this.actor.name, [
      Validators.required,
      Validators.minLength(4),
      forbiddenNameValidator(/bob/i), // <-- Here's how you pass in the custom validator.
    ]),
    role: new FormControl(this.actor.role),
    skill: new FormControl(this.actor.skill, Validators.required),
  });

  get name() { return this.actorForm.get('name'); }
  get skill() { return this.actorForm.get('skill'); }
}
```

--------------------------------

### Supported Value Literals in Angular Expressions

Source: https://angular.dev/guide/templates/expression-syntax

Angular expressions support a subset of JavaScript's literal values, including strings, booleans, numbers, objects, arrays, null, template strings, and regular expressions. Unsupported literals like BigInt are not directly usable.

```typescript
const stringLiteral = 'Hello';
const booleanLiteral = true;
const numberLiteral = 123;
const objectLiteral = { name: 'Alice' };
const arrayLiteral = ['Onion', 'Cheese', 'Garlic'];
const nullLiteral = null;
const templateLiteral = `Hello ${name}`;
const regexLiteral = /\d+/;
```

--------------------------------

### Angular Test: Asynchronous Observable Before Init

Source: https://angular.dev/guide/testing/components-scenarios

Tests an Angular component's state immediately after initialization when the service provides data via an asynchronous Observable. It asserts that no quote is displayed, no error is present, and the service method has been called, indicating the asynchronous operation has started.

```typescript
it('should not show quote before OnInit', () => {
  expect(quoteEl.textContent).withContext('nothing displayed').toBe('');
  expect(errorMessage()).withContext('should not show error element').toBeNull();
  expect(getQuoteSpy.calls.any()).withContext('getQuote not yet called').toBe(false);
});
```

--------------------------------

### App Component HTML - Angular

Source: https://angular.dev/guide/routing/routing-with-urlmatcher

This snippet represents the main application component's HTML file ('app.component.html') in an Angular project. It sets up a basic title for the application, indicating that it deals with 'Routing with Custom Matching'. The router outlet is implicitly handled by Angular's routing configuration.

```html
Routing with Custom Matching
----------------------------


```

--------------------------------

### Narrow Input Type with Type Assertion Function (TypeScript)

Source: https://angular.dev/guide/directives/structural-directives

This directive narrows the type of an input expression using a static `ngTemplateGuard_` method. It asserts that the `actor` input is of type `User` if the guard returns true. This is useful for conditional rendering based on specific types.

```typescript
@Directive({
  selector: '[actorIsUser]'
})
class ActorIsUser {
  actor = input();

  static ngTemplateGuard_actor(dir: ActorIsUser, expr: User | Robot): expr is User {
    // The return statement is unnecessary in practice, but included to
    // prevent TypeScript errors.
    return true;
  }
}
```

--------------------------------

### Angular @defer with @loading and @placeholder

Source: https://angular.dev/guide/templates/defer

Illustrates using both @loading and @placeholder blocks within an Angular @defer block. The @placeholder is shown initially, replaced by the @loading content while dependencies are fetched, and finally by the deferred content. Dependencies are eagerly loaded.

```html
@defer {
  // Deferred content
}
@loading {
  // Loading indicator
}
@placeholder {
  // Placeholder content
}
```

--------------------------------

### Template for Nested Form Group in Angular

Source: https://angular.dev/guide/forms/reactive-forms

Connects the nested 'address' FormGroup and its input elements (street, city, state, zip) to the component's form model within the 'ProfileEditor' template. It also includes examples for other form sections like 'First Name', 'Last Name', and an 'Aliases' section with dynamic array rendering.

```html
First Name: <input type="text" formControlName="firstName">
Last Name: <input type="text" formControlName="lastName">

Address
-------

Street: <input type="text" formControlName="street">
City: <input type="text" formControlName="city">
State: <input type="text" formControlName="state">
Zip Code: <input type="text" formControlName="zip">

Aliases
-------

+ Add another alias
@for(alias of aliases.controls; track $index; let i = $index) {
  Alias: <input type="text" [formControl]="alias">
}

Form Value: {{ profileForm.value | json }}
```

--------------------------------

### Using Injection Token with a Runtime Value

Source: https://angular.dev/guide/di/dependency-injection-providers

This snippet shows how to use an `InjectionToken` with a runtime value provided via `useValue`. It also demonstrates injecting the service using the token and the `inject` function.

```typescript
// 📁 /app/tokens.ts
import { InjectionToken } from '@angular/core';

export const CONFIG_TOKEN = new InjectionToken<{ apiUrl: string }>('AppConfig');

// 📁 /app/app.component.ts
import { Component, inject } from '@angular/core';
import { CONFIG_TOKEN } from './tokens';

@Component({
  selector: 'app-root',
  providers: [
    {
      provide: CONFIG_TOKEN,
      useValue: { apiUrl: 'https://api.example.com' }
    }
  ]
})
export class AppComponent {
  private config = inject(CONFIG_TOKEN);

  ngOnInit() {
    console.log('API URL:', this.config.apiUrl);
  }
}
```

--------------------------------

### Run Angular Tests in CI Environment

Source: https://angular.dev/guide/testing

Command to run Angular unit tests, typically used in a Continuous Integration (CI) environment. The `--no-watch` and `--no-progress` flags ensure a single, non-interactive test run suitable for CI servers.

```bash
ng test --no-watch --no-progress
```

--------------------------------

### Define FormGroup with Nested Controls in Angular

Source: https://angular.dev/guide/forms/reactive-forms

Defines a FormGroup named 'profileForm' within an Angular component. It includes nested FormGroups for address details and individual FormControls for first name, last name, street, city, state, and zip code. This setup allows for organized management of complex form structures.

```typescript
import {Component} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
  imports: [ReactiveFormsModule],
})
export class ProfileEditorComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
    }),
  });

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }
}
```

--------------------------------

### Angular CLI Test File Generation for BannerComponent

Source: https://angular.dev/guide/testing/components-basics

This snippet shows the initial test file generated by the Angular CLI for a BannerComponent. It includes necessary imports for Angular testing utilities and the component itself, setting up the basic structure for component testing.

```typescript
import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {By} from '@angular/platform-browser';
import {BannerComponent} from './banner-initial.component';

/* ... */
```

--------------------------------

### Create Angular Highlight Directive using CLI

Source: https://angular.dev/guide/directives/attribute-directives

This command uses the Angular CLI to generate a new directive named 'highlight'. It creates the necessary TypeScript files for the directive and its associated tests.

```bash
ng generate directive highlight
```

--------------------------------

### CSS for Animated List Items

Source: https://next.angular.dev/guide/animations/migration

This CSS defines styles for animating list items, including transitions for opacity and transform, and an animation for fading out. It utilizes @starting-style for initial states and @keyframes for defining the fade-out animation.

```css
.items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.items .item {
  transition-property: opacity, transform;
  transition-duration: 500ms;
  @starting-style {
    opacity: 0;
    transform: translateX(-10px);
  }
}

.items .item.fade {
  animation: fade-out 500ms;
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```

--------------------------------

### Angular Application Configuration Provider (useValue)

Source: https://angular.dev/guide/di/dependency-injection-providers

Illustrates a practical use case of `useValue` for providing application-wide configuration in Angular. It defines an interface for the configuration, creates an `InjectionToken`, provides a configuration object using `useValue` during application bootstrap, and injects it into a component to display the application title.

```typescript
import { InjectionToken, Injectable, Component, inject, bootstrapApplication } from '@angular/core';

// Define configuration interface
export interface AppConfig {
  apiUrl: string;
  appTitle: string;
  features: {
    darkMode: boolean;
    analytics: boolean;
  };
}

// Create injection token
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// Define configuration object
const appConfig: AppConfig = {
  apiUrl: 'https://api.example.com',
  appTitle: 'My Application',
  features: {
    darkMode: true,
    analytics: false
  }
};

// Provider configuration for bootstrap
const appProviders = [
  {
    provide: APP_CONFIG,
    useValue: appConfig
  }
];

// Example usage in a component
@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <h1>{{ title }}</h1>
  `
})
export class HeaderComponent {
  private config = inject(APP_CONFIG);
  title = this.config.appTitle;
}

// Bootstrap the application with the configuration
bootstrapApplication(HeaderComponent, {
  providers: appProviders
});

```

--------------------------------

### Generate Vitest Base Configuration CLI

Source: https://angular.dev/guide/testing

Command to generate a base Vitest configuration file (`vitest-base.config.ts`) using the Angular CLI. This file can then be customized for advanced testing scenarios.

```bash
ng generate config vitest
```

--------------------------------

### POST Request for Server Mutations

Source: https://angular.dev/guide/http/making-requests

Illustrates how to use `HttpClient.post()` to send data to the server for state mutations. This typically involves sending a request body with the new state or changes.

```APIDOC
## POST /api/items

### Description
Creates or updates an item on the server with the provided data.

### Method
POST

### Endpoint
`/api/items`

### Parameters
#### Query Parameters
- **None**

#### Request Body
- **itemData** (object) - Required - The data for the item to be created or updated.
  - **name** (string) - Required - The name of the item.
  - **value** (number) - Optional - The value associated with the item.

### Request Example
```typescript
interface ItemData {
  name: string;
  value?: number;
}

const newItem: ItemData = { name: 'New Gadget', value: 99.99 };

http.post('/api/items', newItem).subscribe(response => {
  console.log('Item created successfully:', response);
});
```

### Response
#### Success Response (200 or 201)
- **response** (object) - Confirmation of the item creation/update.

#### Response Example
```json
{
  "id": "item-123",
  "message": "Item saved successfully."
}
```
```

--------------------------------

### Angular ContentChild Example Causing Token Retention

Source: https://angular.dev/guide/di/lightweight-injection-tokens

This code demonstrates a common scenario in Angular libraries where using `@ContentChild` with a component, even if optional, can lead to the component not being tree-shaken. This is due to implicit references in both the type and value positions, preventing the compiler from removing unused code.

```typescript
import { Component, ContentChild } from '@angular/core';

@Component({
  selector: 'lib-header',
  // ... other properties
}) class LibHeaderComponent {}

@Component({
  selector: 'lib-card',
  // ... other properties
}) class LibCardComponent {
  @ContentChild(LibHeaderComponent) header: LibHeaderComponent | null = null;
}
```

--------------------------------

### Relative URL Syntax with Strings and Arrays in Angular

Source: https://angular.dev/guide/routing/navigate-to-routes

Shows the two syntaxes for defining relative URLs in Angular routing: strings and arrays. A string is used for simple relative paths, while an array is necessary when dynamic parameters need to be included in the relative URL. This allows for flexible navigation based on current route context.

```html
<a routerLink="dashboard">Dashboard</a>

<a [routerLink]="['/user', userId]">User {{ userId }}</a>
```

--------------------------------

### Fake Component Definitions for Testing

Source: https://angular.dev/guide/testing/services

Provides definitions for fake components used in testing scenarios. These include simple templates for child and grandchild components, as well as a component with nested imports.

```typescript
@Component({ selector: 'child-1', template: 'Fake Child', })
class FakeChildComponent {}

@Component({ selector: 'grandchild-1', template: 'Fake Grandchild', })
class FakeGrandchildComponent {}

@Component({
  selector: 'child-1',
  imports: [FakeGrandchildComponent],
  template: 'Fake Child()',
})
class FakeChildWithGrandchildComponent {}
```

--------------------------------

### TwainComponent Async Test with `fakeAsync` (TypeScript)

Source: https://angular.dev/guide/testing/components-scenarios

An example of an asynchronous test for the TwainComponent using Angular's `fakeAsync` and `tick` utilities. This test verifies the component's behavior when the `TwainService.getQuote()` spy returns an asynchronous observable, simulating a delay and subsequent data emission or error. It checks for the display of quotes or error messages.

```typescript
import {fakeAsync, ComponentFixture, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {asyncData, asyncError} from '../../testing';
import {Subject, defer, of, throwError} from 'rxjs';
import {last} from 'rxjs/operators';
import {TwainComponent} from './twain.component';
import {TwainService} from './twain.service';

describe('TwainComponent', () => {
  let component: TwainComponent;
  let fixture: ComponentFixture;
  let getQuoteSpy: jasmine.Spy;
  let quoteEl: HTMLElement;
  let testQuote: string;

  // Helper function to get the error message element value
  // An *ngIf keeps it out of the DOM until there is an error
  const errorMessage = () => {
    const el = fixture.nativeElement.querySelector('.error');
    return el ? el.textContent : null;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwainService],
    });

    testQuote = 'Test Quote';

    // Create a fake TwainService object with a `getQuote()` spy
    const twainService = TestBed.inject(TwainService);
    // Make the spy return a synchronous Observable with the test data
    getQuoteSpy = spyOn(twainService, 'getQuote').and.returnValue(of(testQuote));

    fixture = TestBed.createComponent(TwainComponent);
    fixture.autoDetectChanges(true);
  });

  it('should show quote after getQuote (async)', async () => {
    fixture.detectChanges(); // ngOnInit()
    expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
    await fixture.whenStable(); // wait for async getQuote
    fixture.detectChanges(); // update view with quote
    expect(quoteEl.textContent).toBe(testQuote);
    expect(errorMessage()).withContext('should not show error').toBeNull();
  });

  it('should display error when TwainService fails', fakeAsync(() => {
    // tell spy to return an async error observable
    getQuoteSpy.and.returnValue(asyncError('TwainService test failure'));
    fixture.detectChanges();
    tick(); // component shows error after a setTimeout()
    fixture.detectChanges(); // update error message

    expect(errorMessage())
      .withContext('should display error')
      .toMatch(/test failure/);
    expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
  }));
});

```

--------------------------------

### Global Configuration with InjectionToken and providedIn: 'root' in Angular

Source: https://angular.dev/guide/di/dependency-injection-providers

Globally provide configuration objects using InjectionToken with a factory function and `providedIn: 'root'`. This makes the configuration available throughout the application without manual declaration in the `providers` array.

```typescript
// 📁 /app/config.token.ts
import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
  version: string;
  features: Record<string, boolean>;
}

// Globally available configuration using providedIn
export const APP_CONFIG = new InjectionToken('app.config', {
  providedIn: 'root',
  factory: () => ({
    apiUrl: 'https://api.example.com',
    version: '1.0.0',
    features: {
      darkMode: true,
      analytics: false
    }
  })
});

// No need to add to providers array - available everywhere!
@Component({
  selector: 'app-header',
  template: `
    <div>
      Version: {{ config.version }}
    </div>
  `
})
export class HeaderComponent {
  constructor(@Inject(APP_CONFIG) public config: AppConfig) {}
}
```

--------------------------------

### Angular Lightswitch Component Testing

Source: https://angular.dev/guide/testing/services

Tests for the LightswitchComponent, demonstrating explicit testing of component states and messages after user interactions like clicks. It shows an alternative to the traditional beforeEach() style.

```typescript
describe('LightswitchComp', () => { it('#clicked() should toggle #isOn', () => { const comp = new LightswitchComponent(); expect(comp.isOn).withContext('off at first').toBe(false); comp.clicked(); expect(comp.isOn).withContext('on after click').toBe(true); comp.clicked(); expect(comp.isOn).withContext('off after second click').toBe(false); }); it('#clicked() should set #message to "is on"', () => { const comp = new LightswitchComponent(); expect(comp.message) .withContext('off at first') .toMatch(/is off/i); comp.clicked(); expect(comp.message).withContext('on after clicked').toMatch(/is on/i); }); });
```

--------------------------------

### Render Dynamic Text with Text Interpolation in Angular

Source: https://angular.dev/guide/templates/binding

Use double curly braces {{ }} to bind dynamic text within Angular templates. This text interpolation allows Angular to manage and update expressions in the template. The example shows a simple component binding a 'theme' property to display text.

```typescript
@Component({
  template: `
    Your color preference is {{ theme }}.
  `,
  ...})
export class AppComponent {
  theme = 'dark';
}
```

--------------------------------

### Reordering List Item Animations - CSS

Source: https://angular.dev/guide/animations/css

CSS for animating items in a reordering list. It defines transitions for opacity and transform, including `@starting-style` for entry animations. It also includes a `.fade` class that uses a `fade-out` keyframe animation for item removal.

```css
.items { list-style: none; padding: 0; margin: 0;}.items .item { transition-property: opacity, transform; transition-duration: 500ms; @starting-style { opacity: 0; transform: translateX(-10px); }}.items .item.fade { animation: fade-out 500ms;}@keyframes fade-out { from { opacity: 1; } to { opacity: 0; }}
```

--------------------------------

### Retrieving Injected Services with TestBed.inject()

Source: https://angular.dev/guide/testing/components-scenarios

Demonstrates the use of TestBed.inject() as a concise and reliable method for retrieving services injected into an Angular component during testing. This is preferred over accessing the component's injector via DebugElement when the service is provided at the root.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserService} from '../model/user.service';
import {WelcomeComponent} from './welcome.component';

// ... (MockUserService and describe block setup as above) ...

describe('WelcomeComponent with TestBed.inject', () => {
  let comp: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let userService: UserService; // the TestBed injected service
  let el: HTMLElement; // the DOM element with the welcome message

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    fixture.autoDetectChanges();
    comp = fixture.componentInstance;

    // UserService from the root injector using TestBed.inject()
    userService = TestBed.inject(UserService);

    // get the "welcome" element by CSS selector
    el = fixture.nativeElement.querySelector('.welcome');
  });

  // ... (it blocks for testing the component's behavior) ...

  it('TestBed.inject should retrieve the UserService', () => {
    expect(userService).toBeDefined();
  });
});

```

--------------------------------

### Skip Hydration with ngSkipHydration Attribute

Source: https://angular.dev/guide/hydration

Use the ngSkipHydration attribute on a component's host element to prevent Angular from hydrating that component and its children. This is useful for components that may not work correctly with hydration enabled, such as those involving direct DOM manipulation. When used, the component will be destroyed and re-rendered as if hydration were not enabled for it.

```html
<my-component ngSkipHydration></my-component>
```

```typescript
@Component({
  selector: 'example-component',
  template: '...',
  host: {
    ngSkipHydration: 'true'
  }
})
class ExampleComponent {}

```

--------------------------------

### Handling JSONP with Angular Async Testing

Source: https://angular.dev/guide/testing/components-scenarios

Illustrates how to test JSONP requests in Angular using asynchronous testing utilities. It shows how to set up a promise that resolves when the JSONP callback is invoked, ensuring the test waits for the asynchronous operation to complete.

```typescript
describe('test jsonp', () => {
  function jsonp(url: string, callback: () => void) {
    // do a jsonp call which is not zone aware
  }

  // need to config __zone_symbol__supportWaitUnResolvedChainedPromise flag // before loading zone.js/testing
  it('should wait until promise.then is called', waitForAsync(() => {
    let finished = false;
    new Promise((res) => {
      jsonp('localhost:8080/jsonp', () => {
        // success callback and resolve the promise
        finished = true;
        res();
      });
    }).then(() => {
      // async will wait until promise.then is called // if __zone_symbol__supportWaitUnResolvedChainedPromise is set
      expect(finished).toBe(true);
    });
  }));
});
```

--------------------------------

### Angular Hero Feature Testing with Router and HTTP Mocking

Source: https://angular.dev/guide/testing/pipes

This snippet covers comprehensive testing for the Angular hero feature, including navigation, component creation, and HTTP request mocking. It utilizes `RouterTestingHarness` for navigation simulation and `HttpTestingController` to intercept and verify HTTP requests like PUT operations. The `fakeAsync` and `tick` utilities are used to manage asynchronous operations.

```typescript
import {getTestHeroes} from '../model/testing/test-hero.service';
const firstHero = getTestHeroes()[0];

function heroModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig,
        {
          imports: [HeroDetailComponent, HeroListComponent],
          providers: [
            provideRouter([
              {path: 'heroes/:id', component: HeroDetailComponent},
              {path: 'heroes', component: HeroListComponent},
            ]),
            provideHttpClient(),
            provideHttpClientTesting(),
          ],
        }
      )
    );
  });

  describe('when navigate to existing hero', () => {
    let expectedHero: Hero;
    beforeEach(async () => {
      expectedHero = firstHero;
      await createComponent(expectedHero.id);
    });

    it("should display that hero's name", () => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });

    it('should navigate when click cancel', () => {
      click(page.cancelBtn);
      expect(TestBed.inject(Router).url).toEqual(`/heroes/${expectedHero.id}`);
    });

    it('should save when click save but not navigate immediately', () => {
      click(page.saveBtn);
      expect(TestBed.inject(HttpTestingController).expectOne({method: 'PUT', url: 'api/heroes'}));
      expect(TestBed.inject(Router).url).toEqual('/heroes/41');
    });

    it('should navigate when click save and save resolves', fakeAsync(() => {
      click(page.saveBtn);
      tick();
      expect(TestBed.inject(Router).url).toEqual('/heroes/41');
    }));

    it('should convert hero name to Title Case', async () => {
      // ... harness.fixture.autoDetectChanges();
      const hostElement: HTMLElement = harness.routeNativeElement!;
      const nameInput: HTMLInputElement = hostElement.querySelector('input')!;
      const nameDisplay: HTMLElement = hostElement.querySelector('span')!;

      nameInput.value = 'quick BROWN fOx';
      nameInput.dispatchEvent(new Event('input'));
      await harness.fixture.whenStable();
      expect(nameDisplay.textContent).toBe('Quick Brown Fox');
    });
  });

  describe('when navigate to non-existent hero id', () => {
    beforeEach(async () => {
      await createComponent(999);
    });

    it('should try to navigate back to hero list', () => {
      expect(TestBed.inject(Router).url).toEqual('/heroes');
    });
  });
}
////////////////////
import {FormsModule}

```

--------------------------------

### Displaying Role Validation Feedback in Angular Template

Source: https://angular.dev/guide/forms/form-validation

This example shows how to provide feedback for a 'role' form control, including a 'pending' state for validation and specific error messages like 'uniqueRole'. It also includes a check for a form-level error 'unambiguousRole' that depends on the form's touched or dirty state.

```html
Role  @if (role.pending) {

Validating...

} @if (role.invalid) {

@if (role.hasError('uniqueRole')) {

Role is already taken.

}

}

@if (actorForm.hasError('unambiguousRole') && (actorForm.touched || actorForm.dirty)) {

Name cannot match role.

}
```

--------------------------------

### Create and Inspect ShellComponent with Child Components

Source: https://angular.dev/guide/testing/services

Tests the creation of a ShellComponent and verifies the presence and count of its child components and template references. It uses DebugElement to query child components and their references, ensuring the component's structure is as expected.

```typescript
describe('ShellComponent', () => {
  it('should create and inspect child components', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    // NeedsContentComp is the child of ShellComp
    const el = fixture.debugElement.children[0];
    const comp = el.componentInstance;
    expect(comp.children.toArray().length)
      .withContext('three different child components and an ElementRef with #content')
      .toBe(4);
    expect(el.references['nc']).withContext('#nc reference to component').toBe(comp);

    // Filter for DebugElements with a #content reference
    const contentRefs = el.queryAll((de) => de.references['content']);
    expect(contentRefs.length).withContext('elements w/ a #content reference').toBe(4);
  });
});
```

--------------------------------

### Using Template Reference Variables with ViewChild Queries

Source: https://angular.dev/guide/templates/variables

Demonstrates how to use template reference variables in conjunction with Angular's ViewChild decorator for querying elements within a component's template. This allows the component class to get a reference to a specific DOM element, component, or directive marked with a template reference variable.

```typescript
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: '<input #description>
             <button (click)="focusInput()">Focus Input</button>',
})
export class MyComponent {
  @ViewChild('description') descriptionInput!: ElementRef;

  focusInput() {
    this.descriptionInput.nativeElement.focus();
  }
}
```

--------------------------------

### Override Component Providers with TestBed

Source: https://angular.dev/guide/testing/services

Demonstrates how to override the providers for a component using TestBed.configureTestingModule. It shows how to replace a service with a fake implementation and verifies the injected value.

```typescript
it('should override TestProvidersComp providers', () => {
  const fixture = TestBed.configureTestingModule({
    imports: [TestProvidersComponent],
  })
  .overrideComponent(TestProvidersComponent, {
    // remove: { providers: [ValueService]},
    // add: { providers: [{ provide: ValueService, useClass: FakeValueService }] // },
    // Or replace them all (this component has only one provider)
    set: { providers: [{ provide: ValueService, useClass: FakeValueService }] },
  }).createComponent(TestProvidersComponent);
  fixture.detectChanges();
  expect(fixture).toHaveText('injected value: faked value', 'text');
});
```

--------------------------------

### Push branch to GitHub

Source: https://github.com/angular/angular/blob/main/CONTRIBUTING

After committing your changes, push the branch to your GitHub repository to make it available for a pull request.

```git
git push origin my-fix-branch
```

--------------------------------

### Reusable Animations: @angular/animations vs. Native CSS

Source: https://next.angular.dev/guide/animations/migration

Compares the creation of reusable animations using Angular's animation() function versus native CSS keyframes and classes. The TypeScript approach uses the animation() and trigger() functions, while the CSS approach utilizes @keyframes and class-based application.

```typescript
import {animation, style, animate, trigger, transition, useAnimation} from '@angular/animations';

export const transitionAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}',
  }),
  animate('{{ time }}'),
]);

export const sharedAnimation = animation([
  style({
    height: 0,
    opacity: 1,
    backgroundColor: 'red',
  }),
  animate('1s'),
]);

export const triggerAnimation = trigger('openClose', [
  transition('open => closed', [
    useAnimation(transitionAnimation, {
      params: {
        height: 0,
        opacity: 1,
        backgroundColor: 'red',
        time: '1s',
      },
    }),
  ]),
]);
```

```css
@keyframes sharedAnimation {
  to {
    height: 0;
    opacity: 1;
    background-color: 'red';
  }
}

.animated-class {
  animation: sharedAnimation 1s;
}

.open {
  height: '200px';
  opacity: 1;
  background-color: 'yellow';
  transition: all 1s;
}

.closed {
  height: '100px';
  opacity: 0.8;
  background-color: 'blue';
  transition: all 1s;
}

.example-element {
  animation-duration: 1s;
  animation-delay: 500ms;
  animation-timing-function: ease-in-out;
}

.example-shorthand {
  animation: exampleAnimation 1s ease-in-out 500ms;
}

.example-element {
  transition-duration: 1s;
  transition-delay: 500ms;
  transition-timing-function: ease-in-out;
  transition-property: margin-right;
}

.example-shorthand {
  transition: margin-right 1s ease-in-out 500ms;
}
```

--------------------------------

### Angular TestBed: Component Creation and Interaction Testing

Source: https://angular.dev/guide/testing/services

Tests the creation of a ShellComponent and verifies its child components and template references using Angular's TestBed. It checks the number of child components, template reference variables, and queries elements based on references.

```typescript
describe('ShellComponent', () => {
  it('should create and interact with child components', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges(); // NeedsContentComp is the child of ShellComp
    const el = fixture.debugElement.children[0];
    const comp = el.componentInstance;
    expect(comp.children.toArray().length)
      .withContext('three different child components and an ElementRef with #content')
      .toBe(4);
    expect(el.references['nc']).withContext('#nc reference to component').toBe(comp);
    // Filter for DebugElements with a #content reference
    const contentRefs = el.queryAll((de) => de.references['content']);
    expect(contentRefs.length).withContext('elements w/ a #content reference').toBe(4);
  });
});
```

--------------------------------

### Configuring Static Site Generation

Source: https://angular.dev/guide/prerendering

Opt out of server-file generation for a fully static site by setting `outputMode` to `static` in `angular.json`. This generates pre-rendered HTML files for each route at build time without requiring a Node.js server.

```APIDOC
## Configure Static Site Generation

### Description
Set `outputMode` to `static` in `angular.json` to generate a fully static application. This approach creates pre-rendered HTML files for each route at build time, eliminating the need for a server.

### Method
Configuration

### Endpoint
`angular.json`

### Parameters
#### JSON Configuration
- **`projects.[your-app].architect.build.options.outputMode`** (string) - Required - Set to `"static"` to enable static site generation.

### Request Example
```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "outputMode": "static"
          }
        }
      }
    }
  }
}
```

### Response
- **N/A** - This is a configuration setting, not an API response.

### Response Example
N/A
```

--------------------------------

### Angular Http Interceptor: Handle Response Types with Fetch Provider

Source: https://angular.dev/guide/http/interceptors

An example of an Angular Http functional interceptor that inspects the `responseType` property of a response event when using the `withFetch` provider. It includes a switch statement to handle different response types like 'opaque', 'cors', 'basic', and 'error', providing specific console warnings or errors based on the type.

```typescript
export function responseTypeInterceptor(req: HttpRequest, next: HttpHandlerFn): Observable<httpEvent > { 
  return next(req).pipe(
    map(event => {
      if (event.type === HttpEventType.Response) {
        switch (event.responseType) {
          case 'opaque': 
            console.warn('Limited response data due to CORS policy'); 
            break;
          case 'cors': 
          case 'basic': 
            break;
          case 'error': 
            console.error('Network error in response'); 
            break;
        }
      }
    })
  );
}
```

--------------------------------

### Configure Shared Module for Hero Detail Component (TypeScript)

Source: https://angular.dev/guide/testing/components-scenarios

Sets up the Angular testing module with shared imports for the Hero Detail Component. This configuration is useful when the component relies on a set of common UI elements or services defined in a shared module. It includes routing and HTTP testing providers.

```typescript
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { appConfig } from '../app.config';
import { firstHero } from '../model/testing/test-hero.service';

// Assume sharedImports is defined elsewhere and contains necessary Angular modules
const sharedImports = [
  // Example: CommonModule, FormsModule, etc.
];

// Helper to create component instance
async function createComponent(id: number) {
  const fixture = TestBed.createComponent(HeroDetailComponent);
  const component = fixture.componentInstance;
  // Assuming component has a 'hero' property that needs to be set for testing
  // component.hero = { ...firstHero, id: id }; // Mock hero assignment
  fixture.detectChanges();
  await fixture.whenStable(); // Wait for any async operations
  return component;
}

function sharedModuleSetup() {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [HeroDetailComponent, ...sharedImports, RouterTestingModule, HttpClientTestingModule],
        providers: [
          provideRouter([{ path: 'heroes/:id', component: HeroDetailComponent }]),
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      })
    );
  });

  it("should display 1st hero's name", async () => {
    const expectedHero = firstHero;
    await createComponent(expectedHero.id).then((component) => {
      // Assuming page object or direct DOM access to check the display
      // const compiled = fixture.nativeElement;
      // expect(compiled.querySelector('.hero-name-display').textContent).toContain(expectedHero.name);
    });
  });
}

// Placeholder for Page object if not defined elsewhere
class Page {
  get nameDisplay() { return { textContent: '' }; } // Mock implementation
}

// Dummy imports for compilation
function provideRouter(routes: any[]) { return {}; }
function provideHttpClient() { return {}; }
function provideHttpClientTesting() { return {}; }

// Call the setup function to run the tests
sharedModuleSetup();

```

--------------------------------

### Auto Height Animation in Angular (Animations Package)

Source: https://next.angular.dev/guide/animations/migration

Illustrates animating an element's height to 'auto' using Angular's animations package. It defines states for height expansion and collapse, allowing for dynamic height adjustments during transitions. This requires specific animation imports.

```typescript
import {Component, signal} from '@angular/core';
import {trigger, transition, state, animate, style} from '@angular/animations';

@Component({
  selector: 'app-open-close',
  animations: [
    trigger('openClose', [
      state('true', style({
        height: '*'
      })),
      state('false', style({
        height: '0px'
      })),
      transition('false <=> true', animate(1000)),
    ]),
  ],
  templateUrl: 'auto-height.component.html',
  styleUrl: 'auto-height.component.css',
})
export class AutoHeightComponent {
  isOpen = signal(false);

  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
```

--------------------------------

### Apply Status CSS Classes to Form Controls

Source: https://angular.dev/guide/forms/form-validation

Angular automatically adds CSS classes to form control elements to reflect their validation state (e.g., valid, invalid, pristine, dirty). These classes can be used to style elements based on their current status. The example demonstrates using .ng-valid and .ng-invalid for border colors.

```css
.ng-valid[required], .ng-valid.required {
  border-left: 5px solid #42A948; /* green */
}

.ng-invalid:not(form) {
  border-left: 5px solid #a94442; /* red */
}

.alert div {
  background-color: #fed3d3;
  color: #820000;
  padding: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: .5rem;
}

select {
  width: 100%;
  padding: .5rem;
}
```

--------------------------------

### Advanced HarnessLoader Query Methods

Source: https://angular.dev/guide/testing/using-component-harnesses

Explains additional HarnessLoader methods for querying harnesses: `getHarnessAtIndex` for a specific index, `countHarnesses` for the number of instances, and `hasHarness` to check for existence. These methods allow for more granular control in test scenarios.

```typescript
// Get harness for a component at a specific index
const specificHarness = await loader.getHarnessAtIndex(0, MyComponent);

// Count the number of component instances
const count = await loader.countHarnesses(MyComponent);

// Check if at least one instance exists
const exists = await loader.hasHarness(MyComponent);
```

--------------------------------

### POST Request with Request Body in Angular HttpClient

Source: https://angular.dev/guide/http/making-requests

Demonstrates how to perform a POST request using Angular's HttpClient, including specifying a request body. The body can be various types, which HttpClient serializes appropriately (e.g., JSON for objects, plain text for strings). Remember to subscribe to the observable to trigger the request.

```typescript
import { HttpClient } from '@angular/common/http';

// Assuming http is an instance of HttpClient injected into your service or component
// http.post('/api/config', newConfig).subscribe(config => {
//   console.log('Updated config:', config);
// });
```

--------------------------------

### Configure Server Routes with Render Modes (TypeScript)

Source: https://angular.dev/guide/ssr

Define server routes and their rendering modes (Client, Prerender, Server) in `app.routes.server.ts`. This allows fine-grained control over how different parts of the application are rendered.

```typescript
// app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '', // This renders the "/" route on the client (CSR)
    renderMode: RenderMode.Client,
  },
  {
    path: 'about', // This page is static, so we prerender it (SSG)
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'profile', // This page requires user-specific data, so we use SSR
    renderMode: RenderMode.Server,
  },
  {
    path: '**', // All other routes will be rendered on the server (SSR)
    renderMode: RenderMode.Server,
  },
];
```

--------------------------------

### Inject HttpClient Service (TypeScript)

Source: https://angular.dev/guide/http/setup

Illustrates how to inject the `HttpClient` service into a component, service, or other class using Angular's dependency injection (`inject`). Once injected, the `http` instance can be used to make HTTP requests.

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ConfigService {
  private http = inject(HttpClient);
  // This service can now make HTTP requests via `this.http`.
}
```

--------------------------------

### Template-Driven Form Validation in Angular

Source: https://angular.dev/guide/forms/form-validation

Demonstrates how to add validation to a template-driven form in Angular by using standard HTML validation attributes. Angular directives match these attributes to built-in validator functions. The example shows how to export NgModel to a local template variable to inspect the control's state (invalid, dirty, touched, hasError) and display corresponding error messages.

```html
<form #actorForm="ngForm">
  <div class="form-field">
    <label for="name">Name</label>
    <input
      type="text"
      id="name"
      name="name"
      [(ngModel)]="actor.name"
      required
      minlength="4"
      #name="ngModel"
    />

    <!-- Validation messages for Name -->
    <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert">
      <div *ngIf="name.hasError('required')">
        Name is required.
      </div>
      <div *ngIf="name.hasError('minlength')">
        Name must be at least 4 characters long.
      </div>
      <div *ngIf="name.hasError('forbiddenName')">
        Name cannot be Bob.
      </div>
    </div>
  </div>

  <div class="form-field">
    <label for="role">Role</label>
    <input
      type="text"
      id="role"
      name="role"
      [(ngModel)]="actor.role"
      #role="ngModel"
    />

    <!-- Validation messages for Role (example of async validation pending state) -->
    <div *ngIf="role.pending">
      Validating...
    </div>
    <div *ngIf="role.invalid" class="alert">
      <div *ngIf="role.hasError('uniqueRole')">
        Role is already taken.
      </div>
    </div>
  </div>

  <!-- Cross-field validation example -->
  <div
    *ngIf="actorForm.hasError('unambiguousRole') && (actorForm.touched || actorForm.dirty)"
    class="alert"
  >
    Name cannot match role.
  </div>

  <div class="form-field">
    <label>Skills</label>
    <div *ngFor="let skill of skills; let i = index">
      <input type="text" [(ngModel)]="skills[i]" name="skill{{i}}" #skill="ngModel" required />
      <!-- Validation messages for each skill input -->
      <div *ngIf="skill.errors && skill.touched" class="alert">
        <div *ngIf="skill.errors['required']">
          Skill is required.
        </div>
      </div>
    </div>
  </div>

  <p *ngIf="actorForm.touched || actorForm.dirty">
    Complete the form to enable the Submit button.
  </p>

  <button type="submit" [disabled]="actorForm.invalid">Submit</button>
  <button type="button" (click)="actorForm.reset()">Reset</button>
</form>

<!-- Success message after submission -->
<div *ngIf="actorForm.submitted">
  You've submitted your actor, {{ actorForm.value.name }}!
  <button>Add new actor</button>
</div>

```

--------------------------------

### Lightweight Injection Token Pattern for Tree-Shaking (TypeScript)

Source: https://angular.dev/guide/di/lightweight-injection-tokens

Illustrates the lightweight injection token pattern. An abstract class serves as the token, with the concrete component implementing it. This allows the component to be tree-shaken while the token remains small.

```typescript
abstract class LibHeaderToken {}

@Component({
  selector: 'lib-header',
  providers: [
    { provide: LibHeaderToken, useExisting: LibHeaderComponent }
  ],
  // ... other configurations
})
class LibHeaderComponent extends LibHeaderToken {}

@Component({
  selector: 'lib-card',
  // ... other configurations
})
class LibCardComponent {
  @ContentChild(LibHeaderToken)
  header: LibHeaderToken | null = null;
}
```

--------------------------------

### Responsive Image with 'sizes' Attribute

Source: https://angular.dev/guide/image-optimization

This snippet demonstrates how to configure a responsive image using the `sizes` attribute. By setting `sizes="100vw"`, you instruct the browser to select an image from the `srcset` that best matches the viewport width, optimizing delivery for fluid layouts.

```html
<img ngSrc="image.jpg" width="300" height="200" sizes="100vw" />

```

--------------------------------

### Router Core API

Source: https://angular.dev/api

This section details the core components and functions of the Angular Router, including route configuration, navigation guards, and state snapshotting.

```APIDOC
## Router Core API

### Description
Provides core functionalities for defining routes, navigating between them, and managing router state.

### Endpoints

- **`provideRouter(routes, config)`**: Configures the router with a set of routes and optional configuration.
- **`Router`**: The main router class responsible for navigation and event handling.
- **`ActivatedRoute`**: Represents an application route that has been loaded in the component.
- **`RouterStateSnapshot`**: Represents the state of the router at a specific moment in time.

### Key Concepts

- **Routes**: Define the structure of your application's navigation.
- **Navigation Guards**: Control access to routes based on certain conditions (e.g., `CanActivate`, `CanLoad`).
- **`RouterEvent`**: Represents various events that occur during the navigation lifecycle.

### Example Usage (Conceptual)
```typescript
import { provideRouter, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];

// In your AppModule or similar
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
});
```
```

--------------------------------

### Basic Async Tests in Angular

Source: https://angular.dev/guide/testing/components-scenarios

Demonstrates various ways to handle asynchronous operations in Angular tests using `fakeAsync`, `tick`, and `waitForAsync`. Includes tests for `setTimeout`, `setInterval`, Promises, and RxJS Observables, along with the `DoneFn` callback.

```typescript
import {fakeAsync, tick, waitForAsync} from '@angular/core/testing';
import {interval, of} from 'rxjs';
import {delay, take} from 'rxjs/operators';

describe('Angular async helper', () => {
  describe('async', () => {
    let actuallyDone = false;

    beforeEach(() => {
      actuallyDone = false;
    });

    it('should run normal test', () => {
      actuallyDone = true;
      expect(actuallyDone).toBe(true);
    });

    it('should run normal async test', (done: DoneFn) => {
      actuallyDone = true;
      done();
    });

    it('should run async test with task', waitForAsync(() => {
      setTimeout(() => {
        actuallyDone = true;
      }, 0);
    }));

    it('should run async test with interval task', waitForAsync(() => {
      const id = setInterval(() => {
        actuallyDone = true;
        clearInterval(id);
      }, 100);
    }));

    it('should run async test with successful promise', waitForAsync(() => {
      const p = new Promise((resolve) => {
        setTimeout(resolve, 10);
      });
      p.then(() => {
        actuallyDone = true;
      });
    }));

    it('should run async test with failed promise', waitForAsync(() => {
      const p = new Promise((resolve, reject) => {
        setTimeout(reject, 10);
      });
      p.catch(() => {
        actuallyDone = true;
      });
    }));

    it('should run async test with successful delayed Observable', (done: DoneFn) => {
      const source = of(true).pipe(delay(10));
      source.subscribe({
        next: (val) => (actuallyDone = true),
        error: (err) => fail(err),
        complete: done,
      });
    });

    it('should run async test with successful delayed Observable using waitForAsync', waitForAsync(() => {
      const source = of(true).pipe(delay(10));
      source.subscribe({
        next: (val) => (actuallyDone = true),
        error: (err) => fail(err),
      });
    }));

    it('should run async test with successful delayed Observable using fakeAsync', fakeAsync(() => {
      const source = of(true).pipe(delay(10));
      source.subscribe({
        next: (val) => (actuallyDone = true),
        error: (err) => fail(err),
      });
      tick(10);
    }));
  });

  describe('fakeAsync', () => {
    it('should run timeout callback with delay after call tick with millis', fakeAsync(() => {
      let called = false;
      setTimeout(() => {
        called = true;
      }, 100);
      tick(100);
      expect(called).toBe(true);
    }));

    it('should run new macro task callback with delay after call tick with millis', fakeAsync(() => {
      function nestedTimer(cb: () => any): void {
        setTimeout(() => setTimeout(() => cb()));
      }
      const callback = jasmine.createSpy('callback');
      nestedTimer(callback);
      expect(callback).not.toHaveBeenCalled();
      tick(0); // the nested timeout will also be triggered
      expect(callback).toHaveBeenCalled();
    }));

    it('should not run new macro task callback with delay after call tick with millis', fakeAsync(() => {
      function nestedTimer(cb: () => any): void {
        setTimeout(() => setTimeout(() => cb()));
      }
      const callback = jasmine.createSpy('callback');
      nestedTimer(callback);
      expect(callback).not.toHaveBeenCalled();
      tick(0, {processNewMacroTasksSynchronously: false}); // the nested timeout will not be triggered
      expect(callback).not.toHaveBeenCalled();
      tick(0);
      expect(callback).toHaveBeenCalled();
    }));

    it('should get Date diff correctly in fakeAsync', fakeAsync(() => {
      const start = Date.now();
      tick(100);
      const end = Date.now();
      expect(end - start).toBe(100);
    }));

    it('should get Date diff correctly in fakeAsync with rxjs scheduler', fakeAsync(() => {
      // need to add `import 'zone.js/plugins/zone-patch-rxjs-fake-async'` // to patch rxjs scheduler
      let result = '';
      of('hello')
        .pipe(delay(1000))
        .subscribe((v) => {
          result = v;
        });
      expect(result).toBe('');
      tick(1000);
      expect(result).toBe('hello');
      const start = new Date().getTime();
      let dateDiff = 0;
      interval(1000)
        .pipe(take(2))
        .subscribe(() => (dateDiff = new Date().getTime() - start));
      tick(1000);
      expect(dateDiff).toBe(1000);
      tick(1000);
      expect(dateDiff).toBe(2000);
    }));
  });

  describe('use jasmine.clock()', () => {
    // need to config __zone_symbol__fakeAsyncPatchLock flag // before loading zone.js/testing
    beforeEach(() => {
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should auto enter fakeAsync', () => {
      // is in fakeAsync now, don't need to call fakeAsync(testFn)
      let called = false;
      setTimeout(() => {
        called = true;
      }, 100);
      jasmine.clock().tick(100);
      expect(called).toBe(true);
    });
  });

  describe('test jsonp', () => {
    function jsonp(url: string, callback: () => void) {
      // do a jsonp call which is not zone aware
    }

    // need to config __zone_symbol__supportWaitUnResolvedChainedPromise flag // before loading zone.js/testing
    it('should wait until promise.then is called', waitForAsync(() => {
      let finished = false;
      new Promise((res) => {
        jsonp('localhost:8080/jsonp', () => {
          // success callback and resolve the promise
          finished = true;
          res();
        });
      }).then(() => {
        // async will wait until promise.then is called // if __zone_symbol__supportWaitUnResolvedChainedPromise is set
        expect(finished).toBe(true);
      });
    }));
  });
});

```

--------------------------------

### Reactive Forms API Summary - Classes

Source: https://angular.dev/guide/forms/reactive-forms

Overview of the base classes used for creating and managing reactive form controls in Angular.

```APIDOC
## Classes

### `AbstractControl`

**Details**: The abstract base class for the concrete form control classes `FormControl`, `FormGroup`, and `FormArray`. It provides their common behaviors and properties.

### `FormControl`

**Details**: Manages the value and validity status of an individual form control. It corresponds to an HTML form control such as `<input>` or `<select>`.

### `FormGroup`

**Details**: Manages the value and validity state of a group of `AbstractControl` instances. The group's properties include its child controls. The top-level form in your component is `FormGroup`.

### `FormArray`

**Details**: Manages the value and validity state of a numerically indexed array of `AbstractControl` instances.

### `FormBuilder`

**Details**: An injectable service that provides factory methods for creating control instances.

### `FormRecord`

**Details**: Tracks the value and validity state of a collection of `FormControl` instances, each of which has the same value type.
```

--------------------------------

### Parallel Animations using Native CSS

Source: https://next.angular.dev/guide/animations/migration

Shows how to apply multiple CSS animations simultaneously to an element. This is achieved by listing animation names separated by commas in the `animation` CSS property.

```css
.target-element {
  animation: rotate 3s, fade-in 2s;
}
```

--------------------------------

### Defining Application Routes

Source: https://angular.dev/guide/routing/show-routes-with-outlets

This code snippet demonstrates how to define routes for an Angular application. It uses the Routes type from '@angular/router' and specifies paths, associated components, and titles for each route.

```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home Page' },
  { path: 'products', component: ProductsComponent, title: 'Our Products' }
];
```

--------------------------------

### Configuring TestBed for Zoneless Change Detection in Angular

Source: https://angular.dev/guide/zoneless

Illustrates how to configure Angular's `TestBed` to use zoneless change detection for testing component compatibility. It involves providing `provideZonelessChangeDetection()` and using `fixture.whenStable()` instead of `fixture.detectChanges()` to mimic production behavior where Angular handles change detection scheduling.

```typescript
import { TestBed } from "@angular/core/testing";
import { provideZonelessChangeDetection } from "@angular/core/primitives/core";

TestBed.configureTestingModule({
  providers: [provideZonelessChangeDetection()]
});
const fixture = TestBed.createComponent(MyComponent);
await fixture.whenStable();
```

--------------------------------

### Query Element using DebugElement and By.css (Jasmine)

Source: https://angular.dev/guide/testing/components-basics

Demonstrates querying an element using Angular's `debugElement` and `By.css`. It retrieves the `debugElement` for the component, queries for a 'p' element using a CSS selector, and then accesses the native element to assert its text content.

```typescript
import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BannerComponent} from './banner-initial.component';

describe('BannerComponent (with beforeEach)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [BannerComponent]});
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
  });

  it('should find the with fixture.debugElement.query(By.css)', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const paragraphDe = bannerDe.query(By.css('p'));
    const p: HTMLElement = paragraphDe.nativeElement;
    expect(p.textContent).toEqual('banner works!');
  });
});
```

--------------------------------

### Overriding Component Providers with TestBed

Source: https://angular.dev/guide/testing/utility-apis

This snippet illustrates how to override a component's providers, including removing existing ones and adding new ones (e.g., using mock services). It shows how to replace a service provider with a fake implementation to control dependencies during testing.

```typescript
it("should override TestProvidersComp's ValueService provider", () => {
  const fixture = TestBed.configureTestingModule({
    imports: [TestProvidersComponent],
  })
  .overrideComponent(TestProvidersComponent, {
    remove: { providers: [ValueService] },
    add: { providers: [{ provide: ValueService, useClass: FakeValueService }] },
    // Or replace them all (this component has only one provider)
    // set: { providers: [{ provide: ValueService, useClass: FakeValueService }] },
  })
  .createComponent(TestProvidersComponent);
  fixture.detectChanges();
  expect(fixture).toHaveText('injected value: faked value', 'text');
  // Explore the providerTokens
  const tokens = fixture.debugElement.providerTokens;
  expect(tokens).withContext('component ctor').toContain(fixture.componentInstance.constructor);
  expect(tokens).withContext('TestProvidersComp').toContain(TestProvidersComponent);
  expect(tokens).withContext('ValueService').toContain(ValueService);
});
```

--------------------------------

### Conditionally Render User Profile with Async Pipe

Source: https://angular.dev/guide/http/making-requests

Demonstrates using the AsyncPipe with @if to render user profile details only after the data has finished loading. It injects UserService and uses an effect to fetch user data based on a required userId input, ensuring subscriptions are handled properly.

```typescript
import { AsyncPipe } from '@angular/common';
import { Component, inject, input, effect } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service'; // Assuming UserService is in user.service.ts
import { HttpClient } from '@angular/common/http'; // Import HttpClient if not already imported

@Component({
  imports: [AsyncPipe],
  template: `
    @if (user$ | async; as user) {
      <h2>Name: {{ user.name }}</h2>
      <p>Biography: {{ user.biography }}</p>
    }
  `,
})
export class UserProfileComponent {
  userId = input.required<string>();
  user$!: Observable;
  private userService = inject(UserService);

  constructor() {
    effect(() => {
      this.user$ = this.userService.getUser(this.userId());
    });
  }
}
```

--------------------------------

### Create Harness Loader for End-to-End Tests (WebDriver)

Source: https://angular.dev/guide/testing/using-component-harnesses

Shows how to create a harness loader for end-to-end tests using WebDriver. This loader is created from a WebDriver client and is rooted at the document's root element.

```typescript
let wd: webdriver.WebDriver = getMyWebDriverClient();
const loader = SeleniumWebDriverHarnessEnvironment.loader(wd);
const myComponentHarness = await loader.getHarness(MyComponent);
```

--------------------------------

### Providing a Factory Function for a Dependency

Source: https://angular.dev/guide/di/dependency-injection-providers

This snippet illustrates how to use `useFactory` to provide a dependency. A factory function is defined to create and return the desired service instance, allowing for more complex dependency creation logic.

```typescript
import { Logger } from './logger';

providers: [
  {
    provide: Logger,
    useFactory: (http: HttpClient) => {
      // Complex logic to create Logger instance
      return new Logger(http, 'info');
    },
    deps: [HttpClient] // Dependencies for the factory function
  }
]
```

--------------------------------

### Toggle Open/Close Animation in Angular (Native CSS)

Source: https://next.angular.dev/guide/animations/migration

Shows a basic implementation of toggling component states using native CSS for styling in Angular. This approach relies on CSS classes and styles defined in the component's CSS file, without using the Angular animations package.

```typescript
import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-open-close',
  templateUrl: 'open-close.component.html',
  styleUrls: ['open-close.component.css'],
})
export class OpenCloseComponent {
  isOpen = signal(true);

  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
```

--------------------------------

### Add the Angular Router to Your Application Configuration

Source: https://angular.dev/guide/routing/define-routes

This code snippet shows how to configure the Angular router when bootstrapping an application. It uses the `provideRouter` function with the defined routes within the `ApplicationConfig`.

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // ...
  ]
};
```

--------------------------------

### Angular DI-based Interceptors Configuration with provideHttpClient

Source: https://angular.dev/guide/http/interceptors

Illustrates how to configure DI-based interceptors within an Angular application using `bootstrapApplication`. It shows the use of `provideHttpClient` with `withInterceptorsFromDi()` enabled, and how to register a custom interceptor class (`LoggingInterceptor`) using the `HTTP_INTERCEPTORS` multi-provider.

```typescript
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    },
  ]
});
```

--------------------------------

### Angular By Class Predicates for Element Selection

Source: https://angular.dev/guide/testing/utility-apis

Explains the static methods of the Angular `By` class used for selecting DebugElements. `By.all`, `By.css`, and `By.directive` provide efficient ways to query elements based on different criteria.

```typescript
import { By } from '@angular/platform-browser';

// Example usage within a test:
// const allElements = de.queryAll(By.all());
// const elementsByCss = de.queryAll(By.css('.my-class'));
// const elementsByDirective = de.queryAll(By.directive(HighlightDirective));
```

--------------------------------

### Filtering Harnesses with Static `with()` Method

Source: https://angular.dev/guide/testing/using-component-harnesses

Demonstrates a common pattern where harnesses implement a static `with()` method. This method accepts component-specific filtering options and returns a `HarnessPredicate`, providing a more convenient way to filter harnesses.

```typescript
// Load a harness using the static 'with()' method for specific filtering
const button = await loader.getHarness(MyButtonComponentHarness.with({ selector: 'btn' }));
```

--------------------------------

### Using RxJS Scheduler within fakeAsync

Source: https://angular.dev/guide/testing/components-scenarios

This snippet demonstrates how to use RxJS schedulers within Angular's `fakeAsync` testing environment. It requires importing `zone.js/plugins/zone-patch-rxjs-fake-async` to enable this functionality.

```typescript
import {fakeAsync, tick} from '@angular/core/testing';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';
import 'zone.js/plugins/zone-patch-rxjs-fake-async'; // Import to patch RxJS scheduler

describe('RxJS scheduler in fakeAsync', () => {
  it('should handle delayed RxJS observable', fakeAsync(() => {
    let result = '';
    of('hello')
      .pipe(delay(100))
      .subscribe(value => {
        result = value;
      });
    expect(result).toBe('');
    tick(100);
    expect(result).toBe('hello');
  }));
});

```

--------------------------------

### Using jasmine.clock() for Mocking Time in Tests

Source: https://angular.dev/guide/testing/components-scenarios

Demonstrates how to use `jasmine.clock().install()` and `jasmine.clock().uninstall()` to mock the system's clock for testing purposes. When used within a `fakeAsync` zone, `jasmine.clock()` allows direct control over time with `tick()`.

```typescript
describe('use jasmine.clock()', () => {
  // need to config __zone_symbol__fakeAsyncPatchLock flag
  // before loading zone.js/testing
  beforeEach(() => {
    jasmine.clock().install();
  });
  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should auto enter fakeAsync', () => {
    // is in fakeAsync now, don't need to call fakeAsync(testFn)
    let called = false;
    setTimeout(() => {
      called = true;
    }, 100);
    jasmine.clock().tick(100);
    expect(called).toBe(true);
  });
});

```

--------------------------------

### Angular `waitForAsync(inject)` for Asynchronous Provider Testing

Source: https://angular.dev/guide/testing/services

Illustrates testing asynchronous operations within `beforeEach` using `waitForAsync` combined with `inject`. This is useful for scenarios where providers might return promises, like fetching data.

```typescript
describe('using waitForAsync(inject) within beforeEach', () => {
  let serviceValue: string;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ValueService] });
  });

  // Use waitForAsync and inject to handle asynchronous operations in beforeEach
  beforeEach(waitForAsync(inject([ValueService], (service: ValueService) => {
    // Process a promise returned by the service
    service.getPromiseValue().then((value) => (serviceValue = value));
  })));

  it('should use asynchronously modified value ... in synchronous test', () => {
    // Assert the value set asynchronously in beforeEach
    expect(serviceValue).toBe('promise value');
  });
});
```

--------------------------------

### Angular Component Testing with fakeAsync and async Utilities

Source: https://angular.dev/guide/testing/components-scenarios

Demonstrates testing Angular components using Angular's testing utilities like fakeAsync, async, tick, and whenStable. These utilities help manage asynchronous operations in tests, allowing for controlled execution and assertion of component behavior after asynchronous events like ngOnInit or observable resolutions.

```typescript
import {fakeAsync, ComponentFixture, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {asyncData, asyncError} from '../../testing';
import {Subject, defer, of, throwError} from 'rxjs';
import {last} from 'rxjs/operators';
import {TwainComponent} from './twain.component';
import {TwainService} from './twain.service';

describe('TwainComponent', () => {
  let component: TwainComponent;
  let fixture: ComponentFixture;
  let getQuoteSpy: jasmine.Spy;
  let quoteEl: HTMLElement;
  let testQuote: string;

  // Helper function to get the error message element value
  // An *ngIf keeps it out of the DOM until there is an error
  const errorMessage = () => {
    const el = fixture.nativeElement.querySelector('.error');
    return el ? el.textContent : null;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TwainService] });
    testQuote = 'Test Quote';

    // Create a fake TwainService object with a `getQuote()` spy
    const twainService = TestBed.inject(TwainService);
    // Make the spy return a synchronous Observable with the test data
    getQuoteSpy = spyOn(twainService, 'getQuote').and.returnValue(of(testQuote));

    fixture = TestBed.createComponent(TwainComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
    quoteEl = fixture.nativeElement.querySelector('.twain');
  });

  describe('when test with synchronous observable', () => {
    it('should not show quote before OnInit', () => {
      expect(quoteEl.textContent).withContext('nothing displayed').toBe('');
      expect(errorMessage()).withContext('should not show error element').toBeNull();
      expect(getQuoteSpy.calls.any()).withContext('getQuote not yet called').toBe(false);
    });

    // The quote would not be immediately available if the service were truly async.
    it('should show quote after component initialized', async () => {
      await fixture.whenStable(); // onInit()
      // sync spy result shows testQuote immediately after init
      expect(quoteEl.textContent).toBe(testQuote);
      expect(getQuoteSpy.calls.any()).withContext('getQuote called').toBe(true);
    });

    // The error would not be immediately available if the service were truly async.
    // Use `fakeAsync` because the component error calls `setTimeout`
    it('should display error when TwainService fails', fakeAsync(() => {
      // tell spy to return an error observable after a timeout
      getQuoteSpy.and.returnValue(
        defer(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject('TwainService test failure');
            });
          });
        }),
      );
      fixture.detectChanges(); // onInit()
      // sync spy errors immediately after init
      tick(); // flush the setTimeout()
      fixture.detectChanges(); // update errorMessage within setTimeout()
      expect(errorMessage())
        .withContext('should display error')
        .toMatch(/test failure/);
      expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
    }));
  });

describe('when test with asynchronous observable', () => {
    beforeEach(() => {
      // Simulate delayed observable values with the `asyncData()` helper
      getQuoteSpy.and.returnValue(asyncData(testQuote));
    });

    it('should not show quote before OnInit', () => {
      expect(quoteEl.textContent).withContext('nothing displayed').toBe('');
      expect(errorMessage()).withContext('should not show error element').toBeNull();
      expect(getQuoteSpy.calls.any()).withContext('getQuote not yet called').toBe(false);
    });

    it('should still not show quote after component initialized', () => {
      fixture.detectChanges(); // getQuote service is async => still has not returned with quote
      // so should show the start value, '...'
      expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
      expect(errorMessage()).withContex
    });

    it('should show quote after getQuote (fakeAsync)', fakeAsync(() => {
      fixture.detectChanges(); // ngOnInit()
      expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
      tick(); // flush the observable to get the quote
      fixture.detectChanges(); // update view
      expect(quoteEl.textContent).withContext('should show quote').toBe(testQuote);
      expect(errorMessage()).withContext('should not show error').toBeNull();
    }));

    it('should show quote after getQuote (async)', async () => {
      fixture.detectChanges(); // ngOnInit()
      expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
      await fixture.whenStable(); // wait for async getQuote
      fixture.detectChanges(); // update view with quote
      expect(quoteEl.textContent).toBe(testQuote);
      expect(errorMessage()).withContext('should not show error').toBeNull();
    });

    it('should display error when TwainService fails', fakeAsync(() => {
      // tell spy to return an async error observable
      getQuoteSpy.and.returnValue(asyncError('TwainService test failure'));
      fixture.detectChanges();
      tick(); // component shows error after a setTimeout()
      fixture.detectChanges(); // update error message
      expect(errorMessage())
        .withContext('should display error')
        .toMatch(/test failure/);
      expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
    }));
  });
});

```

--------------------------------

### Observing the Full Response Event

Source: https://angular.dev/guide/http/making-requests

Explains how to configure HttpClient to return the entire response object, including status and headers, instead of just the body.

```APIDOC
## GET /api/config with Response Observation

### Description
Retrieves the entire HTTP response, including status code, headers, and body. This is useful for inspecting response metadata.

### Method
GET

### Endpoint
/api/config

#### Parameters

#### Query Parameters
None

#### Request Body
None

### Request Example
```javascript
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

getConfigWithFullResponse() {
  this.http.get('/api/config', {
    observe: 'response' // or 'response' as const for literal type
  }).subscribe(res => {
    console.log('Response status:', res.status);
    console.log('Response headers:', res.headers);
    console.log('Response body:', res.body);
  });
}
```

### Response
#### Success Response (200)
- **res** (object) - The full HTTP response object.
  - **status** (number) - The HTTP status code.
  - **headers** (HttpHeaders) - An object containing the response headers.
  - **body** (any) - The response body.

#### Response Example
```json
{
  "status": 200,
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "message": "Data retrieved successfully"
  }
}
```
```

--------------------------------

### Accessing Request and Response Objects via DI

Source: https://angular.dev/guide/ssr

Provides access to server-side rendering environment objects. `REQUEST` offers the current request details, `RESPONSE_INIT` allows dynamic response header and status code setting, and `REQUEST_CONTEXT` provides additional request-specific information.

```typescript
import { inject, REQUEST } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `
    My Component
    ============
  `,
})
export class MyComponent {
  // Example usage of REQUEST token (not fully implemented in snippet)
  private request = inject(REQUEST);

  // Example usage of RESPONSE_INIT token (not fully implemented in snippet)
  // private response = inject(RESPONSE_INIT);

  // Example usage of REQUEST_CONTEXT token (not fully implemented in snippet)
  // private requestContext = inject(REQUEST_CONTEXT);
}
```

--------------------------------

### Test Component Attributes, Styles, and Classes (Angular - TypeScript)

Source: https://angular.dev/guide/testing/services

Tests how an Angular component renders its child components and applies attributes, styles, and classes. This snippet specifically checks a BankAccountComponent, verifying its bound attributes, CSS classes ('closed', 'open'), and inline styles.

```typescript
it('BankAccountComponent should set attributes, styles, classes, and properties', () => {
    const fixture = TestBed.createComponent(BankAccountParentComponent);
    fixture.detectChanges();
    const comp = fixture.componentInstance;

    // the only child is debugElement of the BankAccount component
    const el = fixture.debugElement.children[0];
    const childComp = el.componentInstance as BankAccountComponent;

    expect(childComp).toEqual(jasmine.any(BankAccountComponent));
    expect(el.context).withContext('context is the child component').toBe(childComp);
    expect(el.attributes['account']).withContext('account attribute').toBe(childComp.id);
    expect(el.attributes['bank']).withContext('bank attribute').toBe(childComp.bank);
    expect(el.classes['closed']).withContext('closed class').toBe(true);
    expect(el.classes['open']).withContext('open class').toBeFalsy();
    expect(el.styles['color']).withContext('color style').toBe(comp.color);
    expect(el.styles['width'])
      .withContext('width style')
      .toBe(comp.width + 'px');
  });
```

--------------------------------

### Angular Hero Detail Component Spec - Page Object Pattern

Source: https://angular.dev/guide/testing/components-scenarios

Demonstrates the implementation of a Page Object class for the Hero Detail Component. This pattern encapsulates DOM element interactions and provides a cleaner way to write tests, improving maintainability.

```typescript
class Page {
  get saveBtn() { return ButtonHarness.with(this.fixture, 'save'); }
  get cancelBtn() { return ButtonHarness.with(this.fixture, 'cancel'); }
  get nameDisplay() { return this.nameInput.elementRef.nativeElement.previousElementSibling; }
  get nameInput() { return this.fixture.debugElement.query(By.css('input[ng-reflect-model]')).nativeElement; }

  constructor() {
    this.fixture = TestBed.inject(ComponentFixture<HeroDetailComponent>);
  }

  // ... other methods for interacting with the page ...
}
```

--------------------------------

### Nested Host Directive Execution Order in Angular

Source: https://angular.dev/guide/directives/directive-composition-api

Demonstrates the execution order for a chain of nested host directives. Each directive in the chain is instantiated and goes through its lifecycle hooks and host binding application before the next directive in the chain or the host component. `Tooltip` -> `CustomTooltip` -> `EvenMoreCustomTooltip`.

```typescript
import { Directive, OnInit } from "@angular/core";

@Directive({
  selector: "[tooltip]",
  standalone: true,
})
export class Tooltip implements OnInit {
  ngOnInit() {
    console.log("Tooltip ngOnInit");
  }
  // ... host bindings
}

@Directive({
  selector: "[custom-tooltip]",
  standalone: true,
  hostDirectives: [Tooltip],
})
export class CustomTooltip implements OnInit {
  ngOnInit() {
    console.log("CustomTooltip ngOnInit");
  }
  // ... host bindings
}

@Directive({
  selector: "[even-more-custom-tooltip]",
  standalone: true,
  hostDirectives: [CustomTooltip],
})
export class EvenMoreCustomTooltip implements OnInit {
  ngOnInit() {
    console.log("EvenMoreCustomTooltip ngOnInit");
  }
  // ... host bindings
}
```

--------------------------------

### Data URL Placeholder Configuration

Source: https://angular.dev/guide/image-optimization

This snippet demonstrates how to use a base64 encoded data URL as an image placeholder. While convenient, be mindful that large data URLs can increase bundle size and slow down page loads. It's recommended to keep base64 placeholder images smaller than 4KB for optimal performance.

```typescript
image.component.ts

import {
  NgOptimizedImage
} from '@angular/common';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `<img ngSrc="path/to/image.jpg" placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA
AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
91XY0bsIkgAAAABJRU5ErkJggg==" />`
})
export class ImageComponent {}

```

--------------------------------

### Running Code in Injection Context with `runInInjectionContext`

Source: https://angular.dev/guide/di/dependency-injection-context

Demonstrates how to execute code within an explicit injection context using `runInInjectionContext`. This is useful when you need to inject services from a method that isn't automatically in an injection context, providing an `EnvironmentInjector` to define the context.

```typescript
import { Injectable, inject, EnvironmentInjector } from '@angular/core';
import { SomeService } from './some.service'; // Assuming this service exists

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private environmentInjector = inject(EnvironmentInjector);

  someMethod() {
    runInInjectionContext(this.environmentInjector, () => {
      const serviceInstance = inject(SomeService);
      // Do what you need with the injected service
      console.log('Injected SomeService:', serviceInstance);
    });
  }
}
```

--------------------------------

### Angular Manual Provider Configuration for Services without 'providedIn'

Source: https://angular.dev/guide/di/dependency-injection-providers

Demonstrates manual provider configuration in Angular for services that do not have 'providedIn: root'. This is necessary when a service must be explicitly declared in the `providers` array of a component or module, ensuring it's available to that component and its children.

```typescript
import { Injectable, Component, inject } from '@angular/core';

// Service without providedIn
@Injectable()
export class LocalDataStore {
  private data: string[] = [];
  addData(item: string) {
    this.data.push(item);
  }
}

// Component must provide it
@Component({
  selector: 'app-example',
  // A provider is required here because the `LocalDataStore` service has no providedIn.
  providers: [LocalDataStore],
  template: `...`
})
export class ExampleComponent {
  dataStore = inject(LocalDataStore);
}
```

--------------------------------

### Conceptual Logic Tree for `viewProviders` in Angular

Source: https://angular.dev/guide/di/hierarchical-dependency-injection

Illustrates the dependency injection resolution process when using `viewProviders`. It shows how the injector finds the `AnimalService` provided specifically within the component's view, preventing it from looking further up the injector tree.

```text
"🐳"><#VIEW><#VIEW @Provide(AnimalService="🐶") @Inject(AnimalService=>"🐶")>

Emoji from AnimalService: {{animal.emoji}} (🐶)

```

--------------------------------

### Using jasmine.clock() for Synchronous Timing Control

Source: https://angular.dev/guide/testing/components-scenarios

Demonstrates how to use jasmine.clock().install() and jasmine.clock().uninstall() to control synchronous timing in tests. This allows direct manipulation of setTimeout and other timer functions within the test environment.

```typescript
describe('use jasmine.clock()', () => {
  // need to config __zone_symbol__fakeAsyncPatchLock flag
  // before loading zone.js/testing
  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should auto enter fakeAsync', () => {
    // is in fakeAsync now, don't need to call fakeAsync(testFn)
    let called = false;
    setTimeout(() => {
      called = true;
    }, 100);
    jasmine.clock().tick(100);
    expect(called).toBe(true);
  });
});

```

--------------------------------

### Component Creation and Child Element Inspection with TestBed

Source: https://angular.dev/guide/testing/services

Tests the creation of a ShellComponent and inspects its child components and references. It verifies the number of child components and the presence of specific references using DebugElement API.

```typescript
describe('ShellComponent', () => {
  it('should create ShellComponent and check children', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    // NeedsContentComp is the child of ShellComp
    const el = fixture.debugElement.children[0];
    const comp = el.componentInstance;

    expect(comp.children.toArray().length).withContext('three different child components and an ElementRef with #content').toBe(4);
    expect(el.references['nc']).withContext('#nc reference to component').toBe(comp);

    // Filter for DebugElements with a #content reference
    const contentRefs = el.queryAll((de) => de.references['content']);
    expect(contentRefs.length).withContext('elements w/ a #content reference').toBe(4);
  });
});
```

--------------------------------

### AppComponent Template (HTML)

Source: https://angular.dev/guide/testing/components-scenarios

This HTML snippet represents the template for the AppComponent. It includes navigation links using the RouterLink directive and a RouterOutlet for displaying routed components. This template is used to demonstrate testing nested components.

```html
<nav>
  <a routerLink="/dashboard">Dashboard</a> |
  <a routerLink="/heroes">Heroes</a> |
  <a routerLink="/about">About</a>
</nav>
<router-outlet></router-outlet>

<app-banner></app-banner>
<app-welcome></app-welcome>
```

--------------------------------

### Testing JSONP with zone-testing

Source: https://angular.dev/guide/testing/components-scenarios

Illustrates testing a JSONP request within an Angular environment using `waitForAsync`. This snippet highlights how to handle asynchronous operations that are not inherently zone-aware, such as external JSONP callbacks.

```typescript
// need to config __zone_symbol__supportWaitUnResolvedChainedPromise flag
// before loading zone.js/testing
it('should wait until promise.then is called', waitForAsync(() => {
  let finished = false;
  new Promise((res) => {
    // do a jsonp call which is not zone aware
    jsonp('localhost:8080/jsonp', () => { // success callback
      // ...
    });
  });
}));

function jsonp(url: string, callback: () => void) {
  // mock jsonp implementation
}
```

--------------------------------

### Expect One Request with Method and URL - Angular HTTP Testing

Source: https://angular.dev/guide/http/testing

Demonstrates how to use `httpTesting.expectOne` to match a specific HTTP request based on both its method and URL. This is useful for verifying that the correct request is made for a particular action.

```typescript
const req = httpTesting.expectOne({ method: 'GET', url: '/api/config' }, 'Request to load the configuration');
```

--------------------------------

### Angular Component Logic (TypeScript)

Source: https://next.angular.dev/guide/animations/migration

Implements the increment and decrement functionality for the number. It also handles CSS class additions for animations and manages event listeners for animation completion. Dependencies include Angular's Component, ElementRef, OnInit, signal, and viewChild decorators.

```typescript
import {Component, ElementRef, OnInit, signal, viewChild} from '@angular/core';
@Component({
  selector: 'app-increment-decrement',
  templateUrl: 'increment-decrement.component.html',
  styleUrls: ['increment-decrement.component.css'],
})
export class IncrementDecrementComponent implements OnInit {
  num = signal(0);
  el = viewChild>('el');

  ngOnInit() {
    this.el()?.nativeElement.addEventListener('animationend', (ev) => {
      if (ev.animationName.endsWith('decrement') || ev.animationName.endsWith('increment')) {
        this.animationFinished();
      }
    });
  }

  modify(n: number) {
    const targetClass = n > 0 ? 'increment' : 'decrement';
    this.num.update((v) => (v += n));
    this.el()?.nativeElement.classList.add(targetClass);
  }

  animationFinished() {
    this.el()?.nativeElement.classList.remove('increment', 'decrement');
  }

  ngOnDestroy() {
    this.el()?.nativeElement.removeEventListener('animationend', this.animationFinished);
  }
}
```

--------------------------------

### Define and Use Angular Components

Source: https://angular.dev/guide/components

Demonstrates how to define a component with a selector and use it within another component's template. This is fundamental for building complex UIs in Angular.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'profile-photo',
  template: '<img src="path/to/photo.jpg" alt="Profile Photo">'
})
export class ProfilePhoto { }

@Component({
  selector: 'user-profile',
  imports: [ProfilePhoto],
  template: '<profile-photo></profile-photo>'
})
export class UserProfile { }
```

--------------------------------

### Asynchronous Testing with `waitForAsync` and `inject` in Angular

Source: https://angular.dev/guide/testing/services

This snippet illustrates how to handle asynchronous operations, specifically promises, in Angular tests using `waitForAsync` and `inject`. It configures `TestBed`, then uses `waitForAsync(inject(...))` in a `beforeEach` block to resolve a promise and set a value, which is then asserted in a synchronous test.

```typescript
describe('using waitForAsync(inject) within beforeEach', () => {
  let serviceValue: string;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [ValueService]});
  });

  beforeEach(waitForAsync( inject([ValueService], (service: ValueService) => {
    service.getPromiseValue().then((value) => (serviceValue = value));
  }) ));

  it('should use asynchronously modified value ... in synchronous test', () => {
    expect(serviceValue).toBe('promise value');
  });
});
```

--------------------------------

### Image Optimization with Priority and Eager Loading

Source: https://angular.dev/guide/image-optimization

Marking an image with 'priority' applies optimizations like fetchpriority=high and loading=eager. It also generates a preload link for server-side rendering. Angular warns during development if the LCP element is an image without the 'priority' attribute.

```typescript
<img ngSrc="path/to/image.jpg" priority>
```

--------------------------------

### Extend ComponentHarness and Define hostSelector

Source: https://angular.dev/guide/testing/creating-component-harnesses

Demonstrates how to create a custom component harness by extending the abstract `ComponentHarness` class. The `hostSelector` static property is crucial for identifying the DOM element that corresponds to the component being tested.

```typescript
@Component({
  selector: 'my-popup',
  template: ` {{triggerText()}} @if (isOpen()) {
    <ng-content></ng-content>
  }`
})
export class MyPopupComponent {
  // ... component logic
}

import { ComponentHarness } from '@angular/cdk/testing';

export class MyPopupHarness extends ComponentHarness {
  static hostSelector = 'my-popup';

  // ... harness methods
}
```

--------------------------------

### Angular Component-Specific Service Instance Creation

Source: https://angular.dev/guide/di/dependency-injection-providers

Shows how to create a component-specific instance of a root-provided service in Angular. By including the service in the component's `providers` array, a new instance is created tied to the component's lifecycle, overriding the globally available instance.

```typescript
import { Injectable, Component, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataStore {
  private data: ListItem[] = [];
}

// This component gets its own instance
@Component({
  selector: 'app-isolated',
  // Creates new instance of `DataStore` rather than using the root-provided instance.
  providers: [DataStore],
  template: `...`
})
export class IsolatedComponent {
  dataStore = inject(DataStore); // Component-specific instance
}
```

--------------------------------

### Apply Server Route Configuration (TypeScript)

Source: https://angular.dev/guide/ssr

In `app.config.server.ts`, use `provideServerRendering` with `withRoutes` to apply the configured server routes to your Angular application.

```typescript
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';
import { ApplicationConfig } from '@angular/core';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    // ... other providers ...
  ]
};
```

--------------------------------

### Define and Configure Functional HTTP Interceptor in Angular

Source: https://angular.dev/guide/http/interceptors

Demonstrates how to define a basic functional interceptor for logging and how to configure HttpClient to use this interceptor along with others during application bootstrap.

```typescript
export function loggingInterceptor(req: HttpRequest, next: HttpHandlerFn): Observable<httpEvent> {
  console.log(req.url);
  return next(req);
}
```

```typescript
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient( 
      withInterceptors([
        loggingInterceptor,
        cachingInterceptor
      ])
    )
  ]
});
```

--------------------------------

### Angular Fake Service (Alternative)

Source: https://angular.dev/guide/testing/services

Provides an alternative fake implementation of ValueService, often used when testing MasterService without TestBed. This fake returns a different hardcoded string.

```typescript
export class FakeValueService extends ValueService {
  override value = 'faked service value';
}

```

--------------------------------

### Page Object Model for Hero Detail Component

Source: https://angular.dev/guide/testing/components-scenarios

Defines a Page class to encapsulate DOM elements and interactions for the HeroDetailComponent. This Page Object Model (POM) simplifies test code by providing a clear interface to access component elements like buttons, input fields, and display spans. It uses helper query methods.

```typescript
class Page {
  // ... getter properties wait to query the DOM until called.
  get buttons() {
    return this.queryAll('button');
  }
  get saveBtn() {
    return this.buttons[0];
  }
  get cancelBtn() {
    return this.buttons[1];
  }
  get nameDisplay() {
    return this.query('span');
  }
  get nameInput() {
    return this.query('input');
  }

  //// query helpers ////
  private query<T>(selector: string): T {
    return harness.routeNativeElement!.querySelector(selector)! as T;
  }
  private queryAll<T>(selector: string): T[] {
    return harness.routeNativeElement!.querySelectorAll(selector) as any as T[];
  }
}
```

--------------------------------

### AppComponent Template with Navigation Links

Source: https://angular.dev/guide/testing/components-scenarios

This is the HTML template for the AppComponent, showcasing the navigation links that utilize the routerLink directive for routing to different sections of the application. It includes links to Dashboard, Heroes, and About pages.

```html
<nav>
  <a routerLink="/dashboard">Dashboard</a>
  <a routerLink="/heroes">Heroes</a>
  <a routerLink="/about">About</a>
</nav>

<router-outlet></router-outlet>
```

--------------------------------

### Using fakeAsync for Timer and Macro Task Simulation

Source: https://angular.dev/guide/testing/components-scenarios

Demonstrates using `fakeAsync` to control the execution of timers and macro tasks. It shows how `tick` can be used to advance time and simulate the completion of asynchronous operations.

```typescript
describe('fakeAsync', () => {
  it('should run timeout callback with delay after call tick with millis', fakeAsync(() => {
    let called = false;
    setTimeout(() => {
      called = true;
    }, 100);
    tick(100);
    expect(called).toBe(true);
  }));

  it('should run new macro task callback with delay after call tick with millis', fakeAsync(() => {
    function nestedTimer(cb: () => any): void {
      setTimeout(() => setTimeout(() => cb()));
    }
    const callback = jasmine.createSpy('callback');
    nestedTimer(callback);
    expect(callback).not.toHaveBeenCalled();
    tick(0); // the nested timeout will also be triggered
    expect(callback).toHaveBeenCalled();
  }));

  it('should not run new macro task callback with delay after call tick with millis', fakeAsync(() => {
    function nestedTimer(cb: () => any): void {
      setTimeout(() => setTimeout(() => cb()));
    }
    const callback = jasmine.createSpy('callback');
    nestedTimer(callback);
    expect(callback).not.toHaveBeenCalled();
    tick(0, {processNewMacroTasksSynchronously: false}); // the nested timeout will not be triggered
    expect(callback).not.toHaveBeenCalled();
    tick(0);
    expect(callback).toHaveBeenCalled();
  }));

  it('should get Date diff correctly in fakeAsync', fakeAsync(() => {
    // ...
    const start = Date.now();
    tick(100);
    const end = Date.now();
    expect(end - start).toBe(100);
  }));

  it('should get Date diff correctly in fakeAsync with rxjs scheduler', fakeAsync(() => {
    // need to add `import 'zone.js/plugins/zone-patch-rxjs-fake-async'`
    // to patch rxjs scheduler
    let result = '';
    of('hello')
      .pipe(delay(1000))
      .subscribe((v) => {
        result = v;
      });
    expect(result).toBe('');
    tick(1000);
    expect(result).toBe('hello');

    const start = new Date().getTime();
    let dateDiff = 0;
    interval(1000)
      .pipe(take(2))
      .subscribe(() => (dateDiff = new Date().getTime() - start));
    tick(1000);
    expect(dateDiff).toBe(1000);
    tick(1000);
    expect(dateDiff).toBe(2000);
  }));
});

```

--------------------------------

### Profile Component HTML - Angular

Source: https://angular.dev/guide/routing/routing-with-urlmatcher

This code snippet shows the updated content for the 'profile.component.html' file in an Angular application. It includes a simple greeting that displays a 'username' which is expected to be dynamically provided, likely through route parameters.

```html
Hello {{ username() }}!

```

--------------------------------

### Testing Component Initialization with Asynchronous Data (async)

Source: https://angular.dev/guide/testing/components-scenarios

Tests the asynchronous behavior of a component loading data. It uses `async` and `whenStable` to wait for observable emissions and component updates, verifying the display of placeholder text and the final fetched data.

```typescript
it('should show quote after getQuote (async)', async () => {
  fixture.detectChanges(); // ngOnInit()
  expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
  await fixture.whenStable(); // wait for async getQuote
  fixture.detectChanges(); // update view with quote
  expect(quoteEl.textContent).toBe(testQuote);
  expect(errorMessage()).withContext('should not show error').toBeNull();
});
```

--------------------------------

### Test Angular LightswitchComponent

Source: https://angular.dev/guide/testing/services

Tests an Angular LightswitchComponent, focusing on its state changes and message updates. It simulates user interactions by calling the `clicked()` method and asserts the expected values of `isOn` and `message` properties.

```typescript
import { LightswitchComponent } from './demo';

describe('LightswitchComp', () => {
  it('#clicked() should toggle #isOn', () => {
    const comp = new LightswitchComponent();
    expect(comp.isOn).withContext('off at first').toBe(false);
    comp.clicked();
    expect(comp.isOn).withContext('on after click').toBe(true);
    comp.clicked();
    expect(comp.isOn).withContext('off after second click').toBe(false);
  });

  it('#clicked() should set #message to "is on"', () => {
    const comp = new LightswitchComponent();
    expect(comp.message)
      .withContext('off at first')
      .toMatch(/is off/i);
    comp.clicked();
    expect(comp.message).withContext('on after clicked').toMatch(/is on/i);
  });
});

```

--------------------------------

### Disabling Preconnect Warnings (Angular Providers)

Source: https://angular.dev/guide/image-optimization

This configuration demonstrates how to disable preconnect warnings in your Angular application by providing the `PRECONNECT_CHECK_BLOCKLIST` token. This is useful if you have manually managed preconnects or if NgOptimizedImage cannot automatically identify the image origin.

```typescript
app.config.ts

import {
  PRECONNECT_CHECK_BLOCKLIST
} from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: PRECONNECT_CHECK_BLOCKLIST,
      useValue: 'https://your-domain.com'
    },
  ]
});

```

--------------------------------

### Implementing Route Redirects in Angular

Source: https://angular.dev/guide/routing/define-routes

Shows how to configure redirects for Angular routes. This is useful for handling outdated URLs or directing users from one path to another. A `redirectTo` property is used to specify the target route, and a corresponding route must exist to handle the redirection.

```typescript
import { Routes } from '@angular/router';
import { BlogComponent } from './home/blog.component';

const routes: Routes = [
  {
    path: 'articles',
    redirectTo: '/blog',
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
];
```

--------------------------------

### Angular Component Implementing OnInit Lifecycle Interface

Source: https://angular.dev/guide/components/lifecycle

Shows a basic Angular component that implements the `OnInit` interface. This is a common practice to ensure type safety and catch typos when defining lifecycle hooks.

```typescript
@Component({
  selector: 'app-user-profile',
  template: '...'
})
export class UserProfile implements OnInit {
  ngOnInit() {
    // Initialization logic here
  }
}
```

--------------------------------

### Angular waitForAsync(inject) in beforeEach

Source: https://angular.dev/guide/testing/utility-apis

Demonstrates how to use `waitForAsync` combined with `inject` within a `beforeEach` block. This is useful for setting up asynchronous dependencies before tests run, ensuring that asynchronous modifications are available in subsequent synchronous tests.

```typescript
describe('using waitForAsync(inject) within beforeEach', () => {
  let serviceValue: string;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ValueService] });
  });

  beforeEach(waitForAsync(inject([ValueService], (service: ValueService) => {
    service.getPromiseValue().then((value) => (serviceValue = value));
  })),
  );

  it('should use asynchronously modified value ... in synchronous test', () => {
    expect(serviceValue).toBe('promise value');
  });
});
```

--------------------------------

### Create RxJS Observable from Angular Output

Source: https://angular.dev/ecosystem/rxjs-interop/output-interop

This snippet shows how to create an RxJS observable from an existing Angular component output. The `outputToObservable` function from `@angular/core/rxjs-interop` is utilized. This allows you to pipe and subscribe to component outputs as if they were standard RxJS streams. An instance reference to the component is required to create the observable.

```typescript
import {outputToObservable} from '@angular/core/rxjs-interop';

@Component({
  /* ... */
})
class CustomSlider {
  valueChange = output();
}

// Instance reference to `CustomSlider`.
const slider: CustomSlider = createSlider();

outputToObservable(slider.valueChange)
  .pipe(...)
  .subscribe(...);
```

--------------------------------

### Add SSR to an Angular Project

Source: https://angular.dev/guide/hybrid-rendering

This command adds server-side rendering capabilities to an existing Angular project, enabling hybrid rendering strategies.

```bash
ng add @angular/ssr
```

--------------------------------

### Angular Testing Utilities: asyncData and asyncError

Source: https://angular.dev/guide/testing/components-scenarios

Provides helper functions `asyncData` and `asyncError` commonly used in Angular testing to simulate observable return values for services. `asyncData` returns an observable that emits provided data, while `asyncError` returns an observable that throws an error.

```typescript
import {fakeAsync, ComponentFixture, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {asyncData, asyncError} from '../../testing';
import {Subject, defer, of, throwError} from 'rxjs';
import {last} from 'rxjs/operators';
import {TwainComponent} from './twain.component';
import {TwainService} from './twain.service';

describe('TwainComponent', () => {
  let component: TwainComponent;
  let fixture: ComponentFixture<TwainComponent>;
  let getQuoteSpy: jasmine.Spy;
  let quoteEl: HTMLElement;
  let testQuote: string;

  // Helper function to get the error message element value
  // An *ngIf keeps it out of the DOM until there is an error
  const errorMessage = () => {
    const el = fixture.nativeElement.querySelector('.error');
    return el ? el.textContent : null;
  };

  beforeEach(async () => {
    testQuote = 'Test Quote';
    // TODO: spying on the service is a common pattern
    // getQuoteSpy = jasmine.createSpyObj('TwainService', ['getQuote']);
    const mockTwainService = {
      getQuote: jasmine.createSpy('getQuote').and.returnValue(of(testQuote))
    };

    await TestBed.configureTestingModule({
      declarations: [TwainComponent],
      providers: [
        { provide: TwainService, useValue: mockTwainService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwainComponent);
    getQuoteSpy = mockTwainService.getQuote;
    component = fixture.componentInstance;
    quoteEl = fixture.nativeElement.querySelector('.quote');
  });

describe('when test with synchronous observable', () => {
  it('should not show quote before OnInit', () => {
    expect(quoteEl.textContent).withContext('nothing displayed').toBe('');
    expect(errorMessage()).withContext('should not show error element').toBeNull();
    expect(getQuoteSpy.calls.any()).withContext('getQuote not yet called').toBe(false);
  });

  // The quote would not be immediately available if the service were truly async.
  it('should show quote after component initialized', async () => {
    await fixture.whenStable(); // onInit()
    // sync spy result shows testQuote immediately after init
    expect(quoteEl.textContent).toBe(testQuote);
    expect(getQuoteSpy.calls.any()).withContext('getQuote called').toBe(true);
  });

  // The error would not be immediately available if the service were truly async.
  // Use `fakeAsync` because the component error calls `setTimeout`
  it('should display error when TwainService fails', fakeAsync(() => {
    // tell spy to return an error observable after a timeout
    getQuoteSpy.and.returnValue(
      defer(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject('TwainService test failure');
          });
        });
      }),
    );
    fixture.detectChanges(); // onInit()
    // sync spy errors immediately after init
    tick(); // flush the setTimeout()
    fixture.detectChanges(); // update errorMessage within setTimeout()

    expect(errorMessage())
      .withContext('should display error')
      .toMatch(/test failure/);
    expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
  }));
});

describe('when test with asynchronous observable', () => {
  beforeEach(() => {
    // Simulate delayed observable values with the `asyncData()` helper
    getQuoteSpy.and.returnValue(asyncData(testQuote));
  });

  it('should not show quote before OnInit', () => {
    expect(quoteEl.textContent).withContext('nothing displayed').toBe('');
    expect(errorMessage()).withContext('should not show error element').toBeNull();
    expect(getQuoteSpy.calls.any()).withContext('getQuote not yet called').toBe(false);
  });

  it('should still not show quote after component initialized', () => {
    fixture.detectChanges(); // ngOnInit()
    // getQuote service is async => still has not returned with quote
    // so should show the start value, '...'
    expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
    expect(errorMessage()).withContext('should not show error').toBeNull();
    expect(getQuoteSpy.calls.any()).withContext('getQuote called').toBe(true);
  });

  it('should show quote after getQuote (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges(); // ngOnInit()
    expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
    tick(); // flush the observable to get the quote
    fixture.detectChanges(); // update view
    expect(quoteEl.textContent).withContext('should show quote').toBe(testQuote);
    expect(errorMessage()).withContext('should not show error').toBeNull();
  }));

  it('should show quote after getQuote (async)', async () => {
    fixture.detectChanges(); // ngOnInit()
    expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
    await fixture.whenStable(); // wait for async getQuote
    fixture.detectChanges(); // update view with quote
    expect(quoteEl.textContent).toBe(testQuote);
    expect(errorMessage()).withContext('should not show error').toBeNull();
  });

  it('should display error when TwainService fails', fakeAsync(() => {
    // tell spy to return an async error observable
    getQuoteSpy.and.returnValue(asyncError('TwainService test failure'));
    fixture.detectChanges();
    tick(); // component shows error after a setTimeout()
    fixture.detectChanges(); // update error message

    expect(errorMessage())
      .withContext('should display error')
      .toMatch(/test failure/);
    expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
  }));
});

```

--------------------------------

### Handling Asynchronous Tests with waitForAsync

Source: https://angular.dev/guide/testing/components-scenarios

Illustrates the use of `waitForAsync` for running asynchronous tests when `fakeAsync` is not suitable, such as when `XMLHttpRequest` calls are involved. It demonstrates how to correctly signal test completion using the `done` callback.

```typescript
import {waitForAsync} from '@angular/core/testing';

describe('Angular async helper', () => {
  describe('async', () => {
    let actuallyDone = false;
    beforeEach(() => {
      actuallyDone = false;
    });
    afterEach(() => {
      expect(actuallyDone).withContext('actuallyDone should be true').toBe(true);
    });

    it('should run normal async test', (done: DoneFn) => {
      setTimeout(() => {
        actuallyDone = true;
        done();
      }, 0);
    });

    it('should run async test with task', waitForAsync(() => {
      setTimeout(() => {
        actuallyDone = true;
      }, 0);
    }));
  });
});

```

--------------------------------

### Angular `inject` in `it` block for Provider Testing

Source: https://angular.dev/guide/testing/services

Demonstrates using the `inject` function within an `it` block to access and test services provided in `TestBed.configureTestingModule`. It shows how to modify service state and assert the changes.

```typescript
describe('use inject within `it`', () => {
  beforeEach(() => {
    // Configure testing module with ValueService provider
    TestBed.configureTestingModule({ providers: [ValueService] });
  });

  it('should use modified providers', inject([ValueService], (service: ValueService) => {
    // Modify service state
    service.setValue('value modified in beforeEach');
    // Assert the modified state
    expect(service.getValue()).toBe('value modified in beforeEach');
  }));
});
```

--------------------------------

### Testing MasterService with Different Dependencies

Source: https://angular.dev/guide/testing/services

Tests the MasterService by injecting different implementations of its ValueService dependency. This includes using a real ValueService, a fake service implementation, a simple fake object, and a Jasmine spy. It verifies that MasterService correctly utilizes the provided dependency.

```typescript
describe('MasterService without Angular testing support', () => {
  let masterService: MasterService;
  it('#getValue should return real value from the real service', () => {
    masterService = new MasterService(new ValueService());
    expect(masterService.getValue()).toBe('real value');
  });
  it('#getValue should return faked value from a fakeService', () => {
    masterService = new MasterService(new FakeValueService());
    expect(masterService.getValue()).toBe('faked service value');
  });
  it('#getValue should return faked value from a fake object', () => {
    const fake = {getValue: () => 'fake value'};
    masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  });
  it('#getValue should return stubbed value from a spy', () => {
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    const stubValue = 'stub value';
    valueServiceSpy.getValue.and.returnValue(stubValue);
    masterService = new MasterService(valueServiceSpy);
    expect(masterService.getValue()).withContext('service returned stub value').toBe(stubValue);
    expect(valueServiceSpy.getValue.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
    expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe(stubValue);
  });
});
```

--------------------------------

### Mock Async Observable Helpers (TypeScript)

Source: https://angular.dev/guide/testing/components-scenarios

Provides utility functions `asyncData` and `asyncError` to create mock observables that emit data or errors asynchronously after a JavaScript engine turn. These are crucial for simulating real-world asynchronous operations in tests. They rely on RxJS `defer` and `Promise.resolve`/`Promise.reject`. Note that `tick()` must be called within `fakeAsync` tests when using these helpers.

```typescript
/*
 * Mock async observables that return asynchronously.
 * The observable either emits once and completes or errors.
 *
 * Must call `tick()` when test with `fakeAsync()`.
 *
 * THE FOLLOWING DON'T WORK
 * Using `of().delay()` triggers TestBed errors;
 * see https://github.com/angular/angular/issues/10127 .
 *
 * Using `asap` scheduler - as in `of(value, asap)` - doesn't work either.
 */import {defer} from 'rxjs';/**
 * Create async observable that emits-once and completes
 * after a JS engine turn
 */export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));}
/**
 * Create async observable error that errors
 * after a JS engine turn
 */export function asyncError(errorObject: any) {
  return defer(() => Promise.reject(errorObject));}
```

--------------------------------

### Angular Hero Detail Component Unit Tests

Source: https://angular.dev/guide/testing/components-scenarios

Unit tests for the HeroDetailComponent, verifying interactions with the HeroDetailService, navigation, and data saving. Uses RouterTestingHarness for navigation simulation and fakeAsync for asynchronous operations.

```typescript
() => {
  await TestBed.configureTestingModule( Object.assign({}, appConfig, {
    imports: [HeroDetailComponent, HeroListComponent],
    providers: [
      provideRouter([
        {path: 'heroes', component: HeroListComponent},
        {path: 'heroes/:id', component: HeroDetailComponent},
      ]),
      HttpClient,
      HttpHandler,
      // HeroDetailService at this level is IRRELEVANT!
      {provide: HeroDetailService, useValue: {}},
    ],
  }))
    .overrideComponent(HeroDetailComponent, {
      set: {providers: [{provide: HeroDetailService, useClass: HeroDetailServiceSpy}]},
    });

  let hdsSpy: HeroDetailServiceSpy;

  beforeEach(async () => {
    harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl(`/heroes/${testHero.id}`, HeroDetailComponent);
    page = new Page();
    // get the component's injected HeroDetailServiceSpy
    hdsSpy = harness.routeDebugElement!.injector.get(HeroDetailService) as any;
    harness.detectChanges();
  });

  it('should have called `getHero`', () => {
    expect(hdsSpy.getHero.calls.count())
      .withContext('getHero called once')
      .toBe(1, 'getHero called once');
  });

  it("should display stub hero's name", () => {
    expect(page.nameDisplay.textContent).toBe(hdsSpy.testHero.name);
  });

  it('should save stub hero change', fakeAsync(() => {
    const origName = hdsSpy.testHero.name;
    const newName = 'New Name';

    page.nameInput.value = newName;
    page.nameInput.dispatchEvent(new Event('input')); // tell Angular

    expect(component.hero.name).withContext('component hero has new name').toBe(newName);
    expect(hdsSpy.testHero.name).withContext('service hero unchanged before save').toBe(origName);

    click(page.saveBtn);
    expect(hdsSpy.saveHero.calls.count()).withContext('saveHero called once').toBe(1);

    tick(); // wait for async save to complete
    expect(hdsSpy.testHero.name).withContext('service hero has new name after save').toBe(newName);
    expect(TestBed.inject(Router).url).toEqual('/heroes');
  }));
}
```

--------------------------------

### Node.js Server Configuration

Source: https://angular.dev/guide/ssr

Configure server-side rendering for Node.js environments using `@angular/ssr/node`, which extends `@angular/ssr`.

```APIDOC
## Node.js Server Configuration

### Description
Configure server-side rendering for Node.js environments using `@angular/ssr/node`, which extends `@angular/ssr` and provides APIs for easier integration within Node.js applications.

### Method
`createNodeRequestHandler` from `@angular/ssr/node`

### Endpoint
`/*` (Catch-all for Express.js)

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
```typescript
// server.ts
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  writeResponseToNodeResponse
} from '@angular/ssr/node';
import express from 'express';

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use('*', (req, res, next) => {
  angularApp
    .handle(req)
    .then(response => {
      if (response) {
        writeResponseToNodeResponse(response, res);
      } else {
        next(); // Pass control to the next middleware
      }
    })
    .catch(next);
});

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
```

### Response
N/A

#### Success Response (200)
N/A

#### Response Example
N/A
```

--------------------------------

### Create and Read Writable Signals in Angular

Source: https://angular.dev/guide/signals

Demonstrates how to create a writable signal with an initial value and how to read its current value using the getter function. This is fundamental for managing mutable state within Angular components.

```typescript
import { signal } from "@angular/core";

// Signals are getter functions - calling them reads their value.
const count = signal(0);
console.log('The count is: ' + count());
```

--------------------------------

### Angular Component Testing with Synchronous and Asynchronous Observables

Source: https://angular.dev/guide/testing/components-scenarios

Demonstrates testing an Angular component ('TwainComponent') that fetches data asynchronously using observables. It covers scenarios with both synchronous and asynchronous observables, including error handling and using 'fakeAsync' for time-based operations. Dependencies include Angular testing utilities and RxJS.

```typescript
import {fakeAsync, ComponentFixture, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {asyncData, asyncError} from '../../testing';
import {Subject, defer, of, throwError} from 'rxjs';
import {last} from 'rxjs/operators';
import {TwainComponent} from './twain.component';
import {TwainService} from './twain.service';

describe('TwainComponent', () => {
  let component: TwainComponent;
  let fixture: ComponentFixture<TwainComponent>;
  let getQuoteSpy: jasmine.Spy;
  let quoteEl: HTMLElement;
  let testQuote: string;

  // Helper function to get the error message element value
  // An *ngIf keeps it out of the DOM until there is an error
  const errorMessage = () => {
    const el = fixture.nativeElement.querySelector('.error');
    return el ? el.textContent : null;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TwainService] });
    testQuote = 'Test Quote';

    // Create a fake TwainService object with a `getQuote()` spy
    const twainService = TestBed.inject(TwainService) as jasmine.SpyObj<TwainService>;

    // Make the spy return a synchronous Observable with the test data
    getQuoteSpy = spyOn(twainService, 'getQuote').and.returnValue(of(testQuote));

    fixture = TestBed.createComponent(TwainComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
    quoteEl = fixture.nativeElement.querySelector('.twain')!;
  });

  describe('when test with synchronous observable', () => {
    it('should not show quote before OnInit', () => {
      expect(quoteEl.textContent).withContext('nothing displayed').toBe('');
      expect(errorMessage()).withContext('should not show error element').toBeNull();
      expect(getQuoteSpy.calls.any()).withContext('getQuote not yet called').toBe(false);
    });

    // The quote would not be immediately available if the service were truly async.
    it('should show quote after component initialized', async () => {
      await fixture.whenStable(); // onInit()
      // sync spy result shows testQuote immediately after init
      expect(quoteEl.textContent).toBe(testQuote);
      expect(getQuoteSpy.calls.any()).withContext('getQuote called').toBe(true);
    });

    // The error would not be immediately available if the service were truly async.
    // Use `fakeAsync` because the component error calls `setTimeout`
    it('should display error when TwainService fails', fakeAsync(() => {
      // tell spy to return an error observable after a timeout
      getQuoteSpy.and.returnValue( defer(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => { reject('TwainService test failure'); });
        });
      }) );

      fixture.detectChanges(); // onInit()
      // sync spy errors immediately after init
      tick(); // flush the setTimeout()
      fixture.detectChanges(); // update errorMessage within setTimeout()

      expect(errorMessage())
        .withContext('should display error')
        .toMatch(/test failure/);
      expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
    }));
  });

  describe('when test with asynchronous observable', () => {
    beforeEach(() => {
      // Simulate delayed observable values with the `asyncData()` helper ...
      getQuoteSpy.and.returnValue(asyncData(testQuote));
    });

    it('should not show quote before OnInit', () => {
      expect(quoteEl.textContent).withContext('nothing displayed').toBe('');
      expect(errorMessage()).withContext('should not show error element').toBeNull();
      expect(getQuoteSpy.calls.any()).withContext('getQuote not yet called').toBe(false);
    });

    it('should still not show quote after component initialized', () => {
      fixture.detectChanges(); // ngOnInit()
      // getQuote service is async => still has not returned with quote
      // so should show the start value, '...'
      expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
      expect(errorMessage()).withContext('should not show error').toBeNull();
      expect(getQuoteSpy.calls.any()).withContext('getQuote called').toBe(true);
    });

    it('should show quote after getQuote (fakeAsync)', fakeAsync(() => {
      fixture.detectChanges(); // ngOnInit()
      expect(quoteEl.textContent).withContext('should show placeholder').toBe('...');
      tick(); // flush the observable to get the quote
      fixture.detectChanges(); // update view
      expect(quoteEl.textContent).wi
    }));
  });
});

```

--------------------------------

### Initialize Angular Reactive Form with FormBuilder

Source: https://angular.dev/guide/forms/reactive-forms

Demonstrates how to initialize a reactive form using Angular's FormBuilder service. It sets up a form group with controls for 'firstName', 'lastName', 'address' (as a nested form group), and 'aliases' (as a form array). This snippet is crucial for setting up the structure of your form.

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
  imports: [ReactiveFormsModule, JsonPipe],
})
export class ProfileEditorComponent {
  private formBuilder = inject(FormBuilder);

  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    aliases: this.formBuilder.array([
      this.formBuilder.control('')
    ]),
  });

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }

  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}
```

--------------------------------

### Compose Form Groups with Service (TypeScript)

Source: https://angular.dev/guide/forms/dynamic-forms

The `QuestionControlService` is an injectable service responsible for creating `FormGroup` instances from an array of `QuestionBase` objects. It sets up `FormControl`s with appropriate validators, including required fields.

```typescript
import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionBase} from './question-base';

@Injectable()
export class QuestionControlService {
  toFormGroup(questions: QuestionBase<any>[] ) {
    const group: any = {};
    questions.forEach((question) => {
      group[question.key] = question.required
        ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
```

--------------------------------

### Angular Input with Getters and Setters

Source: https://angular.dev/guide/components/inputs

Illustrates how to use getters and setters for decorator-based inputs in Angular. This allows for custom logic when an input value is accessed or modified. It also shows how to create a write-only input with only a setter.

```typescript
export class CustomSlider {
  @Input()
  get value(): number {
    return this.internalValue;
  }
  set value(newValue: number) {
    this.internalValue = newValue;
  }
  private internalValue = 0;
}

export class CustomSlider {
  @Input()
  set value(newValue: number) {
    this.internalValue = newValue;
  }
  private internalValue = 0;
}
```

--------------------------------

### Localize Module

Source: https://angular.dev/api

APIs for internationalization (i18n) and localization within Angular applications.

```APIDOC
## Localize Module

### Description
Provides functionalities for internationalization (i18n) and localization, allowing applications to support multiple languages.

### Endpoints

- **`loadTranslations(translations)`**: Loads translation data.
- **`clearTranslations()`**: Clears loaded translations.
- **`MessageId`**: Represents a unique identifier for a translatable message.

### Example Usage (Conceptual)
```typescript
import { loadTranslations } from '@angular/localize';

const translations = {
  'en-US': {
    'welcome_message': 'Welcome!'
  }
};

loadTranslations(translations);
```
```

--------------------------------

### Testing `ngModel` with Asynchronous Updates in Angular

Source: https://angular.dev/guide/testing/services

This test demonstrates how to handle asynchronous updates with `ngModel` in Angular using `waitForAsync`. It creates an `InputComponent`, sets up `ngModel` binding, simulates user input, and asserts that the component's value is updated asynchronously after the promise resolves.

```typescript
it('should support entering text in input box (ngModel)', waitForAsync(() => {
  const expectedOrigName = 'John';
  const expectedNewName = 'Sally';
  const fixture = TestBed.createComponent(InputComponent);
  fixture.detectChanges();
  const comp = fixture.componentInstance;
  const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
```

--------------------------------

### Angular Animations: OpenClose Component

Source: https://next.angular.dev/guide/animations/migration

Implements an 'openClose' animation trigger in an Angular component. It defines styles for 'open' and 'closed' states, transition timings between them, and logs animation events.

```typescript
import { Component, input } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-open-close',
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow',
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue',
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
      transition('* => closed', [
        animate('1s')
      ]),
      transition('* => open', [
        animate('0.5s')
      ]),
      transition('open <=> closed', [
        animate('0.5s')
      ]),
      transition('* => open', [
        animate('1s', style({ opacity: '*' }))
      ]),
      transition('* => *', [
        animate('1s')
      ]),
    ]),
  ],
  templateUrl: 'open-close.component.html',
  styleUrls: ['./open-close.component.css']
})
export class OpenCloseComponent {
  logging = input(false);
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  onAnimationEvent(event: AnimationEvent) {
    if (!this.logging) {
      return;
    }
    // openClose is trigger name in this example
    console.warn(`Animation Trigger: ${event.triggerName}`);
    // phaseName is "start" or "done"
    console.warn(`Phase: ${event.phaseName}`);
    // in our example, totalTime is 1000 (number of milliseconds in a second)
    console.warn(`Total time: ${event.totalTime}`);
    // in our example, fromState is either "open" or "closed"
    console.warn(`From: ${event.fromState}`);
    // in our example, toState either "open" or "closed"
    console.warn(`To: ${event.toState}`);
    // the HTML element itself, the button in this case
    console.warn(`Element: ${event.element}`);
  }
}
```

--------------------------------

### Programmatically Reload a Resource (TypeScript)

Source: https://angular.dev/guide/signals/resource

Shows how to manually trigger a resource's loader function using the `reload` method. This is useful when data needs to be refreshed independently of parameter changes, such as after a mutation operation. It ensures the latest data is fetched from the server.

```TypeScript
const userId: Signal = getUserId();
const userResource = resource({
  params: () => ({id: userId()}),
  loader: ({params}) => fetchUser(params),
});
// ...
userResource.reload();
```

--------------------------------

### Reorder List Animation with Native CSS

Source: https://next.angular.dev/guide/animations/migration

Implements a reordering list functionality using native Angular component structure without the explicit Angular Animations package. This relies on the component's data binding and template rendering to handle list updates.

```typescript
import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-reorder',
  templateUrl: './reorder.component.html',
  styleUrls: ['./reorder.component.css'],
})
export class ReorderComponent {
  show = signal(true);
  items = ['stuff', 'things', 'cheese', 'paper', 'scissors', 'rock'];

  randomize() {
    const randItems = [...this.items];
    const newItems = [];
    for (let i of this.items) {
      const max: number = this.items.length - newItems.length;
      const randNum = Math.floor(Math.random() * max);
      newItems.push(...randItems.splice(randNum, 1));
    }
    this.items = newItems;
  }
}
```

```html
Reordering List Example
=======================

Randomize

@for(item of items; track item) {
*   {{ item }}
}
```

```css
.items { list-style: none; padding: 0; margin: 0;}
```

--------------------------------

### Test Angular ValueService with Jasmine (Sync/Async)

Source: https://angular.dev/guide/testing/services

Unit tests for the `ValueService` demonstrating synchronous (`getValue`) and asynchronous (`getObservableValue`, `getPromiseValue`) methods. Uses basic Jasmine syntax without Angular testing utilities.

```typescript
import { ValueService } from './demo';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    service = new ValueService();
  });

  it('#getValue should return real value', () => {
    expect(service.getValue()).toBe('real value');
  });

  it('#getObservableValue should return value from observable', (done: DoneFn) => {
    service.getObservableValue().subscribe((value) => {
      expect(value).toBe('observable value');
      done();
    });
  });

  it('#getPromiseValue should return value from a promise', (done: DoneFn) => {
    service.getPromiseValue().then((value) => {
      expect(value).toBe('promise value');
      done();
    });
  });
});
```

--------------------------------

### Match Multiple Requests - Angular HTTP Testing

Source: https://angular.dev/guide/http/testing

Explains how to use `httpTesting.match()` to retrieve an array of all requests that match the given criteria. This is necessary when multiple identical requests are expected and need to be handled individually.

```typescript
const allGetRequests = httpTesting.match({ method: 'GET' });
for (const req of allGetRequests) {
  // Handle responding to each request.
}
```

--------------------------------

### Configure Server Routes for Hybrid Rendering (TypeScript)

Source: https://angular.dev/guide/hybrid-rendering

Defines server routes with specific rendering modes (Client, Prerender, Server) for different application paths, enabling fine-grained control over rendering strategies.

```typescript
// app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    // This renders the "/" route on the client (CSR)
    renderMode: RenderMode.Client,
  },
  {
    path: 'about',
    // This page is static, so we prerender it (SSG)
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'profile',
    // This page requires user-specific data, so we use SSR
    renderMode: RenderMode.Server,
  },
  {
    path: '**', // All other routes will be rendered on the server (SSR)
    renderMode: RenderMode.Server,
  },
];
```

--------------------------------

### Using PendingTasks for Server-Side Rendering in Angular

Source: https://angular.dev/guide/zoneless

Demonstrates how to use the PendingTasks service in Angular for Server-Side Rendering (SSR) when not using ZoneJS. It shows how to wrap asynchronous operations with `taskService.run()` to ensure serialization waits for task completion. It also covers manual task management and the `pendingUntilEvent` helper from `rxjs-interop`.

```typescript
import { inject } from "@angular/core";
import { PendingTasks } from "@angular/core/primitives/pending-tasks";

const taskService = inject(PendingTasks);
taskService.run(async () => {
  const someResult = await doSomeWorkThatNeedsToBeRendered();
  this.someState.set(someResult);
});
```

```typescript
import { inject } from "@angular/core";
import { PendingTasks } from "@angular/core/primitives/pending-tasks";

const taskService = inject(PendingTasks);
const taskCleanup = taskService.add();
try {
  await doSomeWorkThatNeedsToBeRendered();
} catch {
  // handle error
} finally {
  taskCleanup();
}
```

```typescript
import { pendingUntilEvent } from "rxjs-interop";

readonly myObservableState = someObservable.pipe(
  pendingUntilEvent()
);
```

--------------------------------

### Enable fakeAsync Patch for zone-testing

Source: https://angular.dev/guide/testing/components-scenarios

Enables the fakeAsync patch for zone-testing by setting a global flag before importing 'zone.js/testing'. This is necessary for the fakeAsync and tick functions to work correctly, especially when using tools like the Angular CLI.

```typescript
window as any).__zone_symbol__fakeAsyncPatchLock = true;
import 'zone.js/testing';
```

--------------------------------

### Configure CSP Nonce with Injection Token in Angular

Source: https://angular.dev/best-practices/security

Shows how to provide a Content Security Policy (CSP) nonce to Angular using the CSP_NONCE injection token at bootstrap. This method is useful when the nonce is available at runtime and allows for caching of the index.html.

```typescript
import {bootstrapApplication, CSP_NONCE} from '@angular/core';
import {AppComponent} from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: CSP_NONCE, useValue: globalThis.myRandomNonceValue }
  ]
});
```

--------------------------------

### Using DebugElement for DOM Querying in Angular Tests

Source: https://angular.dev/guide/testing/components-basics

Shows how to use DebugElement and By.css to find elements within an Angular component's template for testing purposes. This approach leverages Angular's testing utilities for more robust DOM inspection.

```typescript
import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BannerComponent} from './banner-initial.component';

describe('BannerComponent (initial CLI generated)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BannerComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should find the element with fixture.debugElement.nativeElement', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const p = bannerEl.querySelector('p')!;
    expect(p.textContent).toEqual('banner works!');
  });

  it('should find the paragraph with fixture.debugElement.query(By.css)', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const paragraphDe = bannerDe.query(By.css('p'));
    const p: HTMLElement = paragraphDe.nativeElement;
    expect(p.textContent).toEqual('banner works!');
  });
});
```

--------------------------------

### Implement ContentProjectionComponentHarness for MyPopupHarness

Source: https://angular.dev/guide/testing/creating-component-harnesses

Defines `MyPopupHarness` that extends `ContentContainerComponentHarness`. This allows the harness to manage and load other harnesses within its projected content, facilitating testing of components that utilize content projection in Angular.

```typescript
class MyPopupHarness extends ContentContainerComponentHarness {
  static hostSelector = 'my-popup';
}
```

--------------------------------

### Using DebugElement for Safe Element Access in Angular Tests (TypeScript)

Source: https://angular.dev/guide/testing/components-basics

This snippet illustrates the recommended way to access elements in Angular tests using `fixture.debugElement.query()`. `DebugElement` provides an abstraction layer that ensures tests run safely across different platforms, including those without a full DOM. It's used here to query for a specific CSS selector and access its properties.

```typescript
import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BannerComponent} from './banner-initial.component';

describe('BannerComponent (query with By.css)', () => {
  it('should find the paragraph with fixture.debugElement.query(By.css)', () => {
    const fixture = TestBed.createComponent(BannerComponent);
    const bannerDe: DebugElement = fixture.debugElement;
    const paragraphDe = bannerDe.query(By.css('p'));
    const p: HTMLElement = paragraphDe.nativeElement;
    expect(p.textContent).toEqual('banner works!');
  });
});
```

--------------------------------

### RouterLinkActive Route Matching Strategies in Angular

Source: https://angular.dev/guide/routing/read-route-state

Details the different route matching strategies for RouterLinkActive. It clarifies that 'exact: true' is syntactic sugar for specific path and query parameter matching, while 'exact: false' uses subset matching.

```typescript
// '{ exact: true }' is equivalent to:
// {
//   paths: 'exact',
//   fragment: 'ignored',
//   matrixParams: 'ignored',
//   queryParams: 'exact'
// }

// '{ exact: false }' is equivalent to:
// {
//   paths: 'subset',
//   fragment: 'ignored',
//   matrixParams: 'ignored',
//   queryParams: 'subset'
// }
```