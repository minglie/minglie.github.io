window.Int32 = {
    // 任意整数 → 32位有符号整数（自动处理溢出）
    from: num => {
        const uint32 = new Uint32Array([num])[0];
        return uint32 > 2147483647 ? uint32 - 4294967296 : uint32;
    }
};