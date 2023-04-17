let start = 0;
let end = 1;

for (let i = 1; i <= 100; i++) {
    console.log(start);
    const next = start + end;
    start = end;
    end = next;
}