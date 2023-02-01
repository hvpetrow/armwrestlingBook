
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})

export class Util {
    constructor(public _snackBar: MatSnackBar) { }

    openSuccessSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 3000, horizontalPosition: 'end', verticalPosition: 'top',
            panelClass: ['green-snackbar'],
        });
    }

    openFailureSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 3000, horizontalPosition: 'end', verticalPosition: 'top',
            panelClass: ['red-snackbar']
        });
    }
}