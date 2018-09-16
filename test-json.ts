declare module '*/foo.json' {
    interface Foo {
        changeLayout : boolean;
        openComment:boolean;
        popup:boolean;
    }

    const value: Foo;
    export = value;
}