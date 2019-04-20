'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as path from 'path';
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {       
    context.subscriptions.push(
		vscode.commands.registerCommand('extension.queryplanShow', () => {
            if (vscode.window.activeTextEditor !== undefined && vscode.window.activeTextEditor.document.languageId === 'xml') {
                var planXML = vscode.window.activeTextEditor.document.getText();

                // Create and show a new webview
                const panel = vscode.window.createWebviewPanel(
                    'queryplan-show', // Identifies the type of the webview. Used internally
                    'QueryPlan.Show', // Title of the panel displayed to the user
                    vscode.ViewColumn.One, // Editor column to show the new webview panel in.
                    {
                        enableScripts: true                
                    }                    
                );
                
                const filePath = vscode.Uri.file(path.join(context.extensionPath, 'dist', 'index.html'));
                vscode.workspace.openTextDocument(filePath).then(doc => {
                    const baseUrl = vscode.Uri.file(path.join(context.extensionPath, 'dist')).with({ scheme: 'vscode-resource' });
                    const base = `<base href="${baseUrl}/">`;
                    const originalHtml = doc.getText();
                    var newHtml = originalHtml.replace('<head>', '<head>' + base);
                    
                    // we'll get a ping from the webpage once vue is initialized. 
                    // that's our cue it can receive the message with the queryplan's xml
                    // might make sense to just embed it right in the html file that's being rendered
                    // but that seemed somewhat more hacky
                    panel.webview.onDidReceiveMessage(message => {
                        panel.webview.postMessage(planXML);
                    });
                    panel.webview.html = newHtml;
                });
            } else {
                vscode.window.showErrorMessage('Sorry, QueryPlan.Show only support XML files');
            }
		})
    );
}

// this method is called when your extension is deactivated
export function deactivate() {
}