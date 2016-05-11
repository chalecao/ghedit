/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'assert', 'vs/workbench/parts/gettingStarted/common/abstractGettingStarted', 'vs/platform/workspace/common/workspace', 'vs/platform/telemetry/common/telemetry', 'vs/platform/storage/common/storage', 'vs/platform/instantiation/common/serviceCollection', 'vs/platform/instantiation/common/instantiationService', 'vs/base/common/winjs.base'], function (require, exports, assert, abstractGettingStarted_1, workspace_1, telemetry_1, storage_1, serviceCollection_1, instantiationService_1, winjs_base_1) {
    'use strict';
    var TestGettingStarted = (function (_super) {
        __extends(TestGettingStarted, _super);
        function TestGettingStarted() {
            _super.apply(this, arguments);
        }
        TestGettingStarted.prototype.openExternal = function (url) {
            this.lastUrl = url;
        };
        return TestGettingStarted;
    }(abstractGettingStarted_1.AbstractGettingStarted));
    suite('Workbench - GettingStarted', function () {
        var instantiation = null;
        var welcomePageEnvConfig = null;
        var hideWelcomeSettingsValue = null;
        var machineId = null;
        var appName = null;
        suiteSetup(function () {
            var services = new serviceCollection_1.ServiceCollection();
            services.set(workspace_1.IWorkspaceContextService, {
                getConfiguration: function () {
                    return {
                        env: {
                            welcomePage: welcomePageEnvConfig,
                            appName: appName
                        }
                    };
                }
            });
            services.set(telemetry_1.ITelemetryService, {
                getTelemetryInfo: function () { return winjs_base_1.TPromise.as({ machineId: machineId }); }
            });
            services.set(storage_1.IStorageService, {
                get: function () { return hideWelcomeSettingsValue; },
                store: function (value) { return hideWelcomeSettingsValue = value; }
            });
            instantiation = new instantiationService_1.InstantiationService(services);
        });
        suiteTeardown(function () {
            instantiation = null;
        });
        setup(function () {
            welcomePageEnvConfig = null;
            hideWelcomeSettingsValue = null;
            appName = null;
        });
        test('disabled by default', function () {
            var gettingStarted = instantiation.createInstance(TestGettingStarted);
            assert(gettingStarted.lastUrl === undefined, 'no page is opened when welcomePage is not configured');
        });
        test('base case', function () {
            welcomePageEnvConfig = 'base url';
            appName = 'some app';
            machineId = '123';
            var gettingStarted = instantiation.createInstance(TestGettingStarted);
            assert(gettingStarted.lastUrl === welcomePageEnvConfig + "&&from=" + appName + "&&id=" + machineId, 'a page is opened when welcomePage is configured && first run');
            assert(hideWelcomeSettingsValue !== null, 'a flag is set to hide welcome page');
        });
        test('dont show after initial run', function () {
            welcomePageEnvConfig = 'url';
            hideWelcomeSettingsValue = 'true';
            var gettingStarted = instantiation.createInstance(TestGettingStarted);
            assert(gettingStarted.lastUrl === undefined, 'no page is opened after initial run');
            assert(hideWelcomeSettingsValue !== null, 'a flag is set to hide welcome page');
        });
    });
});
//# sourceMappingURL=gettingStarted.test.js.map