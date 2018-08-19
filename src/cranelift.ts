export const instructions = [
  {
    name: "x86_udivmodx",
    ins: [{ name: "nlo", descr: "Low part of numerator" }, { name: "nhi", descr: "High part of numerator" }, { name: "d", descr: "Denominator" }],
    outs: [{ name: "nlo", descr: "Low part of numerator" }, { name: "nhi", descr: "High part of numerator" }, { name: "d", descr: "Denominator" }],
    descr: "Extended unsigned division.\n\nConcatenate the bits in `nhi` and `nlo` to form the numerator.\nInterpret the bits as an unsigned number and divide by the unsigned\ndenominator `d`. Trap when `d` is zero or if the quotient is larger\nthan the range of the output.\n\nReturn both quotient and remainder."
  },
  {
    name: "x86_sdivmodx",
    ins: [{ name: "nlo", descr: "Low part of numerator" }, { name: "nhi", descr: "High part of numerator" }, { name: "d", descr: "Denominator" }],
    outs: [{ name: "nlo", descr: "Low part of numerator" }, { name: "nhi", descr: "High part of numerator" }, { name: "d", descr: "Denominator" }],
    descr: "Extended signed division.\n\nConcatenate the bits in `nhi` and `nlo` to form the numerator.\nInterpret the bits as a signed number and divide by the signed\ndenominator `d`. Trap when `d` is zero or if the quotient is outside\nthe range of the output.\n\nReturn both quotient and remainder."
  },
  {
    name: "x86_umulx",
    ins: [{ name: "argL", descr: "" }, { name: "argR", descr: "" }],
    outs: [{ name: "argL", descr: "" }, { name: "argR", descr: "" }],
    descr: "Unsigned integer multiplication, producing a double-length result.\n\nPolymorphic over all scalar integer types, but does not support vector\ntypes."
  },
  {
    name: "x86_smulx",
    ins: [{ name: "argL", descr: "" }, { name: "argR", descr: "" }],
    outs: [{ name: "argL", descr: "" }, { name: "argR", descr: "" }],
    descr: "Signed integer multiplication, producing a double-length result.\n\nPolymorphic over all scalar integer types, but does not support vector\ntypes."
  },
  {
    name: "x86_cvtt2si",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Convert with truncation floating point to signed integer.\n\nThe source floating point operand is converted to a signed integer by\nrounding towards zero. If the result can't be represented in the output\ntype, returns the smallest signed value the output type can represent.\n\nThis instruction does not trap."
  },
  {
    name: "x86_fmin",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Floating point minimum with x86 semantics.\n\nThis is equivalent to the C ternary operator `x < y ? x : y` which\ndiffers from :inst:`fmin` when either operand is NaN or when comparing\n+0.0 to -0.0.\n\nWhen the two operands don't compare as LT, `y` is returned unchanged,\neven if it is a signalling NaN."
  },
  {
    name: "x86_fmax",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Floating point maximum with x86 semantics.\n\nThis is equivalent to the C ternary operator `x > y ? x : y` which\ndiffers from :inst:`fmax` when either operand is NaN or when comparing\n+0.0 to -0.0.\n\nWhen the two operands don't compare as GT, `y` is returned unchanged,\neven if it is a signalling NaN."
  },
  {
    name: "x86_push",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Pushes a value onto the stack.\n\nDecrements the stack pointer and stores the specified value on to the top.\n\nThis is polymorphic in i32 and i64. However, it is only implemented for i64\nin 64-bit mode, and only for i32 in 32-bit mode."
  },
  {
    name: "x86_pop",
    ins: [],
    outs: [],
    descr: "Pops a value from the stack.\n\nLoads a value from the top of the stack and then increments the stack\npointer.\n\nThis is polymorphic in i32 and i64. However, it is only implemented for i64\nin 64-bit mode, and only for i32 in 32-bit mode."
  },
  {
    name: "x86_bsr",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Bit Scan Reverse -- returns the bit-index of the most significant 1\nin the word. Result is undefined if the argument is zero. However, it\nsets the Z flag depending on the argument, so it is at least easy to\ndetect and handle that case.\n\nThis is polymorphic in i32 and i64. It is implemented for both i64 and\ni32 in 64-bit mode, and only for i32 in 32-bit mode."
  },
  {
    name: "x86_bsf",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Bit Scan Forwards -- returns the bit-index of the least significant 1\nin the word. Is otherwise identical to 'bsr', just above."
  },
  {
    name: "jump",
    ins: [{ name: "EBB", descr: "Destination extended basic block" }, { name: "args", descr: "EBB arguments" }],
    outs: [{ name: "EBB", descr: "Destination extended basic block" }, { name: "args", descr: "EBB arguments" }],
    descr: "Jump.\n\nUnconditionally jump to an extended basic block, passing the specified\nEBB arguments. The number and types of arguments must match the\ndestination EBB."
  },
  {
    name: "fallthrough",
    ins: [{ name: "EBB", descr: "Destination extended basic block" }, { name: "args", descr: "EBB arguments" }],
    outs: [{ name: "EBB", descr: "Destination extended basic block" }, { name: "args", descr: "EBB arguments" }],
    descr: "Fall through to the next EBB.\n\nThis is the same as :inst:`jump`, except the destination EBB must be\nthe next one in the layout.\n\nJumps are turned into fall-through instructions by the branch\nrelaxation pass. There is no reason to use this instruction outside\nthat pass."
  },
  {
    name: "brz",
    ins: [{ name: "c", descr: "Controlling value to test" }, { name: "EBB", descr: "Destination extended basic block" }, { name: "args", descr: "EBB arguments" }],
    outs: [{ name: "c", descr: "Controlling value to test" }, { name: "EBB", descr: "Destination extended basic block" }, { name: "args", descr: "EBB arguments" }],
    descr: "Branch when zero.\n\nIf ``c`` is a :type:`b1` value, take the branch when ``c`` is false. If\n``c`` is an integer value, take the branch when ``c = 0``."
  },
  {
    name: "brnz",
    ins: [{ name: "c", descr: "Controlling value to test" }, { name: "EBB", descr: "Destination extended basic block" }, { name: "args", descr: "EBB arguments" }],
    outs: [{ name: "c", descr: "Controlling value to test" }, { name: "EBB", descr: "Destination extended basic block" }, { name: "args", descr: "EBB arguments" }],
    descr: "Branch when non-zero.\n\nIf ``c`` is a :type:`b1` value, take the branch when ``c`` is true. If\n``c`` is an integer value, take the branch when ``c != 0``."
  },
  {
    name: "br_icmp",
    ins: [{ name: "Cond", descr: "" }, { name: "x", descr: "" }, { name: "y", descr: "" }, { name: "EBB", descr: "Destination extended basic block" }, { name: "args", descr: "EBB arguments" }],
    outs: [{ name: "Cond", descr: "" }, { name: "x", descr: "" }, { name: "y", descr: "" }, { name: "EBB", descr: "Destination extended basic block" }, { name: "args", descr: "EBB arguments" }],
    descr: "Compare scalar integers and branch.\n\nCompare ``x`` and ``y`` in the same way as the :inst:`icmp` instruction\nand take the branch if the condition is true::\n\nbr_icmp ugt v1, v2, ebb4(v5, v6)\n\nis semantically equivalent to::\n\nv10 = icmp ugt, v1, v2\nbrnz v10, ebb4(v5, v6)\n\nSome RISC architectures like MIPS and RISC-V provide instructions that\nimplement all or some of the condition codes. The instruction can also\nbe used to represent *macro-op fusion* on architectures like Intel's."
  },
  {
    name: "brif",
    ins: [{ name: "Cond", descr: "" }, { name: "f", descr: "" }, { name: "EBB", descr: "Destination extended basic block" }, { name: "args", descr: "EBB arguments" }],
    outs: [{ name: "Cond", descr: "" }, { name: "f", descr: "" }, { name: "EBB", descr: "Destination extended basic block" }, { name: "args", descr: "EBB arguments" }],
    descr: "Branch when condition is true in integer CPU flags."
  },
  {
    name: "brff",
    ins: [{ name: "Cond", descr: "" }, { name: "f", descr: "" }, { name: "EBB", descr: "Destination extended basic block" }, { name: "args", descr: "EBB arguments" }],
    outs: [{ name: "Cond", descr: "" }, { name: "f", descr: "" }, { name: "EBB", descr: "Destination extended basic block" }, { name: "args", descr: "EBB arguments" }],
    descr: "Branch when condition is true in floating point CPU flags."
  },
  {
    name: "br_table",
    ins: [{ name: "x", descr: "index into jump table" }, { name: "JT", descr: "" }],
    outs: [{ name: "x", descr: "index into jump table" }, { name: "JT", descr: "" }],
    descr: "Indirect branch via jump table.\n\nUse ``x`` as an unsigned index into the jump table ``JT``. If a jump\ntable entry is found, branch to the corresponding EBB. If no entry was\nfound fall through to the next instruction.\n\nNote that this branch instruction can't pass arguments to the targeted\nblocks. Split critical edges as needed to work around this."
  },
  {
    name: "trap",
    ins: [{ name: "code", descr: "" }],
    outs: [{ name: "code", descr: "" }],
    descr: "Terminate execution unconditionally."
  },
  {
    name: "trapz",
    ins: [{ name: "c", descr: "Controlling value to test" }, { name: "code", descr: "" }],
    outs: [{ name: "c", descr: "Controlling value to test" }, { name: "code", descr: "" }],
    descr: "Trap when zero.\n\nif ``c`` is non-zero, execution continues at the following instruction."
  },
  {
    name: "trapnz",
    ins: [{ name: "c", descr: "Controlling value to test" }, { name: "code", descr: "" }],
    outs: [{ name: "c", descr: "Controlling value to test" }, { name: "code", descr: "" }],
    descr: "Trap when non-zero.\n\nif ``c`` is zero, execution continues at the following instruction."
  },
  {
    name: "trapif",
    ins: [{ name: "Cond", descr: "" }, { name: "f", descr: "" }, { name: "code", descr: "" }],
    outs: [{ name: "Cond", descr: "" }, { name: "f", descr: "" }, { name: "code", descr: "" }],
    descr: "Trap when condition is true in integer CPU flags."
  },
  {
    name: "trapff",
    ins: [{ name: "Cond", descr: "" }, { name: "f", descr: "" }, { name: "code", descr: "" }],
    outs: [{ name: "Cond", descr: "" }, { name: "f", descr: "" }, { name: "code", descr: "" }],
    descr: "Trap when condition is true in floating point CPU flags."
  },
  {
    name: "return",
    ins: [{ name: "rvals", descr: "return values" }],
    outs: [{ name: "rvals", descr: "return values" }],
    descr: "Return from the function.\n\nUnconditionally transfer control to the calling function, passing the\nprovided return values. The list of return values must match the\nfunction signature's return types."
  },
  {
    name: "call",
    ins: [{ name: "FN", descr: "function to call, declared by :inst:`function`" }, { name: "args", descr: "call arguments" }],
    outs: [{ name: "FN", descr: "function to call, declared by :inst:`function`" }, { name: "args", descr: "call arguments" }],
    descr: "Direct function call.\n\nCall a function which has been declared in the preamble. The argument\ntypes must match the function's signature."
  },
  {
    name: "call_indirect",
    ins: [{ name: "SIG", descr: "function signature" }, { name: "callee", descr: "address of function to call" }, { name: "args", descr: "call arguments" }],
    outs: [{ name: "SIG", descr: "function signature" }, { name: "callee", descr: "address of function to call" }, { name: "args", descr: "call arguments" }],
    descr: "Indirect function call.\n\nCall the function pointed to by `callee` with the given arguments. The\ncalled function must match the specified signature.\n\nNote that this is different from WebAssembly's ``call_indirect``; the\ncallee is a native address, rather than a table index. For WebAssembly,\n:inst:`table_addr` and :inst:`load` are used to obtain a native address\nfrom a table."
  },
  {
    name: "func_addr",
    ins: [{ name: "FN", descr: "function to call, declared by :inst:`function`" }],
    outs: [{ name: "FN", descr: "function to call, declared by :inst:`function`" }],
    descr: "Get the address of a function.\n\nCompute the absolute address of a function declared in the preamble.\nThe returned address can be used as a ``callee`` argument to\n:inst:`call_indirect`. This is also a method for calling functions that\nare too far away to be addressable by a direct :inst:`call`\ninstruction."
  },
  {
    name: "load",
    ins: [{ name: "MemFlags", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Load from memory at ``p + Offset``.\n\nThis is a polymorphic instruction that can load any value type which\nhas a memory representation."
  },
  {
    name: "load_complex",
    ins: [{ name: "MemFlags", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Load from memory at ``sum(args) + Offset``.\n\nThis is a polymorphic instruction that can load any value type which\nhas a memory representation."
  },
  {
    name: "store",
    ins: [{ name: "MemFlags", descr: "" }, { name: "x", descr: "Value to be stored" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "x", descr: "Value to be stored" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Store ``x`` to memory at ``p + Offset``.\n\nThis is a polymorphic instruction that can store any value type with a\nmemory representation."
  },
  {
    name: "store_complex",
    ins: [{ name: "MemFlags", descr: "" }, { name: "x", descr: "Value to be stored" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "x", descr: "Value to be stored" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Store ``x`` to memory at ``sum(args) + Offset``.\n\nThis is a polymorphic instruction that can store any value type with a\nmemory representation."
  },
  {
    name: "uload8",
    ins: [{ name: "MemFlags", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Load 8 bits from memory at ``p + Offset`` and zero-extend.\n\nThis is equivalent to ``load.i8`` followed by ``uextend``."
  },
  {
    name: "uload8_complex",
    ins: [{ name: "MemFlags", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Load 8 bits from memory at ``sum(args) + Offset`` and zero-extend.\n\nThis is equivalent to ``load.i8`` followed by ``uextend``."
  },
  {
    name: "sload8",
    ins: [{ name: "MemFlags", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Load 8 bits from memory at ``p + Offset`` and sign-extend.\n\nThis is equivalent to ``load.i8`` followed by ``sextend``."
  },
  {
    name: "sload8_complex",
    ins: [{ name: "MemFlags", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Load 8 bits from memory at ``sum(args) + Offset`` and sign-extend.\n\nThis is equivalent to ``load.i8`` followed by ``sextend``."
  },
  {
    name: "istore8",
    ins: [{ name: "MemFlags", descr: "" }, { name: "x", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "x", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Store the low 8 bits of ``x`` to memory at ``p + Offset``.\n\nThis is equivalent to ``ireduce.i8`` followed by ``store.i8``."
  },
  {
    name: "istore8_complex",
    ins: [{ name: "MemFlags", descr: "" }, { name: "x", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "x", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Store the low 8 bits of ``x`` to memory at ``sum(args) + Offset``.\n\nThis is equivalent to ``ireduce.i8`` followed by ``store.i8``."
  },
  {
    name: "uload16",
    ins: [{ name: "MemFlags", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Load 16 bits from memory at ``p + Offset`` and zero-extend.\n\nThis is equivalent to ``load.i16`` followed by ``uextend``."
  },
  {
    name: "uload16_complex",
    ins: [{ name: "MemFlags", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Load 16 bits from memory at ``sum(args) + Offset`` and zero-extend.\n\nThis is equivalent to ``load.i16`` followed by ``uextend``."
  },
  {
    name: "sload16",
    ins: [{ name: "MemFlags", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Load 16 bits from memory at ``p + Offset`` and sign-extend.\n\nThis is equivalent to ``load.i16`` followed by ``sextend``."
  },
  {
    name: "sload16_complex",
    ins: [{ name: "MemFlags", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Load 16 bits from memory at ``sum(args) + Offset`` and sign-extend.\n\nThis is equivalent to ``load.i16`` followed by ``sextend``."
  },
  {
    name: "istore16",
    ins: [{ name: "MemFlags", descr: "" }, { name: "x", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "x", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Store the low 16 bits of ``x`` to memory at ``p + Offset``.\n\nThis is equivalent to ``ireduce.i16`` followed by ``store.i16``."
  },
  {
    name: "istore16_complex",
    ins: [{ name: "MemFlags", descr: "" }, { name: "x", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "x", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Store the low 16 bits of ``x`` to memory at ``sum(args) + Offset``.\n\nThis is equivalent to ``ireduce.i16`` followed by ``store.i16``."
  },
  {
    name: "uload32",
    ins: [{ name: "MemFlags", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Load 32 bits from memory at ``p + Offset`` and zero-extend.\n\nThis is equivalent to ``load.i32`` followed by ``uextend``."
  },
  {
    name: "uload32_complex",
    ins: [{ name: "MemFlags", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Load 32 bits from memory at ``sum(args) + Offset`` and zero-extend.\n\nThis is equivalent to ``load.i32`` followed by ``uextend``."
  },
  {
    name: "sload32",
    ins: [{ name: "MemFlags", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Load 32 bits from memory at ``p + Offset`` and sign-extend.\n\nThis is equivalent to ``load.i32`` followed by ``sextend``."
  },
  {
    name: "sload32_complex",
    ins: [{ name: "MemFlags", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Load 32 bits from memory at ``sum(args) + Offset`` and sign-extend.\n\nThis is equivalent to ``load.i32`` followed by ``sextend``."
  },
  {
    name: "istore32",
    ins: [{ name: "MemFlags", descr: "" }, { name: "x", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "x", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Store the low 32 bits of ``x`` to memory at ``p + Offset``.\n\nThis is equivalent to ``ireduce.i32`` followed by ``store.i32``."
  },
  {
    name: "istore32_complex",
    ins: [{ name: "MemFlags", descr: "" }, { name: "x", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    outs: [{ name: "MemFlags", descr: "" }, { name: "x", descr: "" }, { name: "args", descr: "Address arguments" }, { name: "Offset", descr: "Byte offset from base address" }],
    descr: "Store the low 32 bits of ``x`` to memory at ``sum(args) + Offset``.\n\nThis is equivalent to ``ireduce.i32`` followed by ``store.i32``."
  },
  {
    name: "stack_load",
    ins: [{ name: "SS", descr: "" }, { name: "Offset", descr: "In-bounds offset into stack slot" }],
    outs: [{ name: "SS", descr: "" }, { name: "Offset", descr: "In-bounds offset into stack slot" }],
    descr: "Load a value from a stack slot at the constant offset.\n\nThis is a polymorphic instruction that can load any value type which\nhas a memory representation.\n\nThe offset is an immediate constant, not an SSA value. The memory\naccess cannot go out of bounds, i.e.\n:math:`sizeof(a) + Offset <= sizeof(SS)`."
  },
  {
    name: "stack_store",
    ins: [{ name: "x", descr: "Value to be stored" }, { name: "SS", descr: "" }, { name: "Offset", descr: "In-bounds offset into stack slot" }],
    outs: [{ name: "x", descr: "Value to be stored" }, { name: "SS", descr: "" }, { name: "Offset", descr: "In-bounds offset into stack slot" }],
    descr: "Store a value to a stack slot at a constant offset.\n\nThis is a polymorphic instruction that can store any value type with a\nmemory representation.\n\nThe offset is an immediate constant, not an SSA value. The memory\naccess cannot go out of bounds, i.e.\n:math:`sizeof(a) + Offset <= sizeof(SS)`."
  },
  {
    name: "stack_addr",
    ins: [{ name: "SS", descr: "" }, { name: "Offset", descr: "In-bounds offset into stack slot" }],
    outs: [{ name: "SS", descr: "" }, { name: "Offset", descr: "In-bounds offset into stack slot" }],
    descr: "Get the address of a stack slot.\n\nCompute the absolute address of a byte in a stack slot. The offset must\nrefer to a byte inside the stack slot:\n:math:`0 <= Offset < sizeof(SS)`."
  },
  {
    name: "global_value",
    ins: [{ name: "GV", descr: "" }],
    outs: [{ name: "GV", descr: "" }],
    descr: "Compute the value of global GV."
  },
  {
    name: "globalsym_addr",
    ins: [{ name: "GV", descr: "" }],
    outs: [{ name: "GV", descr: "" }],
    descr: "Compute the address of global GV, which is a symbolic name."
  },
  {
    name: "heap_addr",
    ins: [{ name: "H", descr: "" }, { name: "p", descr: "" }, { name: "Size", descr: "Size in bytes" }],
    outs: [{ name: "H", descr: "" }, { name: "p", descr: "" }, { name: "Size", descr: "Size in bytes" }],
    descr: "Bounds check and compute absolute address of heap memory.\n\nVerify that the offset range ``p .. p + Size - 1`` is in bounds for the\nheap H, and generate an absolute address that is safe to dereference.\n\n1. If ``p + Size`` is not greater than the heap bound, return an\nabsolute address corresponding to a byte offset of ``p`` from the\nheap's base address.\n2. If ``p + Size`` is greater than the heap bound, generate a trap."
  },
  {
    name: "table_addr",
    ins: [{ name: "T", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from element address" }],
    outs: [{ name: "T", descr: "" }, { name: "p", descr: "" }, { name: "Offset", descr: "Byte offset from element address" }],
    descr: "Bounds check and compute absolute address of a table entry.\n\nVerify that the offset ``p`` is in bounds for the table T, and generate\nan absolute address that is safe to dereference.\n\n``Offset`` must be less than the size of a table element.\n\n1. If ``p`` is not greater than the table bound, return an absolute\naddress corresponding to a byte offset of ``p`` from the table's\nbase address.\n2. If ``p`` is greater than the table bound, generate a trap."
  },
  {
    name: "iconst",
    ins: [{ name: "N", descr: "" }],
    outs: [{ name: "N", descr: "" }],
    descr: "Integer constant.\n\nCreate a scalar integer SSA value with an immediate constant value, or\nan integer vector where all the lanes have the same value."
  },
  {
    name: "f32const",
    ins: [{ name: "N", descr: "" }],
    outs: [{ name: "N", descr: "" }],
    descr: "Floating point constant.\n\nCreate a :type:`f32` SSA value with an immediate constant value."
  },
  {
    name: "f64const",
    ins: [{ name: "N", descr: "" }],
    outs: [{ name: "N", descr: "" }],
    descr: "Floating point constant.\n\nCreate a :type:`f64` SSA value with an immediate constant value."
  },
  {
    name: "bconst",
    ins: [{ name: "N", descr: "" }],
    outs: [{ name: "N", descr: "" }],
    descr: "Boolean constant.\n\nCreate a scalar boolean SSA value with an immediate constant value, or\na boolean vector where all the lanes have the same value."
  },
  {
    name: "nop",
    ins: [],
    outs: [],
    descr: "Just a dummy instruction\n\nNote: this doesn't compile to a machine code nop"
  },
  {
    name: "select",
    ins: [{ name: "c", descr: "Controlling value to test" }, { name: "x", descr: "Value to use when `c` is true" }, { name: "y", descr: "Value to use when `c` is false" }],
    outs: [{ name: "c", descr: "Controlling value to test" }, { name: "x", descr: "Value to use when `c` is true" }, { name: "y", descr: "Value to use when `c` is false" }],
    descr: "Conditional select.\n\nThis instruction selects whole values. Use :inst:`vselect` for\nlane-wise selection."
  },
  {
    name: "selectif",
    ins: [{ name: "cc", descr: "Controlling condition code" }, { name: "flags", descr: "The machine's flag register" }, { name: "x", descr: "Value to use when `c` is true" }, { name: "y", descr: "Value to use when `c` is false" }],
    outs: [{ name: "cc", descr: "Controlling condition code" }, { name: "flags", descr: "The machine's flag register" }, { name: "x", descr: "Value to use when `c` is true" }, { name: "y", descr: "Value to use when `c` is false" }],
    descr: "Conditional select, dependent on integer condition codes."
  },
  {
    name: "copy",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Register-register copy.\n\nThis instruction copies its input, preserving the value type.\n\nA pure SSA-form program does not need to copy values, but this\ninstruction is useful for representing intermediate stages during\ninstruction transformations, and the register allocator needs a way of\nrepresenting register copies."
  },
  {
    name: "spill",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Spill a register value to a stack slot.\n\nThis instruction behaves exactly like :inst:`copy`, but the result\nvalue is assigned to a spill slot."
  },
  {
    name: "fill",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Load a register value from a stack slot.\n\nThis instruction behaves exactly like :inst:`copy`, but creates a new\nSSA value for the spilled input value."
  },
  {
    name: "regmove",
    ins: [{ name: "x", descr: "" }, { name: "src", descr: "" }, { name: "dst", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "src", descr: "" }, { name: "dst", descr: "" }],
    descr: "Temporarily divert ``x`` from ``src`` to ``dst``.\n\nThis instruction moves the location of a value from one register to\nanother without creating a new SSA value. It is used by the register\nallocator to temporarily rearrange register assignments in order to\nsatisfy instruction constraints.\n\nThe register diversions created by this instruction must be undone\nbefore the value leaves the EBB. At the entry to a new EBB, all live\nvalues must be in their originally assigned registers."
  },
  {
    name: "copy_special",
    ins: [{ name: "src", descr: "" }, { name: "dst", descr: "" }],
    outs: [{ name: "src", descr: "" }, { name: "dst", descr: "" }],
    descr: "Copies the contents of ''src'' register to ''dst'' register.\n\nThis instructions copies the contents of one register to another\nregister without involving any SSA values. This is used for copying\nspecial registers, e.g. copying the stack register to the frame\nregister in a function prologue."
  },
  {
    name: "adjust_sp_down",
    ins: [{ name: "delta", descr: "" }],
    outs: [{ name: "delta", descr: "" }],
    descr: "Subtracts ``delta`` offset value from the stack pointer register.\n\nThis instruction is used to adjust the stack pointer by a dynamic amount."
  },
  {
    name: "adjust_sp_up_imm",
    ins: [{ name: "Offset", descr: "Offset from current stack pointer" }],
    outs: [{ name: "Offset", descr: "Offset from current stack pointer" }],
    descr: "Adds ``Offset`` immediate offset value to the stack pointer register.\n\nThis instruction is used to adjust the stack pointer, primarily in function\nprologues and epilogues. ``Offset`` is constrained to the size of a signed\n32-bit integer."
  },
  {
    name: "adjust_sp_down_imm",
    ins: [{ name: "Offset", descr: "Offset from current stack pointer" }],
    outs: [{ name: "Offset", descr: "Offset from current stack pointer" }],
    descr: "Subtracts ``Offset`` immediate offset value from the stack pointer\nregister.\n\nThis instruction is used to adjust the stack pointer, primarily in function\nprologues and epilogues. ``Offset`` is constrained to the size of a signed\n32-bit integer."
  },
  {
    name: "ifcmp_sp",
    ins: [{ name: "addr", descr: "" }],
    outs: [{ name: "addr", descr: "" }],
    descr: "Compare ``addr`` with the stack pointer and set the CPU flags.\n\nThis is like :inst:`ifcmp` where ``addr`` is the LHS operand and the stack\npointer is the RHS."
  },
  {
    name: "regspill",
    ins: [{ name: "x", descr: "" }, { name: "src", descr: "" }, { name: "SS", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "src", descr: "" }, { name: "SS", descr: "" }],
    descr: "Temporarily divert ``x`` from ``src`` to ``SS``.\n\nThis instruction moves the location of a value from a register to a\nstack slot without creating a new SSA value. It is used by the register\nallocator to temporarily rearrange register assignments in order to\nsatisfy instruction constraints.\n\nSee also :inst:`regmove`."
  },
  {
    name: "regfill",
    ins: [{ name: "x", descr: "" }, { name: "SS", descr: "" }, { name: "dst", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "SS", descr: "" }, { name: "dst", descr: "" }],
    descr: "Temporarily divert ``x`` from ``SS`` to ``dst``.\n\nThis instruction moves the location of a value from a stack slot to a\nregister without creating a new SSA value. It is used by the register\nallocator to temporarily rearrange register assignments in order to\nsatisfy instruction constraints.\n\nSee also :inst:`regmove`."
  },
  {
    name: "vsplit",
    ins: [{ name: "x", descr: "Vector to split" }],
    outs: [{ name: "x", descr: "Vector to split" }],
    descr: "Split a vector into two halves.\n\nSplit the vector `x` into two separate values, each containing half of\nthe lanes from ``x``. The result may be two scalars if ``x`` only had\ntwo lanes."
  },
  {
    name: "vconcat",
    ins: [{ name: "x", descr: "Low-numbered lanes" }, { name: "y", descr: "High-numbered lanes" }],
    outs: [{ name: "x", descr: "Low-numbered lanes" }, { name: "y", descr: "High-numbered lanes" }],
    descr: "Vector concatenation.\n\nReturn a vector formed by concatenating ``x`` and ``y``. The resulting\nvector type has twice as many lanes as each of the inputs. The lanes of\n``x`` appear as the low-numbered lanes, and the lanes of ``y`` become\nthe high-numbered lanes of ``a``.\n\nIt is possible to form a vector by concatenating two scalars."
  },
  {
    name: "vselect",
    ins: [{ name: "c", descr: "Controlling vector" }, { name: "x", descr: "Value to use where `c` is true" }, { name: "y", descr: "Value to use where `c` is false" }],
    outs: [{ name: "c", descr: "Controlling vector" }, { name: "x", descr: "Value to use where `c` is true" }, { name: "y", descr: "Value to use where `c` is false" }],
    descr: "Vector lane select.\n\nSelect lanes from ``x`` or ``y`` controlled by the lanes of the boolean\nvector ``c``."
  },
  {
    name: "splat",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Vector splat.\n\nReturn a vector whose lanes are all ``x``."
  },
  {
    name: "insertlane",
    ins: [{ name: "x", descr: "SIMD vector to modify" }, { name: "Idx", descr: "Lane index" }, { name: "y", descr: "New lane value" }],
    outs: [{ name: "x", descr: "SIMD vector to modify" }, { name: "Idx", descr: "Lane index" }, { name: "y", descr: "New lane value" }],
    descr: "Insert ``y`` as lane ``Idx`` in x.\n\nThe lane index, ``Idx``, is an immediate value, not an SSA value. It\nmust indicate a valid lane index for the type of ``x``."
  },
  {
    name: "extractlane",
    ins: [{ name: "x", descr: "" }, { name: "Idx", descr: "Lane index" }],
    outs: [{ name: "x", descr: "" }, { name: "Idx", descr: "Lane index" }],
    descr: "Extract lane ``Idx`` from ``x``.\n\nThe lane index, ``Idx``, is an immediate value, not an SSA value. It\nmust indicate a valid lane index for the type of ``x``."
  },
  {
    name: "icmp",
    ins: [{ name: "Cond", descr: "" }, { name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "Cond", descr: "" }, { name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Integer comparison.\n\nThe condition code determines if the operands are interpreted as signed\nor unsigned integers.\n\n====== ======== =========\nSigned Unsigned Condition\n====== ======== =========\neq     eq       Equal\nne     ne       Not equal\nslt    ult      Less than\nsge    uge      Greater than or equal\nsgt    ugt      Greater than\nsle    ule      Less than or equal\n====== ======== =========\n\nWhen this instruction compares integer vectors, it returns a boolean\nvector of lane-wise comparisons."
  },
  {
    name: "icmp_imm",
    ins: [{ name: "Cond", descr: "" }, { name: "x", descr: "" }, { name: "Y", descr: "" }],
    outs: [{ name: "Cond", descr: "" }, { name: "x", descr: "" }, { name: "Y", descr: "" }],
    descr: "Compare scalar integer to a constant.\n\nThis is the same as the :inst:`icmp` instruction, except one operand is\nan immediate constant.\n\nThis instruction can only compare scalars. Use :inst:`icmp` for\nlane-wise vector comparisons."
  },
  {
    name: "ifcmp",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Compare scalar integers and return flags.\n\nCompare two scalar integer values and return integer CPU flags\nrepresenting the result."
  },
  {
    name: "ifcmp_imm",
    ins: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    descr: "Compare scalar integer to a constant and return flags.\n\nLike :inst:`icmp_imm`, but returns integer CPU flags instead of testing\na specific condition code."
  },
  {
    name: "iadd",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Wrapping integer addition: :math:`a := x + y \pmod{2^B}`.\n\nThis instruction does not depend on the signed/unsigned interpretation\nof the operands."
  },
  {
    name: "isub",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Wrapping integer subtraction: :math:`a := x - y \pmod{2^B}`.\n\nThis instruction does not depend on the signed/unsigned interpretation\nof the operands."
  },
  {
    name: "imul",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Wrapping integer multiplication: :math:`a := x y \pmod{2^B}`.\n\nThis instruction does not depend on the signed/unsigned interpretation\nof the operands.\n\nPolymorphic over all integer types (vector and scalar)."
  },
  {
    name: "umulhi",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Unsigned integer multiplication, producing the high half of a\ndouble-length result.\n\nPolymorphic over all scalar integer types, but does not support vector\ntypes."
  },
  {
    name: "smulhi",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Signed integer multiplication, producing the high half of a\ndouble-length result.\n\nPolymorphic over all scalar integer types, but does not support vector\ntypes."
  },
  {
    name: "udiv",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Unsigned integer division: :math:`a := \lfloor {x \over y} \rfloor`.\n\nThis operation traps if the divisor is zero."
  },
  {
    name: "sdiv",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Signed integer division rounded toward zero: :math:`a := sign(xy)\n\lfloor {|x| \over |y|}\rfloor`.\n\nThis operation traps if the divisor is zero, or if the result is not\nrepresentable in :math:`B` bits two's complement. This only happens\nwhen :math:`x = -2^{B-1}, y = -1`."
  },
  {
    name: "urem",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Unsigned integer remainder.\n\nThis operation traps if the divisor is zero."
  },
  {
    name: "srem",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Signed integer remainder. The result has the sign of the dividend.\n\nThis operation traps if the divisor is zero."
  },
  {
    name: "iadd_imm",
    ins: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    descr: "Add immediate integer.\n\nSame as :inst:`iadd`, but one operand is an immediate constant.\n\nPolymorphic over all scalar integer types, but does not support vector\ntypes."
  },
  {
    name: "imul_imm",
    ins: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    descr: "Integer multiplication by immediate constant.\n\nPolymorphic over all scalar integer types, but does not support vector\ntypes."
  },
  {
    name: "udiv_imm",
    ins: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    descr: "Unsigned integer division by an immediate constant.\n\nThis operation traps if the divisor is zero."
  },
  {
    name: "sdiv_imm",
    ins: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    descr: "Signed integer division by an immediate constant.\n\nThis operation traps if the divisor is zero, or if the result is not\nrepresentable in :math:`B` bits two's complement. This only happens\nwhen :math:`x = -2^{B-1}, Y = -1`."
  },
  {
    name: "urem_imm",
    ins: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    descr: "Unsigned integer remainder with immediate divisor.\n\nThis operation traps if the divisor is zero."
  },
  {
    name: "srem_imm",
    ins: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    descr: "Signed integer remainder with immediate divisor.\n\nThis operation traps if the divisor is zero."
  },
  {
    name: "irsub_imm",
    ins: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    descr: "Immediate reverse wrapping subtraction: :math:`a := Y - x \pmod{2^B}`.\n\nAlso works as integer negation when :math:`Y = 0`. Use :inst:`iadd_imm`\nwith a negative immediate operand for the reverse immediate\nsubtraction.\n\nPolymorphic over all scalar integer types, but does not support vector\ntypes."
  },
  {
    name: "iadd_cin",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }, { name: "c_in", descr: "Input carry flag" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }, { name: "c_in", descr: "Input carry flag" }],
    descr: "Add integers with carry in.\n\nSame as :inst:`iadd` with an additional carry input. Computes:\n\n.. math::\n\na = x + y + c_{in} \pmod 2^B\n\nPolymorphic over all scalar integer types, but does not support vector\ntypes."
  },
  {
    name: "iadd_cout",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Add integers with carry out.\n\nSame as :inst:`iadd` with an additional carry output.\n\n.. math::\n\na &= x + y \pmod 2^B \\\nc_{out} &= x+y >= 2^B\n\nPolymorphic over all scalar integer types, but does not support vector\ntypes."
  },
  {
    name: "iadd_carry",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }, { name: "c_in", descr: "Input carry flag" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }, { name: "c_in", descr: "Input carry flag" }],
    descr: "Add integers with carry in and out.\n\nSame as :inst:`iadd` with an additional carry input and output.\n\n.. math::\n\na &= x + y + c_{in} \pmod 2^B \\\nc_{out} &= x + y + c_{in} >= 2^B\n\nPolymorphic over all scalar integer types, but does not support vector\ntypes."
  },
  {
    name: "isub_bin",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }, { name: "b_in", descr: "Input borrow flag" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }, { name: "b_in", descr: "Input borrow flag" }],
    descr: "Subtract integers with borrow in.\n\nSame as :inst:`isub` with an additional borrow flag input. Computes:\n\n.. math::\n\na = x - (y + b_{in}) \pmod 2^B\n\nPolymorphic over all scalar integer types, but does not support vector\ntypes."
  },
  {
    name: "isub_bout",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Subtract integers with borrow out.\n\nSame as :inst:`isub` with an additional borrow flag output.\n\n.. math::\n\na &= x - y \pmod 2^B \\\nb_{out} &= x < y\n\nPolymorphic over all scalar integer types, but does not support vector\ntypes."
  },
  {
    name: "isub_borrow",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }, { name: "b_in", descr: "Input borrow flag" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }, { name: "b_in", descr: "Input borrow flag" }],
    descr: "Subtract integers with borrow in and out.\n\nSame as :inst:`isub` with an additional borrow flag input and output.\n\n.. math::\n\na &= x - (y + b_{in}) \pmod 2^B \\\nb_{out} &= x < y + b_{in}\n\nPolymorphic over all scalar integer types, but does not support vector\ntypes."
  },
  {
    name: "smul",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Signed integer multiplication: :math:``.\n\n.. math::\n\na &= x y \pmod 2^B \\\nc_{out} &= x y >= 2^B\n\nPolymorphic over all integer types (vector and scalar)."
  },
  {
    name: "umul",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Unsigned integer multiplication: :math:``.\n\n.. math::\n\na &= x y \pmod 2^B \\\nc_{out} &= x y >= 2^B\n\nPolymorphic over all integer types (vector and scalar)."
  },
  {
    name: "band",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Bitwise and."
  },
  {
    name: "bor",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Bitwise or."
  },
  {
    name: "bxor",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Bitwise xor."
  },
  {
    name: "bnot",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Bitwise not."
  },
  {
    name: "band_not",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Bitwise and not.\n\nComputes `x & ~y`."
  },
  {
    name: "bor_not",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Bitwise or not.\n\nComputes `x | ~y`."
  },
  {
    name: "bxor_not",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Bitwise xor not.\n\nComputes `x ^ ~y`."
  },
  {
    name: "band_imm",
    ins: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    descr: "Bitwise and with immediate.\n\nSame as :inst:`band`, but one operand is an immediate constant.\n\nPolymorphic over all scalar integer types, but does not support vector\ntypes."
  },
  {
    name: "bor_imm",
    ins: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    descr: "Bitwise or with immediate.\n\nSame as :inst:`bor`, but one operand is an immediate constant.\n\nPolymorphic over all scalar integer types, but does not support vector\ntypes."
  },
  {
    name: "bxor_imm",
    ins: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "Y", descr: "" }],
    descr: "Bitwise xor with immediate.\n\nSame as :inst:`bxor`, but one operand is an immediate constant.\n\nPolymorphic over all scalar integer types, but does not support vector\ntypes."
  },
  {
    name: "rotl",
    ins: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "y", descr: "Number of bits to shift" }],
    outs: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "y", descr: "Number of bits to shift" }],
    descr: "Rotate left.\n\nRotate the bits in ``x`` by ``y`` places."
  },
  {
    name: "rotr",
    ins: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "y", descr: "Number of bits to shift" }],
    outs: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "y", descr: "Number of bits to shift" }],
    descr: "Rotate right.\n\nRotate the bits in ``x`` by ``y`` places."
  },
  {
    name: "rotl_imm",
    ins: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "Y", descr: "" }],
    outs: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "Y", descr: "" }],
    descr: "Rotate left by immediate."
  },
  {
    name: "rotr_imm",
    ins: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "Y", descr: "" }],
    outs: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "Y", descr: "" }],
    descr: "Rotate right by immediate."
  },
  {
    name: "ishl",
    ins: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "y", descr: "Number of bits to shift" }],
    outs: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "y", descr: "Number of bits to shift" }],
    descr: "Integer shift left. Shift the bits in ``x`` towards the MSB by ``y``\nplaces. Shift in zero bits to the LSB.\n\nThe shift amount is masked to the size of ``x``.\n\nWhen shifting a B-bits integer type, this instruction computes:\n\n.. math::\ns &:= y \pmod B,                \\\na &:= x \cdot 2^s \pmod{2^B}."
  },
  {
    name: "ushr",
    ins: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "y", descr: "Number of bits to shift" }],
    outs: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "y", descr: "Number of bits to shift" }],
    descr: "Unsigned shift right. Shift bits in ``x`` towards the LSB by ``y``\nplaces, shifting in zero bits to the MSB. Also called a *logical\nshift*.\n\nThe shift amount is masked to the size of the register.\n\nWhen shifting a B-bits integer type, this instruction computes:\n\n.. math::\ns &:= y \pmod B,                \\\na &:= \lfloor x \cdot 2^{-s} \rfloor."
  },
  {
    name: "sshr",
    ins: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "y", descr: "Number of bits to shift" }],
    outs: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "y", descr: "Number of bits to shift" }],
    descr: "Signed shift right. Shift bits in ``x`` towards the LSB by ``y``\nplaces, shifting in sign bits to the MSB. Also called an *arithmetic\nshift*.\n\nThe shift amount is masked to the size of the register."
  },
  {
    name: "ishl_imm",
    ins: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "Y", descr: "" }],
    outs: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "Y", descr: "" }],
    descr: "Integer shift left by immediate.\n\nThe shift amount is masked to the size of ``x``."
  },
  {
    name: "ushr_imm",
    ins: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "Y", descr: "" }],
    outs: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "Y", descr: "" }],
    descr: "Unsigned shift right by immediate.\n\nThe shift amount is masked to the size of the register."
  },
  {
    name: "sshr_imm",
    ins: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "Y", descr: "" }],
    outs: [{ name: "x", descr: "Scalar or vector value to shift" }, { name: "Y", descr: "" }],
    descr: "Signed shift right by immediate.\n\nThe shift amount is masked to the size of the register."
  },
  {
    name: "clz",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Count leading zero bits.\n\nStarting from the MSB in ``x``, count the number of zero bits before\nreaching the first one bit. When ``x`` is zero, returns the size of x\nin bits."
  },
  {
    name: "cls",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Count leading sign bits.\n\nStarting from the MSB after the sign bit in ``x``, count the number of\nconsecutive bits identical to the sign bit. When ``x`` is 0 or -1,\nreturns one less than the size of x in bits."
  },
  {
    name: "ctz",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Count trailing zeros.\n\nStarting from the LSB in ``x``, count the number of zero bits before\nreaching the first one bit. When ``x`` is zero, returns the size of x\nin bits."
  },
  {
    name: "popcnt",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Population count\n\nCount the number of one bits in ``x``."
  },
  {
    name: "fcmp",
    ins: [{ name: "Cond", descr: "" }, { name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "Cond", descr: "" }, { name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Floating point comparison.\n\nTwo IEEE 754-2008 floating point numbers, `x` and `y`, relate to each\nother in exactly one of four ways:\n\n== ==========================================\nUN Unordered when one or both numbers is NaN.\nEQ When :math:`x = y`. (And :math:`0.0 = -0.0`).\nLT When :math:`x < y`.\nGT When :math:`x > y`.\n== ==========================================\n\nThe 14 :type:`floatcc` condition codes each correspond to a subset of\nthe four relations, except for the empty set which would always be\nfalse, and the full set which would always be true.\n\nThe condition codes are divided into 7 'ordered' conditions which don't\ninclude UN, and 7 unordered conditions which all include UN.\n\n+-------+------------+---------+------------+-------------------------+\n|Ordered             |Unordered             |Condition                |\n+=======+============+=========+============+=========================+\n|ord    |EQ | LT | GT|uno      |UN          |NaNs absent / present.   |\n+-------+------------+---------+------------+-------------------------+\n|eq     |EQ          |ueq      |UN | EQ     |Equal                    |\n+-------+------------+---------+------------+-------------------------+\n|one    |LT | GT     |ne       |UN | LT | GT|Not equal                |\n+-------+------------+---------+------------+-------------------------+\n|lt     |LT          |ult      |UN | LT     |Less than                |\n+-------+------------+---------+------------+-------------------------+\n|le     |LT | EQ     |ule      |UN | LT | EQ|Less than or equal       |\n+-------+------------+---------+------------+-------------------------+\n|gt     |GT          |ugt      |UN | GT     |Greater than             |\n+-------+------------+---------+------------+-------------------------+\n|ge     |GT | EQ     |uge      |UN | GT | EQ|Greater than or equal    |\n+-------+------------+---------+------------+-------------------------+\n\nThe standard C comparison operators, `<, <=, >, >=`, are all ordered,\nso they are false if either operand is NaN. The C equality operator,\n`==`, is ordered, and since inequality is defined as the logical\ninverse it is *unordered*. They map to the :type:`floatcc` condition\ncodes as follows:\n\n==== ====== ============\nC    `Cond` Subset\n==== ====== ============\n`==` eq     EQ\n`!=` ne     UN | LT | GT\n`<`  lt     LT\n`<=` le     LT | EQ\n`>`  gt     GT\n`>=` ge     GT | EQ\n==== ====== ============\n\nThis subset of condition codes also corresponds to the WebAssembly\nfloating point comparisons of the same name.\n\nWhen this instruction compares floating point vectors, it returns a\nboolean vector with the results of lane-wise comparisons."
  },
  {
    name: "ffcmp",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Floating point comparison returning flags.\n\nCompares two numbers like :inst:`fcmp`, but returns floating point CPU\nflags instead of testing a specific condition."
  },
  {
    name: "fadd",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Floating point addition."
  },
  {
    name: "fsub",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Floating point subtraction."
  },
  {
    name: "fmul",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Floating point multiplication."
  },
  {
    name: "fdiv",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Floating point division.\n\nUnlike the integer division instructions :clif:inst:`sdiv` and\n:clif:inst:`udiv`, this can't trap. Division by zero is infinity or\nNaN, depending on the dividend."
  },
  {
    name: "sqrt",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Floating point square root."
  },
  {
    name: "fma",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }, { name: "z", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }, { name: "z", descr: "" }],
    descr: "Floating point fused multiply-and-add.\n\nComputes :math:`a := xy+z` without any intermediate rounding of the\nproduct."
  },
  {
    name: "fneg",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Floating point negation.\n\nNote that this is a pure bitwise operation."
  },
  {
    name: "fabs",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Floating point absolute value.\n\nNote that this is a pure bitwise operation."
  },
  {
    name: "fcopysign",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Floating point copy sign.\n\nNote that this is a pure bitwise operation. The sign bit from ``y`` is\ncopied to the sign bit of ``x``."
  },
  {
    name: "fmin",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Floating point minimum, propagating NaNs.\n\nIf either operand is NaN, this returns a NaN."
  },
  {
    name: "fmax",
    ins: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    outs: [{ name: "x", descr: "" }, { name: "y", descr: "" }],
    descr: "Floating point maximum, propagating NaNs.\n\nIf either operand is NaN, this returns a NaN."
  },
  {
    name: "ceil",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Round floating point round to integral, towards positive infinity."
  },
  {
    name: "floor",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Round floating point round to integral, towards negative infinity."
  },
  {
    name: "trunc",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Round floating point round to integral, towards zero."
  },
  {
    name: "nearest",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Round floating point round to integral, towards nearest with ties to\neven."
  },
  {
    name: "trueif",
    ins: [{ name: "Cond", descr: "" }, { name: "f", descr: "" }],
    outs: [{ name: "Cond", descr: "" }, { name: "f", descr: "" }],
    descr: "Test integer CPU flags for a specific condition.\n\nCheck the CPU flags in ``f`` against the ``Cond`` condition code and\nreturn true when the condition code is satisfied."
  },
  {
    name: "trueff",
    ins: [{ name: "Cond", descr: "" }, { name: "f", descr: "" }],
    outs: [{ name: "Cond", descr: "" }, { name: "f", descr: "" }],
    descr: "Test floating point CPU flags for a specific condition.\n\nCheck the CPU flags in ``f`` against the ``Cond`` condition code and\nreturn true when the condition code is satisfied."
  },
  {
    name: "bitcast",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Reinterpret the bits in `x` as a different type.\n\nThe input and output types must be storable to memory and of the same\nsize. A bitcast is equivalent to storing one type and loading the other\ntype from the same address."
  },
  {
    name: "breduce",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Convert `x` to a smaller boolean type in the platform-defined way.\n\nThe result type must have the same number of vector lanes as the input,\nand each lane must not have more bits that the input lanes. If the\ninput and output types are the same, this is a no-op."
  },
  {
    name: "bextend",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Convert `x` to a larger boolean type in the platform-defined way.\n\nThe result type must have the same number of vector lanes as the input,\nand each lane must not have fewer bits that the input lanes. If the\ninput and output types are the same, this is a no-op."
  },
  {
    name: "bint",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Convert `x` to an integer.\n\nTrue maps to 1 and false maps to 0. The result type must have the same\nnumber of vector lanes as the input."
  },
  {
    name: "bmask",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Convert `x` to an integer mask.\n\nTrue maps to all 1s and false maps to all 0s. The result type must have\nthe same number of vector lanes as the input."
  },
  {
    name: "ireduce",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Convert `x` to a smaller integer type by dropping high bits.\n\nEach lane in `x` is converted to a smaller integer type by discarding\nthe most significant bits. This is the same as reducing modulo\n:math:`2^n`.\n\nThe result type must have the same number of vector lanes as the input,\nand each lane must not have more bits that the input lanes. If the\ninput and output types are the same, this is a no-op."
  },
  {
    name: "uextend",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Convert `x` to a larger integer type by zero-extending.\n\nEach lane in `x` is converted to a larger integer type by adding\nzeroes. The result has the same numerical value as `x` when both are\ninterpreted as unsigned integers.\n\nThe result type must have the same number of vector lanes as the input,\nand each lane must not have fewer bits that the input lanes. If the\ninput and output types are the same, this is a no-op."
  },
  {
    name: "sextend",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Convert `x` to a larger integer type by sign-extending.\n\nEach lane in `x` is converted to a larger integer type by replicating\nthe sign bit. The result has the same numerical value as `x` when both\nare interpreted as signed integers.\n\nThe result type must have the same number of vector lanes as the input,\nand each lane must not have fewer bits that the input lanes. If the\ninput and output types are the same, this is a no-op."
  },
  {
    name: "fpromote",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Convert `x` to a larger floating point format.\n\nEach lane in `x` is converted to the destination floating point format.\nThis is an exact operation.\n\nCranelift currently only supports two floating point formats\n- :type:`f32` and :type:`f64`. This may change in the future.\n\nThe result type must have the same number of vector lanes as the input,\nand the result lanes must not have fewer bits than the input lanes. If\nthe input and output types are the same, this is a no-op."
  },
  {
    name: "fdemote",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Convert `x` to a smaller floating point format.\n\nEach lane in `x` is converted to the destination floating point format\nby rounding to nearest, ties to even.\n\nCranelift currently only supports two floating point formats\n- :type:`f32` and :type:`f64`. This may change in the future.\n\nThe result type must have the same number of vector lanes as the input,\nand the result lanes must not have more bits than the input lanes. If\nthe input and output types are the same, this is a no-op."
  },
  {
    name: "fcvt_to_uint",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Convert floating point to unsigned integer.\n\nEach lane in `x` is converted to an unsigned integer by rounding\ntowards zero. If `x` is NaN or if the unsigned integral value cannot be\nrepresented in the result type, this instruction traps.\n\nThe result type must have the same number of vector lanes as the input."
  },
  {
    name: "fcvt_to_uint_sat",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Convert floating point to unsigned integer as fcvt_to_uint does, but\nsaturates the input instead of trapping. NaN and negative values are\nconverted to 0."
  },
  {
    name: "fcvt_to_sint",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Convert floating point to signed integer.\n\nEach lane in `x` is converted to a signed integer by rounding towards\nzero. If `x` is NaN or if the signed integral value cannot be\nrepresented in the result type, this instruction traps.\n\nThe result type must have the same number of vector lanes as the input."
  },
  {
    name: "fcvt_to_sint_sat",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Convert floating point to signed integer as fcvt_to_sint does, but\nsaturates the input instead of trapping. NaN values are converted to 0."
  },
  {
    name: "fcvt_from_uint",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Convert unsigned integer to floating point.\n\nEach lane in `x` is interpreted as an unsigned integer and converted to\nfloating point using round to nearest, ties to even.\n\nThe result type must have the same number of vector lanes as the input."
  },
  {
    name: "fcvt_from_sint",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Convert signed integer to floating point.\n\nEach lane in `x` is interpreted as a signed integer and converted to\nfloating point using round to nearest, ties to even.\n\nThe result type must have the same number of vector lanes as the input."
  },
  {
    name: "isplit",
    ins: [{ name: "x", descr: "" }],
    outs: [{ name: "x", descr: "" }],
    descr: "Split an integer into low and high parts.\n\nVectors of integers are split lane-wise, so the results have the same\nnumber of lanes as the input, but the lanes are half the size.\n\nReturns the low half of `x` and the high half of `x` as two independent\nvalues."
  },
  {
    name: "iconcat",
    ins: [{ name: "lo", descr: "" }, { name: "hi", descr: "" }],
    outs: [{ name: "lo", descr: "" }, { name: "hi", descr: "" }],
    descr: "Concatenate low and high bits to form a larger integer type.\n\nVectors of integers are concatenated lane-wise such that the result has\nthe same number of lanes as the inputs, but the lanes are twice the\nsize."
  },
];

