import argparse, os.path, sys, io

# Parse arguments
parser = argparse.ArgumentParser()
parser.add_argument('--cranelift', help='Path to the Cranelift repository.')
parser.add_argument('--output', help='Output file.', default='src/cranelift.ts')

args = parser.parse_args()

# Import codegen modules
meta_path = os.path.join(args.cranelift, 'lib', 'codegen', 'meta-python')

sys.path.append(meta_path)

# Write output
from base import instructions
from cdsl.types import ValueType
from isa import all_isas

def docstr(s) -> str:
    if not isinstance(s, str):
        s = str(s.__doc__)
    
    r = '\\n'.join(line.strip().replace('"', '\\"') for line in s.splitlines())
    
    while r.startswith('\\n'): r = r[2:].strip()
    while r.endswith('\\n'): r = r[:-2].strip()

    return r

with open(args.output, 'w') as file:

    # Instructions
    file.write('export const instructions = [\n')

    groups = list(set(g for isa in all_isas() for g in isa.instruction_groups))
    instrs = [ i for group in groups for i in group.instructions ]
    
    for inst in instrs:
        ins = ', '.join([ f'{{ name: "{p.name}", descr: "{docstr(p)}" }}' for p in inst.ins ])
        outs = ', '.join([ f'{{ name: "{p.name}", descr: "{docstr(p)}" }}' for p in inst.ins ])
        
        file.write(f'  {{\n    name: "{inst.name}",\n    ins: [{ins}],\n    outs: [{outs}],\n    descr: "{docstr(inst)}"\n  }},\n')

    file.write('];\n\n')

    # Types
    file.write('export const types = [\n')

    for typ in ValueType.all_special_types + ValueType.all_lane_types:
        file.write(f'  {{\n    name: "{typ.name}",\n    descr: "{docstr(typ)}"\n  }},\n')
    
    file.write('];\n')
