'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">leave documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-7cbdec78ab95d17d22b2deb0ce246c56"' : 'data-target="#xs-controllers-links-module-AppModule-7cbdec78ab95d17d22b2deb0ce246c56"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-7cbdec78ab95d17d22b2deb0ce246c56"' :
                                            'id="xs-controllers-links-module-AppModule-7cbdec78ab95d17d22b2deb0ce246c56"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-7cbdec78ab95d17d22b2deb0ce246c56"' : 'data-target="#xs-injectables-links-module-AppModule-7cbdec78ab95d17d22b2deb0ce246c56"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7cbdec78ab95d17d22b2deb0ce246c56"' :
                                        'id="xs-injectables-links-module-AppModule-7cbdec78ab95d17d22b2deb0ce246c56"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-5f7e83380962c8daf233c8033989522c"' : 'data-target="#xs-controllers-links-module-AuthModule-5f7e83380962c8daf233c8033989522c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-5f7e83380962c8daf233c8033989522c"' :
                                            'id="xs-controllers-links-module-AuthModule-5f7e83380962c8daf233c8033989522c"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-5f7e83380962c8daf233c8033989522c"' : 'data-target="#xs-injectables-links-module-AuthModule-5f7e83380962c8daf233c8033989522c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-5f7e83380962c8daf233c8033989522c"' :
                                        'id="xs-injectables-links-module-AuthModule-5f7e83380962c8daf233c8033989522c"' }>
                                        <li class="link">
                                            <a href="injectables/ActiveDirectoryStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ActiveDirectoryStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BranchModule.html" data-type="entity-link">BranchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-BranchModule-3de378641774f9fe64d8ed80cbcdd0c1"' : 'data-target="#xs-controllers-links-module-BranchModule-3de378641774f9fe64d8ed80cbcdd0c1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BranchModule-3de378641774f9fe64d8ed80cbcdd0c1"' :
                                            'id="xs-controllers-links-module-BranchModule-3de378641774f9fe64d8ed80cbcdd0c1"' }>
                                            <li class="link">
                                                <a href="controllers/BranchController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BranchController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-BranchModule-3de378641774f9fe64d8ed80cbcdd0c1"' : 'data-target="#xs-injectables-links-module-BranchModule-3de378641774f9fe64d8ed80cbcdd0c1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BranchModule-3de378641774f9fe64d8ed80cbcdd0c1"' :
                                        'id="xs-injectables-links-module-BranchModule-3de378641774f9fe64d8ed80cbcdd0c1"' }>
                                        <li class="link">
                                            <a href="injectables/BranchDbService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BranchDbService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BranchService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BranchService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompanyModule.html" data-type="entity-link">CompanyModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CompanyModule-4e17cf3dd63129cf078df739deb6fa0f"' : 'data-target="#xs-controllers-links-module-CompanyModule-4e17cf3dd63129cf078df739deb6fa0f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CompanyModule-4e17cf3dd63129cf078df739deb6fa0f"' :
                                            'id="xs-controllers-links-module-CompanyModule-4e17cf3dd63129cf078df739deb6fa0f"' }>
                                            <li class="link">
                                                <a href="controllers/CompanyController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompanyController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CompanyModule-4e17cf3dd63129cf078df739deb6fa0f"' : 'data-target="#xs-injectables-links-module-CompanyModule-4e17cf3dd63129cf078df739deb6fa0f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompanyModule-4e17cf3dd63129cf078df739deb6fa0f"' :
                                        'id="xs-injectables-links-module-CompanyModule-4e17cf3dd63129cf078df739deb6fa0f"' }>
                                        <li class="link">
                                            <a href="injectables/CompanyService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CompanyService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CostcentreModule.html" data-type="entity-link">CostcentreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CostcentreModule-923d4d3b6d1324b7d6643f769b8fa8dc"' : 'data-target="#xs-controllers-links-module-CostcentreModule-923d4d3b6d1324b7d6643f769b8fa8dc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CostcentreModule-923d4d3b6d1324b7d6643f769b8fa8dc"' :
                                            'id="xs-controllers-links-module-CostcentreModule-923d4d3b6d1324b7d6643f769b8fa8dc"' }>
                                            <li class="link">
                                                <a href="controllers/CostcentreController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CostcentreController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CostcentreModule-923d4d3b6d1324b7d6643f769b8fa8dc"' : 'data-target="#xs-injectables-links-module-CostcentreModule-923d4d3b6d1324b7d6643f769b8fa8dc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CostcentreModule-923d4d3b6d1324b7d6643f769b8fa8dc"' :
                                        'id="xs-injectables-links-module-CostcentreModule-923d4d3b6d1324b7d6643f769b8fa8dc"' }>
                                        <li class="link">
                                            <a href="injectables/CostcentreService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CostcentreService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DepartmentModule.html" data-type="entity-link">DepartmentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-DepartmentModule-6e1a96a2bdfc8b58a2ebc0129e4ee602"' : 'data-target="#xs-controllers-links-module-DepartmentModule-6e1a96a2bdfc8b58a2ebc0129e4ee602"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DepartmentModule-6e1a96a2bdfc8b58a2ebc0129e4ee602"' :
                                            'id="xs-controllers-links-module-DepartmentModule-6e1a96a2bdfc8b58a2ebc0129e4ee602"' }>
                                            <li class="link">
                                                <a href="controllers/DepartmentController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DepartmentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DepartmentModule-6e1a96a2bdfc8b58a2ebc0129e4ee602"' : 'data-target="#xs-injectables-links-module-DepartmentModule-6e1a96a2bdfc8b58a2ebc0129e4ee602"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DepartmentModule-6e1a96a2bdfc8b58a2ebc0129e4ee602"' :
                                        'id="xs-injectables-links-module-DepartmentModule-6e1a96a2bdfc8b58a2ebc0129e4ee602"' }>
                                        <li class="link">
                                            <a href="injectables/DepartmentDbService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DepartmentDbService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DepartmentService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DepartmentService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DesignationModule.html" data-type="entity-link">DesignationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-DesignationModule-a5d8f293d6f2450fed1d6c05ff48ed0f"' : 'data-target="#xs-controllers-links-module-DesignationModule-a5d8f293d6f2450fed1d6c05ff48ed0f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DesignationModule-a5d8f293d6f2450fed1d6c05ff48ed0f"' :
                                            'id="xs-controllers-links-module-DesignationModule-a5d8f293d6f2450fed1d6c05ff48ed0f"' }>
                                            <li class="link">
                                                <a href="controllers/DesignationController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DesignationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DesignationModule-a5d8f293d6f2450fed1d6c05ff48ed0f"' : 'data-target="#xs-injectables-links-module-DesignationModule-a5d8f293d6f2450fed1d6c05ff48ed0f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DesignationModule-a5d8f293d6f2450fed1d6c05ff48ed0f"' :
                                        'id="xs-injectables-links-module-DesignationModule-a5d8f293d6f2450fed1d6c05ff48ed0f"' }>
                                        <li class="link">
                                            <a href="injectables/DesignationDbService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DesignationDbService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DesignationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DesignationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InvitationModule.html" data-type="entity-link">InvitationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-InvitationModule-251d39b2298e7664e451477f91e0657c"' : 'data-target="#xs-controllers-links-module-InvitationModule-251d39b2298e7664e451477f91e0657c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InvitationModule-251d39b2298e7664e451477f91e0657c"' :
                                            'id="xs-controllers-links-module-InvitationModule-251d39b2298e7664e451477f91e0657c"' }>
                                            <li class="link">
                                                <a href="controllers/InvitationController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InvitationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-InvitationModule-251d39b2298e7664e451477f91e0657c"' : 'data-target="#xs-injectables-links-module-InvitationModule-251d39b2298e7664e451477f91e0657c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InvitationModule-251d39b2298e7664e451477f91e0657c"' :
                                        'id="xs-injectables-links-module-InvitationModule-251d39b2298e7664e451477f91e0657c"' }>
                                        <li class="link">
                                            <a href="injectables/InvitationDbService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>InvitationDbService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/InvitationInviteService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>InvitationInviteService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/InvitationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>InvitationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LeaveModule.html" data-type="entity-link">LeaveModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-LeaveModule-9cae3b87652ed12132c33bf2d78b39f8"' : 'data-target="#xs-controllers-links-module-LeaveModule-9cae3b87652ed12132c33bf2d78b39f8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LeaveModule-9cae3b87652ed12132c33bf2d78b39f8"' :
                                            'id="xs-controllers-links-module-LeaveModule-9cae3b87652ed12132c33bf2d78b39f8"' }>
                                            <li class="link">
                                                <a href="controllers/ApplyController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ApplyController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/ApprovedController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ApprovedController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LeaveModule-9cae3b87652ed12132c33bf2d78b39f8"' : 'data-target="#xs-injectables-links-module-LeaveModule-9cae3b87652ed12132c33bf2d78b39f8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LeaveModule-9cae3b87652ed12132c33bf2d78b39f8"' :
                                        'id="xs-injectables-links-module-LeaveModule-9cae3b87652ed12132c33bf2d78b39f8"' }>
                                        <li class="link">
                                            <a href="injectables/ApplyLeaveService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ApplyLeaveService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ApprovalService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ApprovalService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DateCalculationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DateCalculationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EntitledFullService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EntitledFullService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LeaveApplicationValidationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LeaveApplicationValidationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LeaveBalanceValidationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LeaveBalanceValidationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LeaveTransactionDbService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LeaveTransactionDbService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProratedDateCurrentMonthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProratedDateCurrentMonthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProratedDateEndYearService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProratedDateEndYearService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserInfoService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserInfoService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserLeaveEntitlementDbService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserLeaveEntitlementDbService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LeavetypeEntitlementModule.html" data-type="entity-link">LeavetypeEntitlementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-LeavetypeEntitlementModule-a446919001366a7aeb683dbc88752b9d"' : 'data-target="#xs-controllers-links-module-LeavetypeEntitlementModule-a446919001366a7aeb683dbc88752b9d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LeavetypeEntitlementModule-a446919001366a7aeb683dbc88752b9d"' :
                                            'id="xs-controllers-links-module-LeavetypeEntitlementModule-a446919001366a7aeb683dbc88752b9d"' }>
                                            <li class="link">
                                                <a href="controllers/LeavetypeEntitlementController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LeavetypeEntitlementController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LeavetypeEntitlementModule-a446919001366a7aeb683dbc88752b9d"' : 'data-target="#xs-injectables-links-module-LeavetypeEntitlementModule-a446919001366a7aeb683dbc88752b9d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LeavetypeEntitlementModule-a446919001366a7aeb683dbc88752b9d"' :
                                        'id="xs-injectables-links-module-LeavetypeEntitlementModule-a446919001366a7aeb683dbc88752b9d"' }>
                                        <li class="link">
                                            <a href="injectables/LeaveTypeEntitlementService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LeaveTypeEntitlementService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LeavetypeEntitlementDbService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LeavetypeEntitlementDbService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LeavetypeModule.html" data-type="entity-link">LeavetypeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-LeavetypeModule-7b4bf87043351f7fa25e64bdf80c2221"' : 'data-target="#xs-controllers-links-module-LeavetypeModule-7b4bf87043351f7fa25e64bdf80c2221"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LeavetypeModule-7b4bf87043351f7fa25e64bdf80c2221"' :
                                            'id="xs-controllers-links-module-LeavetypeModule-7b4bf87043351f7fa25e64bdf80c2221"' }>
                                            <li class="link">
                                                <a href="controllers/LeaveTypeController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LeaveTypeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LeavetypeModule-7b4bf87043351f7fa25e64bdf80c2221"' : 'data-target="#xs-injectables-links-module-LeavetypeModule-7b4bf87043351f7fa25e64bdf80c2221"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LeavetypeModule-7b4bf87043351f7fa25e64bdf80c2221"' :
                                        'id="xs-injectables-links-module-LeavetypeModule-7b4bf87043351f7fa25e64bdf80c2221"' }>
                                        <li class="link">
                                            <a href="injectables/LeavetypeService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LeavetypeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SectionModule.html" data-type="entity-link">SectionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SectionModule-bd008962e1b66fd1fe96da75db98bf77"' : 'data-target="#xs-controllers-links-module-SectionModule-bd008962e1b66fd1fe96da75db98bf77"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SectionModule-bd008962e1b66fd1fe96da75db98bf77"' :
                                            'id="xs-controllers-links-module-SectionModule-bd008962e1b66fd1fe96da75db98bf77"' }>
                                            <li class="link">
                                                <a href="controllers/SectionController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SectionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SectionModule-bd008962e1b66fd1fe96da75db98bf77"' : 'data-target="#xs-injectables-links-module-SectionModule-bd008962e1b66fd1fe96da75db98bf77"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SectionModule-bd008962e1b66fd1fe96da75db98bf77"' :
                                        'id="xs-injectables-links-module-SectionModule-bd008962e1b66fd1fe96da75db98bf77"' }>
                                        <li class="link">
                                            <a href="injectables/SectionService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SectionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserImportModule.html" data-type="entity-link">UserImportModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserImportModule-8f6931e2a20ebb5a48a8b25f81d666cf"' : 'data-target="#xs-controllers-links-module-UserImportModule-8f6931e2a20ebb5a48a8b25f81d666cf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserImportModule-8f6931e2a20ebb5a48a8b25f81d666cf"' :
                                            'id="xs-controllers-links-module-UserImportModule-8f6931e2a20ebb5a48a8b25f81d666cf"' }>
                                            <li class="link">
                                                <a href="controllers/UserImportController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserImportController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserImportModule-8f6931e2a20ebb5a48a8b25f81d666cf"' : 'data-target="#xs-injectables-links-module-UserImportModule-8f6931e2a20ebb5a48a8b25f81d666cf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserImportModule-8f6931e2a20ebb5a48a8b25f81d666cf"' :
                                        'id="xs-injectables-links-module-UserImportModule-8f6931e2a20ebb5a48a8b25f81d666cf"' }>
                                        <li class="link">
                                            <a href="injectables/UserImportService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserImportService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserInfoService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserInfoService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserInfoModule.html" data-type="entity-link">UserInfoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserInfoModule-6fa64b4651aa29fbc8138fa8524ed7cb"' : 'data-target="#xs-controllers-links-module-UserInfoModule-6fa64b4651aa29fbc8138fa8524ed7cb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserInfoModule-6fa64b4651aa29fbc8138fa8524ed7cb"' :
                                            'id="xs-controllers-links-module-UserInfoModule-6fa64b4651aa29fbc8138fa8524ed7cb"' }>
                                            <li class="link">
                                                <a href="controllers/UserInfoController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserInfoController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserInfoModule-6fa64b4651aa29fbc8138fa8524ed7cb"' : 'data-target="#xs-injectables-links-module-UserInfoModule-6fa64b4651aa29fbc8138fa8524ed7cb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserInfoModule-6fa64b4651aa29fbc8138fa8524ed7cb"' :
                                        'id="xs-injectables-links-module-UserInfoModule-6fa64b4651aa29fbc8138fa8524ed7cb"' }>
                                        <li class="link">
                                            <a href="injectables/UserInfoService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserInfoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-a372d40127482ec501d5b92eb9841032"' : 'data-target="#xs-controllers-links-module-UserModule-a372d40127482ec501d5b92eb9841032"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-a372d40127482ec501d5b92eb9841032"' :
                                            'id="xs-controllers-links-module-UserModule-a372d40127482ec501d5b92eb9841032"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-a372d40127482ec501d5b92eb9841032"' : 'data-target="#xs-injectables-links-module-UserModule-a372d40127482ec501d5b92eb9841032"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-a372d40127482ec501d5b92eb9841032"' :
                                        'id="xs-injectables-links-module-UserModule-a372d40127482ec501d5b92eb9841032"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserprofileModule.html" data-type="entity-link">UserprofileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserprofileModule-67c70b20f578ad8e30dd445f111e41ed"' : 'data-target="#xs-controllers-links-module-UserprofileModule-67c70b20f578ad8e30dd445f111e41ed"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserprofileModule-67c70b20f578ad8e30dd445f111e41ed"' :
                                            'id="xs-controllers-links-module-UserprofileModule-67c70b20f578ad8e30dd445f111e41ed"' }>
                                            <li class="link">
                                                <a href="controllers/CertificationDetailController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CertificationDetailController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/EmploymentDetailController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmploymentDetailController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/EntitlementDetailController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EntitlementDetailController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/LeaveEntitlementController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LeaveEntitlementController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/PersonalDetailController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PersonalDetailController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UserprofileController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserprofileController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserprofileModule-67c70b20f578ad8e30dd445f111e41ed"' : 'data-target="#xs-injectables-links-module-UserprofileModule-67c70b20f578ad8e30dd445f111e41ed"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserprofileModule-67c70b20f578ad8e30dd445f111e41ed"' :
                                        'id="xs-injectables-links-module-UserprofileModule-67c70b20f578ad8e30dd445f111e41ed"' }>
                                        <li class="link">
                                            <a href="injectables/AccessLevelValidateService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AccessLevelValidateService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LeavetypeEntitlementDbService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LeavetypeEntitlementDbService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProratedDateCurrentMonthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProratedDateCurrentMonthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProratedDateEndYearService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProratedDateEndYearService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserInfoService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserInfoService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserLeaveEntitlementDbService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserLeaveEntitlementDbService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserLeaveEntitlementService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserLeaveEntitlementService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserLeaveEntitlementSummaryDbService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserLeaveEntitlementSummaryDbService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserprofileDbService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserprofileDbService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserprofileService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserprofileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Access.html" data-type="entity-link">Access</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActivatedByPassword.html" data-type="entity-link">ActivatedByPassword</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActivatedResultDTO.html" data-type="entity-link">ActivatedResultDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ADAuthGuard.html" data-type="entity-link">ADAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApplyBeforePropertiesXmlDTO.html" data-type="entity-link">ApplyBeforePropertiesXmlDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApplyLeaveDataDTO.html" data-type="entity-link">ApplyLeaveDataDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApplyLeaveDTO.html" data-type="entity-link">ApplyLeaveDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApplyWithinPropertiesXmlDTO.html" data-type="entity-link">ApplyWithinPropertiesXmlDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApprovedLeaveDTO.html" data-type="entity-link">ApprovedLeaveDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/AssignLeavePolicyDTO.html" data-type="entity-link">AssignLeavePolicyDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseDBService.html" data-type="entity-link">BaseDBService</a>
                            </li>
                            <li class="link">
                                <a href="classes/BranchDto.html" data-type="entity-link">BranchDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BranchModel.html" data-type="entity-link">BranchModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CertificationDetailDTO.html" data-type="entity-link">CertificationDetailDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CompanyModel.html" data-type="entity-link">CompanyModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CostCentreDto.html" data-type="entity-link">CostCentreDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CostCentreModel.html" data-type="entity-link">CostCentreModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBranchDto.html" data-type="entity-link">CreateBranchDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCostCentreDto.html" data-type="entity-link">CreateCostCentreDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDepartmentDTO.html" data-type="entity-link">CreateDepartmentDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLeaveEntitlementTypeDTO.html" data-type="entity-link">CreateLeaveEntitlementTypeDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLeaveTypeDto.html" data-type="entity-link">CreateLeaveTypeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSectionDto.html" data-type="entity-link">CreateSectionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDTO.html" data-type="entity-link">CreateUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/DepartmentDTO.html" data-type="entity-link">DepartmentDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/DepartmentModel.html" data-type="entity-link">DepartmentModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/DreamFactory.html" data-type="entity-link">DreamFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailList.html" data-type="entity-link">EmailList</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmploymentDetailDTO.html" data-type="entity-link">EmploymentDetailDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntitlementDetailDTO.html" data-type="entity-link">EntitlementDetailDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntitlementRoundingService.html" data-type="entity-link">EntitlementRoundingService</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExcludeDayTypeXmlDTO.html" data-type="entity-link">ExcludeDayTypeXmlDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GeneralPropertiesXmlDTO.html" data-type="entity-link">GeneralPropertiesXmlDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/InviteDTO.html" data-type="entity-link">InviteDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeaveEntitlementBaseService.html" data-type="entity-link">LeaveEntitlementBaseService</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeaveEntitlementDTO.html" data-type="entity-link">LeaveEntitlementDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeaveTransactionModel.html" data-type="entity-link">LeaveTransactionModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeaveTypeDto.html" data-type="entity-link">LeaveTypeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeaveTypeEntitlementListDTO.html" data-type="entity-link">LeaveTypeEntitlementListDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeaveTypeEntitlementModel.html" data-type="entity-link">LeaveTypeEntitlementModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeaveTypeEntitlementXmlDTO.html" data-type="entity-link">LeaveTypeEntitlementXmlDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeaveTypeLevelsXmlDTO.html" data-type="entity-link">LeaveTypeLevelsXmlDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeaveTypeModel.html" data-type="entity-link">LeaveTypeModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeaveTypePropertiesModel.html" data-type="entity-link">LeaveTypePropertiesModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeaveTypePropertiesXmlDTO.html" data-type="entity-link">LeaveTypePropertiesXmlDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeaveTypeServiceYear.html" data-type="entity-link">LeaveTypeServiceYear</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeaveTypeServiceYearXmlDTO.html" data-type="entity-link">LeaveTypeServiceYearXmlDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link">LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PersonalDetailXML.html" data-type="entity-link">PersonalDetailXML</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryParserService.html" data-type="entity-link">QueryParserService</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReportingToValidator.html" data-type="entity-link">ReportingToValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resource.html" data-type="entity-link">Resource</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResourceDecoratorModel.html" data-type="entity-link">ResourceDecoratorModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SectionDto.html" data-type="entity-link">SectionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SectionModel.html" data-type="entity-link">SectionModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServiceYearCalc.html" data-type="entity-link">ServiceYearCalc</a>
                            </li>
                            <li class="link">
                                <a href="classes/STATESDTO.html" data-type="entity-link">STATESDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBranchDto.html" data-type="entity-link">UpdateBranchDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCostCentreDto.html" data-type="entity-link">UpdateCostCentreDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDepartmentDTO.html" data-type="entity-link">UpdateDepartmentDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEmploymentDetailDTO.html" data-type="entity-link">UpdateEmploymentDetailDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLeaveTypeDto.html" data-type="entity-link">UpdateLeaveTypeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLeaveTypeEntitlementDto.html" data-type="entity-link">UpdateLeaveTypeEntitlementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePersonalDetailDTO.html" data-type="entity-link">UpdatePersonalDetailDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSectionDto.html" data-type="entity-link">UpdateSectionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDTO.html" data-type="entity-link">UpdateUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserBankDTO.html" data-type="entity-link">UserBankDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserCertificationDetailDTO.html" data-type="entity-link">UserCertificationDetailDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserCertificationDetailDTO-1.html" data-type="entity-link">UserCertificationDetailDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserCertificationDTO.html" data-type="entity-link">UserCertificationDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserCertificationDTO-1.html" data-type="entity-link">UserCertificationDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserChildrenDTO.html" data-type="entity-link">UserChildrenDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserChildrenDTO-1.html" data-type="entity-link">UserChildrenDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserCsvDto.html" data-type="entity-link">UserCsvDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link">UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEducationDetailDTO.html" data-type="entity-link">UserEducationDetailDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEducationDetailDTO-1.html" data-type="entity-link">UserEducationDetailDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEducationDTO.html" data-type="entity-link">UserEducationDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEducationDTO-1.html" data-type="entity-link">UserEducationDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEmergencyContactDetailDTO.html" data-type="entity-link">UserEmergencyContactDetailDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEmergencyContactDetailDTO-1.html" data-type="entity-link">UserEmergencyContactDetailDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEmergencyContactDTO.html" data-type="entity-link">UserEmergencyContactDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEmergencyContactDTO-1.html" data-type="entity-link">UserEmergencyContactDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEmployeeDTO.html" data-type="entity-link">UserEmployeeDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserFamilyDTO.html" data-type="entity-link">UserFamilyDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserFamilyDTO-1.html" data-type="entity-link">UserFamilyDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserImport.html" data-type="entity-link">UserImport</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserImportResult.html" data-type="entity-link">UserImportResult</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserInfoModel.html" data-type="entity-link">UserInfoModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserInviteModel.html" data-type="entity-link">UserInviteModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLeaveEntitlementModel.html" data-type="entity-link">UserLeaveEntitlementModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserModel.html" data-type="entity-link">UserModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserPersonalDetailDTO.html" data-type="entity-link">UserPersonalDetailDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserProfileDTO.html" data-type="entity-link">UserProfileDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserprofileListDTO.html" data-type="entity-link">UserprofileListDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserprofileListMainCategory.html" data-type="entity-link">UserprofileListMainCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserprofileListSubCategoty.html" data-type="entity-link">UserprofileListSubCategoty</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSpouseDTO.html" data-type="entity-link">UserSpouseDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSpouseDTO-1.html" data-type="entity-link">UserSpouseDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidationStatusDTO.html" data-type="entity-link">ValidationStatusDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewLeaveTypeSetupModel.html" data-type="entity-link">ViewLeaveTypeSetupModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/XMLParserService.html" data-type="entity-link">XMLParserService</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccessLevelValidateService.html" data-type="entity-link">AccessLevelValidateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ApprovalService.html" data-type="entity-link">ApprovalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DateCalculationService.html" data-type="entity-link">DateCalculationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EntitledFullService.html" data-type="entity-link">EntitledFullService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LeaveApplicationValidationService.html" data-type="entity-link">LeaveApplicationValidationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LeaveBalanceValidationService.html" data-type="entity-link">LeaveBalanceValidationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProratedDateCurrentMonthService.html" data-type="entity-link">ProratedDateCurrentMonthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProratedDateEndYearService.html" data-type="entity-link">ProratedDateEndYearService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/ResourceGuard.html" data-type="entity-link">ResourceGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link">RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IDbService.html" data-type="entity-link">IDbService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILeaveEntitlementType.html" data-type="entity-link">ILeaveEntitlementType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IServiceYearCalc.html" data-type="entity-link">IServiceYearCalc</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});