export const types = [
  {
    name: "iflags",
    descr: "CPU flags representing the result of an integer comparison. These flags\ncan be tested with an :type:`intcc` condition code."
  },
  {
    name: "fflags",
    descr: "CPU flags representing the result of a floating point comparison. These\nflags can be tested with a :type:`floatcc` condition code."
  },
  {
    name: "b1",
    descr: "A boolean type with 1 bits."
  },
  {
    name: "b8",
    descr: "A boolean type with 8 bits."
  },
  {
    name: "b16",
    descr: "A boolean type with 16 bits."
  },
  {
    name: "b32",
    descr: "A boolean type with 32 bits."
  },
  {
    name: "b64",
    descr: "A boolean type with 64 bits."
  },
  {
    name: "i8",
    descr: "An integer type with 8 bits.\nWARNING: arithmetic on 8bit integers is incomplete"
  },
  {
    name: "i16",
    descr: "An integer type with 16 bits.\nWARNING: arithmetic on 16bit integers is incomplete"
  },
  {
    name: "i32",
    descr: "An integer type with 32 bits."
  },
  {
    name: "i64",
    descr: "An integer type with 64 bits."
  },
  {
    name: "f32",
    descr: "A 32-bit floating point type represented in the IEEE 754-2008\n*binary32* interchange format. This corresponds to the :c:type:`float`\ntype in most C implementations."
  },
  {
    name: "f64",
    descr: "A 64-bit floating point type represented in the IEEE 754-2008\n*binary64* interchange format. This corresponds to the :c:type:`double`\ntype in most C implementations."
  },
];
