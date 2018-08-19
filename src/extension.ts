'use strict';

import vscode = require('vscode');
import cranelift = require('./cranelift')


const CRANELIFT_SELECTOR: vscode.DocumentSelector = "cranelift";

class CraneliftHoverProvider implements vscode.HoverProvider {
  public provideHover(document: vscode.TextDocument,
                      position: vscode.Position,
                      token: vscode.CancellationToken)
  : Promise<vscode.Hover> {
    const range = document.getWordRangeAtPosition(position);
    const text = document.getText(range);

    const ins = cranelift.instructions.find(ins => ins.name == text);

    if (ins)
      return Promise.resolve(new vscode.Hover(new vscode.MarkdownString(ins.descr), range));
    
    const type = cranelift.types.find(type => type.name == text);

    if (type)
      return Promise.resolve(new vscode.Hover(new vscode.MarkdownString(type.descr), range));

    return Promise.resolve(null);
  }
}

class CraneliftCompletionItemProvider implements vscode.CompletionItemProvider {
  public provideCompletionItems(document: vscode.TextDocument,
                                position: vscode.Position,
                                token: vscode.CancellationToken)
  : Promise<vscode.CompletionItem[]> {
    const range = document.getWordRangeAtPosition(position);
    const text = document.getText(range);

    if (text[text.length - 1] === '.') {
      // Complete type instead
      const items = 
        cranelift.types
          .map(type => {
            const item = new vscode.CompletionItem(type.name, vscode.CompletionItemKind.Class);
            item.documentation = new vscode.MarkdownString(type.descr);
            return item;
          });

      return Promise.resolve(items);
    }

    const items =
      cranelift.instructions
        .filter(ins => ins.name.includes(text))
        .map(ins => {
          const item = new vscode.CompletionItem(ins.name, vscode.CompletionItemKind.Function);
          item.documentation = new vscode.MarkdownString(ins.descr);
          return item;
        });

    items.push(...
      cranelift.types
        .filter(type => type.name.includes(text))
        .map(type => {
          const item = new vscode.CompletionItem(type.name, vscode.CompletionItemKind.Class);
          item.documentation = new vscode.MarkdownString(type.descr);
          return item;
        })
    );

    return Promise.resolve(items);
  }
}

class CraneliftSignatureHelpProvider implements vscode.SignatureHelpProvider {
  public provideSignatureHelp(document: vscode.TextDocument,
                              position: vscode.Position,
                              token: vscode.CancellationToken)
  : Promise<vscode.SignatureHelp> {
    const text = document.lineAt(position).text;
    const match = /(?:^|=)\s*?(\w+?)(?:\W)/m.exec(text);

    if (!match)
      return Promise.resolve(null);

    const fun = match[1];
    const help = new vscode.SignatureHelp();

    help.signatures = 
      cranelift.instructions
        .filter(ins => ins.name === fun)
        .map(ins => {
          const sign = new vscode.SignatureInformation(ins.name, new vscode.MarkdownString(ins.descr));
          sign.parameters = ins.ins.map(p => new vscode.ParameterInformation(p.name, new vscode.MarkdownString(p.descr)));
          return sign;
        });

    help.activeSignature = 0;
    help.activeParameter = 0;

    return Promise.resolve(help);
  }
}


export function activate(ctx: vscode.ExtensionContext): void {
  ctx.subscriptions.push(
    vscode.languages.registerHoverProvider(CRANELIFT_SELECTOR, new CraneliftHoverProvider()),
    vscode.languages.registerCompletionItemProvider(CRANELIFT_SELECTOR, new CraneliftCompletionItemProvider(), '=', ' ', '.'),
    vscode.languages.registerSignatureHelpProvider(CRANELIFT_SELECTOR, new CraneliftSignatureHelpProvider(), ' ')
  );
}

export function deactivate(): void {

}
