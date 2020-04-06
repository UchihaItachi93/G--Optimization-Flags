#Flag : -falign-functions

From the g++ man page 

       -falign-functions
       -falign-functions=n
           Align the start of functions to the next power-of-two greater than n, skipping up to n bytes.  For instance, -falign-functions=32 aligns functions to the
           next 32-byte boundary, but -falign-functions=24 aligns to the next 32-byte boundary only if this can be done by skipping 23 bytes or less.
           -fno-align-functions and -falign-functions=1 are equivalent and mean that functions are not aligned.

           Some assemblers only support this flag when n is a power of two; in that case, it is rounded up.

           If n is not specified or is zero, use a machine-dependent default.

           Enabled at levels -O2, -O3.

