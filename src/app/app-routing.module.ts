import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedactComponent } from '../app/Component/redact/redact.component';
import { LoginComponent } from '../app/Component/login/login.component';
import { PatternComponent } from '@app/Component/pattern/pattern.component';
import { GrouppatternComponent } from '@app/Component/grouppattern/grouppattern.component';

const routes: Routes = [{ path: 'Redact', component: RedactComponent },
{ path: 'Login', component: LoginComponent },
{ path: '', redirectTo: 'Login', pathMatch: 'full'},
{ path: 'Pattern', component: PatternComponent },
{ path: 'Group', component: GrouppatternComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
