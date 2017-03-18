/*
   PC Emulator

   Copyright (c) 2011 Fabrice Bellard

   Redistribution or commercial use is prohibited without the author's
   permission.
*/
"use strict";
CPU_X86.prototype.write_string = function(aa, ba) {
    var i;
    for (i = 0; i < ba.length; i++) {
        this.st8_phys(aa++, ba.charCodeAt(i) & 255);
    }
    this.st8_phys(aa, 0);
}
;
function ca(da, n) {
    var i, s;
    var h = "0123456789ABCDEF";
    s = "";
    for (i = n - 1; i >= 0; i--) {
        s = s + h[(da >>> (i * 4)) & 15];
    }
    return s;
}
function ea(n) {
    return ca(n, 8);
}
function fa(n) {
    return ca(n, 2);
}
function ga(n) {
    return ca(n, 4);
}
CPU_X86.prototype.dump_short = function() {
    console.log(" EIP=" + ea(this.eip) + " EAX=" + ea(this.get_reg(0)) + " ECX=" + ea(this.get_reg(1)) + " EDX=" + ea(this.get_reg(2)) + " EBX=" + ea(this.get_reg(3)));
    console.log("EFL=" + ea(this.eflags) + " ESP=" + ea(this.get_reg(4)) + " EBP=" + ea(this.get_reg(5)) + " ESI=" + ea(this.get_reg(6)) + " EDI=" + ea(this.get_reg(7)));
}
;
CPU_X86.prototype.dump = function() {
    var i, ha, ba;
    var ia = [" ES", " CS", " SS", " DS", " FS", " GS", "LDT", " TR"];
    this.dump_short();
    console.log("TSC=" + ea(this.cycle_count) + " OP=" + fa(this.cc_op) + " SRC=" + ea(this.cc_src) + " DST=" + ea(this.cc_dst) + " OP2=" + fa(this.cc_op2) + " DST2=" + ea(this.cc_dst2));
    console.log("CPL=" + this.cpl + " CR0=" + ea(this.cr0) + " CR2=" + ea(this.cr2) + " CR3=" + ea(this.cr3) + " CR4=" + ea(this.cr4));
    ba = "";
    for (i = 0; i < 8; i++) {
        if (i == 6)
            ha = this.ldt;
        else if (i == 7)
            ha = this.tr;
        else
            ha = this.segs[i];
        ba += ia[i] + "=" + ga(ha.selector) + " " + ea(ha.base) + " " + ea(ha.limit) + " " + ga((ha.flags >> 8) & 61695);
        if (i & 1) {
            console.log(ba);
            ba = "";
        } else {
            ba += " ";
        }
    }
    ha = this.gdt;
    ba = "GDT=     " + ea(ha.base) + " " + ea(ha.limit) + "      ";
    ha = this.idt;
    ba += "IDT=     " + ea(ha.base) + " " + ea(ha.limit);
    console.log(ba);
}
;
function CPU_X86_EXEC(ja, ka, la) {
    "use asm";
    var ma = 0
      , na = 0
      , oa = 0
      , pa = 0
      , qa = 0;
    var ra = 0
      , sa = 0
      , ta = 0;
    var ua = 0
      , va = 0
      , wa = 0
      , xa = 0;
    var ya = 0;
    var za = 0
      , Aa = 0;
    var Ba = 0;
    var Ca = -1;
    var Da = 0;
    var Ea = 0
      , Fa = 0
      , Ga = 0
      , Ha = 0;
    var Ia = 0
      , Ja = 0
      , Ka = 0
      , La = 0
      , Ma = 0;
    var Na = 0
      , Oa = 0
      , Pa = 0
      , Qa = 0
      , Ra = 0
      , Sa = 0;
    var Ta = 0;
    var Ua = 0
      , Va = 0;
    var Wa = new ja.Uint8Array(la);
    var Xa = new ja.Uint16Array(la);
    var Ya = new ja.Int32Array(la);
    var Za = ka.ld8_port;
    var ab = ka.ld16_port;
    var bb = ka.ld32_port;
    var cb = ka.st8_port;
    var db = ka.st16_port;
    var eb = ka.st32_port;
    var fb = ka.cpu_abort;
    var gb = ka.get_hard_intno;
    var hb = ka.raise_exception_err2;
    var ib = ja.Math.imul;
    var jb = ka.cpu_log;
    function ld8_phys(aa) {
        aa = aa | 0;
        return Wa[(aa + 16789504) >> 0] | 0;
    }
    function st8_phys(aa, da) {
        aa = aa | 0;
        da = da | 0;
        Wa[(aa + 16789504) >> 0] = da;
    }
    function kb(aa) {
        aa = aa | 0;
        return Ya[(aa + 16789504) >> 2] | 0;
    }
    function lb(aa, da) {
        aa = aa | 0;
        da = da | 0;
        Ya[(aa + 16789504) >> 2] = da;
    }
    function mb(aa, nb, ob, pb) {
        aa = aa | 0;
        nb = nb | 0;
        ob = ob | 0;
        pb = pb | 0;
        var i = 0
          , da = 0
          , j = 0
          , k = 0;
        nb = ((nb & -4096) + 16789504) | 0;
        aa = aa & -4096;
        da = aa ^ nb;
        i = aa >>> 12;
        k = i << 2;
        if ((Ya[(4096 + k) >> 2] | 0) == -1) {
            if ((Ta | 0) >= 2048) {
                qb((i - 1) & 1048575);
            }
            Ya[(16781312 + (Ta << 2)) >> 2] = i;
            Ta = (Ta + 1) | 0;
        }
        Ya[(4096 + k) >> 2] = da;
        if (ob) {
            Ya[(4198400 + k) >> 2] = da;
        } else {
            Ya[(4198400 + k) >> 2] = -1;
        }
        if (pb) {
            Ya[(8392704 + k) >> 2] = da;
            if (ob) {
                Ya[(12587008 + k) >> 2] = da;
            } else {
                Ya[(12587008 + k) >> 2] = -1;
            }
        } else {
            Ya[(8392704 + k) >> 2] = -1;
            Ya[(12587008 + k) >> 2] = -1;
        }
    }
    function rb(aa) {
        aa = aa | 0;
        var i = 0;
        i = (aa >>> 12) << 2;
        Ya[(4096 + i) >> 2] = -1;
        Ya[(4198400 + i) >> 2] = -1;
        Ya[(8392704 + i) >> 2] = -1;
        Ya[(12587008 + i) >> 2] = -1;
        Sa = (Oa + 8192) & ~4095;
    }
    function sb() {
        var i = 0
          , j = 0
          , n = 0;
        n = Ta;
        for (j = 0; (j | 0) < (n | 0); j = (j + 1) | 0) {
            i = Ya[(16781312 + (j << 2)) >> 2] << 2;
            Ya[(4096 + i) >> 2] = -1;
            Ya[(4198400 + i) >> 2] = -1;
            Ya[(8392704 + i) >> 2] = -1;
            Ya[(12587008 + i) >> 2] = -1;
        }
        Ta = 0;
        Sa = (Oa + 8192) & ~4095;
    }
    function qb(tb) {
        tb = tb | 0;
        var i = 0
          , j = 0
          , n = 0
          , ub = 0;
        tb = tb << 2;
        n = Ta | 0;
        ub = 0;
        for (j = 0; (j | 0) < (n | 0); j = (j + 1) | 0) {
            i = Ya[(16781312 + (j << 2)) >> 2] << 2;
            if ((i | 0) == (tb | 0)) {
                Ya[(16781312 + (ub << 2)) >> 2] = i;
                ub = (ub + 1) | 0;
            } else {
                Ya[(4096 + i) >> 2] = -1;
                Ya[(4198400 + i) >> 2] = -1;
                Ya[(8392704 + i) >> 2] = -1;
                Ya[(12587008 + i) >> 2] = -1;
            }
        }
        Ta = ub;
        Sa = (Oa + 8192) & ~4095;
    }
    function vb(aa) {
        aa = aa | 0;
        var wb = 0;
        xb(aa, 0, (sa | 0) == 3);
        wb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] ^ aa;
        return Wa[wb] | 0;
    }
    function yb(aa) {
        aa = aa | 0;
        var zb = 0
          , da = 0;
        zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
        if ((zb | 0) == -1)
            da = vb(aa) | 0;
        else
            da = Wa[aa ^ zb] | 0;
        return da | 0;
    }
    function Ab(aa) {
        aa = aa | 0;
        var da = 0;
        da = yb(aa) | 0;
        aa = (aa + 1) | 0;
        da = da | ((yb(aa) | 0) << 8);
        return da | 0;
    }
    function Bb(aa) {
        aa = aa | 0;
        var zb = 0
          , da = 0;
        zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
        if ((zb | aa) & 1)
            da = Ab(aa) | 0;
        else
            da = Xa[(aa ^ zb) >> 1] | 0;
        return da | 0;
    }
    function Cb(aa) {
        aa = aa | 0;
        var da = 0;
        da = yb(aa) | 0;
        aa = (aa + 1) | 0;
        da = da | ((yb(aa) | 0) << 8);
        aa = (aa + 1) | 0;
        da = da | ((yb(aa) | 0) << 16);
        aa = (aa + 1) | 0;
        da = da | ((yb(aa) | 0) << 24);
        return da | 0;
    }
    function Db(aa) {
        aa = aa | 0;
        var zb = 0;
        var da = 0;
        zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
        if ((zb | aa) & 3)
            da = Cb(aa) | 0;
        else
            da = Ya[(aa ^ zb) >> 2] | 0;
        return da | 0;
    }
    function Eb(aa) {
        aa = aa | 0;
        var wb = 0;
        xb(aa, 1, (sa | 0) == 3);
        wb = Ya[(Va + ((aa >>> 12) << 2)) >> 2] ^ aa;
        return Wa[wb] | 0;
    }
    function Fb(aa) {
        aa = aa | 0;
        var wb = 0
          , da = 0;
        wb = Ya[(Va + ((aa >>> 12) << 2)) >> 2] | 0;
        if ((wb | 0) == -1)
            da = Eb(aa) | 0;
        else
            da = Wa[aa ^ wb] | 0;
        return da | 0;
    }
    function Gb(aa) {
        aa = aa | 0;
        var da = 0;
        da = Fb(aa) | 0;
        aa = (aa + 1) | 0;
        da = da | ((Fb(aa) | 0) << 8);
        return da | 0;
    }
    function Hb(aa) {
        aa = aa | 0;
        var wb = 0
          , da = 0;
        wb = Ya[(Va + ((aa >>> 12) << 2)) >> 2] | 0;
        if ((wb | aa) & 1)
            da = Gb(aa) | 0;
        else
            da = Xa[(aa ^ wb) >> 1] | 0;
        return da | 0;
    }
    function Ib(aa) {
        aa = aa | 0;
        var da = 0;
        da = (Fb(aa) | 0);
        aa = (aa + 1) | 0;
        da = da | ((Fb(aa) | 0) << 8);
        aa = (aa + 1) | 0;
        da = da | ((Fb(aa) | 0) << 16);
        aa = (aa + 1) | 0;
        da = da | ((Fb(aa) | 0) << 24);
        return da | 0;
    }
    function Jb(aa) {
        aa = aa | 0;
        var wb = 0
          , da = 0;
        wb = Ya[(Va + ((aa >>> 12) << 2)) >> 2] | 0;
        if ((wb | aa) & 3)
            da = Ib(aa) | 0;
        else
            da = Ya[(aa ^ wb) >> 2] | 0;
        return da | 0;
    }
    function Kb(aa, da) {
        aa = aa | 0;
        da = da | 0;
        var wb = 0;
        xb(aa, 1, (sa | 0) == 3);
        wb = Ya[(Va + ((aa >>> 12) << 2)) >> 2] ^ aa;
        Wa[wb] = da;
    }
    function Lb(aa, da) {
        aa = aa | 0;
        da = da | 0;
        var zb = 0;
        {
            zb = Ya[(Va + ((aa >>> 12) << 2)) >> 2] | 0;
            if ((zb | 0) == -1) {
                Kb(aa, da);
            } else {
                Wa[aa ^ zb] = da;
            }
        }
        ;
    }
    function Mb(aa, da) {
        aa = aa | 0;
        da = da | 0;
        Lb(aa, da);
        aa = (aa + 1) | 0;
        Lb(aa, da >> 8);
    }
    function Nb(aa, da) {
        aa = aa | 0;
        da = da | 0;
        var zb = 0;
        {
            zb = Ya[(Va + ((aa >>> 12) << 2)) >> 2] | 0;
            if ((zb | aa) & 1) {
                Mb(aa, da);
            } else {
                Xa[(aa ^ zb) >> 1] = da;
            }
        }
        ;
    }
    function Ob(aa, da) {
        aa = aa | 0;
        da = da | 0;
        Lb(aa, da);
        aa = (aa + 1) | 0;
        Lb(aa, da >> 8);
        aa = (aa + 1) | 0;
        Lb(aa, da >> 16);
        aa = (aa + 1) | 0;
        Lb(aa, da >> 24);
    }
    function Pb(aa, da) {
        aa = aa | 0;
        da = da | 0;
        var zb = 0;
        {
            zb = Ya[(Va + ((aa >>> 12) << 2)) >> 2] | 0;
            if ((zb | aa) & 3) {
                Ob(aa, da);
            } else {
                Ya[(aa ^ zb) >> 2] = da;
            }
        }
        ;
    }
    function Qb(aa) {
        aa = aa | 0;
        var wb = 0;
        xb(aa, 0, 0);
        wb = Ya[(4096 + ((aa >>> 12) << 2)) >> 2] ^ aa;
        return Wa[wb] | 0;
    }
    function Rb(aa) {
        aa = aa | 0;
        var wb = 0
          , da = 0;
        wb = Ya[(4096 + ((aa >>> 12) << 2)) >> 2] | 0;
        if ((wb | 0) == -1)
            da = Qb(aa) | 0;
        else
            da = Wa[aa ^ wb] | 0;
        return da | 0;
    }
    function Sb(aa) {
        aa = aa | 0;
        var da = 0;
        da = Rb(aa) | 0;
        aa = (aa + 1) | 0;
        da = da | ((Rb(aa) | 0) << 8);
        return da | 0;
    }
    function Tb(aa) {
        aa = aa | 0;
        var wb = 0
          , da = 0;
        wb = Ya[(4096 + ((aa >>> 12) << 2)) >> 2] | 0;
        if ((wb | aa) & 1)
            da = Sb(aa) | 0;
        else
            da = Xa[(aa ^ wb) >> 1] | 0;
        return da | 0;
    }
    function Ub(aa) {
        aa = aa | 0;
        var da = 0;
        da = Rb(aa) | 0;
        aa = (aa + 1) | 0;
        da = da | ((Rb(aa) | 0) << 8);
        aa = (aa + 1) | 0;
        da = da | ((Rb(aa) | 0) << 16);
        aa = (aa + 1) | 0;
        da = da | ((Rb(aa) | 0) << 24);
        return da | 0;
    }
    function Vb(aa) {
        aa = aa | 0;
        var wb = 0
          , da = 0;
        wb = Ya[(4096 + ((aa >>> 12) << 2)) >> 2] | 0;
        if ((wb | aa) & 3)
            da = Ub(aa) | 0;
        else
            da = Ya[(aa ^ wb) >> 2] | 0;
        return da | 0;
    }
    function Wb(aa, da) {
        aa = aa | 0;
        da = da | 0;
        var wb = 0;
        xb(aa, 1, 0);
        wb = Ya[(4198400 + ((aa >>> 12) << 2)) >> 2] ^ aa;
        Wa[wb] = da;
    }
    function Xb(aa, da) {
        aa = aa | 0;
        da = da | 0;
        var wb = 0;
        wb = Ya[(4198400 + ((aa >>> 12) << 2)) >> 2] | 0;
        if ((wb | 0) == -1) {
            Wb(aa, da);
        } else {
            Wa[aa ^ wb] = da;
        }
    }
    function Yb(aa, da) {
        aa = aa | 0;
        da = da | 0;
        Xb(aa, da);
        aa = (aa + 1) | 0;
        Xb(aa, da >> 8);
    }
    function Zb(aa, da) {
        aa = aa | 0;
        da = da | 0;
        var wb = 0;
        wb = Ya[(4198400 + ((aa >>> 12) << 2)) >> 2] | 0;
        if ((wb | aa) & 1) {
            Yb(aa, da);
        } else {
            Xa[(aa ^ wb) >> 1] = da;
        }
    }
    function ac(aa, da) {
        aa = aa | 0;
        da = da | 0;
        Xb(aa, da);
        aa = (aa + 1) | 0;
        Xb(aa, da >> 8);
        aa = (aa + 1) | 0;
        Xb(aa, da >> 16);
        aa = (aa + 1) | 0;
        Xb(aa, da >> 24);
    }
    function bc(aa, da) {
        aa = aa | 0;
        da = da | 0;
        var wb = 0;
        wb = Ya[(4198400 + ((aa >>> 12) << 2)) >> 2] | 0;
        if ((wb | aa) & 3) {
            ac(aa, da);
        } else {
            Ya[(aa ^ wb) >> 2] = da;
        }
    }
    function cc() {
        var da = 0
          , dc = 0;
        da = Wa[Oa] | 0;
        Oa = (Oa + 1) | 0;
        dc = Wa[Oa] | 0;
        Oa = (Oa + 1) | 0;
        return (da | (dc << 8)) | 0;
    }
    function ec(fc, da) {
        fc = fc | 0;
        da = da | 0;
        Wa[(((fc & 3) << 2) + (fc >> 2)) >> 0] = da;
    }
    function gc(hc) {
        hc = hc | 0;
        var ic = 0
          , aa = 0
          , jc = 0
          , kc = 0
          , lc = 0
          , mc = 0;
        if (La & (Ea & (15 | 128)) == 0) {
            switch ((hc & 7) | ((hc >> 3) & 24)) {
            case 4:
                jc = Wa[Oa] | 0;
                Oa = (Oa + 1) | 0;
                ic = jc & 7;
                if ((ic | 0) == 5) {
                    {
                        aa = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                        Oa = (Oa + 4) | 0;
                    }
                    ;
                } else {
                    aa = (Ya[((ic) << 2) >> 2] | 0);
                }
                kc = (jc >> 3) & 7;
                if ((kc | 0) != 4) {
                    aa = (aa + ((Ya[((kc) << 2) >> 2] | 0) << (jc >> 6))) | 0;
                }
                break;
            case 12:
                jc = Wa[Oa] | 0;
                Oa = (Oa + 1) | 0;
                aa = ((Wa[Oa] << 24) >> 24);
                Oa = (Oa + 1) | 0;
                ic = jc & 7;
                aa = (aa + (Ya[((ic) << 2) >> 2] | 0)) | 0;
                kc = (jc >> 3) & 7;
                if ((kc | 0) != 4) {
                    aa = (aa + ((Ya[((kc) << 2) >> 2] | 0) << (jc >> 6))) | 0;
                }
                break;
            case 20:
                jc = Wa[Oa] | 0;
                Oa = (Oa + 1) | 0;
                {
                    aa = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                    Oa = (Oa + 4) | 0;
                }
                ;ic = jc & 7;
                aa = (aa + (Ya[((ic) << 2) >> 2] | 0)) | 0;
                kc = (jc >> 3) & 7;
                if ((kc | 0) != 4) {
                    aa = (aa + ((Ya[((kc) << 2) >> 2] | 0) << (jc >> 6))) | 0;
                }
                break;
            case 5:
                {
                    aa = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                    Oa = (Oa + 4) | 0;
                }
                ;break;
            case 0:
            case 1:
            case 2:
            case 3:
            case 6:
            case 7:
                ic = hc & 7;
                aa = (Ya[((ic) << 2) >> 2] | 0);
                break;
            case 8:
            case 9:
            case 10:
            case 11:
            case 13:
            case 14:
            case 15:
                aa = ((Wa[Oa] << 24) >> 24);
                Oa = (Oa + 1) | 0;
                ic = hc & 7;
                aa = (aa + (Ya[((ic) << 2) >> 2] | 0)) | 0;
                break;
            case 16:
            case 17:
            case 18:
            case 19:
            case 21:
            case 22:
            case 23:
            default:
                {
                    aa = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                    Oa = (Oa + 4) | 0;
                }
                ;ic = hc & 7;
                aa = (aa + (Ya[((ic) << 2) >> 2] | 0)) | 0;
                break;
            }
        } else if (Ea & 128) {
            if ((hc & 199) == 6) {
                aa = cc() | 0;
                mc = 3;
            } else {
                switch (hc >> 6) {
                case 0:
                    aa = 0;
                    break;
                case 1:
                    aa = ((Wa[Oa] << 24) >> 24);
                    Oa = (Oa + 1) | 0;
                    break;
                default:
                    aa = cc() | 0;
                    break;
                }
                switch (hc & 7) {
                case 0:
                    aa = (aa + (Ya[((3) << 2) >> 2] | 0) + (Ya[((6) << 2) >> 2] | 0)) & 65535;
                    mc = 3;
                    break;
                case 1:
                    aa = (aa + (Ya[((3) << 2) >> 2] | 0) + (Ya[((7) << 2) >> 2] | 0)) & 65535;
                    mc = 3;
                    break;
                case 2:
                    aa = (aa + (Ya[((5) << 2) >> 2] | 0) + (Ya[((6) << 2) >> 2] | 0)) & 65535;
                    mc = 2;
                    break;
                case 3:
                    aa = (aa + (Ya[((5) << 2) >> 2] | 0) + (Ya[((7) << 2) >> 2] | 0)) & 65535;
                    mc = 2;
                    break;
                case 4:
                    aa = (aa + (Ya[((6) << 2) >> 2] | 0)) & 65535;
                    mc = 3;
                    break;
                case 5:
                    aa = (aa + (Ya[((7) << 2) >> 2] | 0)) & 65535;
                    mc = 3;
                    break;
                case 6:
                    aa = (aa + (Ya[((5) << 2) >> 2] | 0)) & 65535;
                    mc = 2;
                    break;
                case 7:
                default:
                    aa = (aa + (Ya[((3) << 2) >> 2] | 0)) & 65535;
                    mc = 3;
                    break;
                }
            }
            lc = Ea & 15;
            if ((lc | 0) == 0) {
                lc = mc;
            } else {
                lc = (lc - 1) | 0;
            }
            aa = (aa + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
        } else {
            switch ((hc & 7) | ((hc >> 3) & 24)) {
            case 4:
                jc = Wa[Oa] | 0;
                Oa = (Oa + 1) | 0;
                ic = jc & 7;
                if ((ic | 0) == 5) {
                    {
                        aa = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                        Oa = (Oa + 4) | 0;
                    }
                    ;ic = 0;
                } else {
                    aa = (Ya[((ic) << 2) >> 2] | 0);
                }
                kc = (jc >> 3) & 7;
                if ((kc | 0) != 4) {
                    aa = (aa + ((Ya[((kc) << 2) >> 2] | 0) << (jc >> 6))) | 0;
                }
                break;
            case 12:
                jc = Wa[Oa] | 0;
                Oa = (Oa + 1) | 0;
                aa = ((Wa[Oa] << 24) >> 24);
                Oa = (Oa + 1) | 0;
                ic = jc & 7;
                aa = (aa + (Ya[((ic) << 2) >> 2] | 0)) | 0;
                kc = (jc >> 3) & 7;
                if ((kc | 0) != 4) {
                    aa = (aa + ((Ya[((kc) << 2) >> 2] | 0) << (jc >> 6))) | 0;
                }
                break;
            case 20:
                jc = Wa[Oa] | 0;
                Oa = (Oa + 1) | 0;
                {
                    aa = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                    Oa = (Oa + 4) | 0;
                }
                ;ic = jc & 7;
                aa = (aa + (Ya[((ic) << 2) >> 2] | 0)) | 0;
                kc = (jc >> 3) & 7;
                if ((kc | 0) != 4) {
                    aa = (aa + ((Ya[((kc) << 2) >> 2] | 0) << (jc >> 6))) | 0;
                }
                break;
            case 5:
                {
                    aa = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                    Oa = (Oa + 4) | 0;
                }
                ;ic = 0;
                break;
            case 0:
            case 1:
            case 2:
            case 3:
            case 6:
            case 7:
                ic = hc & 7;
                aa = (Ya[((ic) << 2) >> 2] | 0);
                break;
            case 8:
            case 9:
            case 10:
            case 11:
            case 13:
            case 14:
            case 15:
                aa = ((Wa[Oa] << 24) >> 24);
                Oa = (Oa + 1) | 0;
                ic = hc & 7;
                aa = (aa + (Ya[((ic) << 2) >> 2] | 0)) | 0;
                break;
            case 16:
            case 17:
            case 18:
            case 19:
            case 21:
            case 22:
            case 23:
            default:
                {
                    aa = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                    Oa = (Oa + 4) | 0;
                }
                ;ic = hc & 7;
                aa = (aa + (Ya[((ic) << 2) >> 2] | 0)) | 0;
                break;
            }
            lc = Ea & 15;
            if ((lc | 0) == 0) {
                if ((ic | 0) == 4 | (ic | 0) == 5)
                    lc = 2;
                else
                    lc = 3;
            } else {
                lc = (lc - 1) | 0;
            }
            aa = (aa + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
        }
        return aa | 0;
    }
    function nc() {
        var aa = 0
          , lc = 0;
        if (Ea & 128) {
            aa = cc() | 0;
        } else {
            {
                aa = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                Oa = (Oa + 4) | 0;
            }
            ;
        }
        lc = Ea & 15;
        if ((lc | 0) == 0)
            lc = 3;
        else
            lc = (lc - 1) | 0;
        aa = (aa + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
        return aa | 0;
    }
    function oc(pc, qc, rc) {
        pc = pc | 0;
        qc = qc | 0;
        rc = rc | 0;
        var sc = 0;
        switch (pc | 0) {
        case 0:
            ma = rc;
            qc = (qc + rc) | 0;
            na = qc;
            oa = 2;
            break;
        case 1:
            qc = qc | rc;
            na = qc;
            oa = 14;
            break;
        case 2:
            sc = tc() | 0;
            ma = rc;
            qc = (qc + rc + sc) | 0;
            na = qc;
            oa = sc ? 5 : 2;
            break;
        case 3:
            sc = tc() | 0;
            ma = rc;
            qc = (qc - rc - sc) | 0;
            na = qc;
            oa = sc ? 11 : 8;
            break;
        case 4:
            qc = qc & rc;
            na = qc;
            oa = 14;
            break;
        case 5:
            ma = rc;
            qc = (qc - rc) | 0;
            na = qc;
            oa = 8;
            break;
        case 6:
            qc = qc ^ rc;
            na = qc;
            oa = 14;
            break;
        case 7:
            ma = rc;
            na = (qc - rc) | 0;
            oa = 8;
            break;
        default:
            fb(1677);
        }
        return qc | 0;
    }
    function uc(pc, qc, rc) {
        pc = pc | 0;
        qc = qc | 0;
        rc = rc | 0;
        var sc = 0;
        switch (pc | 0) {
        case 0:
            ma = rc;
            qc = (((qc + rc) << 16) >> 16);
            na = qc;
            oa = 1;
            break;
        case 1:
            qc = (((qc | rc) << 16) >> 16);
            na = qc;
            oa = 13;
            break;
        case 2:
            sc = tc() | 0;
            ma = rc;
            qc = (((qc + rc + sc) << 16) >> 16);
            na = qc;
            oa = sc ? 4 : 1;
            break;
        case 3:
            sc = tc() | 0;
            ma = rc;
            qc = (((qc - rc - sc) << 16) >> 16);
            na = qc;
            oa = sc ? 10 : 7;
            break;
        case 4:
            qc = (((qc & rc) << 16) >> 16);
            na = qc;
            oa = 13;
            break;
        case 5:
            ma = rc;
            qc = (((qc - rc) << 16) >> 16);
            na = qc;
            oa = 7;
            break;
        case 6:
            qc = (((qc ^ rc) << 16) >> 16);
            na = qc;
            oa = 13;
            break;
        case 7:
            ma = rc;
            na = (((qc - rc) << 16) >> 16);
            oa = 7;
            break;
        default:
            fb(1764);
        }
        return qc | 0;
    }
    function vc(da) {
        da = da | 0;
        if ((oa | 0) < 25) {
            pa = oa;
            qa = na;
        }
        na = (((da + 1) << 16) >> 16);
        oa = 26;
        return na | 0;
    }
    function wc(da) {
        da = da | 0;
        if ((oa | 0) < 25) {
            pa = oa;
            qa = na;
        }
        na = (((da - 1) << 16) >> 16);
        oa = 29;
        return na | 0;
    }
    function xc(pc, qc, rc) {
        pc = pc | 0;
        qc = qc | 0;
        rc = rc | 0;
        var sc = 0;
        switch (pc | 0) {
        case 0:
            ma = rc;
            qc = (((qc + rc) << 24) >> 24);
            na = qc;
            oa = 0;
            break;
        case 1:
            qc = (((qc | rc) << 24) >> 24);
            na = qc;
            oa = 12;
            break;
        case 2:
            sc = tc() | 0;
            ma = rc;
            qc = (((qc + rc + sc) << 24) >> 24);
            na = qc;
            oa = sc ? 3 : 0;
            break;
        case 3:
            sc = tc() | 0;
            ma = rc;
            qc = (((qc - rc - sc) << 24) >> 24);
            na = qc;
            oa = sc ? 9 : 6;
            break;
        case 4:
            qc = (((qc & rc) << 24) >> 24);
            na = qc;
            oa = 12;
            break;
        case 5:
            ma = rc;
            qc = (((qc - rc) << 24) >> 24);
            na = qc;
            oa = 6;
            break;
        case 6:
            qc = (((qc ^ rc) << 24) >> 24);
            na = qc;
            oa = 12;
            break;
        case 7:
            ma = rc;
            na = (((qc - rc) << 24) >> 24);
            oa = 6;
            break;
        default:
            fb(1854);
        }
        return qc | 0;
    }
    function yc(da) {
        da = da | 0;
        if ((oa | 0) < 25) {
            pa = oa;
            qa = na;
        }
        na = (((da + 1) << 24) >> 24);
        oa = 25;
        return na | 0;
    }
    function zc(da) {
        da = da | 0;
        if ((oa | 0) < 25) {
            pa = oa;
            qa = na;
        }
        na = (((da - 1) << 24) >> 24);
        oa = 28;
        return na | 0;
    }
    function Ac(pc, qc, rc) {
        pc = pc | 0;
        qc = qc | 0;
        rc = rc | 0;
        var Bc = 0
          , sc = 0;
        switch (pc | 0) {
        case 0:
            if (rc & 31) {
                rc = rc & 7;
                qc = qc & 255;
                Bc = qc;
                qc = (qc << rc) | (qc >>> (8 - rc));
                ma = Cc() | 0;
                ma = ma | (qc & 1) | (((Bc ^ qc) << 4) & 2048);
                na = ((ma >> 6) & 1) ^ 1;
                oa = 24;
            }
            break;
        case 1:
            if (rc & 31) {
                rc = rc & 7;
                qc = qc & 255;
                Bc = qc;
                qc = (qc >>> rc) | (qc << (8 - rc));
                ma = Cc() | 0;
                ma = ma | ((qc >> 7) & 1) | (((Bc ^ qc) << 4) & 2048);
                na = ((ma >> 6) & 1) ^ 1;
                oa = 24;
            }
            break;
        case 2:
            rc = Wa[(3616 + (rc & 31)) >> 0] | 0;
            if (rc) {
                qc = qc & 255;
                Bc = qc;
                sc = tc() | 0;
                qc = (qc << rc) | (sc << (rc - 1));
                if ((rc | 0) > 1)
                    qc = qc | (Bc >>> (9 - rc));
                ma = Cc() | 0;
                ma = ma | (((Bc ^ qc) << 4) & 2048) | ((Bc >> (8 - rc)) & 1);
                na = ((ma >> 6) & 1) ^ 1;
                oa = 24;
            }
            break;
        case 3:
            rc = Wa[(3616 + (rc & 31)) >> 0] | 0;
            if (rc) {
                qc = qc & 255;
                Bc = qc;
                sc = tc() | 0;
                qc = (qc >>> rc) | (sc << (8 - rc));
                if ((rc | 0) > 1)
                    qc = qc | (Bc << (9 - rc));
                ma = Cc() | 0;
                ma = ma | (((Bc ^ qc) << 4) & 2048) | ((Bc >> (rc - 1)) & 1);
                na = ((ma >> 6) & 1) ^ 1;
                oa = 24;
            }
            break;
        case 4:
        case 6:
            rc = rc & 31;
            if (rc) {
                ma = qc << (rc - 1);
                na = qc = (((qc << rc) << 24) >> 24);
                oa = 15;
            }
            break;
        case 5:
            rc = rc & 31;
            if (rc) {
                qc = qc & 255;
                ma = qc >>> (rc - 1);
                na = qc = (((qc >>> rc) << 24) >> 24);
                oa = 18;
            }
            break;
        case 7:
            rc = rc & 31;
            if (rc) {
                qc = (qc << 24) >> 24;
                ma = qc >> (rc - 1);
                na = qc = (((qc >> rc) << 24) >> 24);
                oa = 18;
            }
            break;
        default:
            fb(1980);
        }
        return qc | 0;
    }
    function Dc(pc, qc, rc) {
        pc = pc | 0;
        qc = qc | 0;
        rc = rc | 0;
        var Bc = 0
          , sc = 0;
        switch (pc | 0) {
        case 0:
            if (rc & 31) {
                rc = rc & 15;
                qc = qc & 65535;
                Bc = qc;
                qc = (qc << rc) | (qc >>> (16 - rc));
                ma = Cc() | 0;
                ma = ma | (qc & 1) | (((Bc ^ qc) >> 4) & 2048);
                na = ((ma >> 6) & 1) ^ 1;
                oa = 24;
            }
            break;
        case 1:
            if (rc & 31) {
                rc = rc & 15;
                qc = qc & 65535;
                Bc = qc;
                qc = (qc >>> rc) | (qc << (16 - rc));
                ma = Cc() | 0;
                ma = ma | ((qc >> 15) & 1) | (((Bc ^ qc) >> 4) & 2048);
                na = ((ma >> 6) & 1) ^ 1;
                oa = 24;
            }
            break;
        case 2:
            rc = Wa[(3584 + (rc & 31)) >> 0] | 0;
            if (rc) {
                qc = qc & 65535;
                Bc = qc;
                sc = tc() | 0;
                qc = (qc << rc) | (sc << (rc - 1));
                if ((rc | 0) > 1)
                    qc = qc | (Bc >>> (17 - rc));
                ma = Cc() | 0;
                ma = ma | (((Bc ^ qc) >> 4) & 2048) | ((Bc >> (16 - rc)) & 1);
                na = ((ma >> 6) & 1) ^ 1;
                oa = 24;
            }
            break;
        case 3:
            rc = Wa[(3584 + (rc & 31)) >> 0] | 0;
            if (rc) {
                qc = qc & 65535;
                Bc = qc;
                sc = tc() | 0;
                qc = (qc >>> rc) | (sc << (16 - rc));
                if ((rc | 0) > 1)
                    qc = qc | (Bc << (17 - rc));
                ma = Cc() | 0;
                ma = ma | (((Bc ^ qc) >> 4) & 2048) | ((Bc >> (rc - 1)) & 1);
                na = ((ma >> 6) & 1) ^ 1;
                oa = 24;
            }
            break;
        case 4:
        case 6:
            rc = rc & 31;
            if (rc) {
                ma = qc << (rc - 1);
                na = qc = (((qc << rc) << 16) >> 16);
                oa = 16;
            }
            break;
        case 5:
            rc = rc & 31;
            if (rc) {
                qc = qc & 65535;
                ma = qc >>> (rc - 1);
                na = qc = (((qc >>> rc) << 16) >> 16);
                oa = 19;
            }
            break;
        case 7:
            rc = rc & 31;
            if (rc) {
                qc = (qc << 16) >> 16;
                ma = qc >> (rc - 1);
                na = qc = (((qc >> rc) << 16) >> 16);
                oa = 19;
            }
            break;
        default:
            fb(2076);
        }
        return qc | 0;
    }
    function Ec(pc, qc, rc) {
        pc = pc | 0;
        qc = qc | 0;
        rc = rc | 0;
        var Bc = 0
          , sc = 0;
        switch (pc | 0) {
        case 0:
            rc = rc & 31;
            if (rc) {
                Bc = qc;
                qc = (qc << rc) | (qc >>> (32 - rc));
                ma = Cc() | 0;
                ma = ma | (qc & 1) | (((Bc ^ qc) >> 20) & 2048);
                na = ((ma >> 6) & 1) ^ 1;
                oa = 24;
            }
            break;
        case 1:
            rc = rc & 31;
            if (rc) {
                Bc = qc;
                qc = (qc >>> rc) | (qc << (32 - rc));
                ma = Cc() | 0;
                ma = ma | ((qc >> 31) & 1) | (((Bc ^ qc) >> 20) & 2048);
                na = ((ma >> 6) & 1) ^ 1;
                oa = 24;
            }
            break;
        case 2:
            rc = rc & 31;
            if (rc) {
                Bc = qc;
                sc = tc() | 0;
                qc = (qc << rc) | (sc << (rc - 1));
                if ((rc | 0) > 1)
                    qc = qc | (Bc >>> (33 - rc));
                ma = Cc() | 0;
                ma = ma | (((Bc ^ qc) >> 20) & 2048) | ((Bc >> (32 - rc)) & 1);
                na = ((ma >> 6) & 1) ^ 1;
                oa = 24;
            }
            break;
        case 3:
            rc = rc & 31;
            if (rc) {
                Bc = qc;
                sc = tc() | 0;
                qc = (qc >>> rc) | (sc << (32 - rc));
                if ((rc | 0) > 1)
                    qc = qc | (Bc << (33 - rc));
                ma = Cc() | 0;
                ma = ma | (((Bc ^ qc) >> 20) & 2048) | ((Bc >> (rc - 1)) & 1);
                na = ((ma >> 6) & 1) ^ 1;
                oa = 24;
            }
            break;
        case 4:
        case 6:
            rc = rc & 31;
            if (rc) {
                ma = qc << (rc - 1);
                na = qc = qc << rc;
                oa = 17;
            }
            break;
        case 5:
            rc = rc & 31;
            if (rc) {
                ma = qc >>> (rc - 1);
                na = qc = qc >>> rc;
                oa = 20;
            }
            break;
        case 7:
            rc = rc & 31;
            if (rc) {
                ma = qc >> (rc - 1);
                na = qc = qc >> rc;
                oa = 20;
            }
            break;
        default:
            fb(2166);
        }
        return qc | 0;
    }
    function Fc(pc, qc, rc, Gc) {
        pc = pc | 0;
        qc = qc | 0;
        rc = rc | 0;
        Gc = Gc | 0;
        var Hc = 0;
        Gc = Gc & 31;
        if (Gc) {
            if ((pc | 0) == 0) {
                rc = rc & 65535;
                Hc = rc | (qc << 16);
                ma = Hc >> (32 - Gc);
                Hc = Hc << Gc;
                if ((Gc | 0) > 16)
                    Hc = Hc | (rc << (Gc - 16));
                qc = na = Hc >> 16;
                oa = 19;
            } else {
                Hc = (qc & 65535) | (rc << 16);
                ma = Hc >> (Gc - 1);
                Hc = Hc >> Gc;
                if ((Gc | 0) > 16)
                    Hc = Hc | (rc << (32 - Gc));
                qc = na = (((Hc) << 16) >> 16);
                oa = 19;
            }
        }
        return qc | 0;
    }
    function Ic(qc, rc, Gc) {
        qc = qc | 0;
        rc = rc | 0;
        Gc = Gc | 0;
        Gc = Gc & 31;
        if (Gc) {
            ma = qc << (Gc - 1);
            na = qc = (qc << Gc) | (rc >>> (32 - Gc));
            oa = 17;
        }
        return qc | 0;
    }
    function Jc(qc, rc, Gc) {
        qc = qc | 0;
        rc = rc | 0;
        Gc = Gc | 0;
        Gc = Gc & 31;
        if (Gc) {
            ma = qc >> (Gc - 1);
            na = qc = (qc >>> Gc) | (rc << (32 - Gc));
            oa = 20;
        }
        return qc | 0;
    }
    function Kc(qc, rc) {
        qc = qc | 0;
        rc = rc | 0;
        rc = rc & 15;
        ma = qc >> rc;
        oa = 19;
    }
    function Lc(qc, rc) {
        qc = qc | 0;
        rc = rc | 0;
        rc = rc & 31;
        ma = qc >> rc;
        oa = 20;
    }
    function Mc(pc, qc, rc) {
        pc = pc | 0;
        qc = qc | 0;
        rc = rc | 0;
        var Nc = 0;
        rc = rc & 15;
        ma = qc >> rc;
        Nc = 1 << rc;
        switch (pc | 0) {
        case 1:
            qc = qc | Nc;
            break;
        case 2:
            qc = qc & ~Nc;
            break;
        case 3:
        default:
            qc = qc ^ Nc;
            break;
        }
        oa = 19;
        return qc | 0;
    }
    function Oc(pc, qc, rc) {
        pc = pc | 0;
        qc = qc | 0;
        rc = rc | 0;
        var Nc = 0;
        rc = rc & 31;
        ma = qc >> rc;
        Nc = 1 << rc;
        switch (pc | 0) {
        case 1:
            qc = qc | Nc;
            break;
        case 2:
            qc = qc & ~Nc;
            break;
        case 3:
        default:
            qc = qc ^ Nc;
            break;
        }
        oa = 20;
        return qc | 0;
    }
    function Pc(qc, rc) {
        qc = qc | 0;
        rc = rc | 0;
        rc = rc & 65535;
        if (rc) {
            qc = 0;
            while ((rc & 1) == 0) {
                qc = (qc + 1) | 0;
                rc = rc >> 1;
            }
            na = 1;
        } else {
            na = 0;
        }
        oa = 14;
        return qc | 0;
    }
    function Qc(qc, rc) {
        qc = qc | 0;
        rc = rc | 0;
        if (rc) {
            qc = 0;
            while ((rc & 1) == 0) {
                qc = (qc + 1) | 0;
                rc = rc >> 1;
            }
            na = 1;
        } else {
            na = 0;
        }
        oa = 14;
        return qc | 0;
    }
    function Rc(qc, rc) {
        qc = qc | 0;
        rc = rc | 0;
        rc = rc & 65535;
        if (rc) {
            qc = 15;
            while ((rc & 32768) == 0) {
                qc = (qc - 1) | 0;
                rc = rc << 1;
            }
            na = 1;
        } else {
            na = 0;
        }
        oa = 14;
        return qc | 0;
    }
    function Sc(qc, rc) {
        qc = qc | 0;
        rc = rc | 0;
        if (rc) {
            qc = 31;
            while ((rc | 0) >= 0) {
                qc = (qc - 1) | 0;
                rc = rc << 1;
            }
            na = 1;
        } else {
            na = 0;
        }
        oa = 14;
        return qc | 0;
    }
    function Tc(b) {
        b = b | 0;
        var a = 0
          , q = 0
          , r = 0;
        a = (Ya[((0) << 2) >> 2] | 0) & 65535;
        b = b & 255;
        if ((a >> 8) >= (b | 0))
            Uc(0);
        q = ((a | 0) / (b | 0)) | 0;
        r = ((a | 0) % (b | 0)) | 0;
        Xa[((0) << 2) >> 1] = (q & 255) | (r << 8);
    }
    function Vc(b) {
        b = b | 0;
        var a = 0
          , q = 0
          , r = 0;
        a = ((Ya[((0) << 2) >> 2] | 0) << 16) >> 16;
        b = (b << 24) >> 24;
        if ((b | 0) == 0)
            Uc(0);
        q = ((a | 0) / (b | 0)) | 0;
        if (((q << 24) >> 24) != (q | 0))
            Uc(0);
        r = ((a | 0) % (b | 0)) | 0;
        Xa[((0) << 2) >> 1] = (q & 255) | (r << 8);
    }
    function Wc(b) {
        b = b | 0;
        var a = 0
          , q = 0
          , r = 0;
        a = ((Ya[((2) << 2) >> 2] | 0) << 16) | ((Ya[((0) << 2) >> 2] | 0) & 65535);
        b = b & 65535;
        if (((a >>> 16) | 0) >= (b | 0))
            Uc(0);
        q = ((a | 0) / (b | 0)) | 0;
        r = ((a | 0) % (b | 0)) | 0;
        Xa[((0) << 2) >> 1] = q;
        Xa[((2) << 2) >> 1] = r;
    }
    function Xc(b) {
        b = b | 0;
        var a = 0
          , q = 0
          , r = 0;
        a = ((Ya[((2) << 2) >> 2] | 0) << 16) | ((Ya[((0) << 2) >> 2] | 0) & 65535);
        b = (b << 16) >> 16;
        if ((b | 0) == 0)
            Uc(0);
        q = ((a | 0) / (b | 0)) | 0;
        if (((q << 16) >> 16) != (q | 0))
            Uc(0);
        r = ((a | 0) % (b | 0)) | 0;
        Xa[((0) << 2) >> 1] = q;
        Xa[((2) << 2) >> 1] = r;
    }
    function Yc(Zc, ad, b) {
        Zc = Zc | 0;
        ad = ad | 0;
        b = b | 0;
        var a = 0
          , i = 0
          , bd = 0;
        Zc = Zc >>> 0;
        ad = ad >>> 0;
        b = b >>> 0;
        if ((Zc >>> 0) >= (b >>> 0)) {
            Uc(0);
        }
        for (i = 0; (i | 0) < 32; i = (i + 1) | 0) {
            bd = Zc >>> 31;
            Zc = ((Zc << 1) | (ad >>> 31)) >>> 0;
            if (bd | ((Zc >>> 0) >= (b >>> 0))) {
                Zc = (Zc - b) | 0;
                ad = (ad << 1) | 1;
            } else {
                ad = ad << 1;
            }
        }
        Ga = Zc | 0;
        return ad | 0;
    }
    function cd(Zc, ad, b) {
        Zc = Zc | 0;
        ad = ad | 0;
        b = b | 0;
        var dd = 0
          , ed = 0
          , q = 0;
        if ((Zc | 0) < 0) {
            dd = 1;
            Zc = ~Zc;
            ad = (-ad) | 0;
            if ((ad | 0) == 0)
                Zc = (Zc + 1) | 0;
        } else {
            dd = 0;
        }
        if ((b | 0) < 0) {
            b = (-b) | 0;
            ed = 1;
        } else {
            ed = 0;
        }
        q = Yc(Zc, ad, b) | 0;
        ed = ed ^ dd;
        if (ed) {
            if ((q >>> 0) > 0x80000000)
                Uc(0);
            q = (-q) | 0;
        } else {
            if ((q >>> 0) >= 0x80000000)
                Uc(0);
        }
        if (dd) {
            Ga = (-Ga) | 0;
        }
        return q | 0;
    }
    function fd(a, b) {
        a = a | 0;
        b = b | 0;
        var Hc = 0;
        a = a & 255;
        b = b & 255;
        Hc = ib(a, b) | 0;
        ma = Hc >> 8;
        na = (((Hc) << 24) >> 24);
        oa = 21;
        return Hc | 0;
    }
    function gd(a, b) {
        a = a | 0;
        b = b | 0;
        var Hc = 0;
        a = (((a) << 24) >> 24);
        b = (((b) << 24) >> 24);
        Hc = ib(a, b) | 0;
        na = (((Hc) << 24) >> 24);
        ma = ((Hc | 0) != (na | 0)) | 0;
        oa = 21;
        return Hc | 0;
    }
    function hd(a, b) {
        a = a | 0;
        b = b | 0;
        var Hc = 0;
        a = a & 65535;
        b = b & 65535;
        Hc = ib(a, b) | 0;
        ma = Hc >>> 16;
        na = (((Hc) << 16) >> 16);
        oa = 22;
        return Hc | 0;
    }
    function id(a, b) {
        a = a | 0;
        b = b | 0;
        var Hc = 0;
        a = (a << 16) >> 16;
        b = (b << 16) >> 16;
        Hc = ib(a, b) | 0;
        na = (((Hc) << 16) >> 16);
        ma = ((Hc | 0) != (na | 0)) | 0;
        oa = 22;
        return Hc | 0;
    }
    function jd(a, b) {
        a = a | 0;
        b = b | 0;
        var ad = 0
          , Zc = 0
          , kd = 0
          , ld = 0
          , md = 0
          , nd = 0
          , od = 0;
        if (((a | b) >>> 0) <= 65535) {
            md = ib(a, b) | 0;
            Ga = 0;
        } else {
            ad = a & 65535;
            Zc = a >>> 16;
            kd = b & 65535;
            ld = b >>> 16;
            md = ib(ad, kd) | 0;
            nd = ((md >>> 16) + (ib(ad, ld) | 0)) | 0;
            od = (nd >>> 16);
            nd = ((nd & 65535) + (ib(Zc, kd) | 0)) | 0;
            md = (md & 65535) | ((nd & 65535) << 16);
            od = (od + (nd >>> 16)) | 0;
            od = (od + (ib(Zc, ld) | 0)) | 0;
            Ga = od;
        }
        return md | 0;
    }
    function pd(a, b) {
        a = a | 0;
        b = b | 0;
        na = jd(a, b) | 0;
        ma = Ga;
        oa = 23;
        return na | 0;
    }
    function qd(a, b) {
        a = a | 0;
        b = b | 0;
        var s = 0
          , r = 0;
        s = 0;
        if ((a | 0) < 0) {
            a = (-a) | 0;
            s = 1;
        }
        if ((b | 0) < 0) {
            b = (-b) | 0;
            s = s ^ 1;
        }
        r = jd(a, b) | 0;
        if (s) {
            Ga = ~Ga;
            r = (-r) | 0;
            if ((r | 0) == 0) {
                Ga = (Ga + 1) | 0;
            }
        }
        na = r;
        ma = (Ga - (r >> 31)) | 0;
        oa = 23;
        return r | 0;
    }
    function tc() {
        var qc = 0
          , Hc = 0
          , rd = 0
          , sd = 0;
        if ((oa | 0) >= 25) {
            rd = pa;
            sd = qa;
        } else {
            rd = oa;
            sd = na;
        }
        switch (rd | 0) {
        case 0:
            Hc = (sd & 255) < (ma & 255);
            break;
        case 1:
            Hc = (sd & 65535) < (ma & 65535);
            break;
        case 2:
            Hc = (sd >>> 0) < (ma >>> 0);
            break;
        case 3:
            Hc = (sd & 255) <= (ma & 255);
            break;
        case 4:
            Hc = (sd & 65535) <= (ma & 65535);
            break;
        case 5:
            Hc = (sd >>> 0) <= (ma >>> 0);
            break;
        case 6:
            Hc = ((sd + ma) & 255) < (ma & 255);
            break;
        case 7:
            Hc = ((sd + ma) & 65535) < (ma & 65535);
            break;
        case 8:
            Hc = ((sd + ma) >>> 0) < (ma >>> 0);
            break;
        case 9:
            qc = (sd + ma + 1) & 255;
            Hc = (qc | 0) <= (ma & 255);
            break;
        case 10:
            qc = (sd + ma + 1) & 65535;
            Hc = (qc | 0) <= (ma & 65535);
            break;
        case 11:
            qc = (sd + ma + 1) | 0;
            Hc = (qc >>> 0) <= (ma >>> 0);
            break;
        case 12:
        case 13:
        case 14:
            Hc = 0;
            break;
        case 15:
            Hc = (ma >> 7) & 1;
            break;
        case 16:
            Hc = (ma >> 15) & 1;
            break;
        case 17:
            Hc = (ma >> 31) & 1;
            break;
        case 18:
        case 19:
        case 20:
            Hc = ma & 1;
            break;
        case 21:
        case 22:
        case 23:
            Hc = (ma | 0) != 0;
            break;
        case 24:
            Hc = ma & 1;
            break;
        default:
            fb(2720);
        }
        return Hc | 0;
    }
    function td() {
        var Hc = 0
          , qc = 0;
        switch (oa | 0) {
        case 0:
            qc = (na - ma) | 0;
            Hc = (((qc ^ ma ^ -1) & (qc ^ na)) >> 7) & 1;
            break;
        case 1:
            qc = (na - ma) | 0;
            Hc = (((qc ^ ma ^ -1) & (qc ^ na)) >> 15) & 1;
            break;
        case 2:
            qc = (na - ma) | 0;
            Hc = (((qc ^ ma ^ -1) & (qc ^ na)) >> 31) & 1;
            break;
        case 3:
            qc = (na - ma - 1) | 0;
            Hc = (((qc ^ ma ^ -1) & (qc ^ na)) >> 7) & 1;
            break;
        case 4:
            qc = (na - ma - 1) | 0;
            Hc = (((qc ^ ma ^ -1) & (qc ^ na)) >> 15) & 1;
            break;
        case 5:
            qc = (na - ma - 1) | 0;
            Hc = (((qc ^ ma ^ -1) & (qc ^ na)) >> 31) & 1;
            break;
        case 6:
            qc = (na + ma) | 0;
            Hc = (((qc ^ ma) & (qc ^ na)) >> 7) & 1;
            break;
        case 7:
            qc = (na + ma) | 0;
            Hc = (((qc ^ ma) & (qc ^ na)) >> 15) & 1;
            break;
        case 8:
            qc = (na + ma) | 0;
            Hc = (((qc ^ ma) & (qc ^ na)) >> 31) & 1;
            break;
        case 9:
            qc = (na + ma + 1) | 0;
            Hc = (((qc ^ ma) & (qc ^ na)) >> 7) & 1;
            break;
        case 10:
            qc = (na + ma + 1) | 0;
            Hc = (((qc ^ ma) & (qc ^ na)) >> 15) & 1;
            break;
        case 11:
            qc = (na + ma + 1) | 0;
            Hc = (((qc ^ ma) & (qc ^ na)) >> 31) & 1;
            break;
        case 12:
        case 13:
        case 14:
            Hc = 0;
            break;
        case 15:
        case 18:
            Hc = ((ma ^ na) >> 7) & 1;
            break;
        case 16:
        case 19:
            Hc = ((ma ^ na) >> 15) & 1;
            break;
        case 17:
        case 20:
            Hc = ((ma ^ na) >> 31) & 1;
            break;
        case 21:
        case 22:
        case 23:
            Hc = (ma | 0) != 0;
            break;
        case 24:
            Hc = (ma >> 11) & 1;
            break;
        case 25:
            Hc = (na & 255) == 128;
            break;
        case 26:
            Hc = (na & 65535) == 32768;
            break;
        case 27:
            Hc = ((na | 0) == -2147483648);
            break;
        case 28:
            Hc = (na & 255) == 127;
            break;
        case 29:
            Hc = (na & 65535) == 32767;
            break;
        case 30:
            Hc = (na | 0) == 2147483647;
            break;
        default:
            fb(2821);
        }
        return Hc | 0;
    }
    function ud() {
        var Hc = 0;
        switch (oa | 0) {
        case 6:
            Hc = ((na + ma) & 255) <= (ma & 255);
            break;
        case 7:
            Hc = ((na + ma) & 65535) <= (ma & 65535);
            break;
        case 8:
            Hc = ((na + ma) >>> 0) <= (ma >>> 0);
            break;
        case 24:
            Hc = (ma & (64 | 1)) != 0;
            break;
        default:
            Hc = (tc() | 0) | ((na | 0) == 0);
            break;
        }
        return Hc | 0;
    }
    function vd() {
        var Hc = 0;
        if ((oa | 0) == 24) {
            Hc = (ma >> 2) & 1;
        } else {
            Hc = Wa[(3840 + (na & 255)) >> 0] | 0;
        }
        return Hc | 0;
    }
    function wd() {
        var Hc = 0;
        switch (oa | 0) {
        case 6:
            Hc = ((na + ma) << 24) < (ma << 24);
            break;
        case 7:
            Hc = ((na + ma) << 16) < (ma << 16);
            break;
        case 8:
            Hc = ((na + ma) | 0) < (ma | 0);
            break;
        case 12:
        case 25:
        case 28:
        case 13:
        case 26:
        case 29:
        case 14:
        case 27:
        case 30:
            Hc = (na | 0) < 0;
            break;
        case 24:
            Hc = ((ma >> 7) ^ (ma >> 11)) & 1;
            break;
        default:
            Hc = ((na | 0) < 0) ^ (td() | 0);
            break;
        }
        return Hc | 0;
    }
    function xd() {
        var Hc = 0;
        switch (oa | 0) {
        case 6:
            Hc = ((na + ma) << 24) <= (ma << 24);
            break;
        case 7:
            Hc = ((na + ma) << 16) <= (ma << 16);
            break;
        case 8:
            Hc = ((na + ma) | 0) <= (ma | 0);
            break;
        case 12:
        case 25:
        case 28:
        case 13:
        case 26:
        case 29:
        case 14:
        case 27:
        case 30:
            Hc = (na | 0) <= 0;
            break;
        case 24:
            Hc = (((ma >> 7) ^ (ma >> 11)) | (ma >> 6)) & 1;
            break;
        default:
            Hc = (((na | 0) < 0) ^ (td() | 0)) | ((na | 0) == 0);
            break;
        }
        return Hc | 0;
    }
    function yd() {
        var qc = 0
          , Hc = 0;
        switch (oa | 0) {
        case 0:
        case 1:
        case 2:
            qc = (na - ma) | 0;
            Hc = (na ^ qc ^ ma) & 16;
            break;
        case 3:
        case 4:
        case 5:
            qc = (na - ma - 1) | 0;
            Hc = (na ^ qc ^ ma) & 16;
            break;
        case 6:
        case 7:
        case 8:
            qc = (na + ma) | 0;
            Hc = (na ^ qc ^ ma) & 16;
            break;
        case 9:
        case 10:
        case 11:
            qc = (na + ma + 1) | 0;
            Hc = (na ^ qc ^ ma) & 16;
            break;
        case 12:
        case 13:
        case 14:
            Hc = 0;
            break;
        case 15:
        case 18:
        case 16:
        case 19:
        case 17:
        case 20:
        case 21:
        case 22:
        case 23:
            Hc = 0;
            break;
        case 24:
            Hc = ma & 16;
            break;
        case 25:
        case 26:
        case 27:
            Hc = (na ^ (na - 1)) & 16;
            break;
        case 28:
        case 29:
        case 30:
            Hc = (na ^ (na + 1)) & 16;
            break;
        default:
            fb(2994);
        }
        return Hc | 0;
    }
    function zd(Ad) {
        Ad = Ad | 0;
        var Hc = 0;
        switch (Ad >> 1) {
        case 0:
            Hc = td() | 0;
            break;
        case 1:
            Hc = tc() | 0;
            break;
        case 2:
            Hc = ((na | 0) == 0) | 0;
            break;
        case 3:
            Hc = ud() | 0;
            break;
        case 4:
            Hc = ((oa | 0) == 24 ? ((ma >> 7) & 1) : ((na | 0) < 0)) | 0;
            break;
        case 5:
            Hc = vd() | 0;
            break;
        case 6:
            Hc = wd() | 0;
            break;
        case 7:
            Hc = xd() | 0;
            break;
        default:
            fb(3030);
        }
        return (Hc ^ (Ad & 1)) | 0;
    }
    function Cc() {
        return (((vd() | 0) << 2) | (((na | 0) == 0) << 6) | (((oa | 0) == 24 ? ((ma >> 7) & 1) : ((na | 0) < 0)) << 7) | (yd() | 0)) | 0;
    }
    function Bd() {
        return (((tc() | 0) << 0) | ((vd() | 0) << 2) | (((na | 0) == 0) << 6) | (((oa | 0) == 24 ? ((ma >> 7) & 1) : ((na | 0) < 0)) << 7) | ((td() | 0) << 11) | (yd() | 0)) | 0;
    }
    function Cd() {
        var Dd = 0;
        Dd = Bd() | 0;
        Dd = Dd | (ra & 1024) | ta;
        return Dd | 0;
    }
    function Ed(Dd, Fd) {
        Dd = Dd | 0;
        Fd = Fd | 0;
        ma = Dd & (2048 | 128 | 64 | 16 | 4 | 1);
        na = ((ma >> 6) & 1) ^ 1;
        oa = 24;
        ra = (1 - (((Dd >> 10) & 1) << 1)) | 0;
        ta = (ta & ~Fd) | (Dd & Fd);
    }
    function Gd(Hd) {
        Hd = Hd | 0;
        sa = Hd | 0;
        if ((sa | 0) == 3) {
            Ua = 8392704;
            Va = 12587008;
        } else {
            Ua = 4096;
            Va = 4198400;
        }
    }
    function Id(aa, Jd) {
        aa = aa | 0;
        Jd = Jd | 0;
        var wb = 0;
        if (Jd) {
            wb = Ya[(Va + ((aa >>> 12) << 2)) >> 2] | 0;
        } else {
            wb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
        }
        if ((wb | 0) == -1) {
            xb(aa, Jd, (sa | 0) == 3);
            if (Jd) {
                wb = Ya[(Va + ((aa >>> 12) << 2)) >> 2] | 0;
            } else {
                wb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
            }
        }
        return (wb ^ aa) | 0;
    }
    function Kd(da) {
        da = da | 0;
        var Ld = 0
          , aa = 0;
        Ld = ((Ya[((4) << 2) >> 2] | 0) - 2) | 0;
        aa = ((Ld & Ka) + Ja) | 0;
        Nb(aa, da);
        Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | ((Ld) & Ka);
    }
    function Md(da) {
        da = da | 0;
        var Ld = 0
          , aa = 0;
        Ld = ((Ya[((4) << 2) >> 2] | 0) - 4) | 0;
        aa = ((Ld & Ka) + Ja) | 0;
        Pb(aa, da);
        Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | ((Ld) & Ka);
    }
    function Nd() {
        var aa = 0;
        aa = (((Ya[((4) << 2) >> 2] | 0) & Ka) + Ja) | 0;
        return Bb(aa) | 0;
    }
    function Od() {
        Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | (((Ya[((4) << 2) >> 2] | 0) + 2) & Ka);
    }
    function Pd() {
        var aa = 0;
        aa = (((Ya[((4) << 2) >> 2] | 0) & Ka) + Ja) | 0;
        return Db(aa) | 0;
    }
    function Qd() {
        Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | (((Ya[((4) << 2) >> 2] | 0) + 4) & Ka);
    }
    function Rd(Ra, b) {
        Ra = Ra | 0;
        b = b | 0;
        var n = 0
          , Ea = 0
          , l = 0
          , hc = 0
          , Sd = 0
          , ic = 0
          , pc = 0
          , Td = 0
          , zb = 0
          , aa = 0;
        n = 1;
        Ea = Ma;
        if (Ea & 256)
            Td = 2;
        else
            Td = 4;
        Ud: for (; ; ) {
            switch (b | 0) {
            case 102:
                if (Ma & 256) {
                    Td = 4;
                    Ea = Ea & ~256;
                } else {
                    Td = 2;
                    Ea = Ea | 256;
                }
            case 240:
            case 242:
            case 243:
            case 38:
            case 46:
            case 54:
            case 62:
            case 100:
            case 101:
                {
                    if (((n + 1) | 0) > 15)
                        Uc(6);
                    aa = (Ra + n) | 0;
                    n = (n + 1) | 0;
                    zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                    if ((zb | 0) == -1)
                        b = vb(aa) | 0;
                    else
                        b = Wa[aa ^ zb] | 0;
                }
                ;break;
            case 103:
                if (Ma & 128) {
                    Ea = Ea & ~128;
                } else {
                    Ea = Ea | 128;
                }
                {
                    if (((n + 1) | 0) > 15)
                        Uc(6);
                    aa = (Ra + n) | 0;
                    n = (n + 1) | 0;
                    zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                    if ((zb | 0) == -1)
                        b = vb(aa) | 0;
                    else
                        b = Wa[aa ^ zb] | 0;
                }
                ;break;
            case 145:
            case 146:
            case 147:
            case 148:
            case 149:
            case 150:
            case 151:
            case 64:
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 91:
            case 92:
            case 93:
            case 94:
            case 95:
            case 152:
            case 153:
            case 201:
            case 156:
            case 157:
            case 6:
            case 14:
            case 22:
            case 30:
            case 7:
            case 23:
            case 31:
            case 195:
            case 203:
            case 144:
            case 204:
            case 206:
            case 207:
            case 245:
            case 248:
            case 249:
            case 252:
            case 253:
            case 250:
            case 251:
            case 158:
            case 159:
            case 244:
            case 164:
            case 165:
            case 170:
            case 171:
            case 166:
            case 167:
            case 172:
            case 173:
            case 174:
            case 175:
            case 155:
            case 236:
            case 237:
            case 238:
            case 239:
            case 215:
            case 39:
            case 47:
            case 55:
            case 63:
            case 96:
            case 97:
            case 108:
            case 109:
            case 110:
            case 111:
                break Ud;
            case 176:
            case 177:
            case 178:
            case 179:
            case 180:
            case 181:
            case 182:
            case 183:
            case 4:
            case 12:
            case 20:
            case 28:
            case 36:
            case 44:
            case 52:
            case 60:
            case 168:
            case 106:
            case 235:
            case 112:
            case 113:
            case 114:
            case 115:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
            case 123:
            case 124:
            case 125:
            case 126:
            case 127:
            case 116:
            case 117:
            case 224:
            case 225:
            case 226:
            case 227:
            case 205:
            case 228:
            case 229:
            case 230:
            case 231:
            case 212:
            case 213:
                n = (n + 1) | 0;
                if ((n | 0) > 15)
                    Uc(6);
                break Ud;
            case 184:
            case 185:
            case 186:
            case 187:
            case 188:
            case 189:
            case 190:
            case 191:
            case 5:
            case 13:
            case 21:
            case 29:
            case 37:
            case 45:
            case 53:
            case 61:
            case 169:
            case 104:
            case 233:
            case 232:
                n = (n + Td) | 0;
                if ((n | 0) > 15)
                    Uc(6);
                break Ud;
            case 136:
            case 137:
            case 138:
            case 139:
            case 134:
            case 135:
            case 142:
            case 140:
            case 196:
            case 197:
            case 0:
            case 8:
            case 16:
            case 24:
            case 32:
            case 40:
            case 48:
            case 56:
            case 1:
            case 9:
            case 17:
            case 25:
            case 33:
            case 41:
            case 49:
            case 57:
            case 2:
            case 10:
            case 18:
            case 26:
            case 34:
            case 42:
            case 50:
            case 58:
            case 3:
            case 11:
            case 19:
            case 27:
            case 35:
            case 43:
            case 51:
            case 59:
            case 132:
            case 133:
            case 208:
            case 209:
            case 210:
            case 211:
            case 143:
            case 141:
            case 254:
            case 255:
            case 216:
            case 217:
            case 218:
            case 219:
            case 220:
            case 221:
            case 222:
            case 223:
            case 98:
            case 99:
                {
                    {
                        if (((n + 1) | 0) > 15)
                            Uc(6);
                        aa = (Ra + n) | 0;
                        n = (n + 1) | 0;
                        zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                        if ((zb | 0) == -1)
                            hc = vb(aa) | 0;
                        else
                            hc = Wa[aa ^ zb] | 0;
                    }
                    ;if (Ea & 128) {
                        switch (hc >> 6) {
                        case 0:
                            if ((hc & 7) == 6)
                                n = (n + 2) | 0;
                            break;
                        case 1:
                            n = (n + 1) | 0;
                            break;
                        case 2:
                            n = (n + 2) | 0;
                            break;
                        case 3:
                        default:
                            break;
                        }
                    } else {
                        switch ((hc & 7) | ((hc >> 3) & 24)) {
                        case 4:
                            {
                                if (((n + 1) | 0) > 15)
                                    Uc(6);
                                aa = (Ra + n) | 0;
                                n = (n + 1) | 0;
                                zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                                if ((zb | 0) == -1)
                                    Sd = vb(aa) | 0;
                                else
                                    Sd = Wa[aa ^ zb] | 0;
                            }
                            ;if ((Sd & 7) == 5) {
                                n = (n + 4) | 0;
                            }
                            break;
                        case 12:
                            n = (n + 2) | 0;
                            break;
                        case 20:
                            n = (n + 5) | 0;
                            break;
                        case 5:
                            n = (n + 4) | 0;
                            break;
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 6:
                        case 7:
                            break;
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 13:
                        case 14:
                        case 15:
                            n = (n + 1) | 0;
                            break;
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                        case 21:
                        case 22:
                        case 23:
                            n = (n + 4) | 0;
                            break;
                        }
                    }
                    if ((n | 0) > 15)
                        Uc(6);
                }
                ;break Ud;
            case 160:
            case 161:
            case 162:
            case 163:
                if (Ea & 128)
                    n = (n + 2) | 0;
                else
                    n = (n + 4) | 0;
                if ((n | 0) > 15)
                    Uc(6);
                break Ud;
            case 198:
            case 128:
            case 130:
            case 131:
            case 107:
            case 192:
            case 193:
                {
                    {
                        if (((n + 1) | 0) > 15)
                            Uc(6);
                        aa = (Ra + n) | 0;
                        n = (n + 1) | 0;
                        zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                        if ((zb | 0) == -1)
                            hc = vb(aa) | 0;
                        else
                            hc = Wa[aa ^ zb] | 0;
                    }
                    ;if (Ea & 128) {
                        switch (hc >> 6) {
                        case 0:
                            if ((hc & 7) == 6)
                                n = (n + 2) | 0;
                            break;
                        case 1:
                            n = (n + 1) | 0;
                            break;
                        case 2:
                            n = (n + 2) | 0;
                            break;
                        case 3:
                        default:
                            break;
                        }
                    } else {
                        switch ((hc & 7) | ((hc >> 3) & 24)) {
                        case 4:
                            {
                                if (((n + 1) | 0) > 15)
                                    Uc(6);
                                aa = (Ra + n) | 0;
                                n = (n + 1) | 0;
                                zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                                if ((zb | 0) == -1)
                                    Sd = vb(aa) | 0;
                                else
                                    Sd = Wa[aa ^ zb] | 0;
                            }
                            ;if ((Sd & 7) == 5) {
                                n = (n + 4) | 0;
                            }
                            break;
                        case 12:
                            n = (n + 2) | 0;
                            break;
                        case 20:
                            n = (n + 5) | 0;
                            break;
                        case 5:
                            n = (n + 4) | 0;
                            break;
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 6:
                        case 7:
                            break;
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 13:
                        case 14:
                        case 15:
                            n = (n + 1) | 0;
                            break;
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                        case 21:
                        case 22:
                        case 23:
                            n = (n + 4) | 0;
                            break;
                        }
                    }
                    if ((n | 0) > 15)
                        Uc(6);
                }
                ;n = (n + 1) | 0;
                if ((n | 0) > 15)
                    Uc(6);
                break Ud;
            case 199:
            case 129:
            case 105:
                {
                    {
                        if (((n + 1) | 0) > 15)
                            Uc(6);
                        aa = (Ra + n) | 0;
                        n = (n + 1) | 0;
                        zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                        if ((zb | 0) == -1)
                            hc = vb(aa) | 0;
                        else
                            hc = Wa[aa ^ zb] | 0;
                    }
                    ;if (Ea & 128) {
                        switch (hc >> 6) {
                        case 0:
                            if ((hc & 7) == 6)
                                n = (n + 2) | 0;
                            break;
                        case 1:
                            n = (n + 1) | 0;
                            break;
                        case 2:
                            n = (n + 2) | 0;
                            break;
                        case 3:
                        default:
                            break;
                        }
                    } else {
                        switch ((hc & 7) | ((hc >> 3) & 24)) {
                        case 4:
                            {
                                if (((n + 1) | 0) > 15)
                                    Uc(6);
                                aa = (Ra + n) | 0;
                                n = (n + 1) | 0;
                                zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                                if ((zb | 0) == -1)
                                    Sd = vb(aa) | 0;
                                else
                                    Sd = Wa[aa ^ zb] | 0;
                            }
                            ;if ((Sd & 7) == 5) {
                                n = (n + 4) | 0;
                            }
                            break;
                        case 12:
                            n = (n + 2) | 0;
                            break;
                        case 20:
                            n = (n + 5) | 0;
                            break;
                        case 5:
                            n = (n + 4) | 0;
                            break;
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 6:
                        case 7:
                            break;
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 13:
                        case 14:
                        case 15:
                            n = (n + 1) | 0;
                            break;
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                        case 21:
                        case 22:
                        case 23:
                            n = (n + 4) | 0;
                            break;
                        }
                    }
                    if ((n | 0) > 15)
                        Uc(6);
                }
                ;n = (n + Td) | 0;
                if ((n | 0) > 15)
                    Uc(6);
                break Ud;
            case 246:
                {
                    {
                        if (((n + 1) | 0) > 15)
                            Uc(6);
                        aa = (Ra + n) | 0;
                        n = (n + 1) | 0;
                        zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                        if ((zb | 0) == -1)
                            hc = vb(aa) | 0;
                        else
                            hc = Wa[aa ^ zb] | 0;
                    }
                    ;if (Ea & 128) {
                        switch (hc >> 6) {
                        case 0:
                            if ((hc & 7) == 6)
                                n = (n + 2) | 0;
                            break;
                        case 1:
                            n = (n + 1) | 0;
                            break;
                        case 2:
                            n = (n + 2) | 0;
                            break;
                        case 3:
                        default:
                            break;
                        }
                    } else {
                        switch ((hc & 7) | ((hc >> 3) & 24)) {
                        case 4:
                            {
                                if (((n + 1) | 0) > 15)
                                    Uc(6);
                                aa = (Ra + n) | 0;
                                n = (n + 1) | 0;
                                zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                                if ((zb | 0) == -1)
                                    Sd = vb(aa) | 0;
                                else
                                    Sd = Wa[aa ^ zb] | 0;
                            }
                            ;if ((Sd & 7) == 5) {
                                n = (n + 4) | 0;
                            }
                            break;
                        case 12:
                            n = (n + 2) | 0;
                            break;
                        case 20:
                            n = (n + 5) | 0;
                            break;
                        case 5:
                            n = (n + 4) | 0;
                            break;
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 6:
                        case 7:
                            break;
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 13:
                        case 14:
                        case 15:
                            n = (n + 1) | 0;
                            break;
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                        case 21:
                        case 22:
                        case 23:
                            n = (n + 4) | 0;
                            break;
                        }
                    }
                    if ((n | 0) > 15)
                        Uc(6);
                }
                ;pc = (hc >> 3) & 7;
                if ((pc | 0) == 0) {
                    n = (n + 1) | 0;
                    if ((n | 0) > 15)
                        Uc(6);
                }
                break Ud;
            case 247:
                {
                    {
                        if (((n + 1) | 0) > 15)
                            Uc(6);
                        aa = (Ra + n) | 0;
                        n = (n + 1) | 0;
                        zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                        if ((zb | 0) == -1)
                            hc = vb(aa) | 0;
                        else
                            hc = Wa[aa ^ zb] | 0;
                    }
                    ;if (Ea & 128) {
                        switch (hc >> 6) {
                        case 0:
                            if ((hc & 7) == 6)
                                n = (n + 2) | 0;
                            break;
                        case 1:
                            n = (n + 1) | 0;
                            break;
                        case 2:
                            n = (n + 2) | 0;
                            break;
                        case 3:
                        default:
                            break;
                        }
                    } else {
                        switch ((hc & 7) | ((hc >> 3) & 24)) {
                        case 4:
                            {
                                if (((n + 1) | 0) > 15)
                                    Uc(6);
                                aa = (Ra + n) | 0;
                                n = (n + 1) | 0;
                                zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                                if ((zb | 0) == -1)
                                    Sd = vb(aa) | 0;
                                else
                                    Sd = Wa[aa ^ zb] | 0;
                            }
                            ;if ((Sd & 7) == 5) {
                                n = (n + 4) | 0;
                            }
                            break;
                        case 12:
                            n = (n + 2) | 0;
                            break;
                        case 20:
                            n = (n + 5) | 0;
                            break;
                        case 5:
                            n = (n + 4) | 0;
                            break;
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 6:
                        case 7:
                            break;
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 13:
                        case 14:
                        case 15:
                            n = (n + 1) | 0;
                            break;
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                        case 21:
                        case 22:
                        case 23:
                            n = (n + 4) | 0;
                            break;
                        }
                    }
                    if ((n | 0) > 15)
                        Uc(6);
                }
                ;pc = (hc >> 3) & 7;
                if ((pc | 0) == 0) {
                    n = (n + Td) | 0;
                    if ((n | 0) > 15)
                        Uc(6);
                }
                break Ud;
            case 234:
            case 154:
                n = (n + 2 + Td) | 0;
                if ((n | 0) > 15)
                    Uc(6);
                break Ud;
            case 194:
            case 202:
                n = (n + 2) | 0;
                if ((n | 0) > 15)
                    Uc(6);
                break Ud;
            case 200:
                n = (n + 3) | 0;
                if ((n | 0) > 15)
                    Uc(6);
                break Ud;
            case 214:
            case 241:
                Uc(6);
            case 15:
                {
                    if (((n + 1) | 0) > 15)
                        Uc(6);
                    aa = (Ra + n) | 0;
                    n = (n + 1) | 0;
                    zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                    if ((zb | 0) == -1)
                        b = vb(aa) | 0;
                    else
                        b = Wa[aa ^ zb] | 0;
                }
                ;switch (b | 0) {
                case 6:
                case 162:
                case 49:
                case 160:
                case 168:
                case 161:
                case 169:
                case 200:
                case 201:
                case 202:
                case 203:
                case 204:
                case 205:
                case 206:
                case 207:
                    break Ud;
                case 128:
                case 129:
                case 130:
                case 131:
                case 132:
                case 133:
                case 134:
                case 135:
                case 136:
                case 137:
                case 138:
                case 139:
                case 140:
                case 141:
                case 142:
                case 143:
                    n = (n + Td) | 0;
                    if ((n | 0) > 15)
                        Uc(6);
                    break Ud;
                case 144:
                case 145:
                case 146:
                case 147:
                case 148:
                case 149:
                case 150:
                case 151:
                case 152:
                case 153:
                case 154:
                case 155:
                case 156:
                case 157:
                case 158:
                case 159:
                case 64:
                case 65:
                case 66:
                case 67:
                case 68:
                case 69:
                case 70:
                case 71:
                case 72:
                case 73:
                case 74:
                case 75:
                case 76:
                case 77:
                case 78:
                case 79:
                case 182:
                case 183:
                case 190:
                case 191:
                case 0:
                case 1:
                case 2:
                case 3:
                case 32:
                case 34:
                case 35:
                case 178:
                case 180:
                case 181:
                case 165:
                case 173:
                case 163:
                case 171:
                case 179:
                case 187:
                case 188:
                case 189:
                case 175:
                case 192:
                case 193:
                case 176:
                case 177:
                    {
                        {
                            if (((n + 1) | 0) > 15)
                                Uc(6);
                            aa = (Ra + n) | 0;
                            n = (n + 1) | 0;
                            zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                            if ((zb | 0) == -1)
                                hc = vb(aa) | 0;
                            else
                                hc = Wa[aa ^ zb] | 0;
                        }
                        ;if (Ea & 128) {
                            switch (hc >> 6) {
                            case 0:
                                if ((hc & 7) == 6)
                                    n = (n + 2) | 0;
                                break;
                            case 1:
                                n = (n + 1) | 0;
                                break;
                            case 2:
                                n = (n + 2) | 0;
                                break;
                            case 3:
                            default:
                                break;
                            }
                        } else {
                            switch ((hc & 7) | ((hc >> 3) & 24)) {
                            case 4:
                                {
                                    if (((n + 1) | 0) > 15)
                                        Uc(6);
                                    aa = (Ra + n) | 0;
                                    n = (n + 1) | 0;
                                    zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                                    if ((zb | 0) == -1)
                                        Sd = vb(aa) | 0;
                                    else
                                        Sd = Wa[aa ^ zb] | 0;
                                }
                                ;if ((Sd & 7) == 5) {
                                    n = (n + 4) | 0;
                                }
                                break;
                            case 12:
                                n = (n + 2) | 0;
                                break;
                            case 20:
                                n = (n + 5) | 0;
                                break;
                            case 5:
                                n = (n + 4) | 0;
                                break;
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 6:
                            case 7:
                                break;
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                            case 13:
                            case 14:
                            case 15:
                                n = (n + 1) | 0;
                                break;
                            case 16:
                            case 17:
                            case 18:
                            case 19:
                            case 21:
                            case 22:
                            case 23:
                                n = (n + 4) | 0;
                                break;
                            }
                        }
                        if ((n | 0) > 15)
                            Uc(6);
                    }
                    ;break Ud;
                case 164:
                case 172:
                case 186:
                    {
                        {
                            if (((n + 1) | 0) > 15)
                                Uc(6);
                            aa = (Ra + n) | 0;
                            n = (n + 1) | 0;
                            zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                            if ((zb | 0) == -1)
                                hc = vb(aa) | 0;
                            else
                                hc = Wa[aa ^ zb] | 0;
                        }
                        ;if (Ea & 128) {
                            switch (hc >> 6) {
                            case 0:
                                if ((hc & 7) == 6)
                                    n = (n + 2) | 0;
                                break;
                            case 1:
                                n = (n + 1) | 0;
                                break;
                            case 2:
                                n = (n + 2) | 0;
                                break;
                            case 3:
                            default:
                                break;
                            }
                        } else {
                            switch ((hc & 7) | ((hc >> 3) & 24)) {
                            case 4:
                                {
                                    if (((n + 1) | 0) > 15)
                                        Uc(6);
                                    aa = (Ra + n) | 0;
                                    n = (n + 1) | 0;
                                    zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                                    if ((zb | 0) == -1)
                                        Sd = vb(aa) | 0;
                                    else
                                        Sd = Wa[aa ^ zb] | 0;
                                }
                                ;if ((Sd & 7) == 5) {
                                    n = (n + 4) | 0;
                                }
                                break;
                            case 12:
                                n = (n + 2) | 0;
                                break;
                            case 20:
                                n = (n + 5) | 0;
                                break;
                            case 5:
                                n = (n + 4) | 0;
                                break;
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 6:
                            case 7:
                                break;
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                            case 13:
                            case 14:
                            case 15:
                                n = (n + 1) | 0;
                                break;
                            case 16:
                            case 17:
                            case 18:
                            case 19:
                            case 21:
                            case 22:
                            case 23:
                                n = (n + 4) | 0;
                                break;
                            }
                        }
                        if ((n | 0) > 15)
                            Uc(6);
                    }
                    ;n = (n + 1) | 0;
                    if ((n | 0) > 15)
                        Uc(6);
                    break Ud;
                case 4:
                case 5:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 23:
                case 24:
                case 25:
                case 26:
                case 27:
                case 28:
                case 29:
                case 30:
                case 31:
                case 33:
                case 36:
                case 37:
                case 38:
                case 39:
                case 40:
                case 41:
                case 42:
                case 43:
                case 44:
                case 45:
                case 46:
                case 47:
                case 48:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                case 58:
                case 59:
                case 60:
                case 61:
                case 62:
                case 63:
                case 80:
                case 81:
                case 82:
                case 83:
                case 84:
                case 85:
                case 86:
                case 87:
                case 88:
                case 89:
                case 90:
                case 91:
                case 92:
                case 93:
                case 94:
                case 95:
                case 96:
                case 97:
                case 98:
                case 99:
                case 100:
                case 101:
                case 102:
                case 103:
                case 104:
                case 105:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 111:
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 117:
                case 118:
                case 119:
                case 120:
                case 121:
                case 122:
                case 123:
                case 124:
                case 125:
                case 126:
                case 127:
                case 166:
                case 167:
                case 170:
                case 174:
                case 184:
                case 185:
                case 194:
                case 195:
                case 196:
                case 197:
                case 198:
                case 199:
                default:
                    Uc(6);
                }
                break;
            default:
                Uc(6);
            }
        }
        return n | 0;
    }
    function xb(Vd, Wd, pb) {
        Vd = Vd | 0;
        Wd = Wd | 0;
        pb = pb | 0;
        var Xd = 0
          , Yd = 0
          , Zd = 0
          , ae = 0
          , be = 0
          , ce = 0
          , de = 0
          , Jd = 0
          , ee = 0;
        if (!(ua & (1 << 31))) {
            mb(Vd & -4096, Vd & -4096, 1, 1);
        } else {
            Xd = ((wa & -4096) + ((Vd >> 20) & 4092)) | 0;
            Yd = kb(Xd) | 0;
            if (!(Yd & 1)) {
                Zd = 0;
            } else {
                if (!(Yd & 32)) {
                    Yd = Yd | 32;
                    lb(Xd, Yd);
                }
                ae = ((Yd & -4096) + ((Vd >> 10) & 4092)) | 0;
                be = kb(ae) | 0;
                if (!(be & 1)) {
                    Zd = 0;
                } else {
                    ce = be & Yd;
                    if (pb & !(ce & 4)) {
                        Zd = 1;
                    } else if (Wd & !(ce & 2)) {
                        Zd = 1;
                    } else {
                        de = (Wd & !(be & 64));
                        if (!(be & 32) | de) {
                            be = be | 32;
                            if (de)
                                be = be | 64;
                            lb(ae, be);
                        }
                        Jd = 0;
                        if (((be & 64) != 0) & ((ce & 2) != 0))
                            Jd = 1;
                        ee = 0;
                        if (ce & 4)
                            ee = 1;
                        mb(Vd & -4096, be & -4096, Jd, ee);
                        return;
                    }
                }
            }
            Zd = Zd | (Wd << 1);
            Zd = Zd | (pb << 2);
            va = Vd;
            fe(14, Zd);
        }
    }
    function ge(he) {
        he = he | 0;
        if (!(he & (1 << 0)))
            fb(67);
        if ((he & ((1 << 31) | (1 << 16) | (1 << 0))) != (ua & ((1 << 31) | (1 << 16) | (1 << 0)))) {
            sb();
        }
        ua = he | (1 << 4);
    }
    function ie(je) {
        je = je | 0;
        wa = je;
        if (ua & (1 << 31)) {
            sb();
        }
    }
    function ke(le) {
        le = le | 0;
        xa = le;
    }
    function me(ne) {
        ne = ne | 0;
        var Hc = 0;
        if (ne & (1 << 22))
            Hc = -1;
        else
            Hc = 65535;
        return Hc | 0;
    }
    function oe(pe) {
        pe = pe | 0;
        var ha = 0
          , kc = 0
          , qe = 0
          , ne = 0
          , aa = 0;
        if (pe & 4)
            ha = 6;
        else
            ha = 8;
        kc = pe & ~7;
        if (((kc + 7) | 0) > (Ya[(((ha) << 4) + (128 + 8)) >> 2] | 0))
            return 0;
        aa = ((Ya[(((ha) << 4) + (128 + 4)) >> 2] | 0) + kc) | 0;
        qe = Vb(aa) | 0;
        aa = (aa + 4) | 0;
        ne = Vb(aa) | 0;
        Ga = qe;
        Ha = ne;
        return 1;
    }
    function re(qe, ne) {
        qe = qe | 0;
        ne = ne | 0;
        var se = 0;
        se = (qe & 65535) | (ne & 983040);
        if (ne & (1 << 23))
            se = (se << 12) | 4095;
        return se | 0;
    }
    function te(qe, ne) {
        qe = qe | 0;
        ne = ne | 0;
        return (((qe >>> 16) | ((ne & 255) << 16) | (ne & 0xff000000))) | 0;
    }
    function ue(ha, qe, ne) {
        ha = ha | 0;
        qe = qe | 0;
        ne = ne | 0;
        Ya[(((ha) << 4) + (128 + 4)) >> 2] = te(qe, ne) | 0;
        Ya[(((ha) << 4) + (128 + 8)) >> 2] = re(qe, ne) | 0;
        Ya[(((ha) << 4) + (128 + 12)) >> 2] = ne;
    }
    function ve() {
        Ia = (Ya[(((1) << 4) + (128 + 4)) >> 2] | 0);
        Ja = (Ya[(((2) << 4) + (128 + 4)) >> 2] | 0);
        if ((Ya[(((2) << 4) + (128 + 12)) >> 2] | 0) & (1 << 22))
            Ka = -1;
        else
            Ka = 65535;
        La = (((Ia | Ja | (Ya[(((3) << 4) + (128 + 4)) >> 2] | 0) | (Ya[(((0) << 4) + (128 + 4)) >> 2] | 0)) == 0) & (Ka | 0) == -1);
        if ((Ya[(((1) << 4) + (128 + 12)) >> 2] | 0) & (1 << 22))
            Ma = 0;
        else
            Ma = 256 | 128;
        Sa = (Oa + 8192) & ~4095;
    }
    function we(xe, pe, ic, se, ye) {
        xe = xe | 0;
        pe = pe | 0;
        ic = ic | 0;
        se = se | 0;
        ye = ye | 0;
        Ya[(((xe) << 4) + (128 + 0)) >> 2] = pe;
        Ya[(((xe) << 4) + (128 + 4)) >> 2] = ic;
        Ya[(((xe) << 4) + (128 + 8)) >> 2] = se;
        Ya[(((xe) << 4) + (128 + 12)) >> 2] = ye;
        ve();
    }
    function ze(lc, pe) {
        lc = lc | 0;
        pe = pe | 0;
        we(lc, pe, (pe << 4), 65535, (1 << 15) | (3 << 13) | (1 << 12) | (1 << 8) | (1 << 12) | (1 << 9));
    }
    function Ae(Be) {
        Be = Be | 0;
        var Ce = 0
          , kc = 0
          , De = 0
          , Ee = 0
          , Fe = 0
          , wb = 0
          , aa = 0;
        if (!((Ya[(((7) << 4) + (128 + 12)) >> 2] | 0) & (1 << 15)))
            fb(201);
        Ce = ((Ya[(((7) << 4) + (128 + 12)) >> 2] | 0) >> 8) & 15;
        if ((Ce & 7) != 1)
            fb(204);
        De = Ce >> 3;
        kc = ((Be << 2) + 2) << De;
        wb = (kc + (4 << De) - 1) | 0;
        if ((wb >>> 0) > ((Ya[(((7) << 4) + (128 + 8)) >> 2] | 0) >>> 0))
            fe(10, (Ya[(((7) << 4) + (128 + 0)) >> 2] | 0) & 65532);
        aa = ((Ya[(((7) << 4) + (128 + 4)) >> 2] | 0) + kc) | 0;
        if ((De | 0) == 0) {
            Fe = Tb(aa) | 0;
            aa = (aa + 2) | 0;
        } else {
            Fe = Vb(aa) | 0;
            aa = (aa + 4) | 0;
        }
        Ga = Tb(aa) | 0;
        return Fe | 0;
    }
    function Ge(He, Ie, Zd, Je, Ke) {
        He = He | 0;
        Ie = Ie | 0;
        Zd = Zd | 0;
        Je = Je | 0;
        Ke = Ke | 0;
        var Le = 0
          , Ce = 0
          , Be = 0
          , pe = 0
          , Me = 0
          , Ne = 0;
        var Oe = 0
          , Pe = 0
          , De = 0;
        var e = 0
          , qe = 0
          , ne = 0
          , Qe = 0
          , Ee = 0
          , Fe = 0
          , Re = 0
          , Se = 0;
        var Te = 0
          , Ka = 0
          , aa = 0;
        Oe = 0;
        if (!Ie & !Ke) {
            switch (He | 0) {
            case 8:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 17:
                Oe = 1;
                break;
            }
        }
        if (Ie)
            Te = Je;
        else
            Te = Na;
        if (((He << 3) | 7) > (Ya[(((9) << 4) + (128 + 8)) >> 2] | 0))
            fe(13, (He << 3) | 2);
        aa = ((Ya[(((9) << 4) + (128 + 4)) >> 2] | 0) + (He << 3)) | 0;
        qe = Vb(aa) | 0;
        aa = (aa + 4) | 0;
        ne = Vb(aa) | 0;
        Ce = (ne >> 8) & 31;
        switch (Ce | 0) {
        case 5:
        case 7:
        case 6:
            fb(307);
        case 14:
        case 15:
            break;
        default:
            fe(13, (He << 3) | 2);
            break;
        }
        Be = (ne >> 13) & 3;
        Ne = sa;
        if (((Ie | 0) != 0) & (Be | 0) < (Ne | 0))
            fe(13, (He << 3) | 2);
        if (!(ne & (1 << 15)))
            fe(11, (He << 3) | 2);
        pe = qe >> 16;
        Qe = (ne & -65536) | (qe & 65535);
        if ((pe & 65532) == 0)
            fe(13, 0);
        e = oe(pe) | 0;
        if (!e)
            fe(13, pe & 65532);
        qe = Ga;
        ne = Ha;
        if (!(ne & (1 << 12)) | !(ne & ((1 << 11))))
            fe(13, pe & 65532);
        Be = (ne >> 13) & 3;
        if ((Be | 0) > (Ne | 0))
            fe(13, pe & 65532);
        if (!(ne & (1 << 15)))
            fe(11, pe & 65532);
        if (!(ne & (1 << 10)) & (Be | 0) < (Ne | 0)) {
            Fe = Ae(Be) | 0;
            Ee = Ga;
            if ((Ee & 65532) == 0)
                fe(10, Ee & 65532);
            if ((Ee & 3) != (Be | 0))
                fe(10, Ee & 65532);
            e = oe(Ee) | 0;
            if (!e)
                fe(10, Ee & 65532);
            Re = Ga;
            Se = Ha;
            Me = (Se >> 13) & 3;
            if ((Me | 0) != (Be | 0))
                fe(10, Ee & 65532);
            if (!(Se & (1 << 12)) | !!(Se & (1 << 11)) | !(Se & (1 << 9)))
                fe(10, Ee & 65532);
            if (!(Se & (1 << 15)))
                fe(10, Ee & 65532);
            Pe = 1;
            Ka = me(Se) | 0;
            Le = te(Re, Se) | 0;
        } else if (!!(ne & (1 << 10)) | (Be | 0) == (Ne | 0)) {
            if (ta & 131072)
                fe(13, pe & 65532);
            Pe = 0;
            Ka = me((Ya[(((2) << 4) + (128 + 12)) >> 2] | 0)) | 0;
            Le = (Ya[(((2) << 4) + (128 + 4)) >> 2] | 0);
            Fe = (Ya[((4) << 2) >> 2] | 0);
            Be = Ne;
        } else {
            fe(13, pe & 65532);
            Pe = 0;
            Ka = 0;
            Le = 0;
            Fe = 0;
        }
        De = Ce >> 3;
        if ((De | 0) == 1) {
            if (Pe) {
                if (ta & 131072) {
                    {
                        Fe = (Fe - 4) | 0;
                        aa = (Le + (Fe & Ka)) | 0;
                        bc(aa, (Ya[(((5) << 4) + (128 + 0)) >> 2] | 0));
                    }
                    ;{
                        Fe = (Fe - 4) | 0;
                        aa = (Le + (Fe & Ka)) | 0;
                        bc(aa, (Ya[(((4) << 4) + (128 + 0)) >> 2] | 0));
                    }
                    ;{
                        Fe = (Fe - 4) | 0;
                        aa = (Le + (Fe & Ka)) | 0;
                        bc(aa, (Ya[(((3) << 4) + (128 + 0)) >> 2] | 0));
                    }
                    ;{
                        Fe = (Fe - 4) | 0;
                        aa = (Le + (Fe & Ka)) | 0;
                        bc(aa, (Ya[(((0) << 4) + (128 + 0)) >> 2] | 0));
                    }
                    ;
                }
                {
                    Fe = (Fe - 4) | 0;
                    aa = (Le + (Fe & Ka)) | 0;
                    bc(aa, (Ya[(((2) << 4) + (128 + 0)) >> 2] | 0));
                }
                ;{
                    Fe = (Fe - 4) | 0;
                    aa = (Le + (Fe & Ka)) | 0;
                    bc(aa, (Ya[((4) << 2) >> 2] | 0));
                }
                ;
            }
            {
                Fe = (Fe - 4) | 0;
                aa = (Le + (Fe & Ka)) | 0;
                bc(aa, Cd() | 0);
            }
            ;{
                Fe = (Fe - 4) | 0;
                aa = (Le + (Fe & Ka)) | 0;
                bc(aa, (Ya[(((1) << 4) + (128 + 0)) >> 2] | 0));
            }
            ;{
                Fe = (Fe - 4) | 0;
                aa = (Le + (Fe & Ka)) | 0;
                bc(aa, Te);
            }
            ;if (Oe) {
                {
                    Fe = (Fe - 4) | 0;
                    aa = (Le + (Fe & Ka)) | 0;
                    bc(aa, Zd);
                }
                ;
            }
        } else {
            if (Pe) {
                if (ta & 131072) {
                    {
                        Fe = (Fe - 2) | 0;
                        aa = (Le + (Fe & Ka)) | 0;
                        Zb(aa, (Ya[(((5) << 4) + (128 + 0)) >> 2] | 0));
                    }
                    ;{
                        Fe = (Fe - 2) | 0;
                        aa = (Le + (Fe & Ka)) | 0;
                        Zb(aa, (Ya[(((4) << 4) + (128 + 0)) >> 2] | 0));
                    }
                    ;{
                        Fe = (Fe - 2) | 0;
                        aa = (Le + (Fe & Ka)) | 0;
                        Zb(aa, (Ya[(((3) << 4) + (128 + 0)) >> 2] | 0));
                    }
                    ;{
                        Fe = (Fe - 2) | 0;
                        aa = (Le + (Fe & Ka)) | 0;
                        Zb(aa, (Ya[(((0) << 4) + (128 + 0)) >> 2] | 0));
                    }
                    ;
                }
                {
                    Fe = (Fe - 2) | 0;
                    aa = (Le + (Fe & Ka)) | 0;
                    Zb(aa, (Ya[(((2) << 4) + (128 + 0)) >> 2] | 0));
                }
                ;{
                    Fe = (Fe - 2) | 0;
                    aa = (Le + (Fe & Ka)) | 0;
                    Zb(aa, (Ya[((4) << 2) >> 2] | 0));
                }
                ;
            }
            {
                Fe = (Fe - 2) | 0;
                aa = (Le + (Fe & Ka)) | 0;
                Zb(aa, Cd() | 0);
            }
            ;{
                Fe = (Fe - 2) | 0;
                aa = (Le + (Fe & Ka)) | 0;
                Zb(aa, (Ya[(((1) << 4) + (128 + 0)) >> 2] | 0));
            }
            ;{
                Fe = (Fe - 2) | 0;
                aa = (Le + (Fe & Ka)) | 0;
                Zb(aa, Te);
            }
            ;if (Oe) {
                {
                    Fe = (Fe - 2) | 0;
                    aa = (Le + (Fe & Ka)) | 0;
                    Zb(aa, Zd);
                }
                ;
            }
        }
        if (Pe) {
            if (ta & 131072) {
                we(0, 0, 0, 0, 0);
                we(3, 0, 0, 0, 0);
                we(4, 0, 0, 0, 0);
                we(5, 0, 0, 0, 0);
            }
            Ee = (Ee & ~3) | Be;
            we(2, Ee, Le, re(Re, Se) | 0, Se);
        }
        Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | ((Fe) & Ka);
        pe = (pe & ~3) | Be;
        we(1, pe, te(qe, ne) | 0, re(qe, ne) | 0, ne);
        Gd(Be);
        Na = Qe,
        Oa = Qa = 0,
        Sa = 8192;
        if ((Ce & 1) == 0) {
            ta = ta & ~512;
        }
        ta = ta & ~(256 | 131072 | 65536 | 16384);
    }
    function Ue(He, Ie, Zd, Je, Ke) {
        He = He | 0;
        Ie = Ie | 0;
        Zd = Zd | 0;
        Je = Je | 0;
        Ke = Ke | 0;
        var Le = 0
          , pe = 0
          , Qe = 0
          , Fe = 0
          , Te = 0
          , aa = 0;
        if (((He << 2) | 3) > (Ya[(((9) << 4) + (128 + 8)) >> 2] | 0))
            fe(13, (He << 3) | 2);
        aa = ((Ya[(((9) << 4) + (128 + 4)) >> 2] | 0) + (He << 2)) | 0;
        Qe = Tb(aa) | 0;
        aa = (aa + 2) | 0;
        pe = Tb(aa) | 0;
        Fe = (Ya[((4) << 2) >> 2] | 0);
        if (Ie)
            Te = Je;
        else
            Te = Na;
        {
            Fe = (Fe - 2) | 0;
            aa = ((Fe & Ka) + Ja) | 0;
            Nb(aa, Cd() | 0);
        }
        ;{
            Fe = (Fe - 2) | 0;
            aa = ((Fe & Ka) + Ja) | 0;
            Nb(aa, (Ya[(((1) << 4) + (128 + 0)) >> 2] | 0));
        }
        ;{
            Fe = (Fe - 2) | 0;
            aa = ((Fe & Ka) + Ja) | 0;
            Nb(aa, Te);
        }
        ;Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | ((Fe) & Ka);
        Na = Qe,
        Oa = Qa = 0,
        Sa = 8192;
        Ya[(((1) << 4) + (128 + 0)) >> 2] = pe;
        Ya[(((1) << 4) + (128 + 4)) >> 2] = pe << 4;
        ta = ta & ~(512 | 256 | 262144 | 65536);
    }
    function Ve(He, Ie, Zd, Je, Ke) {
        He = He | 0;
        Ie = Ie | 0;
        Zd = Zd | 0;
        Je = Je | 0;
        Ke = Ke | 0;
        if (ua & (1 << 0)) {
            Ge(He, Ie, Zd, Je, Ke);
        } else {
            Ue(He, Ie, Zd, Je, Ke);
        }
    }
    function We(pe) {
        pe = pe | 0;
        var qe = 0
          , ne = 0
          , kc = 0
          , Xe = 0
          , aa = 0;
        pe = pe & 65535;
        if ((pe & 65532) == 0) {
            Ya[(((6) << 4) + (128 + 4)) >> 2] = 0;
            Ya[(((6) << 4) + (128 + 8)) >> 2] = 0;
        } else {
            if (pe & 4)
                fe(13, pe & 65532);
            kc = pe & ~7;
            Xe = 7;
            if (((kc + Xe) >>> 0) > ((Ya[(((8) << 4) + (128 + 8)) >> 2] | 0) >>> 0))
                fe(13, pe & 65532);
            aa = ((Ya[(((8) << 4) + (128 + 4)) >> 2] | 0) + kc) | 0;
            qe = Vb(aa) | 0;
            aa = (aa + 4) | 0;
            ne = Vb(aa) | 0;
            if (!!(ne & (1 << 12)) | ((ne >> 8) & 15) != 2)
                fe(13, pe & 65532);
            if (!(ne & (1 << 15)))
                fe(11, pe & 65532);
            ue(6, qe, ne);
        }
        Ya[(((6) << 4) + (128 + 0)) >> 2] = pe;
    }
    function Ye(pe) {
        pe = pe | 0;
        var qe = 0
          , ne = 0
          , kc = 0
          , Ce = 0
          , aa = 0;
        pe = pe & 65535;
        if ((pe & 65532) == 0) {
            Ya[(((7) << 4) + (128 + 4)) >> 2] = 0;
            Ya[(((7) << 4) + (128 + 8)) >> 2] = 0;
            Ya[(((7) << 4) + (128 + 12)) >> 2] = 0;
        } else {
            if (pe & 4)
                fe(13, pe & 65532);
            kc = pe & ~7;
            if (((kc | 7) >>> 0) > ((Ya[(((8) << 4) + (128 + 8)) >> 2] | 0) >>> 0))
                fe(13, pe & 65532);
            aa = ((Ya[(((8) << 4) + (128 + 4)) >> 2] | 0) + kc) | 0;
            qe = Vb(aa) | 0;
            aa = (aa + 4) | 0;
            ne = Vb(aa) | 0;
            Ce = (ne >> 8) & 15;
            if (!!(ne & (1 << 12)) | ((Ce | 0) != 1 & (Ce | 0) != 9))
                fe(13, pe & 65532);
            if (!(ne & (1 << 15)))
                fe(11, pe & 65532);
            ue(7, qe, ne);
            ne = ne | (1 << 9);
            bc(aa, ne);
        }
        Ya[(((7) << 4) + (128 + 0)) >> 2] = pe;
    }
    function Ze(af, pe) {
        af = af | 0;
        pe = pe | 0;
        var qe = 0
          , ne = 0
          , Ne = 0
          , Be = 0
          , bf = 0
          , ha = 0
          , kc = 0
          , aa = 0;
        Ne = sa;
        if ((pe & 65532) == 0) {
            if ((af | 0) == 2)
                fe(13, 0);
            we(af, pe, 0, 0, 0);
        } else {
            if (pe & 4)
                ha = 6;
            else
                ha = 8;
            kc = pe & ~7;
            if (((kc | 7) >>> 0) > ((Ya[(((ha) << 4) + (128 + 8)) >> 2] | 0) >>> 0))
                fe(13, pe & 65532);
            aa = ((Ya[(((ha) << 4) + (128 + 4)) >> 2] | 0) + kc) | 0;
            qe = Vb(aa) | 0;
            aa = (aa + 4) | 0;
            ne = Vb(aa) | 0;
            if (!(ne & (1 << 12)))
                fe(13, pe & 65532);
            bf = pe & 3;
            Be = (ne >> 13) & 3;
            if ((af | 0) == 2) {
                if (!!(ne & (1 << 11)) | !(ne & (1 << 9)))
                    fe(13, pe & 65532);
                if ((bf | 0) != (Ne | 0) | (Be | 0) != (Ne | 0))
                    fe(13, pe & 65532);
            } else {
                if ((ne & ((1 << 11) | (1 << 9))) == (1 << 11))
                    fe(13, pe & 65532);
                if (!(ne & (1 << 11)) | !(ne & (1 << 10))) {
                    if ((Be | 0) < (Ne | 0) | (Be | 0) < (bf | 0))
                        fe(13, pe & 65532);
                }
            }
            if (!(ne & (1 << 15))) {
                if ((af | 0) == 2)
                    fe(12, pe & 65532);
                else
                    fe(11, pe & 65532);
            }
            if (!(ne & (1 << 8))) {
                ne = ne | (1 << 8);
                bc(aa, ne);
            }
            we(af, pe, te(qe, ne) | 0, re(qe, ne) | 0, ne);
        }
    }
    function cf(af, pe) {
        af = af | 0;
        pe = pe | 0;
        var ha = 0;
        pe = pe & 65535;
        if (!(ua & (1 << 0))) {
            Ya[(((af) << 4) + (128 + 0)) >> 2] = pe;
            Ya[(((af) << 4) + (128 + 4)) >> 2] = pe << 4;
        } else if (ta & 131072) {
            ze(af, pe);
        } else {
            Ze(af, pe);
        }
    }
    function df(ef, ff) {
        ef = ef | 0;
        ff = ff | 0;
        Na = ff,
        Oa = Qa = 0,
        Sa = 8192;
        Ya[(((1) << 4) + (128 + 0)) >> 2] = ef;
        Ya[(((1) << 4) + (128 + 4)) >> 2] = ef << 4;
        ve();
    }
    function gf(ef, ff) {
        ef = ef | 0;
        ff = ff | 0;
        var hf = 0
          , Ce = 0
          , qe = 0
          , ne = 0
          , Ne = 0
          , Be = 0
          , bf = 0
          , se = 0
          , e = 0;
        if ((ef & 65532) == 0)
            fe(13, 0);
        e = oe(ef) | 0;
        if (!e)
            fe(13, ef & 65532);
        qe = Ga;
        ne = Ha;
        Ne = sa;
        if (ne & (1 << 12)) {
            if (!(ne & (1 << 11)))
                fe(13, ef & 65532);
            Be = (ne >> 13) & 3;
            if (ne & (1 << 10)) {
                if ((Be | 0) > (Ne | 0))
                    fe(13, ef & 65532);
            } else {
                bf = ef & 3;
                if ((bf | 0) > (Ne | 0))
                    fe(13, ef & 65532);
                if ((Be | 0) != (Ne | 0))
                    fe(13, ef & 65532);
            }
            if (!(ne & (1 << 15)))
                fe(11, ef & 65532);
            se = re(qe, ne) | 0;
            if ((ff >>> 0) > (se >>> 0))
                fe(13, ef & 65532);
            we(1, (ef & 65532) | Ne, te(qe, ne) | 0, se, ne);
            Na = ff,
            Oa = Qa = 0,
            Sa = 8192;
        } else {
            fb(727);
        }
    }
    function jf(ef, ff) {
        ef = ef | 0;
        ff = ff | 0;
        if (!(ua & (1 << 0)) | !!(ta & 131072)) {
            df(ef, ff);
        } else {
            gf(ef, ff);
        }
    }
    function kf(af, Ne) {
        af = af | 0;
        Ne = Ne | 0;
        var Be = 0
          , ne = 0;
        if (((af | 0) == 4 | (af | 0) == 5) & ((Ya[(((af) << 4) + (128 + 0)) >> 2] | 0) & 65532) == 0)
            return;
        ne = (Ya[(((af) << 4) + (128 + 12)) >> 2] | 0);
        Be = (ne >> 13) & 3;
        if (!(ne & (1 << 11)) | !(ne & (1 << 10))) {
            if ((Be | 0) < (Ne | 0)) {
                we(af, 0, 0, 0, 0);
            }
        }
    }
    function lf(De, ef, ff, Je) {
        De = De | 0;
        ef = ef | 0;
        ff = ff | 0;
        Je = Je | 0;
        var Fe = 0
          , aa = 0;
        Fe = (Ya[((4) << 2) >> 2] | 0);
        if (De) {
            {
                Fe = (Fe - 4) | 0;
                aa = ((Fe & Ka) + Ja) | 0;
                Pb(aa, (Ya[(((1) << 4) + (128 + 0)) >> 2] | 0));
            }
            ;{
                Fe = (Fe - 4) | 0;
                aa = ((Fe & Ka) + Ja) | 0;
                Pb(aa, Je);
            }
            ;
        } else {
            {
                Fe = (Fe - 2) | 0;
                aa = ((Fe & Ka) + Ja) | 0;
                Nb(aa, (Ya[(((1) << 4) + (128 + 0)) >> 2] | 0));
            }
            ;{
                Fe = (Fe - 2) | 0;
                aa = ((Fe & Ka) + Ja) | 0;
                Nb(aa, Je);
            }
            ;
        }
        Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | ((Fe) & Ka);
        Na = ff,
        Oa = Qa = 0,
        Sa = 8192;
        Ya[(((1) << 4) + (128 + 0)) >> 2] = ef;
        Ya[(((1) << 4) + (128 + 4)) >> 2] = ef << 4;
        ve();
    }
    function mf(De, ef, ff, Je) {
        De = De | 0;
        ef = ef | 0;
        ff = ff | 0;
        Je = Je | 0;
        var Pe = 0
          , i = 0
          , e = 0;
        var qe = 0
          , ne = 0
          , Ne = 0
          , Be = 0
          , bf = 0
          , pe = 0
          , Qe = 0
          , nf = 0;
        var Ee = 0
          , Re = 0
          , Se = 0
          , of = 0
          , Ce = 0
          , Me = 0
          , Ka = 0;
        var da = 0
          , se = 0
          , pf = 0;
        var Le = 0
          , qf = 0
          , rf = 0
          , aa = 0;
        if ((ef & 65532) == 0)
            fe(13, 0);
        e = oe(ef) | 0;
        if (!e)
            fe(13, ef & 65532);
        qe = Ga;
        ne = Ha;
        Ne = sa;
        rf = (Ya[((4) << 2) >> 2] | 0);
        if (ne & (1 << 12)) {
            if (!(ne & (1 << 11)))
                fe(13, ef & 65532);
            Be = (ne >> 13) & 3;
            if (ne & (1 << 10)) {
                if ((Be | 0) > (Ne | 0))
                    fe(13, ef & 65532);
            } else {
                bf = ef & 3;
                if ((bf | 0) > (Ne | 0))
                    fe(13, ef & 65532);
                if ((Be | 0) != (Ne | 0))
                    fe(13, ef & 65532);
            }
            if (!(ne & (1 << 15)))
                fe(11, ef & 65532);
            {
                of = rf;
                Ka = me((Ya[(((2) << 4) + (128 + 12)) >> 2] | 0)) | 0;
                Le = (Ya[(((2) << 4) + (128 + 4)) >> 2] | 0);
                if (De) {
                    {
                        of = (of - 4) | 0;
                        aa = (Le + (of & Ka)) | 0;
                        bc(aa, (Ya[(((1) << 4) + (128 + 0)) >> 2] | 0));
                    }
                    ;{
                        of = (of - 4) | 0;
                        aa = (Le + (of & Ka)) | 0;
                        bc(aa, Je);
                    }
                    ;
                } else {
                    {
                        of = (of - 2) | 0;
                        aa = (Le + (of & Ka)) | 0;
                        Zb(aa, (Ya[(((1) << 4) + (128 + 0)) >> 2] | 0));
                    }
                    ;{
                        of = (of - 2) | 0;
                        aa = (Le + (of & Ka)) | 0;
                        Zb(aa, Je);
                    }
                    ;
                }
                se = re(qe, ne) | 0;
                if ((ff >>> 0) > (se >>> 0))
                    fe(13, ef & 65532);
                Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | ((of) & Ka);
                we(1, (ef & 65532) | Ne, te(qe, ne) | 0, se, ne);
                Na = ff,
                Oa = Qa = 0,
                Sa = 8192;
            }
        } else {
            Ce = (ne >> 8) & 31;
            Be = (ne >> 13) & 3;
            bf = ef & 3;
            switch (Ce | 0) {
            case 1:
            case 9:
            case 5:
                fb(869);
                return;
            case 4:
            case 12:
                break;
            default:
                fe(13, ef & 65532);
                break;
            }
            De = Ce >> 3;
            if ((Be | 0) < (Ne | 0) | (Be | 0) < (bf | 0))
                fe(13, ef & 65532);
            if (!(ne & (1 << 15)))
                fe(11, ef & 65532);
            pe = qe >> 16;
            Qe = (ne & 0xffff0000) | (qe & 65535);
            nf = ne & 31;
            if ((pe & 65532) == 0)
                fe(13, 0);
            e = oe(pe) | 0;
            if (!e)
                fe(13, pe & 65532);
            qe = Ga;
            ne = Ha;
            if (!(ne & (1 << 12)) | !(ne & ((1 << 11))))
                fe(13, pe & 65532);
            Be = (ne >> 13) & 3;
            if ((Be | 0) > (Ne | 0))
                fe(13, pe & 65532);
            if (!(ne & (1 << 15)))
                fe(11, pe & 65532);
            if (!(ne & (1 << 10)) & (Be | 0) < (Ne | 0)) {
                of = Ae(Be) | 0;
                Ee = Ga;
                if ((Ee & 65532) == 0)
                    fe(10, Ee & 65532);
                if ((Ee & 3) != (Be | 0))
                    fe(10, Ee & 65532);
                e = oe(Ee) | 0;
                if (!e)
                    fe(10, Ee & 65532);
                Re = Ga;
                Se = Ha;
                Me = (Se >> 13) & 3;
                if ((Me | 0) != (Be | 0))
                    fe(10, Ee & 65532);
                if (!(Se & (1 << 12)) | !!(Se & (1 << 11)) | !(Se & (1 << 9)))
                    fe(10, Ee & 65532);
                if (!(Se & (1 << 15)))
                    fe(10, Ee & 65532);
                pf = me((Ya[(((2) << 4) + (128 + 12)) >> 2] | 0)) | 0;
                qf = (Ya[(((2) << 4) + (128 + 4)) >> 2] | 0);
                Ka = me(Se) | 0;
                Le = te(Re, Se) | 0;
                if (De) {
                    {
                        of = (of - 4) | 0;
                        aa = (Le + (of & Ka)) | 0;
                        bc(aa, (Ya[(((2) << 4) + (128 + 0)) >> 2] | 0));
                    }
                    ;{
                        of = (of - 4) | 0;
                        aa = (Le + (of & Ka)) | 0;
                        bc(aa, rf);
                    }
                    ;for (i = (nf - 1) | 0; (i | 0) >= 0; i = (i - 1) | 0) {
                        aa = (qf + ((rf + (i << 2)) & pf)) | 0;
                        da = Vb(aa) | 0;
                        {
                            of = (of - 4) | 0;
                            aa = (Le + (of & Ka)) | 0;
                            bc(aa, da);
                        }
                        ;
                    }
                } else {
                    {
                        of = (of - 2) | 0;
                        aa = (Le + (of & Ka)) | 0;
                        Zb(aa, (Ya[(((2) << 4) + (128 + 0)) >> 2] | 0));
                    }
                    ;{
                        of = (of - 2) | 0;
                        aa = (Le + (of & Ka)) | 0;
                        Zb(aa, rf);
                    }
                    ;for (i = (nf - 1) | 0; (i | 0) >= 0; i = (i - 1) | 0) {
                        aa = (qf + ((rf + (i << 1)) & pf)) | 0;
                        da = Tb(aa) | 0;
                        {
                            of = (of - 2) | 0;
                            aa = (Le + (of & Ka)) | 0;
                            Zb(aa, da);
                        }
                        ;
                    }
                }
                Pe = 1;
            } else {
                of = rf;
                Ka = me((Ya[(((2) << 4) + (128 + 12)) >> 2] | 0)) | 0;
                Le = (Ya[(((2) << 4) + (128 + 4)) >> 2] | 0);
                Pe = 0;
            }
            if (De) {
                {
                    of = (of - 4) | 0;
                    aa = (Le + (of & Ka)) | 0;
                    bc(aa, (Ya[(((1) << 4) + (128 + 0)) >> 2] | 0));
                }
                ;{
                    of = (of - 4) | 0;
                    aa = (Le + (of & Ka)) | 0;
                    bc(aa, Je);
                }
                ;
            } else {
                {
                    of = (of - 2) | 0;
                    aa = (Le + (of & Ka)) | 0;
                    Zb(aa, (Ya[(((1) << 4) + (128 + 0)) >> 2] | 0));
                }
                ;{
                    of = (of - 2) | 0;
                    aa = (Le + (of & Ka)) | 0;
                    Zb(aa, Je);
                }
                ;
            }
            if (Pe) {
                Ee = (Ee & ~3) | Be;
                we(2, Ee, Le, re(Re, Se) | 0, Se);
            }
            pe = (pe & ~3) | Be;
            we(1, pe, te(qe, ne) | 0, re(qe, ne) | 0, ne);
            Gd(Be);
            Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | ((of) & Ka);
            Na = Qe,
            Oa = Qa = 0,
            Sa = 8192;
        }
    }
    function sf(De, ef, ff, Je) {
        De = De | 0;
        ef = ef | 0;
        ff = ff | 0;
        Je = Je | 0;
        if (!(ua & (1 << 0)) | !!(ta & 131072)) {
            lf(De, ef, ff, Je);
        } else {
            mf(De, ef, ff, Je);
        }
    }
    function tf(De, uf, vf) {
        De = De | 0;
        uf = uf | 0;
        vf = vf | 0;
        var of = 0
          , ef = 0
          , ff = 0
          , wf = 0
          , Ka = 0
          , Le = 0
          , xf = 0
          , aa = 0;
        Ka = 65535;
        of = (Ya[((4) << 2) >> 2] | 0);
        Le = (Ya[(((2) << 4) + (128 + 4)) >> 2] | 0);
        if ((De | 0) == 1) {
            {
                aa = (Le + (of & Ka)) | 0;
                ff = Vb(aa) | 0;
                of = (of + 4) | 0;
            }
            ;{
                aa = (Le + (of & Ka)) | 0;
                ef = Vb(aa) | 0;
                of = (of + 4) | 0;
            }
            ;ef = ef & 65535;
            if (uf) {
                aa = (Le + (of & Ka)) | 0;
                wf = Vb(aa) | 0;
                of = (of + 4) | 0;
            }
            ;
        } else {
            {
                aa = (Le + (of & Ka)) | 0;
                ff = Tb(aa) | 0;
                of = (of + 2) | 0;
            }
            ;{
                aa = (Le + (of & Ka)) | 0;
                ef = Tb(aa) | 0;
                of = (of + 2) | 0;
            }
            ;if (uf) {
                aa = (Le + (of & Ka)) | 0;
                wf = Tb(aa) | 0;
                of = (of + 2) | 0;
            }
            ;
        }
        Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | ((of + vf) & Ka);
        Ya[(((1) << 4) + (128 + 0)) >> 2] = ef;
        Ya[(((1) << 4) + (128 + 4)) >> 2] = ef << 4;
        Na = ff,
        Oa = Qa = 0,
        Sa = 8192;
        if (uf) {
            if (ta & 131072)
                xf = 256 | 262144 | 2097152 | 512 | 65536 | 16384;
            else
                xf = 256 | 262144 | 2097152 | 512 | 12288 | 65536 | 16384;
            if ((De | 0) == 0)
                xf = xf & 65535;
            Ed(wf, xf);
        }
        ve();
    }
    function yf(De, uf, vf) {
        De = De | 0;
        uf = uf | 0;
        vf = vf | 0;
        var ef = 0
          , wf = 0
          , zf = 0;
        var Af = 0
          , Bf = 0
          , Cf = 0
          , Df = 0;
        var e = 0
          , qe = 0
          , ne = 0
          , Re = 0
          , Se = 0;
        var Ne = 0
          , Be = 0
          , bf = 0
          , xf = 0
          , Ef = 0;
        var Le = 0
          , of = 0
          , ff = 0
          , Ld = 0
          , Ka = 0
          , aa = 0;
        Ka = me((Ya[(((2) << 4) + (128 + 12)) >> 2] | 0)) | 0;
        of = (Ya[((4) << 2) >> 2] | 0);
        Le = (Ya[(((2) << 4) + (128 + 4)) >> 2] | 0);
        wf = 0;
        if ((De | 0) == 1) {
            {
                aa = (Le + (of & Ka)) | 0;
                ff = Vb(aa) | 0;
                of = (of + 4) | 0;
            }
            ;{
                aa = (Le + (of & Ka)) | 0;
                ef = Vb(aa) | 0;
                of = (of + 4) | 0;
            }
            ;ef = ef & 65535;
            if (uf) {
                {
                    aa = (Le + (of & Ka)) | 0;
                    wf = Vb(aa) | 0;
                    of = (of + 4) | 0;
                }
                ;if (wf & 131072) {
                    {
                        aa = (Le + (of & Ka)) | 0;
                        Ld = Vb(aa) | 0;
                        of = (of + 4) | 0;
                    }
                    ;{
                        aa = (Le + (of & Ka)) | 0;
                        zf = Vb(aa) | 0;
                        of = (of + 4) | 0;
                    }
                    ;{
                        aa = (Le + (of & Ka)) | 0;
                        Af = Vb(aa) | 0;
                        of = (of + 4) | 0;
                    }
                    ;{
                        aa = (Le + (of & Ka)) | 0;
                        Bf = Vb(aa) | 0;
                        of = (of + 4) | 0;
                    }
                    ;{
                        aa = (Le + (of & Ka)) | 0;
                        Cf = Vb(aa) | 0;
                        of = (of + 4) | 0;
                    }
                    ;{
                        aa = (Le + (of & Ka)) | 0;
                        Df = Vb(aa) | 0;
                        of = (of + 4) | 0;
                    }
                    ;Ed(wf, 256 | 262144 | 2097152 | 512 | 12288 | 131072 | 16384 | 524288 | 1048576);
                    ze(1, ef & 65535);
                    Gd(3);
                    ze(2, zf & 65535);
                    ze(0, Af & 65535);
                    ze(3, Bf & 65535);
                    ze(4, Cf & 65535);
                    ze(5, Df & 65535);
                    Na = ff & 65535,
                    Oa = Qa = 0,
                    Sa = 8192;
                    Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | ((Ld) & Ka);
                    return;
                }
            }
        } else {
            {
                aa = (Le + (of & Ka)) | 0;
                ff = Tb(aa) | 0;
                of = (of + 2) | 0;
            }
            ;{
                aa = (Le + (of & Ka)) | 0;
                ef = Tb(aa) | 0;
                of = (of + 2) | 0;
            }
            ;if (uf) {
                aa = (Le + (of & Ka)) | 0;
                wf = Tb(aa) | 0;
                of = (of + 2) | 0;
            }
            ;
        }
        if ((ef & 65532) == 0)
            fe(13, ef & 65532);
        e = oe(ef) | 0;
        if (!e)
            fe(13, ef & 65532);
        qe = Ga;
        ne = Ha;
        if (!(ne & (1 << 12)) | !(ne & (1 << 11)))
            fe(13, ef & 65532);
        Ne = sa;
        bf = ef & 3;
        if ((bf | 0) < (Ne | 0))
            fe(13, ef & 65532);
        Be = (ne >> 13) & 3;
        if (ne & (1 << 10)) {
            if ((Be | 0) > (bf | 0))
                fe(13, ef & 65532);
        } else {
            if ((Be | 0) != (bf | 0))
                fe(13, ef & 65532);
        }
        if (!(ne & (1 << 15)))
            fe(11, ef & 65532);
        of = (of + vf) | 0;
        if ((bf | 0) == (Ne | 0)) {
            we(1, ef, te(qe, ne) | 0, re(qe, ne) | 0, ne);
        } else {
            if ((De | 0) == 1) {
                {
                    aa = (Le + (of & Ka)) | 0;
                    Ld = Vb(aa) | 0;
                    of = (of + 4) | 0;
                }
                ;{
                    aa = (Le + (of & Ka)) | 0;
                    zf = Vb(aa) | 0;
                    of = (of + 4) | 0;
                }
                ;zf = zf & 65535;
            } else {
                {
                    aa = (Le + (of & Ka)) | 0;
                    Ld = Tb(aa) | 0;
                    of = (of + 2) | 0;
                }
                ;{
                    aa = (Le + (of & Ka)) | 0;
                    zf = Tb(aa) | 0;
                    of = (of + 2) | 0;
                }
                ;
            }
            if ((zf & 65532) == 0) {
                fe(13, 0);
            } else {
                if ((zf & 3) != (bf | 0))
                    fe(13, zf & 65532);
                e = oe(zf) | 0;
                if (!e)
                    fe(13, zf & 65532);
                Re = Ga;
                Se = Ha;
                if (!(Se & (1 << 12)) | !!(Se & (1 << 11)) | !(Se & (1 << 9)))
                    fe(13, zf & 65532);
                Be = (Se >> 13) & 3;
                if ((Be | 0) != (bf | 0))
                    fe(13, zf & 65532);
                if (!(Se & (1 << 15)))
                    fe(11, zf & 65532);
                we(2, zf, te(Re, Se) | 0, re(Re, Se) | 0, Se);
            }
            we(1, ef, te(qe, ne) | 0, re(qe, ne) | 0, ne);
            Gd(bf);
            of = Ld;
            Ka = me(Se) | 0;
            kf(0, bf);
            kf(3, bf);
            kf(4, bf);
            kf(5, bf);
            of = (of + vf) | 0;
        }
        Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | ((of) & Ka);
        Na = ff,
        Oa = Qa = 0,
        Sa = 8192;
        if (uf) {
            xf = 256 | 262144 | 2097152 | 65536 | 16384;
            if ((Ne | 0) == 0)
                xf = xf | 12288;
            Ef = (ta >> 12) & 3;
            if ((Ne | 0) <= (Ef | 0))
                xf = xf | 512;
            if ((De | 0) == 0)
                xf = xf & 65535;
            Ed(wf, xf);
        }
    }
    function Ff(De) {
        De = De | 0;
        var Ef = 0;
        if (!(ua & (1 << 0)) | !!(ta & 131072)) {
            if (ta & 131072) {
                Ef = (ta >> 12) & 3;
                if ((Ef | 0) != 3)
                    Uc(13);
            }
            tf(De, 1, 0);
        } else {
            if (ta & 16384) {
                fb(1217);
            } else {
                yf(De, 1, 0);
            }
        }
    }
    function Gf(De, vf) {
        De = De | 0;
        vf = vf | 0;
        if (!(ua & (1 << 0)) | !!(ta & 131072)) {
            tf(De, 0, vf);
        } else {
            yf(De, 0, vf);
        }
    }
    function Hf(pe, If) {
        pe = pe | 0;
        If = If | 0;
        var e = 0
          , qe = 0
          , ne = 0
          , bf = 0
          , Be = 0
          , Ne = 0
          , Ce = 0;
        if ((pe & 65532) == 0)
            return 0;
        e = oe(pe) | 0;
        if (!e)
            return 0;
        qe = Ga;
        ne = Ha;
        bf = pe & 3;
        Be = (ne >> 13) & 3;
        Ne = sa;
        if (ne & (1 << 12)) {
            if (!!(ne & (1 << 11)) & !!(ne & (1 << 10))) {} else {
                if ((Be | 0) < (Ne | 0) | (Be | 0) < (bf | 0))
                    return 0;
            }
        } else {
            Ce = (ne >> 8) & 15;
            switch (Ce | 0) {
            case 1:
            case 2:
            case 3:
            case 9:
            case 11:
                break;
            case 4:
            case 5:
            case 12:
                if (If)
                    return 0;
                break;
            default:
                return 0;
            }
            if ((Be | 0) < (Ne | 0) | (Be | 0) < (bf | 0))
                return 0;
        }
        if (If) {
            Ga = re(qe, ne) | 0;
        } else {
            Ga = ne & 15793920;
        }
        return 1;
    }
    function Jf(De, If) {
        De = De | 0;
        If = If | 0;
        var da = 0
          , hc = 0
          , fc = 0
          , pe = 0
          , aa = 0;
        if (!(ua & (1 << 0)) | !!(ta & 131072))
            Uc(6);
        hc = Wa[Oa] | 0;
        Oa = (Oa + 1) | 0;
        fc = (hc >> 3) & 7;
        if ((hc >> 6) == 3) {
            pe = (Ya[((hc & 7) << 2) >> 2] | 0) & 65535;
        } else {
            aa = gc(hc) | 0;
            pe = Bb(aa) | 0;
        }
        da = Hf(pe, If) | 0;
        ma = Bd() | 0;
        if (!da) {
            ma = ma & ~64;
        } else {
            ma = ma | 64;
            if (De) {
                Ya[((fc) << 2) >> 2] = Ga;
            } else {
                Xa[((fc) << 2) >> 1] = Ga;
            }
        }
        na = ((ma >> 6) & 1) ^ 1;
        oa = 24;
    }
    function Kf(pe, Jd) {
        pe = pe | 0;
        Jd = Jd | 0;
        var e = 0
          , qe = 0
          , ne = 0
          , bf = 0
          , Be = 0
          , Ne = 0;
        if ((pe & 65532) == 0)
            return 0;
        e = oe(pe) | 0;
        if (!e)
            return 0;
        qe = Ga;
        ne = Ha;
        if (!(ne & (1 << 12)))
            return 0;
        bf = pe & 3;
        Be = (ne >> 13) & 3;
        Ne = sa;
        if (ne & (1 << 11)) {
            if (Jd) {
                return 0;
            } else {
                if (!(ne & (1 << 9)))
                    return 1;
                if (!(ne & (1 << 10))) {
                    if ((Be | 0) < (Ne | 0) | (Be | 0) < (bf | 0))
                        return 0;
                }
            }
        } else {
            if ((Be | 0) < (Ne | 0) | (Be | 0) < (bf | 0))
                return 0;
            if (Jd & !(ne & (1 << 9)))
                return 0;
        }
        return 1;
    }
    function Lf(pe, Jd) {
        pe = pe | 0;
        Jd = Jd | 0;
        var z = 0;
        z = Kf(pe, Jd) | 0;
        ma = Bd() | 0;
        if (z)
            ma = ma | 64;
        else
            ma = ma & ~64;
        na = ((ma >> 6) & 1) ^ 1;
        oa = 24;
    }
    function Mf() {
        var hc = 0
          , da = 0
          , dc = 0
          , Nf = 0
          , aa = 0;
        if (!(ua & (1 << 0)) | !!(ta & 131072))
            Uc(6);
        hc = Wa[Oa] | 0;
        Oa = (Oa + 1) | 0;
        if ((hc >> 6) == 3) {
            Nf = hc & 7;
            da = (Ya[((Nf) << 2) >> 2] | 0) & 65535;
        } else {
            aa = gc(hc) | 0;
            da = Hb(aa) | 0;
        }
        dc = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
        ma = Bd() | 0;
        if ((da & 3) < (dc & 3)) {
            da = (da & ~3) | (dc & 3);
            if ((hc >> 6) == 3) {
                Xa[((Nf) << 2) >> 1] = da;
            } else {
                Nb(aa, da);
            }
            ma = ma | 64;
        } else {
            ma = ma & ~64;
        }
        na = ((ma >> 6) & 1) ^ 1;
        oa = 24;
    }
    function Of() {
        var kc = 0;
        kc = (Ya[((0) << 2) >> 2] | 0);
        switch (kc | 0) {
        case 0:
            Ya[((0) << 2) >> 2] = 1;
            Ya[((3) << 2) >> 2] = 1970169159 | 0;
            Ya[((2) << 2) >> 2] = 1231384169 | 0;
            Ya[((1) << 2) >> 2] = 1818588270 | 0;
            break;
        case 1:
        default:
            Ya[((0) << 2) >> 2] = (5 << 8) | (4 << 4) | 3;
            Ya[((3) << 2) >> 2] = 8 << 8;
            Ya[((1) << 2) >> 2] = 0;
            Ya[((2) << 2) >> 2] = (1 << 4);
            break;
        }
    }
    function Pf(ic) {
        ic = ic | 0;
        var Qf = 0
          , Rf = 0;
        if ((ic | 0) == 0)
            Uc(0);
        Qf = (Ya[((0) << 2) >> 2] | 0) & 255;
        Rf = ((Qf | 0) / (ic | 0)) | 0;
        Qf = ((Qf | 0) % (ic | 0)) | 0;
        Ya[((0) << 2) >> 2] = ((Ya[((0) << 2) >> 2] | 0) & ~65535) | Qf | (Rf << 8);
        na = (((Qf) << 24) >> 24);
        oa = 12;
    }
    function Sf(ic) {
        ic = ic | 0;
        var Qf = 0
          , Rf = 0;
        Qf = (Ya[((0) << 2) >> 2] | 0) & 255;
        Rf = ((Ya[((0) << 2) >> 2] | 0) >> 8) & 255;
        Qf = ((ib(Rf, ic) | 0) + Qf) & 255;
        Ya[((0) << 2) >> 2] = ((Ya[((0) << 2) >> 2] | 0) & ~65535) | Qf;
        na = (((Qf) << 24) >> 24);
        oa = 12;
    }
    function Tf() {
        var Uf = 0
          , Qf = 0
          , Rf = 0
          , Vf = 0
          , Dd = 0;
        Dd = Bd() | 0;
        Vf = Dd & 16;
        Qf = (Ya[((0) << 2) >> 2] | 0) & 255;
        Rf = ((Ya[((0) << 2) >> 2] | 0) >> 8) & 255;
        Uf = ((Qf | 0) > 249);
        if (((Qf & 15) > 9) | ((Vf | 0) != 0)) {
            Qf = (Qf + 6) & 15;
            Rf = (Rf + 1 + Uf) & 255;
            Dd = Dd | 1 | 16;
        } else {
            Dd = Dd & ~(1 | 16);
            Qf = Qf & 15;
        }
        Ya[((0) << 2) >> 2] = ((Ya[((0) << 2) >> 2] | 0) & ~65535) | Qf | (Rf << 8);
        ma = Dd;
        na = ((ma >> 6) & 1) ^ 1;
        oa = 24;
    }
    function Wf() {
        var Uf = 0
          , Qf = 0
          , Rf = 0
          , Vf = 0
          , Dd = 0;
        Dd = Bd() | 0;
        Vf = Dd & 16;
        Qf = (Ya[((0) << 2) >> 2] | 0) & 255;
        Rf = ((Ya[((0) << 2) >> 2] | 0) >> 8) & 255;
        Uf = ((Qf | 0) < 6);
        if (((Qf & 15) > 9) | !!Vf) {
            Qf = (Qf - 6) & 15;
            Rf = (Rf - 1 - Uf) & 255;
            Dd = Dd | 1 | 16;
        } else {
            Dd = Dd & ~(1 | 16);
            Qf = Qf & 15;
        }
        Ya[((0) << 2) >> 2] = ((Ya[((0) << 2) >> 2] | 0) & ~65535) | Qf | (Rf << 8);
        ma = Dd;
        na = ((ma >> 6) & 1) ^ 1;
        oa = 24;
    }
    function Xf() {
        var Qf = 0
          , Vf = 0
          , Yf = 0
          , Dd = 0;
        Dd = Bd() | 0;
        Yf = Dd & 1;
        Vf = Dd & 16;
        Qf = (Ya[((0) << 2) >> 2] | 0) & 255;
        Dd = 0;
        if (((Qf & 15) > 9) | !!Vf) {
            Qf = (Qf + 6) & 255;
            Dd = Dd | 16;
        }
        if (((Qf | 0) > 159) | !!Yf) {
            Qf = (Qf + 96) & 255;
            Dd = Dd | 1;
        }
        Ya[((0) << 2) >> 2] = ((Ya[((0) << 2) >> 2] | 0) & ~255) | Qf;
        Dd = Dd | (((Qf | 0) == 0) << 6);
        Dd = Dd | (Wa[(3840 + Qf) >> 0] << 2);
        Dd = Dd | (Qf & 128);
        ma = Dd;
        na = ((ma >> 6) & 1) ^ 1;
        oa = 24;
    }
    function Zf() {
        var Qf = 0
          , ag = 0
          , Vf = 0
          , Yf = 0
          , Dd = 0;
        Dd = Bd() | 0;
        Yf = Dd & 1;
        Vf = Dd & 16;
        Qf = (Ya[((0) << 2) >> 2] | 0) & 255;
        Dd = 0;
        ag = Qf;
        if (((Qf & 15) > 9) | !!Vf) {
            Dd = Dd | 16;
            if ((Qf | 0) < 6 | !!Yf)
                Dd = Dd | 1;
            Qf = (Qf - 6) & 255;
        }
        if (((ag | 0) > 153) | !!Yf) {
            Qf = (Qf - 96) & 255;
            Dd = Dd | 1;
        }
        Ya[((0) << 2) >> 2] = ((Ya[((0) << 2) >> 2] | 0) & ~255) | Qf;
        Dd = Dd | (((Qf | 0) == 0) << 6);
        Dd = Dd | (Wa[(3840 + Qf) >> 0] << 2);
        Dd = Dd | (Qf & 128);
        ma = Dd;
        na = ((ma >> 6) & 1) ^ 1;
        oa = 24;
    }
    function bg() {
        var hc = 0
          , da = 0
          , dc = 0
          , cg = 0
          , fc = 0
          , aa = 0;
        hc = Wa[Oa] | 0;
        Oa = (Oa + 1) | 0;
        if ((hc >> 3) == 3)
            Uc(6);
        aa = gc(hc) | 0;
        da = Db(aa) | 0;
        aa = (aa + 4) | 0;
        dc = Db(aa) | 0;
        fc = (hc >> 3) & 7;
        cg = (Ya[((fc) << 2) >> 2] | 0);
        if ((cg | 0) < (da | 0) | (cg | 0) > (dc | 0))
            Uc(5);
    }
    function dg() {
        var hc = 0
          , da = 0
          , dc = 0
          , cg = 0
          , fc = 0
          , aa = 0;
        hc = Wa[Oa] | 0;
        Oa = (Oa + 1) | 0;
        if ((hc >> 3) == 3)
            Uc(6);
        aa = gc(hc) | 0;
        da = ((Bb(aa) | 0) << 16) >> 16;
        aa = (aa + 2) | 0;
        dc = ((Bb(aa) | 0) << 16) >> 16;
        fc = (hc >> 3) & 7;
        cg = ((Ya[((fc) << 2) >> 2] | 0) << 16) >> 16;
        if ((cg | 0) < (da | 0) | (cg | 0) > (dc | 0))
            Uc(5);
    }
    function eg() {
        var da = 0
          , dc = 0
          , fc = 0
          , aa = 0;
        dc = ((Ya[((4) << 2) >> 2] | 0) - 16) | 0;
        aa = ((dc & Ka) + Ja) | 0;
        for (fc = 7; (fc | 0) >= 0; fc = (fc - 1) | 0) {
            da = (Ya[((fc) << 2) >> 2] | 0);
            Nb(aa, da);
            aa = (aa + 2) | 0;
        }
        Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | ((dc) & Ka);
    }
    function fg() {
        var da = 0
          , dc = 0
          , fc = 0
          , aa = 0;
        dc = ((Ya[((4) << 2) >> 2] | 0) - 32) | 0;
        aa = ((dc & Ka) + Ja) | 0;
        for (fc = 7; (fc | 0) >= 0; fc = (fc - 1) | 0) {
            da = (Ya[((fc) << 2) >> 2] | 0);
            Pb(aa, da);
            aa = (aa + 4) | 0;
        }
        Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | ((dc) & Ka);
    }
    function gg() {
        var fc = 0
          , aa = 0;
        aa = (((Ya[((4) << 2) >> 2] | 0) & Ka) + Ja) | 0;
        for (fc = 7; (fc | 0) >= 0; fc = (fc - 1) | 0) {
            if ((fc | 0) != 4) {
                Xa[((fc) << 2) >> 1] = Bb(aa) | 0;
            }
            aa = (aa + 2) | 0;
        }
        Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | (((Ya[((4) << 2) >> 2] | 0) + 16) & Ka);
    }
    function hg() {
        var fc = 0
          , aa = 0;
        aa = (((Ya[((4) << 2) >> 2] | 0) & Ka) + Ja) | 0;
        for (fc = 7; (fc | 0) >= 0; fc = (fc - 1) | 0) {
            if ((fc | 0) != 4) {
                Ya[((fc) << 2) >> 2] = Db(aa) | 0;
            }
            aa = (aa + 4) | 0;
        }
        Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | (((Ya[((4) << 2) >> 2] | 0) + 32) & Ka);
    }
    function ig() {
        var da = 0
          , dc = 0
          , aa = 0;
        dc = (Ya[((5) << 2) >> 2] | 0);
        aa = ((dc & Ka) + Ja) | 0;
        da = Bb(aa) | 0;
        Xa[((5) << 2) >> 1] = da;
        Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | ((dc + 2) & Ka);
    }
    function jg() {
        var da = 0
          , dc = 0
          , aa = 0;
        dc = (Ya[((5) << 2) >> 2] | 0);
        aa = ((dc & Ka) + Ja) | 0;
        da = Db(aa) | 0;
        Ya[((5) << 2) >> 2] = da;
        Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | ((dc + 4) & Ka);
    }
    function kg() {
        var vf = 0
          , lg = 0
          , Fe = 0
          , mg = 0
          , da = 0
          , ng = 0
          , aa = 0;
        vf = cc() | 0;
        lg = Wa[Oa] | 0;
        Oa = (Oa + 1) | 0;
        lg = lg & 31;
        Fe = (Ya[((4) << 2) >> 2] | 0);
        mg = (Ya[((5) << 2) >> 2] | 0);
        {
            Fe = (Fe - 2) | 0;
            aa = ((Fe & Ka) + Ja) | 0;
            Nb(aa, mg);
        }
        ;ng = Fe;
        if ((lg | 0) != 0) {
            while ((lg | 0) > 1) {
                mg = (mg - 2) | 0;
                aa = ((mg & Ka) + Ja) | 0;
                da = Bb(aa) | 0;
                {
                    Fe = (Fe - 2) | 0;
                    aa = ((Fe & Ka) + Ja) | 0;
                    Nb(aa, da);
                }
                ;lg = (lg - 1) | 0;
            }
            {
                Fe = (Fe - 2) | 0;
                aa = ((Fe & Ka) + Ja) | 0;
                Nb(aa, ng);
            }
            ;
        }
        Fe = (Fe - vf) | 0;
        aa = ((Fe & Ka) + Ja) | 0;
        Hb(aa) | 0;
        Ya[((5) << 2) >> 2] = ((Ya[((5) << 2) >> 2] | 0) & ~Ka) | (ng & Ka);
        Ya[((4) << 2) >> 2] = Fe;
    }
    function og() {
        var vf = 0
          , lg = 0
          , Fe = 0
          , mg = 0
          , da = 0
          , ng = 0
          , aa = 0;
        vf = cc() | 0;
        lg = Wa[Oa] | 0;
        Oa = (Oa + 1) | 0;
        lg = lg & 31;
        Fe = (Ya[((4) << 2) >> 2] | 0);
        mg = (Ya[((5) << 2) >> 2] | 0);
        {
            Fe = (Fe - 4) | 0;
            aa = ((Fe & Ka) + Ja) | 0;
            Pb(aa, mg);
        }
        ;ng = Fe;
        if ((lg | 0) != 0) {
            while ((lg | 0) > 1) {
                mg = (mg - 4) | 0;
                aa = ((mg & Ka) + Ja) | 0;
                da = Db(aa) | 0;
                {
                    Fe = (Fe - 4) | 0;
                    aa = ((Fe & Ka) + Ja) | 0;
                    Pb(aa, da);
                }
                ;lg = (lg - 1) | 0;
            }
            {
                Fe = (Fe - 4) | 0;
                aa = ((Fe & Ka) + Ja) | 0;
                Pb(aa, ng);
            }
            ;
        }
        Fe = (Fe - vf) | 0;
        aa = ((Fe & Ka) + Ja) | 0;
        Jb(aa) | 0;
        Ya[((5) << 2) >> 2] = ((Ya[((5) << 2) >> 2] | 0) & ~Ka) | (ng & Ka);
        Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | ((Fe) & Ka);
    }
    function pg(lc) {
        lc = lc | 0;
        var da = 0
          , dc = 0
          , hc = 0
          , aa = 0;
        hc = Wa[Oa] | 0;
        Oa = (Oa + 1) | 0;
        if ((hc >> 3) == 3)
            Uc(6);
        aa = gc(hc) | 0;
        da = Db(aa) | 0;
        aa = (aa + 4) | 0;
        dc = Bb(aa) | 0;
        cf(lc, dc);
        Ya[(((hc >> 3) & 7) << 2) >> 2] = da;
    }
    function qg(lc) {
        lc = lc | 0;
        var da = 0
          , dc = 0
          , hc = 0
          , aa = 0;
        hc = Wa[Oa] | 0;
        Oa = (Oa + 1) | 0;
        if ((hc >> 3) == 3)
            Uc(6);
        aa = gc(hc) | 0;
        da = Bb(aa) | 0;
        aa = (aa + 2) | 0;
        dc = Bb(aa) | 0;
        cf(lc, dc);
        Xa[(((hc >> 3) & 7) << 2) >> 1] = da;
    }
    function rg() {
        var sg = 0
          , tg = 0
          , ug = 0
          , vg = 0
          , Ef = 0
          , da = 0
          , aa = 0;
        Ef = (ta >> 12) & 3;
        if ((sa | 0) > (Ef | 0))
            Uc(13);
        if (Ea & 128)
            sg = 65535;
        else
            sg = -1;
        tg = (Ya[((7) << 2) >> 2] | 0);
        ug = (Ya[((2) << 2) >> 2] | 0) & 65535;
        aa = ((tg & sg) + (Ya[(((0) << 4) + (128 + 4)) >> 2] | 0)) | 0;
        if (Ea & (16 | 32)) {
            vg = (Ya[((1) << 2) >> 2] | 0);
            if ((vg & sg) == 0)
                return;
            ;{
                da = Za(ug | 0) | 0;
                Lb(aa, da);
                Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 0)) & sg);
                vg = (vg & ~sg) | ((vg - 1) & sg);
                Ya[((1) << 2) >> 2] = vg;
                if (vg & sg)
                    Oa = Qa;
                ;
            }
        } else {
            da = Za(ug | 0) | 0;
            Lb(aa, da);
            Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 0)) & sg);
        }
    }
    function wg() {
        var sg = 0
          , xg = 0
          , lc = 0
          , vg = 0
          , ug = 0
          , Ef = 0
          , da = 0
          , aa = 0;
        Ef = (ta >> 12) & 3;
        if ((sa | 0) > (Ef | 0))
            Uc(13);
        if (Ea & 128)
            sg = 65535;
        else
            sg = -1;
        lc = Ea & 15;
        if ((lc | 0) == 0)
            lc = 3;
        else
            lc = (lc - 1) | 0;
        xg = (Ya[((6) << 2) >> 2] | 0);
        ug = (Ya[((2) << 2) >> 2] | 0) & 65535;
        if (Ea & (16 | 32)) {
            vg = (Ya[((1) << 2) >> 2] | 0);
            if ((vg & sg) == 0)
                return;
            ;aa = ((xg & sg) + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
            da = yb(aa) | 0;
            cb(ug | 0, da | 0);
            Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 0)) & sg);
            vg = (vg & ~sg) | ((vg - 1) & sg);
            Ya[((1) << 2) >> 2] = vg;
            if (vg & sg)
                Oa = Qa;
            ;
        } else {
            aa = ((xg & sg) + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
            da = yb(aa) | 0;
            cb(ug | 0, da | 0);
            Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 0)) & sg);
        }
    }
    function yg() {
        var sg = 0
          , tg = 0
          , xg = 0
          , vg = 0
          , lc = 0
          , zg = 0
          , da = 0
          , aa = 0;
        if (Ea & 128)
            sg = 65535;
        else
            sg = -1;
        lc = Ea & 15;
        if ((lc | 0) == 0)
            lc = 3;
        else
            lc = (lc - 1) | 0;
        xg = (Ya[((6) << 2) >> 2] | 0);
        tg = (Ya[((7) << 2) >> 2] | 0);
        aa = ((xg & sg) + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
        zg = ((tg & sg) + (Ya[(((0) << 4) + (128 + 4)) >> 2] | 0)) | 0;
        if (Ea & (16 | 32)) {
            vg = (Ya[((1) << 2) >> 2] | 0);
            if ((vg & sg) == 0)
                return;
            ;{
                da = yb(aa) | 0;
                Lb(zg, da);
                Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 0)) & sg);
                Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 0)) & sg);
                vg = (vg & ~sg) | ((vg - 1) & sg);
                Ya[((1) << 2) >> 2] = vg;
                if (vg & sg)
                    Oa = Qa;
                ;
            }
        } else {
            da = yb(aa) | 0;
            Lb(zg, da);
            Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 0)) & sg);
            Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 0)) & sg);
        }
    }
    function Ag() {
        var sg = 0
          , tg = 0
          , vg = 0
          , aa = 0;
        if (Ea & 128)
            sg = 65535;
        else
            sg = -1;
        tg = (Ya[((7) << 2) >> 2] | 0);
        aa = ((tg & sg) + (Ya[(((0) << 4) + (128 + 4)) >> 2] | 0)) | 0;
        if (Ea & (16 | 32)) {
            vg = (Ya[((1) << 2) >> 2] | 0);
            if ((vg & sg) == 0)
                return;
            ;{
                Lb(aa, (Ya[((0) << 2) >> 2] | 0));
                Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 0)) & sg);
                vg = (vg & ~sg) | ((vg - 1) & sg);
                Ya[((1) << 2) >> 2] = vg;
                if (vg & sg)
                    Oa = Qa;
                ;
            }
        } else {
            Lb(aa, (Ya[((0) << 2) >> 2] | 0));
            Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 0)) & sg);
        }
    }
    function Bg() {
        var sg = 0
          , tg = 0
          , xg = 0
          , vg = 0
          , lc = 0
          , zg = 0
          , da = 0
          , dc = 0
          , aa = 0;
        if (Ea & 128)
            sg = 65535;
        else
            sg = -1;
        lc = Ea & 15;
        if ((lc | 0) == 0)
            lc = 3;
        else
            lc = (lc - 1) | 0;
        xg = (Ya[((6) << 2) >> 2] | 0);
        tg = (Ya[((7) << 2) >> 2] | 0);
        aa = ((xg & sg) + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
        zg = ((tg & sg) + (Ya[(((0) << 4) + (128 + 4)) >> 2] | 0)) | 0;
        if (Ea & (16 | 32)) {
            vg = (Ya[((1) << 2) >> 2] | 0);
            if ((vg & sg) == 0)
                return;
            ;da = yb(aa) | 0;
            dc = yb(zg) | 0;
            xc(7, da, dc) | 0;
            Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 0)) & sg);
            Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 0)) & sg);
            vg = (vg & ~sg) | ((vg - 1) & sg);
            Ya[((1) << 2) >> 2] = vg;
            if (Ea & 16) {
                if (!((na | 0) == 0))
                    return;
            } else {
                if (((na | 0) == 0)
                    )
                        return;
                }
                if (vg & sg)
                    Oa = Qa;
                ;
            } else {
                da = yb(aa) | 0;
                dc = yb(zg) | 0;
                xc(7, da, dc) | 0;
                Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 0)) & sg);
                Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 0)) & sg);
            }
        }
        function Cg() {
            var sg = 0
              , xg = 0
              , lc = 0
              , vg = 0
              , da = 0
              , aa = 0;
            if (Ea & 128)
                sg = 65535;
            else
                sg = -1;
            lc = Ea & 15;
            if ((lc | 0) == 0)
                lc = 3;
            else
                lc = (lc - 1) | 0;
            xg = (Ya[((6) << 2) >> 2] | 0);
            aa = ((xg & sg) + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
            if (Ea & (16 | 32)) {
                vg = (Ya[((1) << 2) >> 2] | 0);
                if ((vg & sg) == 0)
                    return;
                ;da = yb(aa) | 0;
                Ya[((0) << 2) >> 2] = ((Ya[((0) << 2) >> 2] | 0) & -256) | da;
                Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 0)) & sg);
                vg = (vg & ~sg) | ((vg - 1) & sg);
                Ya[((1) << 2) >> 2] = vg;
                if (vg & sg)
                    Oa = Qa;
                ;
            } else {
                da = yb(aa) | 0;
                Ya[((0) << 2) >> 2] = ((Ya[((0) << 2) >> 2] | 0) & -256) | da;
                Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 0)) & sg);
            }
        }
        function Dg() {
            var sg = 0
              , tg = 0
              , vg = 0
              , da = 0
              , aa = 0;
            if (Ea & 128)
                sg = 65535;
            else
                sg = -1;
            tg = (Ya[((7) << 2) >> 2] | 0);
            aa = ((tg & sg) + (Ya[(((0) << 4) + (128 + 4)) >> 2] | 0)) | 0;
            if (Ea & (16 | 32)) {
                vg = (Ya[((1) << 2) >> 2] | 0);
                if ((vg & sg) == 0)
                    return;
                ;da = yb(aa) | 0;
                xc(7, (Ya[((0) << 2) >> 2] | 0), da) | 0;
                Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 0)) & sg);
                vg = (vg & ~sg) | ((vg - 1) & sg);
                Ya[((1) << 2) >> 2] = vg;
                if (Ea & 16) {
                    if (!((na | 0) == 0))
                        return;
                } else {
                    if (((na | 0) == 0)
                        )
                            return;
                    }
                    if (vg & sg)
                        Oa = Qa;
                    ;
                } else {
                    da = yb(aa) | 0;
                    xc(7, (Ya[((0) << 2) >> 2] | 0), da) | 0;
                    Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 0)) & sg);
                }
            }
            function Eg() {
                var sg = 0
                  , tg = 0
                  , ug = 0
                  , vg = 0
                  , Ef = 0
                  , da = 0
                  , aa = 0;
                Ef = (ta >> 12) & 3;
                if ((sa | 0) > (Ef | 0))
                    Uc(13);
                if (Ea & 128)
                    sg = 65535;
                else
                    sg = -1;
                tg = (Ya[((7) << 2) >> 2] | 0);
                ug = (Ya[((2) << 2) >> 2] | 0) & 65535;
                aa = ((tg & sg) + (Ya[(((0) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                if (Ea & (16 | 32)) {
                    vg = (Ya[((1) << 2) >> 2] | 0);
                    if ((vg & sg) == 0)
                        return;
                    ;{
                        da = ab(ug | 0) | 0;
                        Nb(aa, da);
                        Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 1)) & sg);
                        vg = (vg & ~sg) | ((vg - 1) & sg);
                        Ya[((1) << 2) >> 2] = vg;
                        if (vg & sg)
                            Oa = Qa;
                        ;
                    }
                } else {
                    da = ab(ug | 0) | 0;
                    Nb(aa, da);
                    Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 1)) & sg);
                }
            }
            function Fg() {
                var sg = 0
                  , xg = 0
                  , lc = 0
                  , vg = 0
                  , ug = 0
                  , Ef = 0
                  , da = 0
                  , aa = 0;
                Ef = (ta >> 12) & 3;
                if ((sa | 0) > (Ef | 0))
                    Uc(13);
                if (Ea & 128)
                    sg = 65535;
                else
                    sg = -1;
                lc = Ea & 15;
                if ((lc | 0) == 0)
                    lc = 3;
                else
                    lc = (lc - 1) | 0;
                xg = (Ya[((6) << 2) >> 2] | 0);
                ug = (Ya[((2) << 2) >> 2] | 0) & 65535;
                if (Ea & (16 | 32)) {
                    vg = (Ya[((1) << 2) >> 2] | 0);
                    if ((vg & sg) == 0)
                        return;
                    ;aa = ((xg & sg) + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                    da = Bb(aa) | 0;
                    db(ug | 0, da | 0);
                    Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 1)) & sg);
                    vg = (vg & ~sg) | ((vg - 1) & sg);
                    Ya[((1) << 2) >> 2] = vg;
                    if (vg & sg)
                        Oa = Qa;
                    ;
                } else {
                    aa = ((xg & sg) + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                    da = Bb(aa) | 0;
                    db(ug | 0, da | 0);
                    Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 1)) & sg);
                }
            }
            function Gg() {
                var sg = 0
                  , tg = 0
                  , xg = 0
                  , vg = 0
                  , lc = 0
                  , zg = 0
                  , da = 0
                  , aa = 0;
                if (Ea & 128)
                    sg = 65535;
                else
                    sg = -1;
                lc = Ea & 15;
                if ((lc | 0) == 0)
                    lc = 3;
                else
                    lc = (lc - 1) | 0;
                xg = (Ya[((6) << 2) >> 2] | 0);
                tg = (Ya[((7) << 2) >> 2] | 0);
                aa = ((xg & sg) + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                zg = ((tg & sg) + (Ya[(((0) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                if (Ea & (16 | 32)) {
                    vg = (Ya[((1) << 2) >> 2] | 0);
                    if ((vg & sg) == 0)
                        return;
                    ;{
                        da = Bb(aa) | 0;
                        Nb(zg, da);
                        Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 1)) & sg);
                        Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 1)) & sg);
                        vg = (vg & ~sg) | ((vg - 1) & sg);
                        Ya[((1) << 2) >> 2] = vg;
                        if (vg & sg)
                            Oa = Qa;
                        ;
                    }
                } else {
                    da = Bb(aa) | 0;
                    Nb(zg, da);
                    Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 1)) & sg);
                    Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 1)) & sg);
                }
            }
            function Hg() {
                var sg = 0
                  , tg = 0
                  , vg = 0
                  , aa = 0;
                if (Ea & 128)
                    sg = 65535;
                else
                    sg = -1;
                tg = (Ya[((7) << 2) >> 2] | 0);
                aa = ((tg & sg) + (Ya[(((0) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                if (Ea & (16 | 32)) {
                    vg = (Ya[((1) << 2) >> 2] | 0);
                    if ((vg & sg) == 0)
                        return;
                    ;{
                        Nb(aa, (Ya[((0) << 2) >> 2] | 0));
                        Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 1)) & sg);
                        vg = (vg & ~sg) | ((vg - 1) & sg);
                        Ya[((1) << 2) >> 2] = vg;
                        if (vg & sg)
                            Oa = Qa;
                        ;
                    }
                } else {
                    Nb(aa, (Ya[((0) << 2) >> 2] | 0));
                    Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 1)) & sg);
                }
            }
            function Ig() {
                var sg = 0
                  , tg = 0
                  , xg = 0
                  , vg = 0
                  , lc = 0
                  , zg = 0
                  , da = 0
                  , dc = 0
                  , aa = 0;
                if (Ea & 128)
                    sg = 65535;
                else
                    sg = -1;
                lc = Ea & 15;
                if ((lc | 0) == 0)
                    lc = 3;
                else
                    lc = (lc - 1) | 0;
                xg = (Ya[((6) << 2) >> 2] | 0);
                tg = (Ya[((7) << 2) >> 2] | 0);
                aa = ((xg & sg) + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                zg = ((tg & sg) + (Ya[(((0) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                if (Ea & (16 | 32)) {
                    vg = (Ya[((1) << 2) >> 2] | 0);
                    if ((vg & sg) == 0)
                        return;
                    ;da = Bb(aa) | 0;
                    dc = Bb(zg) | 0;
                    uc(7, da, dc) | 0;
                    Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 1)) & sg);
                    Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 1)) & sg);
                    vg = (vg & ~sg) | ((vg - 1) & sg);
                    Ya[((1) << 2) >> 2] = vg;
                    if (Ea & 16) {
                        if (!((na | 0) == 0))
                            return;
                    } else {
                        if (((na | 0) == 0)
                            )
                                return;
                        }
                        if (vg & sg)
                            Oa = Qa;
                        ;
                    } else {
                        da = Bb(aa) | 0;
                        dc = Bb(zg) | 0;
                        uc(7, da, dc) | 0;
                        Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 1)) & sg);
                        Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 1)) & sg);
                    }
                }
                function Jg() {
                    var sg = 0
                      , xg = 0
                      , lc = 0
                      , vg = 0
                      , da = 0
                      , aa = 0;
                    if (Ea & 128)
                        sg = 65535;
                    else
                        sg = -1;
                    lc = Ea & 15;
                    if ((lc | 0) == 0)
                        lc = 3;
                    else
                        lc = (lc - 1) | 0;
                    xg = (Ya[((6) << 2) >> 2] | 0);
                    aa = ((xg & sg) + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                    if (Ea & (16 | 32)) {
                        vg = (Ya[((1) << 2) >> 2] | 0);
                        if ((vg & sg) == 0)
                            return;
                        ;da = Bb(aa) | 0;
                        Ya[((0) << 2) >> 2] = ((Ya[((0) << 2) >> 2] | 0) & -65536) | da;
                        Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 1)) & sg);
                        vg = (vg & ~sg) | ((vg - 1) & sg);
                        Ya[((1) << 2) >> 2] = vg;
                        if (vg & sg)
                            Oa = Qa;
                        ;
                    } else {
                        da = Bb(aa) | 0;
                        Ya[((0) << 2) >> 2] = ((Ya[((0) << 2) >> 2] | 0) & -65536) | da;
                        Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 1)) & sg);
                    }
                }
                function Kg() {
                    var sg = 0
                      , tg = 0
                      , vg = 0
                      , da = 0
                      , aa = 0;
                    if (Ea & 128)
                        sg = 65535;
                    else
                        sg = -1;
                    tg = (Ya[((7) << 2) >> 2] | 0);
                    aa = ((tg & sg) + (Ya[(((0) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                    if (Ea & (16 | 32)) {
                        vg = (Ya[((1) << 2) >> 2] | 0);
                        if ((vg & sg) == 0)
                            return;
                        ;da = Bb(aa) | 0;
                        uc(7, (Ya[((0) << 2) >> 2] | 0), da) | 0;
                        Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 1)) & sg);
                        vg = (vg & ~sg) | ((vg - 1) & sg);
                        Ya[((1) << 2) >> 2] = vg;
                        if (Ea & 16) {
                            if (!((na | 0) == 0))
                                return;
                        } else {
                            if (((na | 0) == 0)
                                )
                                    return;
                            }
                            if (vg & sg)
                                Oa = Qa;
                            ;
                        } else {
                            da = Bb(aa) | 0;
                            uc(7, (Ya[((0) << 2) >> 2] | 0), da) | 0;
                            Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 1)) & sg);
                        }
                    }
                    function Lg() {
                        var sg = 0
                          , tg = 0
                          , ug = 0
                          , vg = 0
                          , Ef = 0
                          , da = 0
                          , aa = 0;
                        var Mg = 0
                          , l = 0
                          , Ng = 0
                          , i = 0
                          , Og = 0;
                        Ef = (ta >> 12) & 3;
                        if ((sa | 0) > (Ef | 0))
                            Uc(13);
                        if (Ea & 128)
                            sg = 65535;
                        else
                            sg = -1;
                        tg = (Ya[((7) << 2) >> 2] | 0);
                        ug = (Ya[((2) << 2) >> 2] | 0) & 65535;
                        aa = ((tg & sg) + (Ya[(((0) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                        if (Ea & (16 | 32)) {
                            vg = (Ya[((1) << 2) >> 2] | 0);
                            if ((vg & sg) == 0)
                                return;
                            ;if ((sg | 0) == -1 & (ra | 0) == 1 & (aa & 3) == 0) {
                                Mg = vg >>> 0;
                                l = (4096 - (aa & 4095)) >> 2;
                                if ((Mg >>> 0) > (l >>> 0))
                                    Mg = l;
                                Ng = Id((Ya[((7) << 2) >> 2] | 0), 1) | 0;
                                for (i = 0; (i | 0) < (Mg | 0); i = (i + 1) | 0) {
                                    da = bb(ug | 0) | 0;
                                    Ya[(Ng + (i << 2)) >> 2] = da;
                                }
                                Og = Mg << 2;
                                Ya[((7) << 2) >> 2] = (tg + Og) | 0;
                                vg = (vg - Mg) | 0;
                                Ya[((1) << 2) >> 2] = vg;
                                if (vg)
                                    Oa = Qa;
                            } else {
                                da = bb(ug | 0) | 0;
                                Pb(aa, da);
                                Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 2)) & sg);
                                vg = (vg & ~sg) | ((vg - 1) & sg);
                                Ya[((1) << 2) >> 2] = vg;
                                if (vg & sg)
                                    Oa = Qa;
                                ;
                            }
                        } else {
                            da = bb(ug | 0) | 0;
                            Pb(aa, da);
                            Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 2)) & sg);
                        }
                    }
                    function Pg() {
                        var sg = 0
                          , xg = 0
                          , lc = 0
                          , vg = 0
                          , ug = 0
                          , Ef = 0
                          , da = 0
                          , aa = 0;
                        Ef = (ta >> 12) & 3;
                        if ((sa | 0) > (Ef | 0))
                            Uc(13);
                        if (Ea & 128)
                            sg = 65535;
                        else
                            sg = -1;
                        lc = Ea & 15;
                        if ((lc | 0) == 0)
                            lc = 3;
                        else
                            lc = (lc - 1) | 0;
                        xg = (Ya[((6) << 2) >> 2] | 0);
                        ug = (Ya[((2) << 2) >> 2] | 0) & 65535;
                        if (Ea & (16 | 32)) {
                            vg = (Ya[((1) << 2) >> 2] | 0);
                            if ((vg & sg) == 0)
                                return;
                            ;aa = ((xg & sg) + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                            da = Db(aa) | 0;
                            eb(ug | 0, da | 0);
                            Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 2)) & sg);
                            vg = (vg & ~sg) | ((vg - 1) & sg);
                            Ya[((1) << 2) >> 2] = vg;
                            if (vg & sg)
                                Oa = Qa;
                            ;
                        } else {
                            aa = ((xg & sg) + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                            da = Db(aa) | 0;
                            eb(ug | 0, da | 0);
                            Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 2)) & sg);
                        }
                    }
                    function Qg() {
                        var sg = 0
                          , tg = 0
                          , xg = 0
                          , vg = 0
                          , lc = 0
                          , zg = 0
                          , da = 0
                          , aa = 0;
                        var Mg = 0
                          , l = 0
                          , Rg = 0
                          , Ng = 0
                          , i = 0
                          , Og = 0;
                        if (Ea & 128)
                            sg = 65535;
                        else
                            sg = -1;
                        lc = Ea & 15;
                        if ((lc | 0) == 0)
                            lc = 3;
                        else
                            lc = (lc - 1) | 0;
                        xg = (Ya[((6) << 2) >> 2] | 0);
                        tg = (Ya[((7) << 2) >> 2] | 0);
                        aa = ((xg & sg) + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                        zg = ((tg & sg) + (Ya[(((0) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                        if (Ea & (16 | 32)) {
                            vg = (Ya[((1) << 2) >> 2] | 0);
                            if ((vg & sg) == 0)
                                return;
                            ;if ((sg | 0) == -1 & (ra | 0) == 1 & ((aa | zg) & 3) == 0) {
                                Mg = vg >>> 0;
                                l = (4096 - (aa & 4095)) >> 2;
                                if ((Mg >>> 0) > (l >>> 0))
                                    Mg = l;
                                l = (4096 - (zg & 4095)) >> 2;
                                if ((Mg >>> 0) > (l >>> 0))
                                    Mg = l;
                                Rg = Id(aa, 0) | 0;
                                Ng = Id(zg, 1) | 0;
                                Og = Mg << 2;
                                for (i = 0; (i | 0) < (Mg | 0); i = (i + 1) | 0)
                                    Ya[(Ng + (i << 2)) >> 2] = Ya[(Rg + (i << 2)) >> 2];
                                Ya[((6) << 2) >> 2] = (xg + Og) | 0;
                                Ya[((7) << 2) >> 2] = (tg + Og) | 0;
                                vg = (vg - Mg) | 0;
                                Ya[((1) << 2) >> 2] = vg;
                                if (vg)
                                    Oa = Qa;
                            } else {
                                da = Db(aa) | 0;
                                Pb(zg, da);
                                Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 2)) & sg);
                                Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 2)) & sg);
                                vg = (vg & ~sg) | ((vg - 1) & sg);
                                Ya[((1) << 2) >> 2] = vg;
                                if (vg & sg)
                                    Oa = Qa;
                                ;
                            }
                        } else {
                            da = Db(aa) | 0;
                            Pb(zg, da);
                            Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 2)) & sg);
                            Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 2)) & sg);
                        }
                    }
                    function Sg() {
                        var sg = 0
                          , tg = 0
                          , vg = 0
                          , aa = 0;
                        var Mg = 0
                          , l = 0
                          , Ng = 0
                          , i = 0
                          , Og = 0
                          , da = 0;
                        if (Ea & 128)
                            sg = 65535;
                        else
                            sg = -1;
                        tg = (Ya[((7) << 2) >> 2] | 0);
                        aa = ((tg & sg) + (Ya[(((0) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                        if (Ea & (16 | 32)) {
                            vg = (Ya[((1) << 2) >> 2] | 0);
                            if ((vg & sg) == 0)
                                return;
                            ;if ((sg | 0) == -1 & (ra | 0) == 1 & (aa & 3) == 0) {
                                Mg = vg >>> 0;
                                l = (4096 - (aa & 4095)) >> 2;
                                if ((Mg >>> 0) > (l >>> 0))
                                    Mg = l;
                                Ng = Id((Ya[((7) << 2) >> 2] | 0), 1) | 0;
                                da = (Ya[((0) << 2) >> 2] | 0);
                                for (i = 0; (i | 0) < (Mg | 0); i = (i + 1) | 0)
                                    Ya[(Ng + (i << 2)) >> 2] = da;
                                Og = Mg << 2;
                                Ya[((7) << 2) >> 2] = (tg + Og) | 0;
                                vg = (vg - Mg) | 0;
                                Ya[((1) << 2) >> 2] = vg;
                                if (vg)
                                    Oa = Qa;
                            } else {
                                Pb(aa, (Ya[((0) << 2) >> 2] | 0));
                                Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 2)) & sg);
                                vg = (vg & ~sg) | ((vg - 1) & sg);
                                Ya[((1) << 2) >> 2] = vg;
                                if (vg & sg)
                                    Oa = Qa;
                                ;
                            }
                        } else {
                            Pb(aa, (Ya[((0) << 2) >> 2] | 0));
                            Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 2)) & sg);
                        }
                    }
                    function Tg() {
                        var sg = 0
                          , tg = 0
                          , xg = 0
                          , vg = 0
                          , lc = 0
                          , zg = 0
                          , da = 0
                          , dc = 0
                          , aa = 0;
                        if (Ea & 128)
                            sg = 65535;
                        else
                            sg = -1;
                        lc = Ea & 15;
                        if ((lc | 0) == 0)
                            lc = 3;
                        else
                            lc = (lc - 1) | 0;
                        xg = (Ya[((6) << 2) >> 2] | 0);
                        tg = (Ya[((7) << 2) >> 2] | 0);
                        aa = ((xg & sg) + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                        zg = ((tg & sg) + (Ya[(((0) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                        if (Ea & (16 | 32)) {
                            vg = (Ya[((1) << 2) >> 2] | 0);
                            if ((vg & sg) == 0)
                                return;
                            ;da = Db(aa) | 0;
                            dc = Db(zg) | 0;
                            oc(7, da, dc) | 0;
                            Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 2)) & sg);
                            Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 2)) & sg);
                            vg = (vg & ~sg) | ((vg - 1) & sg);
                            Ya[((1) << 2) >> 2] = vg;
                            if (Ea & 16) {
                                if (!((na | 0) == 0))
                                    return;
                            } else {
                                if (((na | 0) == 0)
                                    )
                                        return;
                                }
                                if (vg & sg)
                                    Oa = Qa;
                                ;
                            } else {
                                da = Db(aa) | 0;
                                dc = Db(zg) | 0;
                                oc(7, da, dc) | 0;
                                Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 2)) & sg);
                                Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 2)) & sg);
                            }
                        }
                        function Ug() {
                            var sg = 0
                              , xg = 0
                              , lc = 0
                              , vg = 0
                              , da = 0
                              , aa = 0;
                            if (Ea & 128)
                                sg = 65535;
                            else
                                sg = -1;
                            lc = Ea & 15;
                            if ((lc | 0) == 0)
                                lc = 3;
                            else
                                lc = (lc - 1) | 0;
                            xg = (Ya[((6) << 2) >> 2] | 0);
                            aa = ((xg & sg) + (Ya[(((lc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                            if (Ea & (16 | 32)) {
                                vg = (Ya[((1) << 2) >> 2] | 0);
                                if ((vg & sg) == 0)
                                    return;
                                ;da = Db(aa) | 0;
                                Ya[((0) << 2) >> 2] = da;
                                Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 2)) & sg);
                                vg = (vg & ~sg) | ((vg - 1) & sg);
                                Ya[((1) << 2) >> 2] = vg;
                                if (vg & sg)
                                    Oa = Qa;
                                ;
                            } else {
                                da = Db(aa) | 0;
                                Ya[((0) << 2) >> 2] = da;
                                Ya[((6) << 2) >> 2] = (xg & ~sg) | ((xg + (ra << 2)) & sg);
                            }
                        }
                        function Vg() {
                            var sg = 0
                              , tg = 0
                              , vg = 0
                              , da = 0
                              , aa = 0;
                            if (Ea & 128)
                                sg = 65535;
                            else
                                sg = -1;
                            tg = (Ya[((7) << 2) >> 2] | 0);
                            aa = ((tg & sg) + (Ya[(((0) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                            if (Ea & (16 | 32)) {
                                vg = (Ya[((1) << 2) >> 2] | 0);
                                if ((vg & sg) == 0)
                                    return;
                                ;da = Db(aa) | 0;
                                oc(7, (Ya[((0) << 2) >> 2] | 0), da) | 0;
                                Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 2)) & sg);
                                vg = (vg & ~sg) | ((vg - 1) & sg);
                                Ya[((1) << 2) >> 2] = vg;
                                if (Ea & 16) {
                                    if (!((na | 0) == 0))
                                        return;
                                } else {
                                    if (((na | 0) == 0)
                                        )
                                            return;
                                    }
                                    if (vg & sg)
                                        Oa = Qa;
                                    ;
                                } else {
                                    da = Db(aa) | 0;
                                    oc(7, (Ya[((0) << 2) >> 2] | 0), da) | 0;
                                    Ya[((7) << 2) >> 2] = (tg & ~sg) | ((tg + (ra << 2)) & sg);
                                }
                            }
                            function exec_internal(Wg, Xg, Yg) {
                                Wg = Wg | 0;
                                Xg = Xg | 0;
                                Yg = Yg | 0;
                                var da = 0;
                                var dc = 0;
                                var cg = 0;
                                var hc = 0;
                                var Nf = 0;
                                var b = 0;
                                var fc = 0;
                                var pc = 0;
                                var Ef = 0;
                                var Zg = 0;
                                var zb = 0;
                                var ah = 0;
                                var aa = 0;
                                Da = Wg;
                                if (ya) {
                                    if ((Ba | 0) != 0 & !!(ta & 512)) {
                                        ya = 0;
                                    } else {
                                        return 257;
                                    }
                                }
                                if ((sa | 0) == 3) {
                                    Ua = 8392704;
                                    Va = 12587008;
                                } else {
                                    Ua = 4096;
                                    Va = 4198400;
                                }
                                ve();
                                Zg = 256;
                                Fa = Da;
                                if ((Xg | 0) >= 0) {
                                    Ve(Xg, 0, Yg, 0, 0);
                                }
                                if ((Ca | 0) >= 0) {
                                    Ve(Ca, 0, 0, 0, 1);
                                    Ca = -1;
                                }
                                if ((Ba | 0) != 0 & !!(ta & 512)) {
                                    Ca = gb() | 0;
                                    Ve(Ca, 0, 0, 0, 1);
                                    Ca = -1;
                                }
                                Oa = 0;
                                Qa = 0;
                                Sa = 8192;
                                bh: do {
                                    Na = (Na + Oa - Qa) | 0;
                                    if (((Oa ^ Sa) >>> 0) >= 4082) {
                                        Ra = (Na + Ia) | 0;
                                        Pa = Ya[(Ua + ((Ra >>> 12) << 2)) >> 2] | 0;
                                        if ((Pa | 0) == -1) {
                                            xb(Ra, 0, (sa | 0) == 3);
                                            Pa = Ya[(Ua + ((Ra >>> 12) << 2)) >> 2] | 0;
                                        }
                                        Qa = Oa = Ra ^ Pa;
                                        Sa = Oa & ~4095;
                                        b = Wa[Oa] | 0;
                                        Oa = (Oa + 1) | 0;
                                        ah = Ra & 4095;
                                        if ((ah | 0) >= ((4096 - 15 + 1) | 0)) {
                                            da = Rd(Ra, b) | 0;
                                            if (((ah + da) | 0) > 4096) {
                                                Qa = Oa = 3648;
                                                Sa = (Oa + 8192) & ~4095;
                                                for (dc = 0; (dc | 0) < (da | 0); dc = (dc + 1) | 0) {
                                                    aa = (Ra + dc) | 0;
                                                    zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                                                    if ((zb | 0) == -1)
                                                        cg = vb(aa) | 0;
                                                    else
                                                        cg = Wa[aa ^ zb] | 0;
                                                    Wa[(Oa + dc) >> 0] = cg;
                                                }
                                                Oa = (Oa + 1) | 0;
                                            }
                                        }
                                    } else {
                                        Qa = Oa;
                                        b = Wa[Oa] | 0;
                                        Oa = (Oa + 1) | 0;
                                    }
                                    b = b | ((Ea = Ma) & 256);
                                    Ud: for (; ; ) {
                                        switch (b | 0) {
                                        case 102:
                                            if ((Ea | 0) == (Ma | 0))
                                                Rd((Ia + Na) | 0, b) | 0;
                                            if (Ma & 256)
                                                Ea = Ea & ~256;
                                            else
                                                Ea = Ea | 256;
                                            b = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            b = b | (Ea & 256);
                                            break;
                                        case 103:
                                            if ((Ea | 0) == (Ma | 0))
                                                Rd((Ia + Na) | 0, b) | 0;
                                            if (Ma & 128)
                                                Ea = Ea & ~128;
                                            else
                                                Ea = Ea | 128;
                                            b = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            b = b | (Ea & 256);
                                            break;
                                        case 240:
                                            if ((Ea | 0) == (Ma | 0))
                                                Rd((Ia + Na) | 0, b) | 0;
                                            Ea = Ea | 64;
                                            b = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            b = b | (Ea & 256);
                                            break;
                                        case 242:
                                            if ((Ea | 0) == (Ma | 0))
                                                Rd((Ia + Na) | 0, b) | 0;
                                            Ea = Ea | 32;
                                            b = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            b = b | (Ea & 256);
                                            break;
                                        case 243:
                                            if ((Ea | 0) == (Ma | 0))
                                                Rd((Ia + Na) | 0, b) | 0;
                                            Ea = Ea | 16;
                                            b = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            b = b | (Ea & 256);
                                            break;
                                        case 38:
                                        case 46:
                                        case 54:
                                        case 62:
                                            if ((Ea | 0) == (Ma | 0))
                                                Rd((Ia + Na) | 0, b) | 0;
                                            Ea = (Ea & ~15) | (((b >> 3) & 3) + 1);
                                            b = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            b = b | (Ea & 256);
                                            ;break;
                                        case 100:
                                        case 101:
                                            if ((Ea | 0) == (Ma | 0))
                                                Rd((Ia + Na) | 0, b) | 0;
                                            Ea = (Ea & ~15) | ((b & 7) + 1);
                                            b = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            b = b | (Ea & 256);
                                            ;break;
                                        case 176:
                                        case 177:
                                        case 178:
                                        case 179:
                                        case 180:
                                        case 181:
                                        case 182:
                                        case 183:
                                            da = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            b = b & 7;
                                            Wa[(((b & 3) << 2) + (b >> 2)) >> 0] = da;
                                            break Ud;
                                        case 184:
                                        case 185:
                                        case 186:
                                        case 187:
                                        case 188:
                                        case 189:
                                        case 190:
                                        case 191:
                                            {
                                                da = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                Oa = (Oa + 4) | 0;
                                            }
                                            ;Ya[((b & 7) << 2) >> 2] = da;
                                            break Ud;
                                        case 136:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            fc = (hc >> 3) & 7;
                                            da = (Wa[(((fc & 3) << 2) + (fc >> 2)) >> 0] | 0);
                                            if ((hc >> 6) == 3) {
                                                Nf = hc & 7;
                                                Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] = da;
                                            } else {
                                                aa = gc(hc) | 0;
                                                {
                                                    zb = Ya[(Va + ((aa >>> 12) << 2)) >> 2] | 0;
                                                    if ((zb | 0) == -1) {
                                                        Kb(aa, da);
                                                    } else {
                                                        Wa[aa ^ zb] = da;
                                                    }
                                                }
                                                ;
                                            }
                                            break Ud;
                                        case 137:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            da = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                            if ((hc >> 6) == 3) {
                                                Ya[((hc & 7) << 2) >> 2] = da;
                                            } else {
                                                aa = gc(hc) | 0;
                                                {
                                                    zb = Ya[(Va + ((aa >>> 12) << 2)) >> 2] | 0;
                                                    if ((zb | aa) & 3) {
                                                        Ob(aa, da);
                                                    } else {
                                                        Ya[(aa ^ zb) >> 2] = da;
                                                    }
                                                }
                                                ;
                                            }
                                            break Ud;
                                        case 138:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            if ((hc >> 6) == 3) {
                                                Nf = hc & 7;
                                                da = (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0);
                                            } else {
                                                aa = gc(hc) | 0;
                                                zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                                                if ((zb | 0) == -1)
                                                    da = vb(aa) | 0;
                                                else
                                                    da = Wa[aa ^ zb] | 0;
                                            }
                                            fc = (hc >> 3) & 7;
                                            Wa[(((fc & 3) << 2) + (fc >> 2)) >> 0] = da;
                                            break Ud;
                                        case 139:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            if ((hc >> 6) == 3) {
                                                da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                            } else {
                                                aa = gc(hc) | 0;
                                                zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                                                if ((zb | aa) & 3)
                                                    da = Cb(aa) | 0;
                                                else
                                                    da = Ya[(aa ^ zb) >> 2] | 0;
                                            }
                                            Ya[(((hc >> 3) & 7) << 2) >> 2] = da;
                                            break Ud;
                                        case 160:
                                            aa = nc() | 0;
                                            da = yb(aa) | 0;
                                            Ya[((0) << 2) >> 2] = ((Ya[((0) << 2) >> 2] | 0) & -256) | da;
                                            break Ud;
                                        case 161:
                                            aa = nc() | 0;
                                            da = Db(aa) | 0;
                                            Ya[((0) << 2) >> 2] = da;
                                            break Ud;
                                        case 162:
                                            aa = nc() | 0;
                                            Lb(aa, (Ya[((0) << 2) >> 2] | 0));
                                            break Ud;
                                        case 163:
                                            aa = nc() | 0;
                                            Pb(aa, (Ya[((0) << 2) >> 2] | 0));
                                            break Ud;
                                        case 215:
                                            aa = ((Ya[((3) << 2) >> 2] | 0) + ((Ya[((0) << 2) >> 2] | 0) & 255)) | 0;
                                            if (Ea & 128)
                                                aa = aa & 65535;
                                            fc = Ea & 15;
                                            if ((fc | 0) == 0)
                                                fc = 3;
                                            else
                                                fc = (fc - 1) | 0;
                                            aa = (aa + (Ya[(((fc) << 4) + (128 + 4)) >> 2] | 0)) | 0;
                                            da = yb(aa) | 0;
                                            ec(0, da);
                                            break Ud;
                                        case 198:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            if ((hc >> 6) == 3) {
                                                da = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                ec(hc & 7, da);
                                            } else {
                                                aa = gc(hc) | 0;
                                                da = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                Lb(aa, da);
                                            }
                                            break Ud;
                                        case 199:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            if ((hc >> 6) == 3) {
                                                {
                                                    da = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                    Oa = (Oa + 4) | 0;
                                                }
                                                ;Ya[((hc & 7) << 2) >> 2] = da;
                                            } else {
                                                aa = gc(hc) | 0;
                                                {
                                                    da = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                    Oa = (Oa + 4) | 0;
                                                }
                                                ;Pb(aa, da);
                                            }
                                            break Ud;
                                        case 145:
                                        case 146:
                                        case 147:
                                        case 148:
                                        case 149:
                                        case 150:
                                        case 151:
                                            fc = b & 7;
                                            da = (Ya[((0) << 2) >> 2] | 0);
                                            Ya[((0) << 2) >> 2] = (Ya[((fc) << 2) >> 2] | 0);
                                            Ya[((fc) << 2) >> 2] = da;
                                            break Ud;
                                        case 134:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            fc = (hc >> 3) & 7;
                                            if ((hc >> 6) == 3) {
                                                Nf = hc & 7;
                                                da = (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0);
                                                ec(Nf, (Wa[(((fc & 3) << 2) + (fc >> 2)) >> 0] | 0));
                                            } else {
                                                aa = gc(hc) | 0;
                                                da = Fb(aa) | 0;
                                                Lb(aa, (Wa[(((fc & 3) << 2) + (fc >> 2)) >> 0] | 0));
                                            }
                                            ec(fc, da);
                                            break Ud;
                                        case 135:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            fc = (hc >> 3) & 7;
                                            if ((hc >> 6) == 3) {
                                                Nf = hc & 7;
                                                da = (Ya[((Nf) << 2) >> 2] | 0);
                                                Ya[((Nf) << 2) >> 2] = (Ya[((fc) << 2) >> 2] | 0);
                                            } else {
                                                aa = gc(hc) | 0;
                                                da = Jb(aa) | 0;
                                                Pb(aa, (Ya[((fc) << 2) >> 2] | 0));
                                            }
                                            Ya[((fc) << 2) >> 2] = da;
                                            break Ud;
                                        case 142:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            fc = (hc >> 3) & 7;
                                            if ((fc | 0) >= 6 | (fc | 0) == 1)
                                                Uc(6);
                                            if ((hc >> 6) == 3) {
                                                da = (Ya[((hc & 7) << 2) >> 2] | 0) & 65535;
                                            } else {
                                                aa = gc(hc) | 0;
                                                da = Bb(aa) | 0;
                                            }
                                            cf(fc, da);
                                            break Ud;
                                        case 140:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            fc = (hc >> 3) & 7;
                                            if ((fc | 0) >= 6)
                                                Uc(6);
                                            da = (Ya[(((fc) << 4) + (128 + 0)) >> 2] | 0);
                                            if ((hc >> 6) == 3) {
                                                if ((((Ea >> 8) & 1) ^ 1) ) {
                                                    Ya[((hc & 7) << 2) >> 2] = da;
                                                } else {
                                                    Xa[((hc & 7) << 2) >> 1] = da;
                                                }
                                            } else {
                                                aa = gc(hc) | 0;
                                                Nb(aa, da);
                                            }
                                            break Ud;
                                        case 196:
                                            pg(0);
                                            break Ud;
                                        case 197:
                                            pg(3);
                                            break Ud;
                                        case 0:
                                        case 8:
                                        case 16:
                                        case 24:
                                        case 32:
                                        case 40:
                                        case 48:
                                        case 56:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = b >> 3;
                                            fc = (hc >> 3) & 7;
                                            dc = (Wa[(((fc & 3) << 2) + (fc >> 2)) >> 0] | 0);
                                            if ((hc >> 6) == 3) {
                                                Nf = hc & 7;
                                                ec(Nf, xc(pc, (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0), dc) | 0);
                                            } else {
                                                aa = gc(hc) | 0;
                                                if ((pc | 0) != 7) {
                                                    da = Fb(aa) | 0;
                                                    da = xc(pc, da, dc) | 0;
                                                    Lb(aa, da);
                                                } else {
                                                    da = yb(aa) | 0;
                                                    xc(7, da, dc) | 0;
                                                }
                                            }
                                            break Ud;
                                        case 1:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            dc = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                            if ((hc >> 6) == 3) {
                                                Nf = hc & 7;
                                                da = (Ya[((Nf) << 2) >> 2] | 0);
                                                {
                                                    ma = dc;
                                                    na = da = (da + ma) | 0;
                                                    oa = 2;
                                                }
                                                ;Ya[((Nf) << 2) >> 2] = da;
                                            } else {
                                                aa = gc(hc) | 0;
                                                da = Jb(aa) | 0;
                                                {
                                                    ma = dc;
                                                    na = da = (da + ma) | 0;
                                                    oa = 2;
                                                }
                                                ;Pb(aa, da);
                                            }
                                            break Ud;
                                        case 9:
                                        case 17:
                                        case 25:
                                        case 33:
                                        case 41:
                                        case 49:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = b >> 3;
                                            dc = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                            if ((hc >> 6) == 3) {
                                                Nf = hc & 7;
                                                Ya[((Nf) << 2) >> 2] = oc(pc, (Ya[((Nf) << 2) >> 2] | 0), dc) | 0;
                                            } else {
                                                aa = gc(hc) | 0;
                                                da = Jb(aa) | 0;
                                                da = oc(pc, da, dc) | 0;
                                                Pb(aa, da);
                                            }
                                            break Ud;
                                        case 57:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = b >> 3;
                                            dc = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                            if ((hc >> 6) == 3) {
                                                Nf = hc & 7;
                                                {
                                                    ma = dc;
                                                    na = ((Ya[((Nf) << 2) >> 2] | 0) - ma) | 0;
                                                    oa = 8;
                                                }
                                                ;
                                            } else {
                                                aa = gc(hc) | 0;
                                                da = Db(aa) | 0;
                                                {
                                                    ma = dc;
                                                    na = (da - ma) | 0;
                                                    oa = 8;
                                                }
                                                ;
                                            }
                                            break Ud;
                                        case 2:
                                        case 10:
                                        case 18:
                                        case 26:
                                        case 34:
                                        case 42:
                                        case 50:
                                        case 58:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = b >> 3;
                                            fc = (hc >> 3) & 7;
                                            if ((hc >> 6) == 3) {
                                                Nf = hc & 7;
                                                dc = (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0);
                                            } else {
                                                aa = gc(hc) | 0;
                                                dc = yb(aa) | 0;
                                            }
                                            ec(fc, xc(pc, (Wa[(((fc & 3) << 2) + (fc >> 2)) >> 0] | 0), dc) | 0);
                                            break Ud;
                                        case 3:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            fc = (hc >> 3) & 7;
                                            if ((hc >> 6) == 3) {
                                                dc = (Ya[((hc & 7) << 2) >> 2] | 0);
                                            } else {
                                                aa = gc(hc) | 0;
                                                dc = Db(aa) | 0;
                                            }
                                            da = (Ya[((fc) << 2) >> 2] | 0);
                                            {
                                                ma = dc;
                                                na = da = (da + ma) | 0;
                                                oa = 2;
                                            }
                                            ;Ya[((fc) << 2) >> 2] = da;
                                            break Ud;
                                        case 11:
                                        case 19:
                                        case 27:
                                        case 35:
                                        case 43:
                                        case 51:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = b >> 3;
                                            fc = (hc >> 3) & 7;
                                            if ((hc >> 6) == 3) {
                                                dc = (Ya[((hc & 7) << 2) >> 2] | 0);
                                            } else {
                                                aa = gc(hc) | 0;
                                                dc = Db(aa) | 0;
                                            }
                                            Ya[((fc) << 2) >> 2] = oc(pc, (Ya[((fc) << 2) >> 2] | 0), dc) | 0;
                                            break Ud;
                                        case 59:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = b >> 3;
                                            fc = (hc >> 3) & 7;
                                            if ((hc >> 6) == 3) {
                                                dc = (Ya[((hc & 7) << 2) >> 2] | 0);
                                            } else {
                                                aa = gc(hc) | 0;
                                                dc = Db(aa) | 0;
                                            }
                                            {
                                                ma = dc;
                                                na = ((Ya[((fc) << 2) >> 2] | 0) - ma) | 0;
                                                oa = 8;
                                            }
                                            ;break Ud;
                                        case 4:
                                        case 12:
                                        case 20:
                                        case 28:
                                        case 36:
                                        case 44:
                                        case 52:
                                        case 60:
                                            dc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = b >> 3;
                                            ec(0, xc(pc, (Ya[((0) << 2) >> 2] | 0) & 255, dc) | 0);
                                            break Ud;
                                        case 5:
                                            {
                                                dc = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                Oa = (Oa + 4) | 0;
                                            }
                                            ;da = (Ya[((0) << 2) >> 2] | 0);
                                            {
                                                ma = dc;
                                                na = da = (da + ma) | 0;
                                                oa = 2;
                                            }
                                            ;Ya[((0) << 2) >> 2] = da;
                                            break Ud;
                                        case 13:
                                        case 21:
                                        case 29:
                                        case 37:
                                        case 45:
                                            {
                                                dc = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                Oa = (Oa + 4) | 0;
                                            }
                                            ;pc = b >> 3;
                                            Ya[((0) << 2) >> 2] = oc(pc, (Ya[((0) << 2) >> 2] | 0), dc) | 0;
                                            break Ud;
                                        case 53:
                                            {
                                                dc = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                Oa = (Oa + 4) | 0;
                                            }
                                            ;da = (Ya[((0) << 2) >> 2] | 0);
                                            {
                                                na = da = da ^ dc;
                                                oa = 14;
                                            }
                                            ;Ya[((0) << 2) >> 2] = da;
                                            break Ud;
                                        case 61:
                                            {
                                                dc = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                Oa = (Oa + 4) | 0;
                                            }
                                            ;{
                                                ma = dc;
                                                na = ((Ya[((0) << 2) >> 2] | 0) - ma) | 0;
                                                oa = 8;
                                            }
                                            ;break Ud;
                                        case 128:
                                        case 130:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = (hc >> 3) & 7;
                                            if ((hc >> 6) == 3) {
                                                Nf = hc & 7;
                                                dc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                ec(Nf, xc(pc, (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0), dc) | 0);
                                            } else {
                                                aa = gc(hc) | 0;
                                                dc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                if ((pc | 0) != 7) {
                                                    da = Fb(aa) | 0;
                                                    da = xc(pc, da, dc) | 0;
                                                    Lb(aa, da);
                                                } else {
                                                    da = yb(aa) | 0;
                                                    xc(7, da, dc) | 0;
                                                }
                                            }
                                            break Ud;
                                        case 129:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = (hc >> 3) & 7;
                                            if ((pc | 0) == 7) {
                                                if ((hc >> 6) == 3) {
                                                    da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Db(aa) | 0;
                                                }
                                                {
                                                    dc = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                    Oa = (Oa + 4) | 0;
                                                }
                                                ;{
                                                    ma = dc;
                                                    na = (da - ma) | 0;
                                                    oa = 8;
                                                }
                                                ;
                                            } else {
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    {
                                                        dc = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                        Oa = (Oa + 4) | 0;
                                                    }
                                                    ;Ya[((Nf) << 2) >> 2] = oc(pc, (Ya[((Nf) << 2) >> 2] | 0), dc) | 0;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    {
                                                        dc = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                        Oa = (Oa + 4) | 0;
                                                    }
                                                    ;da = Jb(aa) | 0;
                                                    da = oc(pc, da, dc) | 0;
                                                    Pb(aa, da);
                                                }
                                            }
                                            break Ud;
                                        case 131:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = (hc >> 3) & 7;
                                            if ((pc | 0) == 7) {
                                                if ((hc >> 6) == 3) {
                                                    da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Db(aa) | 0;
                                                }
                                                dc = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                {
                                                    ma = dc;
                                                    na = (da - ma) | 0;
                                                    oa = 8;
                                                }
                                                ;
                                            } else {
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    dc = ((Wa[Oa] << 24) >> 24);
                                                    Oa = (Oa + 1) | 0;
                                                    Ya[((Nf) << 2) >> 2] = oc(pc, (Ya[((Nf) << 2) >> 2] | 0), dc) | 0;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    dc = ((Wa[Oa] << 24) >> 24);
                                                    Oa = (Oa + 1) | 0;
                                                    da = Jb(aa) | 0;
                                                    da = oc(pc, da, dc) | 0;
                                                    Pb(aa, da);
                                                }
                                            }
                                            break Ud;
                                        case 64:
                                        case 65:
                                        case 66:
                                        case 67:
                                        case 68:
                                        case 69:
                                        case 70:
                                        case 71:
                                            fc = b & 7;
                                            da = (Ya[((fc) << 2) >> 2] | 0);
                                            {
                                                if ((oa | 0) < 25) {
                                                    pa = oa;
                                                    qa = na;
                                                }
                                                da = na = (da + 1) | 0;
                                                oa = 27;
                                            }
                                            ;Ya[((fc) << 2) >> 2] = da;
                                            break Ud;
                                        case 72:
                                        case 73:
                                        case 74:
                                        case 75:
                                        case 76:
                                        case 77:
                                        case 78:
                                        case 79:
                                            fc = b & 7;
                                            da = (Ya[((fc) << 2) >> 2] | 0);
                                            {
                                                if ((oa | 0) < 25) {
                                                    pa = oa;
                                                    qa = na;
                                                }
                                                da = na = (da - 1) | 0;
                                                oa = 30;
                                            }
                                            ;Ya[((fc) << 2) >> 2] = da;
                                            break Ud;
                                        case 107:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            fc = (hc >> 3) & 7;
                                            if ((hc >> 6) == 3) {
                                                dc = (Ya[((hc & 7) << 2) >> 2] | 0);
                                            } else {
                                                aa = gc(hc) | 0;
                                                dc = Db(aa) | 0;
                                            }
                                            cg = ((Wa[Oa] << 24) >> 24);
                                            Oa = (Oa + 1) | 0;
                                            Ya[((fc) << 2) >> 2] = qd(dc, cg) | 0;
                                            break Ud;
                                        case 105:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            fc = (hc >> 3) & 7;
                                            if ((hc >> 6) == 3) {
                                                dc = (Ya[((hc & 7) << 2) >> 2] | 0);
                                            } else {
                                                aa = gc(hc) | 0;
                                                dc = Db(aa) | 0;
                                            }
                                            {
                                                cg = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                Oa = (Oa + 4) | 0;
                                            }
                                            ;Ya[((fc) << 2) >> 2] = qd(dc, cg) | 0;
                                            break Ud;
                                        case 132:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            if ((hc >> 6) == 3) {
                                                Nf = hc & 7;
                                                da = (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0);
                                            } else {
                                                aa = gc(hc) | 0;
                                                da = yb(aa) | 0;
                                            }
                                            fc = (hc >> 3) & 7;
                                            dc = (Wa[(((fc & 3) << 2) + (fc >> 2)) >> 0] | 0);
                                            {
                                                na = (((da & dc) << 24) >> 24);
                                                oa = 12;
                                            }
                                            ;break Ud;
                                        case 133:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            if ((hc >> 6) == 3) {
                                                da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                            } else {
                                                aa = gc(hc) | 0;
                                                da = Db(aa) | 0;
                                            }
                                            dc = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                            {
                                                na = da & dc;
                                                oa = 14;
                                            }
                                            ;break Ud;
                                        case 168:
                                            dc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            {
                                                na = ((((Ya[((0) << 2) >> 2] | 0) & dc) << 24) >> 24);
                                                oa = 12;
                                            }
                                            ;break Ud;
                                        case 169:
                                            {
                                                dc = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                Oa = (Oa + 4) | 0;
                                            }
                                            ;{
                                                na = (Ya[((0) << 2) >> 2] | 0) & dc;
                                                oa = 14;
                                            }
                                            ;break Ud;
                                        case 246:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = (hc >> 3) & 7;
                                            switch (pc | 0) {
                                            case 0:
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    da = (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = yb(aa) | 0;
                                                }
                                                dc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                {
                                                    na = (((da & dc) << 24) >> 24);
                                                    oa = 12;
                                                }
                                                ;break;
                                            case 2:
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    ec(Nf, ~(Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0));
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Fb(aa) | 0;
                                                    da = ~da;
                                                    Lb(aa, da);
                                                }
                                                break;
                                            case 3:
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    ec(Nf, xc(5, 0, (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0)) | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Fb(aa) | 0;
                                                    da = xc(5, 0, da) | 0;
                                                    Lb(aa, da);
                                                }
                                                break;
                                            case 4:
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    da = (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = yb(aa) | 0;
                                                }
                                                Xa[((0) << 2) >> 1] = fd((Ya[((0) << 2) >> 2] | 0), da) | 0;
                                                break;
                                            case 5:
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    da = (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = yb(aa) | 0;
                                                }
                                                Xa[((0) << 2) >> 1] = gd((Ya[((0) << 2) >> 2] | 0), da) | 0;
                                                break;
                                            case 6:
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    da = (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = yb(aa) | 0;
                                                }
                                                Tc(da);
                                                break;
                                            case 7:
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    da = (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = yb(aa) | 0;
                                                }
                                                Vc(da);
                                                break;
                                            default:
                                                Uc(6);
                                            }
                                            break Ud;
                                        case 247:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = (hc >> 3) & 7;
                                            switch (pc | 0) {
                                            case 0:
                                                if ((hc >> 6) == 3) {
                                                    da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Db(aa) | 0;
                                                }
                                                {
                                                    dc = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                    Oa = (Oa + 4) | 0;
                                                }
                                                ;{
                                                    na = da & dc;
                                                    oa = 14;
                                                }
                                                ;break;
                                            case 2:
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    Ya[((Nf) << 2) >> 2] = ~(Ya[((Nf) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Jb(aa) | 0;
                                                    da = ~da;
                                                    Pb(aa, da);
                                                }
                                                break;
                                            case 3:
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    Ya[((Nf) << 2) >> 2] = oc(5, 0, (Ya[((Nf) << 2) >> 2] | 0)) | 0;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Jb(aa) | 0;
                                                    da = oc(5, 0, da) | 0;
                                                    Pb(aa, da);
                                                }
                                                break;
                                            case 4:
                                                if ((hc >> 6) == 3) {
                                                    da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Db(aa) | 0;
                                                }
                                                Ya[((0) << 2) >> 2] = pd((Ya[((0) << 2) >> 2] | 0), da) | 0;
                                                Ya[((2) << 2) >> 2] = Ga;
                                                break;
                                            case 5:
                                                if ((hc >> 6) == 3) {
                                                    da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Db(aa) | 0;
                                                }
                                                Ya[((0) << 2) >> 2] = qd((Ya[((0) << 2) >> 2] | 0), da) | 0;
                                                Ya[((2) << 2) >> 2] = Ga;
                                                break;
                                            case 6:
                                                if ((hc >> 6) == 3) {
                                                    da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Db(aa) | 0;
                                                }
                                                Ya[((0) << 2) >> 2] = Yc((Ya[((2) << 2) >> 2] | 0), (Ya[((0) << 2) >> 2] | 0), da) | 0;
                                                Ya[((2) << 2) >> 2] = Ga;
                                                break;
                                            case 7:
                                                if ((hc >> 6) == 3) {
                                                    da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Db(aa) | 0;
                                                }
                                                Ya[((0) << 2) >> 2] = cd((Ya[((2) << 2) >> 2] | 0), (Ya[((0) << 2) >> 2] | 0), da) | 0;
                                                Ya[((2) << 2) >> 2] = Ga;
                                                break;
                                            default:
                                                Uc(6);
                                            }
                                            break Ud;
                                        case 192:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = (hc >> 3) & 7;
                                            if ((hc >> 6) == 3) {
                                                dc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                Nf = hc & 7;
                                                ec(Nf, Ac(pc, (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0), dc) | 0);
                                            } else {
                                                aa = gc(hc) | 0;
                                                dc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                da = Fb(aa) | 0;
                                                da = Ac(pc, da, dc) | 0;
                                                Lb(aa, da);
                                            }
                                            break Ud;
                                        case 193:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = (hc >> 3) & 7;
                                            if ((hc >> 6) == 3) {
                                                dc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                Nf = hc & 7;
                                                Ya[((Nf) << 2) >> 2] = Ec(pc, (Ya[((Nf) << 2) >> 2] | 0), dc) | 0;
                                            } else {
                                                aa = gc(hc) | 0;
                                                dc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                da = Jb(aa) | 0;
                                                da = Ec(pc, da, dc) | 0;
                                                Pb(aa, da);
                                            }
                                            break Ud;
                                        case 208:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = (hc >> 3) & 7;
                                            if ((hc >> 6) == 3) {
                                                Nf = hc & 7;
                                                ec(Nf, Ac(pc, (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0), 1) | 0);
                                            } else {
                                                aa = gc(hc) | 0;
                                                da = Fb(aa) | 0;
                                                da = Ac(pc, da, 1) | 0;
                                                Lb(aa, da);
                                            }
                                            break Ud;
                                        case 209:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = (hc >> 3) & 7;
                                            if ((hc >> 6) == 3) {
                                                Nf = hc & 7;
                                                Ya[((Nf) << 2) >> 2] = Ec(pc, (Ya[((Nf) << 2) >> 2] | 0), 1) | 0;
                                            } else {
                                                aa = gc(hc) | 0;
                                                da = Jb(aa) | 0;
                                                da = Ec(pc, da, 1) | 0;
                                                Pb(aa, da);
                                            }
                                            break Ud;
                                        case 210:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = (hc >> 3) & 7;
                                            dc = (Ya[((1) << 2) >> 2] | 0) & 255;
                                            if ((hc >> 6) == 3) {
                                                Nf = hc & 7;
                                                ec(Nf, Ac(pc, (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0), dc) | 0);
                                            } else {
                                                aa = gc(hc) | 0;
                                                da = Fb(aa) | 0;
                                                da = Ac(pc, da, dc) | 0;
                                                Lb(aa, da);
                                            }
                                            break Ud;
                                        case 211:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = (hc >> 3) & 7;
                                            dc = (Ya[((1) << 2) >> 2] | 0) & 255;
                                            if ((hc >> 6) == 3) {
                                                Nf = hc & 7;
                                                Ya[((Nf) << 2) >> 2] = Ec(pc, (Ya[((Nf) << 2) >> 2] | 0), dc) | 0;
                                            } else {
                                                aa = gc(hc) | 0;
                                                da = Jb(aa) | 0;
                                                da = Ec(pc, da, dc) | 0;
                                                Pb(aa, da);
                                            }
                                            break Ud;
                                        case 152:
                                            Ya[((0) << 2) >> 2] = ((Ya[((0) << 2) >> 2] | 0) << 16) >> 16;
                                            break Ud;
                                        case 153:
                                            Ya[((2) << 2) >> 2] = (Ya[((0) << 2) >> 2] | 0) >> 31;
                                            break Ud;
                                        case 80:
                                        case 81:
                                        case 82:
                                        case 83:
                                        case 84:
                                        case 85:
                                        case 86:
                                        case 87:
                                            da = (Ya[((b & 7) << 2) >> 2] | 0);
                                            if (La) {
                                                aa = ((Ya[((4) << 2) >> 2] | 0) - 4) | 0;
                                                {
                                                    zb = Ya[(Va + ((aa >>> 12) << 2)) >> 2] | 0;
                                                    if ((zb | aa) & 3) {
                                                        Ob(aa, da);
                                                    } else {
                                                        Ya[(aa ^ zb) >> 2] = da;
                                                    }
                                                }
                                                ;Ya[((4) << 2) >> 2] = aa;
                                            } else {
                                                Md(da);
                                            }
                                            break Ud;
                                        case 88:
                                        case 89:
                                        case 90:
                                        case 91:
                                        case 92:
                                        case 93:
                                        case 94:
                                        case 95:
                                            if (La) {
                                                aa = (Ya[((4) << 2) >> 2] | 0);
                                                zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                                                if ((zb | aa) & 3)
                                                    da = Cb(aa) | 0;
                                                else
                                                    da = Ya[(aa ^ zb) >> 2] | 0;
                                                Ya[((4) << 2) >> 2] = (aa + 4) | 0;
                                            } else {
                                                da = Pd() | 0;
                                                Qd();
                                            }
                                            Ya[((b & 7) << 2) >> 2] = da;
                                            break Ud;
                                        case 96:
                                            fg();
                                            break Ud;
                                        case 97:
                                            hg();
                                            break Ud;
                                        case 143:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            if ((hc >> 6) == 3) {
                                                da = Pd() | 0;
                                                Qd();
                                                Ya[((hc & 7) << 2) >> 2] = da;
                                            } else {
                                                da = Pd() | 0;
                                                dc = (Ya[((4) << 2) >> 2] | 0);
                                                Qd();
                                                cg = (Ya[((4) << 2) >> 2] | 0);
                                                aa = gc(hc) | 0;
                                                Ya[((4) << 2) >> 2] = dc;
                                                Pb(aa, da);
                                                Ya[((4) << 2) >> 2] = cg;
                                            }
                                            break Ud;
                                        case 104:
                                            {
                                                da = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                Oa = (Oa + 4) | 0;
                                            }
                                            ;if (La) {
                                                aa = ((Ya[((4) << 2) >> 2] | 0) - 4) | 0;
                                                Pb(aa, da);
                                                Ya[((4) << 2) >> 2] = aa;
                                            } else {
                                                Md(da);
                                            }
                                            break Ud;
                                        case 106:
                                            da = ((Wa[Oa] << 24) >> 24);
                                            Oa = (Oa + 1) | 0;
                                            if (La) {
                                                aa = ((Ya[((4) << 2) >> 2] | 0) - 4) | 0;
                                                Pb(aa, da);
                                                Ya[((4) << 2) >> 2] = aa;
                                            } else {
                                                Md(da);
                                            }
                                            break Ud;
                                        case 200:
                                            og();
                                            break Ud;
                                        case 201:
                                            if (La) {
                                                aa = (Ya[((5) << 2) >> 2] | 0);
                                                da = Db(aa) | 0;
                                                Ya[((5) << 2) >> 2] = da;
                                                Ya[((4) << 2) >> 2] = (aa + 4) | 0;
                                            } else {
                                                jg();
                                            }
                                            break Ud;
                                        case 156:
                                            Ef = (ta >> 12) & 3;
                                            if (!!(ta & 131072) & (Ef | 0) != 3)
                                                Uc(13);
                                            da = (Cd() | 0) & ~(131072 | 65536);
                                            if ((((Ea >> 8) & 1) ^ 1) ) {
                                                Md(da);
                                            } else {
                                                Kd(da);
                                            }
                                            break Ud;
                                        case 157:
                                            Ef = (ta >> 12) & 3;
                                            if (!!(ta & 131072) & (Ef | 0) != 3)
                                                Uc(13);
                                            if ((((Ea >> 8) & 1) ^ 1) ) {
                                                da = Pd() | 0;
                                                Qd();
                                                dc = -1;
                                            } else {
                                                da = Nd() | 0;
                                                Od();
                                                dc = 65535;
                                            }
                                            cg = (256 | 262144 | 2097152 | 16384);
                                            if ((sa | 0) == 0) {
                                                cg = cg | 512 | 12288;
                                            } else {
                                                if ((sa | 0) <= (Ef | 0))
                                                    cg = cg | 512;
                                            }
                                            Ed(da, cg & dc);
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 6:
                                        case 14:
                                        case 22:
                                        case 30:
                                            Md((Ya[(((b >> 3) << 4) + (128 + 0)) >> 2] | 0));
                                            break Ud;
                                        case 7:
                                        case 23:
                                        case 31:
                                            cf(b >> 3, (Pd() | 0) & 65535);
                                            Qd();
                                            break Ud;
                                        case 141:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            if ((hc >> 6) == 3)
                                                Uc(6);
                                            Ea = (Ea & ~15) | (10 + 1);
                                            Ya[(((hc >> 3) & 7) << 2) >> 2] = gc(hc) | 0;
                                            break Ud;
                                        case 254:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = (hc >> 3) & 7;
                                            switch (pc | 0) {
                                            case 0:
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    ec(Nf, yc((Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0)) | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Fb(aa) | 0;
                                                    da = yc(da) | 0;
                                                    Lb(aa, da);
                                                }
                                                break;
                                            case 1:
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    ec(Nf, zc((Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0)) | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Fb(aa) | 0;
                                                    da = zc(da) | 0;
                                                    Lb(aa, da);
                                                }
                                                break;
                                            default:
                                                Uc(6);
                                            }
                                            break Ud;
                                        case 255:
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            pc = (hc >> 3) & 7;
                                            switch (pc | 0) {
                                            case 0:
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    da = (Ya[((Nf) << 2) >> 2] | 0);
                                                    {
                                                        if ((oa | 0) < 25) {
                                                            pa = oa;
                                                            qa = na;
                                                        }
                                                        da = na = (da + 1) | 0;
                                                        oa = 27;
                                                    }
                                                    ;Ya[((Nf) << 2) >> 2] = da;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Jb(aa) | 0;
                                                    {
                                                        if ((oa | 0) < 25) {
                                                            pa = oa;
                                                            qa = na;
                                                        }
                                                        da = na = (da + 1) | 0;
                                                        oa = 27;
                                                    }
                                                    ;Pb(aa, da);
                                                }
                                                break;
                                            case 1:
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    da = (Ya[((Nf) << 2) >> 2] | 0);
                                                    {
                                                        if ((oa | 0) < 25) {
                                                            pa = oa;
                                                            qa = na;
                                                        }
                                                        da = na = (da - 1) | 0;
                                                        oa = 30;
                                                    }
                                                    ;Ya[((Nf) << 2) >> 2] = da;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Jb(aa) | 0;
                                                    {
                                                        if ((oa | 0) < 25) {
                                                            pa = oa;
                                                            qa = na;
                                                        }
                                                        da = na = (da - 1) | 0;
                                                        oa = 30;
                                                    }
                                                    ;Pb(aa, da);
                                                }
                                                break;
                                            case 2:
                                                if ((hc >> 6) == 3) {
                                                    da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Db(aa) | 0;
                                                }
                                                dc = ((Na + Oa - Qa) | 0);
                                                if (La) {
                                                    aa = ((Ya[((4) << 2) >> 2] | 0) - 4) | 0;
                                                    Pb(aa, dc);
                                                    Ya[((4) << 2) >> 2] = aa;
                                                } else {
                                                    Md(dc);
                                                }
                                                Na = da,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                                break;
                                            case 4:
                                                if ((hc >> 6) == 3) {
                                                    da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Db(aa) | 0;
                                                }
                                                Na = da,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                                break;
                                            case 6:
                                                if ((hc >> 6) == 3) {
                                                    da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Db(aa) | 0;
                                                }
                                                if (La) {
                                                    aa = ((Ya[((4) << 2) >> 2] | 0) - 4) | 0;
                                                    Pb(aa, da);
                                                    Ya[((4) << 2) >> 2] = aa;
                                                } else {
                                                    Md(da);
                                                }
                                                break;
                                            case 3:
                                            case 5:
                                                if ((hc >> 6) == 3)
                                                    Uc(6);
                                                aa = gc(hc) | 0;
                                                da = Db(aa) | 0;
                                                aa = (aa + 4) | 0;
                                                dc = Bb(aa) | 0;
                                                if ((pc | 0) == 3)
                                                    sf(1, dc, da, ((Na + Oa - Qa) | 0));
                                                else
                                                    jf(dc, da);
                                                break;
                                            default:
                                                Uc(6);
                                            }
                                            break Ud;
                                        case 235:
                                            da = ((Wa[Oa] << 24) >> 24);
                                            Oa = (Oa + 1) | 0;
                                            Na = (Na + Oa - Qa + da) | 0,
                                            Oa = Qa = 0,
                                            Sa = 8192;
                                            break Ud;
                                        case 233:
                                            {
                                                da = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                Oa = (Oa + 4) | 0;
                                            }
                                            ;Na = (Na + Oa - Qa + da) | 0,
                                            Oa = Qa = 0,
                                            Sa = 8192;
                                            break Ud;
                                        case 234:
                                            if ((((Ea >> 8) & 1) ^ 1) ) {
                                                {
                                                    da = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                    Oa = (Oa + 4) | 0;
                                                }
                                                ;
                                            } else {
                                                da = cc() | 0;
                                            }
                                            dc = cc() | 0;
                                            jf(dc, da);
                                            break Ud;
                                        case 112:
                                            if (td() | 0) {
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Na = (Na + Oa - Qa + da) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            } else {
                                                Na = (Na + Oa - Qa + 1) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            }
                                            break Ud;
                                        case 113:
                                            if (!(td() | 0)) {
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Na = (Na + Oa - Qa + da) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            } else {
                                                Na = (Na + Oa - Qa + 1) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            }
                                            break Ud;
                                        case 114:
                                            if (tc() | 0) {
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Na = (Na + Oa - Qa + da) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            } else {
                                                Na = (Na + Oa - Qa + 1) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            }
                                            break Ud;
                                        case 115:
                                            if (!(tc() | 0)) {
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Na = (Na + Oa - Qa + da) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            } else {
                                                Na = (Na + Oa - Qa + 1) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            }
                                            break Ud;
                                        case 116:
                                            if (((na | 0) == 0) ) {
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Na = (Na + Oa - Qa + da) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            } else {
                                                Na = (Na + Oa - Qa + 1) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            }
                                            break Ud;
                                        case 117:
                                            if (!((na | 0) == 0)) {
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Na = (Na + Oa - Qa + da) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            } else {
                                                Na = (Na + Oa - Qa + 1) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            }
                                            break Ud;
                                        case 118:
                                            if (ud() | 0) {
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Na = (Na + Oa - Qa + da) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            } else {
                                                Na = (Na + Oa - Qa + 1) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            }
                                            break Ud;
                                        case 119:
                                            if (!(ud() | 0)) {
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Na = (Na + Oa - Qa + da) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            } else {
                                                Na = (Na + Oa - Qa + 1) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            }
                                            break Ud;
                                        case 120:
                                            if (((oa | 0) == 24 ? ((ma >> 7) & 1) : ((na | 0) < 0)) ) {
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Na = (Na + Oa - Qa + da) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            } else {
                                                Na = (Na + Oa - Qa + 1) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            }
                                            break Ud;
                                        case 121:
                                            if (!((oa | 0) == 24 ? ((ma >> 7) & 1) : ((na | 0) < 0))) {
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Na = (Na + Oa - Qa + da) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            } else {
                                                Na = (Na + Oa - Qa + 1) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            }
                                            break Ud;
                                        case 122:
                                            if (vd() | 0) {
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Na = (Na + Oa - Qa + da) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            } else {
                                                Na = (Na + Oa - Qa + 1) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            }
                                            break Ud;
                                        case 123:
                                            if (!(vd() | 0)) {
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Na = (Na + Oa - Qa + da) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            } else {
                                                Na = (Na + Oa - Qa + 1) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            }
                                            break Ud;
                                        case 124:
                                            if (wd() | 0) {
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Na = (Na + Oa - Qa + da) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            } else {
                                                Na = (Na + Oa - Qa + 1) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            }
                                            break Ud;
                                        case 125:
                                            if (!(wd() | 0)) {
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Na = (Na + Oa - Qa + da) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            } else {
                                                Na = (Na + Oa - Qa + 1) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            }
                                            break Ud;
                                        case 126:
                                            if (xd() | 0) {
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Na = (Na + Oa - Qa + da) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            } else {
                                                Na = (Na + Oa - Qa + 1) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            }
                                            break Ud;
                                        case 127:
                                            if (!(xd() | 0)) {
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Na = (Na + Oa - Qa + da) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            } else {
                                                Na = (Na + Oa - Qa + 1) | 0,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                            }
                                            break Ud;
                                        case 224:
                                        case 225:
                                        case 226:
                                            da = ((Wa[Oa] << 24) >> 24);
                                            Oa = (Oa + 1) | 0;
                                            if (Ea & 128)
                                                pc = 65535;
                                            else
                                                pc = -1;
                                            dc = ((Ya[((1) << 2) >> 2] | 0) - 1) & pc;
                                            Ya[((1) << 2) >> 2] = ((Ya[((1) << 2) >> 2] | 0) & ~pc) | dc;
                                            b = b & 3;
                                            if ((b | 0) == 0)
                                                cg = !((na | 0) == 0);
                                            else if ((b | 0) == 1)
                                                cg = ((na | 0) == 0);
                                            else
                                                cg = 1;
                                            if (!!dc & !!cg) {
                                                if (Ea & 256) {
                                                    Na = (Na + Oa - Qa + da) & 65535,
                                                    Oa = Qa = 0,
                                                    Sa = 8192;
                                                } else {
                                                    Na = (Na + Oa - Qa + da) | 0,
                                                    Oa = Qa = 0,
                                                    Sa = 8192;
                                                }
                                            }
                                            break Ud;
                                        case 227:
                                            da = ((Wa[Oa] << 24) >> 24);
                                            Oa = (Oa + 1) | 0;
                                            if (Ea & 128)
                                                pc = 65535;
                                            else
                                                pc = -1;
                                            if (((Ya[((1) << 2) >> 2] | 0) & pc) == 0) {
                                                if (Ea & 256) {
                                                    Na = (Na + Oa - Qa + da) & 65535,
                                                    Oa = Qa = 0,
                                                    Sa = 8192;
                                                } else {
                                                    Na = (Na + Oa - Qa + da) | 0,
                                                    Oa = Qa = 0,
                                                    Sa = 8192;
                                                }
                                            }
                                            break Ud;
                                        case 194:
                                            dc = ((cc() | 0) << 16) >> 16;
                                            da = Pd() | 0;
                                            Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | (((Ya[((4) << 2) >> 2] | 0) + 4 + dc) & Ka);
                                            Na = da,
                                            Oa = Qa = 0,
                                            Sa = 8192;
                                            break Ud;
                                        case 195:
                                            if (La) {
                                                aa = (Ya[((4) << 2) >> 2] | 0);
                                                da = Db(aa) | 0;
                                                Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) + 4) | 0;
                                            } else {
                                                da = Pd() | 0;
                                                Qd();
                                            }
                                            Na = da,
                                            Oa = Qa = 0,
                                            Sa = 8192;
                                            break Ud;
                                        case 232:
                                            {
                                                da = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                Oa = (Oa + 4) | 0;
                                            }
                                            ;dc = ((Na + Oa - Qa) | 0);
                                            if (La) {
                                                aa = ((Ya[((4) << 2) >> 2] | 0) - 4) | 0;
                                                Pb(aa, dc);
                                                Ya[((4) << 2) >> 2] = aa;
                                            } else {
                                                Md(dc);
                                            }
                                            Na = (Na + Oa - Qa + da) | 0,
                                            Oa = Qa = 0,
                                            Sa = 8192;
                                            break Ud;
                                        case 154:
                                            cg = (((Ea >> 8) & 1) ^ 1);
                                            if (cg) {
                                                {
                                                    da = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                    Oa = (Oa + 4) | 0;
                                                }
                                                ;
                                            } else {
                                                da = cc() | 0;
                                            }
                                            dc = cc() | 0;
                                            sf(cg, dc, da, ((Na + Oa - Qa) | 0));
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 202:
                                            dc = ((cc() | 0) << 16) >> 16;
                                            Gf((((Ea >> 8) & 1) ^ 1), dc);
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 203:
                                            Gf((((Ea >> 8) & 1) ^ 1), 0);
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 207:
                                            Ff((((Ea >> 8) & 1) ^ 1));
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 144:
                                            break Ud;
                                        case 204:
                                            dc = ((Na + Oa - Qa) | 0);
                                            Ve(3, 1, 0, dc, 0);
                                            break Ud;
                                        case 205:
                                            da = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            if (!!(ta & 131072) & ((ta >> 12) & 3) != 3)
                                                Uc(13);
                                            dc = ((Na + Oa - Qa) | 0);
                                            Ve(da, 1, 0, dc, 0);
                                            break Ud;
                                        case 206:
                                            if ((td() | 0) ) {
                                                dc = ((Na + Oa - Qa) | 0);
                                                Ve(4, 1, 0, dc, 0);
                                            }
                                            break Ud;
                                        case 98:
                                            bg();
                                            break Ud;
                                        case 245:
                                            ma = (Bd() | 0) ^ 1;
                                            na = ((ma >> 6) & 1) ^ 1;
                                            oa = 24;
                                            break Ud;
                                        case 248:
                                            ma = (Bd() | 0) & ~1;
                                            na = ((ma >> 6) & 1) ^ 1;
                                            oa = 24;
                                            break Ud;
                                        case 249:
                                            ma = (Bd() | 0) | 1;
                                            na = ((ma >> 6) & 1) ^ 1;
                                            oa = 24;
                                            break Ud;
                                        case 252:
                                            ra = 1;
                                            break Ud;
                                        case 253:
                                            ra = -1;
                                            break Ud;
                                        case 250:
                                            Ef = (ta >> 12) & 3;
                                            if ((sa | 0) > (Ef | 0))
                                                Uc(13);
                                            ta = ta & ~512;
                                            break Ud;
                                        case 251:
                                            Ef = (ta >> 12) & 3;
                                            if ((sa | 0) > (Ef | 0))
                                                Uc(13);
                                            ta = ta | 512;
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 158:
                                            ma = (((Ya[((0) << 2) >> 2] | 0) >> 8) & (128 | 64 | 16 | 4 | 1)) | ((td() | 0) << 11);
                                            na = ((ma >> 6) & 1) ^ 1;
                                            oa = 24;
                                            break Ud;
                                        case 159:
                                            da = Cd() | 0;
                                            ec(4, da);
                                            break Ud;
                                        case 244:
                                            if ((sa | 0) != 0)
                                                Uc(13);
                                            ya = 1;
                                            Zg = 257;
                                            break bh;
                                        case 164:
                                            yg();
                                            break Ud;
                                        case 165:
                                            Qg();
                                            break Ud;
                                        case 170:
                                            Ag();
                                            break Ud;
                                        case 171:
                                            Sg();
                                            break Ud;
                                        case 166:
                                            Bg();
                                            break Ud;
                                        case 167:
                                            Tg();
                                            break Ud;
                                        case 172:
                                            Cg();
                                            break Ud;
                                        case 173:
                                            Ug();
                                            break Ud;
                                        case 174:
                                            Dg();
                                            break Ud;
                                        case 175:
                                            Vg();
                                            break Ud;
                                        case 108:
                                            rg();
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 109:
                                            Lg();
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 110:
                                            wg();
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 111:
                                            Pg();
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 216:
                                        case 217:
                                        case 218:
                                        case 219:
                                        case 220:
                                        case 221:
                                        case 222:
                                        case 223:
                                            if (ua & ((1 << 2) | (1 << 3))) {
                                                Uc(7);
                                            }
                                            hc = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            fc = (hc >> 3) & 7;
                                            Nf = hc & 7;
                                            pc = ((b & 7) << 3) | ((hc >> 3) & 7);
                                            Xa[((0) << 2) >> 1] = 65535;
                                            if ((hc >> 6) == 3) {} else {
                                                aa = gc(hc) | 0;
                                            }
                                            break Ud;
                                        case 155:
                                            break Ud;
                                        case 228:
                                            Ef = (ta >> 12) & 3;
                                            if ((sa | 0) > (Ef | 0))
                                                Uc(13);
                                            da = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            ec(0, Za(da | 0) | 0);
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 229:
                                            Ef = (ta >> 12) & 3;
                                            if ((sa | 0) > (Ef | 0))
                                                Uc(13);
                                            da = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            Ya[((0) << 2) >> 2] = bb(da | 0) | 0;
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 230:
                                            Ef = (ta >> 12) & 3;
                                            if ((sa | 0) > (Ef | 0))
                                                Uc(13);
                                            da = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            cb(da | 0, (Ya[((0) << 2) >> 2] | 0) & 255);
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 231:
                                            Ef = (ta >> 12) & 3;
                                            if ((sa | 0) > (Ef | 0))
                                                Uc(13);
                                            da = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            eb(da | 0, (Ya[((0) << 2) >> 2] | 0));
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 236:
                                            Ef = (ta >> 12) & 3;
                                            if ((sa | 0) > (Ef | 0))
                                                Uc(13);
                                            ec(0, Za((Ya[((2) << 2) >> 2] | 0) & 65535) | 0);
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 237:
                                            Ef = (ta >> 12) & 3;
                                            if ((sa | 0) > (Ef | 0))
                                                Uc(13);
                                            Ya[((0) << 2) >> 2] = bb((Ya[((2) << 2) >> 2] | 0) & 65535) | 0;
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 238:
                                            Ef = (ta >> 12) & 3;
                                            if ((sa | 0) > (Ef | 0))
                                                Uc(13);
                                            cb((Ya[((2) << 2) >> 2] | 0) & 65535, (Ya[((0) << 2) >> 2] | 0) & 255);
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 239:
                                            Ef = (ta >> 12) & 3;
                                            if ((sa | 0) > (Ef | 0))
                                                Uc(13);
                                            eb((Ya[((2) << 2) >> 2] | 0) & 65535, (Ya[((0) << 2) >> 2] | 0));
                                            {
                                                if ((Ba | 0) != 0 & !!(ta & 512))
                                                    break bh;
                                            }
                                            ;break Ud;
                                        case 39:
                                            Xf();
                                            break Ud;
                                        case 47:
                                            Zf();
                                            break Ud;
                                        case 55:
                                            Tf();
                                            break Ud;
                                        case 63:
                                            Wf();
                                            break Ud;
                                        case 212:
                                            da = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            Pf(da);
                                            break Ud;
                                        case 213:
                                            da = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            Sf(da);
                                            break Ud;
                                        case 99:
                                            Mf();
                                            break Ud;
                                        case 214:
                                        case 241:
                                            Uc(6);
                                            break;
                                        case 15:
                                            b = Wa[Oa] | 0;
                                            Oa = (Oa + 1) | 0;
                                            switch (b | 0) {
                                            case 128:
                                            case 129:
                                            case 130:
                                            case 131:
                                            case 132:
                                            case 133:
                                            case 134:
                                            case 135:
                                            case 136:
                                            case 137:
                                            case 138:
                                            case 139:
                                            case 140:
                                            case 141:
                                            case 142:
                                            case 143:
                                                {
                                                    da = Wa[Oa >> 0] | (Wa[(Oa + 1) >> 0] << 8) | (Wa[(Oa + 2) >> 0] << 16) | (Wa[(Oa + 3) >> 0] << 24);
                                                    Oa = (Oa + 4) | 0;
                                                }
                                                ;if (zd(b & 15) | 0)
                                                    Na = (Na + Oa - Qa + da) | 0,
                                                    Oa = Qa = 0,
                                                    Sa = 8192;
                                                break Ud;
                                            case 144:
                                            case 145:
                                            case 146:
                                            case 147:
                                            case 148:
                                            case 149:
                                            case 150:
                                            case 151:
                                            case 152:
                                            case 153:
                                            case 154:
                                            case 155:
                                            case 156:
                                            case 157:
                                            case 158:
                                            case 159:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                da = zd(b & 15) | 0;
                                                if ((hc >> 6) == 3) {
                                                    ec(hc & 7, da);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    Lb(aa, da);
                                                }
                                                break Ud;
                                            case 64:
                                            case 65:
                                            case 66:
                                            case 67:
                                            case 68:
                                            case 69:
                                            case 70:
                                            case 71:
                                            case 72:
                                            case 73:
                                            case 74:
                                            case 75:
                                            case 76:
                                            case 77:
                                            case 78:
                                            case 79:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                if ((hc >> 6) == 3) {
                                                    da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Db(aa) | 0;
                                                }
                                                if (zd(b & 15) | 0)
                                                    Ya[(((hc >> 3) & 7) << 2) >> 2] = da;
                                                break Ud;
                                            case 182:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                fc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    da = (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0) & 255;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                                                    if ((zb | 0) == -1)
                                                        da = vb(aa) | 0;
                                                    else
                                                        da = Wa[aa ^ zb] | 0;
                                                }
                                                Ya[((fc) << 2) >> 2] = da;
                                                break Ud;
                                            case 183:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                fc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    da = (Ya[((hc & 7) << 2) >> 2] | 0) & 65535;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Bb(aa) | 0;
                                                }
                                                Ya[((fc) << 2) >> 2] = da;
                                                break Ud;
                                            case 190:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                fc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    da = (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    zb = Ya[(Ua + ((aa >>> 12) << 2)) >> 2] | 0;
                                                    if ((zb | 0) == -1)
                                                        da = vb(aa) | 0;
                                                    else
                                                        da = Wa[aa ^ zb] | 0;
                                                }
                                                Ya[((fc) << 2) >> 2] = (((da) << 24) >> 24);
                                                break Ud;
                                            case 191:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                fc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Bb(aa) | 0;
                                                }
                                                Ya[((fc) << 2) >> 2] = (((da) << 16) >> 16);
                                                break Ud;
                                            case 0:
                                                if (!(ua & (1 << 0)) | !!(ta & 131072))
                                                    Uc(6);
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                pc = (hc >> 3) & 7;
                                                switch (pc | 0) {
                                                case 0:
                                                case 1:
                                                    if ((pc | 0) == 0)
                                                        da = (Ya[(((6) << 4) + (128 + 0)) >> 2] | 0);
                                                    else
                                                        da = (Ya[(((7) << 4) + (128 + 0)) >> 2] | 0);
                                                    if ((hc >> 6) == 3) {
                                                        Xa[((hc & 7) << 2) >> 1] = da;
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        Nb(aa, da);
                                                    }
                                                    break;
                                                case 2:
                                                case 3:
                                                    if ((sa | 0) != 0)
                                                        Uc(13);
                                                    if ((hc >> 6) == 3) {
                                                        da = (Ya[((hc & 7) << 2) >> 2] | 0) & 65535;
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Bb(aa) | 0;
                                                    }
                                                    if ((pc | 0) == 2)
                                                        We(da);
                                                    else
                                                        Ye(da);
                                                    break;
                                                case 4:
                                                case 5:
                                                    if ((hc >> 6) == 3) {
                                                        da = (Ya[((hc & 7) << 2) >> 2] | 0) & 65535;
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Bb(aa) | 0;
                                                    }
                                                    Lf(da, pc & 1);
                                                    break;
                                                default:
                                                    Uc(6);
                                                }
                                                break Ud;
                                            case 1:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                pc = (hc >> 3) & 7;
                                                switch (pc | 0) {
                                                case 2:
                                                case 3:
                                                    if ((hc >> 6) == 3)
                                                        Uc(6);
                                                    if ((sa | 0) != 0)
                                                        Uc(13);
                                                    aa = gc(hc) | 0;
                                                    da = Bb(aa) | 0;
                                                    aa = (aa + 2) | 0;
                                                    dc = Db(aa) | 0;
                                                    if ((pc | 0) == 2) {
                                                        Ya[(((8) << 4) + (128 + 4)) >> 2] = dc;
                                                        Ya[(((8) << 4) + (128 + 8)) >> 2] = da;
                                                    } else {
                                                        Ya[(((9) << 4) + (128 + 4)) >> 2] = dc;
                                                        Ya[(((9) << 4) + (128 + 8)) >> 2] = da;
                                                    }
                                                    break;
                                                case 7:
                                                    if ((sa | 0) != 0)
                                                        Uc(13);
                                                    if ((hc >> 6) == 3)
                                                        Uc(6);
                                                    aa = gc(hc) | 0;
                                                    rb(aa & -4096);
                                                    break;
                                                default:
                                                    Uc(6);
                                                }
                                                break Ud;
                                            case 2:
                                            case 3:
                                                Jf((((Ea >> 8) & 1) ^ 1), b & 1);
                                                break Ud;
                                            case 32:
                                                if ((sa | 0) != 0)
                                                    Uc(13);
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                if ((hc >> 6) != 3)
                                                    Uc(6);
                                                fc = (hc >> 3) & 7;
                                                switch (fc | 0) {
                                                case 0:
                                                    da = ua;
                                                    break;
                                                case 2:
                                                    da = va;
                                                    break;
                                                case 3:
                                                    da = wa;
                                                    break;
                                                case 4:
                                                    da = xa;
                                                    break;
                                                default:
                                                    Uc(6);
                                                }
                                                Ya[((hc & 7) << 2) >> 2] = da;
                                                break Ud;
                                            case 34:
                                                if ((sa | 0) != 0)
                                                    Uc(13);
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                if ((hc >> 6) != 3)
                                                    Uc(6);
                                                fc = (hc >> 3) & 7;
                                                da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                switch (fc | 0) {
                                                case 0:
                                                    ge(da);
                                                    break;
                                                case 2:
                                                    va = da;
                                                    break;
                                                case 3:
                                                    ie(da);
                                                    break;
                                                case 4:
                                                    ke(da);
                                                    break;
                                                default:
                                                    Uc(6);
                                                }
                                                break Ud;
                                            case 6:
                                                if ((sa | 0) != 0)
                                                    Uc(13);
                                                ge(ua & ~(1 << 3));
                                                break Ud;
                                            case 35:
                                                if ((sa | 0) != 0)
                                                    Uc(13);
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                if ((hc >> 6) != 3)
                                                    Uc(6);
                                                fc = (hc >> 3) & 7;
                                                da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                if ((fc | 0) == 4 | (fc | 0) == 5)
                                                    Uc(6);
                                                break Ud;
                                            case 178:
                                            case 180:
                                            case 181:
                                                pg(b & 7);
                                                break Ud;
                                            case 162:
                                                Of();
                                                break Ud;
                                            case 164:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                dc = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                                if ((hc >> 6) == 3) {
                                                    cg = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    Nf = hc & 7;
                                                    Ya[((Nf) << 2) >> 2] = Ic((Ya[((Nf) << 2) >> 2] | 0), dc, cg) | 0;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    cg = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    da = Jb(aa) | 0;
                                                    da = Ic(da, dc, cg) | 0;
                                                    Pb(aa, da);
                                                }
                                                break Ud;
                                            case 165:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                dc = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                                cg = (Ya[((1) << 2) >> 2] | 0);
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    Ya[((Nf) << 2) >> 2] = Ic((Ya[((Nf) << 2) >> 2] | 0), dc, cg) | 0;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Jb(aa) | 0;
                                                    da = Ic(da, dc, cg) | 0;
                                                    Pb(aa, da);
                                                }
                                                break Ud;
                                            case 172:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                dc = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                                if ((hc >> 6) == 3) {
                                                    cg = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    Nf = hc & 7;
                                                    Ya[((Nf) << 2) >> 2] = Jc((Ya[((Nf) << 2) >> 2] | 0), dc, cg) | 0;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    cg = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    da = Jb(aa) | 0;
                                                    da = Jc(da, dc, cg) | 0;
                                                    Pb(aa, da);
                                                }
                                                break Ud;
                                            case 173:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                dc = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                                cg = (Ya[((1) << 2) >> 2] | 0);
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    Ya[((Nf) << 2) >> 2] = Jc((Ya[((Nf) << 2) >> 2] | 0), dc, cg) | 0;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Jb(aa) | 0;
                                                    da = Jc(da, dc, cg) | 0;
                                                    Pb(aa, da);
                                                }
                                                break Ud;
                                            case 186:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                pc = (hc >> 3) & 7;
                                                switch (pc | 0) {
                                                case 4:
                                                    if ((hc >> 6) == 3) {
                                                        da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                        dc = Wa[Oa] | 0;
                                                        Oa = (Oa + 1) | 0;
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        dc = Wa[Oa] | 0;
                                                        Oa = (Oa + 1) | 0;
                                                        da = Db(aa) | 0;
                                                    }
                                                    Lc(da, dc);
                                                    break;
                                                case 5:
                                                case 6:
                                                case 7:
                                                    if ((hc >> 6) == 3) {
                                                        Nf = hc & 7;
                                                        dc = Wa[Oa] | 0;
                                                        Oa = (Oa + 1) | 0;
                                                        Ya[((Nf) << 2) >> 2] = Oc(pc & 3, (Ya[((Nf) << 2) >> 2] | 0), dc) | 0;
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        dc = Wa[Oa] | 0;
                                                        Oa = (Oa + 1) | 0;
                                                        da = Jb(aa) | 0;
                                                        da = Oc(pc & 3, da, dc) | 0;
                                                        Pb(aa, da);
                                                    }
                                                    break;
                                                default:
                                                    Uc(6);
                                                }
                                                break Ud;
                                            case 163:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                dc = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                                if ((hc >> 6) == 3) {
                                                    da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    aa = (aa + ((dc >> 5) << 2)) | 0;
                                                    da = Db(aa) | 0;
                                                }
                                                Lc(da, dc);
                                                break Ud;
                                            case 171:
                                            case 179:
                                            case 187:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                dc = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                                pc = (b >> 3) & 3;
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    Ya[((Nf) << 2) >> 2] = Oc(pc, (Ya[((Nf) << 2) >> 2] | 0), dc) | 0;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    aa = (aa + ((dc >> 5) << 2)) | 0;
                                                    da = Jb(aa) | 0;
                                                    da = Oc(pc, da, dc) | 0;
                                                    Pb(aa, da);
                                                }
                                                break Ud;
                                            case 188:
                                            case 189:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                fc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    dc = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    dc = Db(aa) | 0;
                                                }
                                                if (b & 1)
                                                    Ya[((fc) << 2) >> 2] = Sc((Ya[((fc) << 2) >> 2] | 0), dc) | 0;
                                                else
                                                    Ya[((fc) << 2) >> 2] = Qc((Ya[((fc) << 2) >> 2] | 0), dc) | 0;
                                                break Ud;
                                            case 175:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                fc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    dc = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    dc = Db(aa) | 0;
                                                }
                                                Ya[((fc) << 2) >> 2] = qd((Ya[((fc) << 2) >> 2] | 0), dc) | 0;
                                                break Ud;
                                            case 49:
                                                if (!!(xa & (1 << 2)) & (sa | 0) != 0)
                                                    Uc(13);
                                                da = ch() | 0;
                                                Ya[((0) << 2) >> 2] = da;
                                                Ya[((2) << 2) >> 2] = Ga;
                                                break Ud;
                                            case 192:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                fc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    da = (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0);
                                                    dc = xc(0, da, (Wa[(((fc & 3) << 2) + (fc >> 2)) >> 0] | 0)) | 0;
                                                    ec(fc, da);
                                                    ec(Nf, dc);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Fb(aa) | 0;
                                                    dc = xc(0, da, (Wa[(((fc & 3) << 2) + (fc >> 2)) >> 0] | 0)) | 0;
                                                    Lb(aa, dc);
                                                    ec(fc, da);
                                                }
                                                break Ud;
                                            case 193:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                fc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    da = (Ya[((Nf) << 2) >> 2] | 0);
                                                    dc = oc(0, da, (Ya[((fc) << 2) >> 2] | 0)) | 0;
                                                    Ya[((fc) << 2) >> 2] = da;
                                                    Ya[((Nf) << 2) >> 2] = dc;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Jb(aa) | 0;
                                                    dc = oc(0, da, (Ya[((fc) << 2) >> 2] | 0)) | 0;
                                                    Pb(aa, dc);
                                                    Ya[((fc) << 2) >> 2] = da;
                                                }
                                                break Ud;
                                            case 176:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                fc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    da = (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0);
                                                    dc = xc(5, (Ya[((0) << 2) >> 2] | 0), da) | 0;
                                                    if ((dc | 0) == 0) {
                                                        ec(Nf, (Wa[(((fc & 3) << 2) + (fc >> 2)) >> 0] | 0));
                                                    } else {
                                                        ec(0, da);
                                                    }
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Fb(aa) | 0;
                                                    dc = xc(5, (Ya[((0) << 2) >> 2] | 0), da) | 0;
                                                    if ((dc | 0) == 0) {
                                                        Lb(aa, (Wa[(((fc & 3) << 2) + (fc >> 2)) >> 0] | 0));
                                                    } else {
                                                        ec(0, da);
                                                    }
                                                }
                                                break Ud;
                                            case 177:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                fc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    da = (Ya[((Nf) << 2) >> 2] | 0);
                                                    dc = oc(5, (Ya[((0) << 2) >> 2] | 0), da) | 0;
                                                    if ((dc | 0) == 0) {
                                                        Ya[((Nf) << 2) >> 2] = (Ya[((fc) << 2) >> 2] | 0);
                                                    } else {
                                                        Ya[((0) << 2) >> 2] = da;
                                                    }
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Jb(aa) | 0;
                                                    dc = oc(5, (Ya[((0) << 2) >> 2] | 0), da) | 0;
                                                    if ((dc | 0) == 0) {
                                                        Pb(aa, (Ya[((fc) << 2) >> 2] | 0));
                                                    } else {
                                                        Ya[((0) << 2) >> 2] = da;
                                                    }
                                                }
                                                break Ud;
                                            case 160:
                                            case 168:
                                                Md((Ya[((((b >> 3) & 7) << 4) + (128 + 0)) >> 2] | 0));
                                                break Ud;
                                            case 161:
                                            case 169:
                                                cf((b >> 3) & 7, (Pd() | 0) & 65535);
                                                Qd();
                                                break Ud;
                                            case 200:
                                            case 201:
                                            case 202:
                                            case 203:
                                            case 204:
                                            case 205:
                                            case 206:
                                            case 207:
                                                fc = b & 7;
                                                da = (Ya[((fc) << 2) >> 2] | 0);
                                                da = (da >>> 24) | ((da >> 8) & 65280) | ((da << 8) & 16711680) | (da << 24);
                                                Ya[((fc) << 2) >> 2] = da;
                                                break Ud;
                                            case 4:
                                            case 5:
                                            case 7:
                                            case 8:
                                            case 9:
                                            case 10:
                                            case 11:
                                            case 12:
                                            case 13:
                                            case 14:
                                            case 15:
                                            case 16:
                                            case 17:
                                            case 18:
                                            case 19:
                                            case 20:
                                            case 21:
                                            case 22:
                                            case 23:
                                            case 24:
                                            case 25:
                                            case 26:
                                            case 27:
                                            case 28:
                                            case 29:
                                            case 30:
                                            case 31:
                                            case 33:
                                            case 36:
                                            case 37:
                                            case 38:
                                            case 39:
                                            case 40:
                                            case 41:
                                            case 42:
                                            case 43:
                                            case 44:
                                            case 45:
                                            case 46:
                                            case 47:
                                            case 48:
                                            case 50:
                                            case 51:
                                            case 52:
                                            case 53:
                                            case 54:
                                            case 55:
                                            case 56:
                                            case 57:
                                            case 58:
                                            case 59:
                                            case 60:
                                            case 61:
                                            case 62:
                                            case 63:
                                            case 80:
                                            case 81:
                                            case 82:
                                            case 83:
                                            case 84:
                                            case 85:
                                            case 86:
                                            case 87:
                                            case 88:
                                            case 89:
                                            case 90:
                                            case 91:
                                            case 92:
                                            case 93:
                                            case 94:
                                            case 95:
                                            case 96:
                                            case 97:
                                            case 98:
                                            case 99:
                                            case 100:
                                            case 101:
                                            case 102:
                                            case 103:
                                            case 104:
                                            case 105:
                                            case 106:
                                            case 107:
                                            case 108:
                                            case 109:
                                            case 110:
                                            case 111:
                                            case 112:
                                            case 113:
                                            case 114:
                                            case 115:
                                            case 116:
                                            case 117:
                                            case 118:
                                            case 119:
                                            case 120:
                                            case 121:
                                            case 122:
                                            case 123:
                                            case 124:
                                            case 125:
                                            case 126:
                                            case 127:
                                            case 166:
                                            case 167:
                                            case 170:
                                            case 174:
                                            case 184:
                                            case 185:
                                            case 194:
                                            case 195:
                                            case 196:
                                            case 197:
                                            case 198:
                                            case 199:
                                            case 208:
                                            case 209:
                                            case 210:
                                            case 211:
                                            case 212:
                                            case 213:
                                            case 214:
                                            case 215:
                                            case 216:
                                            case 217:
                                            case 218:
                                            case 219:
                                            case 220:
                                            case 221:
                                            case 222:
                                            case 223:
                                            case 224:
                                            case 225:
                                            case 226:
                                            case 227:
                                            case 228:
                                            case 229:
                                            case 230:
                                            case 231:
                                            case 232:
                                            case 233:
                                            case 234:
                                            case 235:
                                            case 236:
                                            case 237:
                                            case 238:
                                            case 239:
                                            case 240:
                                            case 241:
                                            case 242:
                                            case 243:
                                            case 244:
                                            case 245:
                                            case 246:
                                            case 247:
                                            case 248:
                                            case 249:
                                            case 250:
                                            case 251:
                                            case 252:
                                            case 253:
                                            case 254:
                                            case 255:
                                            default:
                                                Uc(6);
                                            }
                                            break;
                                        default:
                                            switch (b | 0) {
                                            case 393:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                da = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                                if ((hc >> 6) == 3) {
                                                    Xa[((hc & 7) << 2) >> 1] = da;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    Nb(aa, da);
                                                }
                                                break Ud;
                                            case 395:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                if ((hc >> 6) == 3) {
                                                    da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Bb(aa) | 0;
                                                }
                                                Xa[(((hc >> 3) & 7) << 2) >> 1] = da;
                                                break Ud;
                                            case 440:
                                            case 441:
                                            case 442:
                                            case 443:
                                            case 444:
                                            case 445:
                                            case 446:
                                            case 447:
                                                Xa[((b & 7) << 2) >> 1] = cc() | 0;
                                                break Ud;
                                            case 417:
                                                aa = nc() | 0;
                                                da = Bb(aa) | 0;
                                                Xa[((0) << 2) >> 1] = da;
                                                break Ud;
                                            case 419:
                                                aa = nc() | 0;
                                                Nb(aa, (Ya[((0) << 2) >> 2] | 0));
                                                break Ud;
                                            case 455:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                if ((hc >> 6) == 3) {
                                                    da = cc() | 0;
                                                    Xa[((hc & 7) << 2) >> 1] = da;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = cc() | 0;
                                                    Nb(aa, da);
                                                }
                                                break Ud;
                                            case 401:
                                            case 402:
                                            case 403:
                                            case 404:
                                            case 405:
                                            case 406:
                                            case 407:
                                                fc = b & 7;
                                                da = (Ya[((0) << 2) >> 2] | 0);
                                                Xa[((0) << 2) >> 1] = (Ya[((fc) << 2) >> 2] | 0);
                                                Xa[((fc) << 2) >> 1] = da;
                                                break Ud;
                                            case 391:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                fc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    da = (Ya[((Nf) << 2) >> 2] | 0);
                                                    Xa[((Nf) << 2) >> 1] = (Ya[((fc) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Hb(aa) | 0;
                                                    Nb(aa, (Ya[((fc) << 2) >> 2] | 0));
                                                }
                                                Xa[((fc) << 2) >> 1] = da;
                                                break Ud;
                                            case 452:
                                                qg(0);
                                                break Ud;
                                            case 453:
                                                qg(3);
                                                break Ud;
                                            case 257:
                                            case 265:
                                            case 273:
                                            case 281:
                                            case 289:
                                            case 297:
                                            case 305:
                                            case 313:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                pc = (b >> 3) & 7;
                                                dc = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    Xa[((Nf) << 2) >> 1] = uc(pc, (Ya[((Nf) << 2) >> 2] | 0), dc) | 0;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    if ((pc | 0) != 7) {
                                                        da = Hb(aa) | 0;
                                                        da = uc(pc, da, dc) | 0;
                                                        Nb(aa, da);
                                                    } else {
                                                        da = Bb(aa) | 0;
                                                        uc(7, da, dc) | 0;
                                                    }
                                                }
                                                break Ud;
                                            case 259:
                                            case 267:
                                            case 275:
                                            case 283:
                                            case 291:
                                            case 299:
                                            case 307:
                                            case 315:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                pc = (b >> 3) & 7;
                                                fc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    dc = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    dc = Bb(aa) | 0;
                                                }
                                                Xa[((fc) << 2) >> 1] = uc(pc, (Ya[((fc) << 2) >> 2] | 0), dc) | 0;
                                                break Ud;
                                            case 261:
                                            case 269:
                                            case 277:
                                            case 285:
                                            case 293:
                                            case 301:
                                            case 309:
                                            case 317:
                                                dc = cc() | 0;
                                                pc = (b >> 3) & 7;
                                                Xa[((0) << 2) >> 1] = uc(pc, (Ya[((0) << 2) >> 2] | 0), dc) | 0;
                                                break Ud;
                                            case 385:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                pc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    dc = cc() | 0;
                                                    Ya[((Nf) << 2) >> 2] = uc(pc, (Ya[((Nf) << 2) >> 2] | 0), dc) | 0;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    dc = cc() | 0;
                                                    if ((pc | 0) != 7) {
                                                        da = Hb(aa) | 0;
                                                        da = uc(pc, da, dc) | 0;
                                                        Nb(aa, da);
                                                    } else {
                                                        da = Bb(aa) | 0;
                                                        uc(7, da, dc) | 0;
                                                    }
                                                }
                                                break Ud;
                                            case 387:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                pc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    dc = ((Wa[Oa] << 24) >> 24);
                                                    Oa = (Oa + 1) | 0;
                                                    Xa[((Nf) << 2) >> 1] = uc(pc, (Ya[((Nf) << 2) >> 2] | 0), dc) | 0;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    dc = ((Wa[Oa] << 24) >> 24);
                                                    Oa = (Oa + 1) | 0;
                                                    if ((pc | 0) != 7) {
                                                        da = Hb(aa) | 0;
                                                        da = uc(pc, da, dc) | 0;
                                                        Nb(aa, da);
                                                    } else {
                                                        da = Bb(aa) | 0;
                                                        uc(7, da, dc) | 0;
                                                    }
                                                }
                                                break Ud;
                                            case 320:
                                            case 321:
                                            case 322:
                                            case 323:
                                            case 324:
                                            case 325:
                                            case 326:
                                            case 327:
                                                fc = b & 7;
                                                Xa[((fc) << 2) >> 1] = vc((Ya[((fc) << 2) >> 2] | 0)) | 0;
                                                break Ud;
                                            case 328:
                                            case 329:
                                            case 330:
                                            case 331:
                                            case 332:
                                            case 333:
                                            case 334:
                                            case 335:
                                                fc = b & 7;
                                                Xa[((fc) << 2) >> 1] = wc((Ya[((fc) << 2) >> 2] | 0)) | 0;
                                                break Ud;
                                            case 363:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                fc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    dc = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    dc = Bb(aa) | 0;
                                                }
                                                cg = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Xa[((fc) << 2) >> 1] = id(dc, cg) | 0;
                                                break Ud;
                                            case 361:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                fc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    dc = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    dc = Bb(aa) | 0;
                                                }
                                                cg = cc() | 0;
                                                Xa[((fc) << 2) >> 1] = id(dc, cg) | 0;
                                                break Ud;
                                            case 389:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                if ((hc >> 6) == 3) {
                                                    da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Bb(aa) | 0;
                                                }
                                                dc = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                                {
                                                    na = (((da & dc) << 16) >> 16);
                                                    oa = 13;
                                                }
                                                ;break Ud;
                                            case 425:
                                                dc = cc() | 0;
                                                {
                                                    na = ((((Ya[((0) << 2) >> 2] | 0) & dc) << 16) >> 16);
                                                    oa = 13;
                                                }
                                                ;break Ud;
                                            case 503:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                pc = (hc >> 3) & 7;
                                                switch (pc | 0) {
                                                case 0:
                                                    if ((hc >> 6) == 3) {
                                                        da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Bb(aa) | 0;
                                                    }
                                                    dc = cc() | 0;
                                                    {
                                                        na = (((da & dc) << 16) >> 16);
                                                        oa = 13;
                                                    }
                                                    ;break;
                                                case 2:
                                                    if ((hc >> 6) == 3) {
                                                        Nf = hc & 7;
                                                        Xa[((Nf) << 2) >> 1] = ~(Ya[((Nf) << 2) >> 2] | 0);
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Hb(aa) | 0;
                                                        da = ~da;
                                                        Nb(aa, da);
                                                    }
                                                    break;
                                                case 3:
                                                    if ((hc >> 6) == 3) {
                                                        Nf = hc & 7;
                                                        Xa[((Nf) << 2) >> 1] = uc(5, 0, (Ya[((Nf) << 2) >> 2] | 0)) | 0;
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Hb(aa) | 0;
                                                        da = uc(5, 0, da) | 0;
                                                        Nb(aa, da);
                                                    }
                                                    break;
                                                case 4:
                                                    if ((hc >> 6) == 3) {
                                                        da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Bb(aa) | 0;
                                                    }
                                                    da = hd((Ya[((0) << 2) >> 2] | 0), da) | 0;
                                                    Xa[((0) << 2) >> 1] = da;
                                                    Xa[((2) << 2) >> 1] = da >> 16;
                                                    break;
                                                case 5:
                                                    if ((hc >> 6) == 3) {
                                                        da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Bb(aa) | 0;
                                                    }
                                                    da = id((Ya[((0) << 2) >> 2] | 0), da) | 0;
                                                    Xa[((0) << 2) >> 1] = da;
                                                    Xa[((2) << 2) >> 1] = da >> 16;
                                                    break;
                                                case 6:
                                                    if ((hc >> 6) == 3) {
                                                        da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Bb(aa) | 0;
                                                    }
                                                    Wc(da);
                                                    break;
                                                case 7:
                                                    if ((hc >> 6) == 3) {
                                                        da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Bb(aa) | 0;
                                                    }
                                                    Xc(da);
                                                    break;
                                                default:
                                                    Uc(6);
                                                }
                                                break Ud;
                                            case 449:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                pc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    dc = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    Nf = hc & 7;
                                                    Xa[((Nf) << 2) >> 1] = Dc(pc, (Ya[((Nf) << 2) >> 2] | 0), dc) | 0;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    dc = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    da = Hb(aa) | 0;
                                                    da = Dc(pc, da, dc) | 0;
                                                    Nb(aa, da);
                                                }
                                                break Ud;
                                            case 465:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                pc = (hc >> 3) & 7;
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    Xa[((Nf) << 2) >> 1] = Dc(pc, (Ya[((Nf) << 2) >> 2] | 0), 1) | 0;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Hb(aa) | 0;
                                                    da = Dc(pc, da, 1) | 0;
                                                    Nb(aa, da);
                                                }
                                                break Ud;
                                            case 467:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                pc = (hc >> 3) & 7;
                                                dc = (Ya[((1) << 2) >> 2] | 0) & 255;
                                                if ((hc >> 6) == 3) {
                                                    Nf = hc & 7;
                                                    Xa[((Nf) << 2) >> 1] = Dc(pc, (Ya[((Nf) << 2) >> 2] | 0), dc) | 0;
                                                } else {
                                                    aa = gc(hc) | 0;
                                                    da = Hb(aa) | 0;
                                                    da = Dc(pc, da, dc) | 0;
                                                    Nb(aa, da);
                                                }
                                                break Ud;
                                            case 408:
                                                Xa[((0) << 2) >> 1] = ((Ya[((0) << 2) >> 2] | 0) << 24) >> 24;
                                                break Ud;
                                            case 409:
                                                Xa[((2) << 2) >> 1] = ((Ya[((0) << 2) >> 2] | 0) << 16) >> 31;
                                                break Ud;
                                            case 400:
                                                break Ud;
                                            case 336:
                                            case 337:
                                            case 338:
                                            case 339:
                                            case 340:
                                            case 341:
                                            case 342:
                                            case 343:
                                                Kd((Ya[((b & 7) << 2) >> 2] | 0));
                                                break Ud;
                                            case 344:
                                            case 345:
                                            case 346:
                                            case 347:
                                            case 348:
                                            case 349:
                                            case 350:
                                            case 351:
                                                da = Nd() | 0;
                                                Od();
                                                Xa[((b & 7) << 2) >> 1] = da;
                                                break Ud;
                                            case 352:
                                                eg();
                                                break Ud;
                                            case 353:
                                                gg();
                                                break Ud;
                                            case 399:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                if ((hc >> 6) == 3) {
                                                    da = Nd() | 0;
                                                    Od();
                                                    Xa[((hc & 7) << 2) >> 1] = da;
                                                } else {
                                                    da = Nd() | 0;
                                                    dc = (Ya[((4) << 2) >> 2] | 0);
                                                    Od();
                                                    cg = (Ya[((4) << 2) >> 2] | 0);
                                                    aa = gc(hc) | 0;
                                                    Ya[((4) << 2) >> 2] = dc;
                                                    Nb(aa, da);
                                                    Ya[((4) << 2) >> 2] = cg;
                                                }
                                                break Ud;
                                            case 360:
                                                da = cc() | 0;
                                                Kd(da);
                                                break Ud;
                                            case 362:
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Kd(da);
                                                break Ud;
                                            case 456:
                                                kg();
                                                break Ud;
                                            case 457:
                                                ig();
                                                break Ud;
                                            case 262:
                                            case 270:
                                            case 278:
                                            case 286:
                                                Kd((Ya[((((b >> 3) & 3) << 4) + (128 + 0)) >> 2] | 0));
                                                break Ud;
                                            case 263:
                                            case 279:
                                            case 287:
                                                cf((b >> 3) & 3, Nd() | 0);
                                                Od();
                                                break Ud;
                                            case 397:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                if ((hc >> 6) == 3)
                                                    Uc(6);
                                                Ea = (Ea & ~15) | (10 + 1);
                                                Xa[(((hc >> 3) & 7) << 2) >> 1] = gc(hc) | 0;
                                                break Ud;
                                            case 511:
                                                hc = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                pc = (hc >> 3) & 7;
                                                switch (pc | 0) {
                                                case 0:
                                                    if ((hc >> 6) == 3) {
                                                        Nf = hc & 7;
                                                        Xa[((Nf) << 2) >> 1] = vc((Ya[((Nf) << 2) >> 2] | 0)) | 0;
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Hb(aa) | 0;
                                                        da = vc(da) | 0;
                                                        Nb(aa, da);
                                                    }
                                                    break;
                                                case 1:
                                                    if ((hc >> 6) == 3) {
                                                        Nf = hc & 7;
                                                        Xa[((Nf) << 2) >> 1] = wc((Ya[((Nf) << 2) >> 2] | 0)) | 0;
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Hb(aa) | 0;
                                                        da = wc(da) | 0;
                                                        Nb(aa, da);
                                                    }
                                                    break;
                                                case 2:
                                                    if ((hc >> 6) == 3) {
                                                        da = (Ya[((hc & 7) << 2) >> 2] | 0) & 65535;
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Bb(aa) | 0;
                                                    }
                                                    Kd(((Na + Oa - Qa) | 0));
                                                    Na = da,
                                                    Oa = Qa = 0,
                                                    Sa = 8192;
                                                    break;
                                                case 4:
                                                    if ((hc >> 6) == 3) {
                                                        da = (Ya[((hc & 7) << 2) >> 2] | 0) & 65535;
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Bb(aa) | 0;
                                                    }
                                                    Na = da,
                                                    Oa = Qa = 0,
                                                    Sa = 8192;
                                                    break;
                                                case 6:
                                                    if ((hc >> 6) == 3) {
                                                        da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Bb(aa) | 0;
                                                    }
                                                    Kd(da);
                                                    break;
                                                case 3:
                                                case 5:
                                                    if ((hc >> 6) == 3)
                                                        Uc(6);
                                                    aa = gc(hc) | 0;
                                                    da = Bb(aa) | 0;
                                                    aa = (aa + 2) | 0;
                                                    dc = Bb(aa) | 0;
                                                    if ((pc | 0) == 3)
                                                        sf(0, dc, da, ((Na + Oa - Qa) | 0));
                                                    else
                                                        jf(dc, da);
                                                    break;
                                                default:
                                                    Uc(6);
                                                }
                                                break Ud;
                                            case 491:
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                Na = (Na + Oa - Qa + da) & 65535,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                                break Ud;
                                            case 489:
                                                da = cc() | 0;
                                                Na = (Na + Oa - Qa + da) & 65535,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                                break Ud;
                                            case 368:
                                            case 369:
                                            case 370:
                                            case 371:
                                            case 372:
                                            case 373:
                                            case 374:
                                            case 375:
                                            case 376:
                                            case 377:
                                            case 378:
                                            case 379:
                                            case 380:
                                            case 381:
                                            case 382:
                                            case 383:
                                                da = ((Wa[Oa] << 24) >> 24);
                                                Oa = (Oa + 1) | 0;
                                                dc = zd(b & 15) | 0;
                                                if (dc)
                                                    Na = (Na + Oa - Qa + da) & 65535,
                                                    Oa = Qa = 0,
                                                    Sa = 8192;
                                                break Ud;
                                            case 450:
                                                dc = ((cc() | 0) << 16) >> 16;
                                                da = Nd() | 0;
                                                Ya[((4) << 2) >> 2] = ((Ya[((4) << 2) >> 2] | 0) & ~Ka) | (((Ya[((4) << 2) >> 2] | 0) + 2 + dc) & Ka);
                                                Na = da,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                                break Ud;
                                            case 451:
                                                da = Nd() | 0;
                                                Od();
                                                Na = da,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                                break Ud;
                                            case 488:
                                                da = cc() | 0 | 0;
                                                Kd(((Na + Oa - Qa) | 0));
                                                Na = (Na + Oa - Qa + da) & 65535,
                                                Oa = Qa = 0,
                                                Sa = 8192;
                                                break Ud;
                                            case 354:
                                                dg();
                                                break Ud;
                                            case 421:
                                                Gg();
                                                break Ud;
                                            case 423:
                                                Ig();
                                                break Ud;
                                            case 429:
                                                Jg();
                                                break Ud;
                                            case 431:
                                                Kg();
                                                break Ud;
                                            case 427:
                                                Hg();
                                                break Ud;
                                            case 365:
                                                Eg();
                                                {
                                                    if ((Ba | 0) != 0 & !!(ta & 512))
                                                        break bh;
                                                }
                                                ;break Ud;
                                            case 367:
                                                Fg();
                                                {
                                                    if ((Ba | 0) != 0 & !!(ta & 512))
                                                        break bh;
                                                }
                                                ;break Ud;
                                            case 485:
                                                Ef = (ta >> 12) & 3;
                                                if ((sa | 0) > (Ef | 0))
                                                    Uc(13);
                                                da = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                Xa[((0) << 2) >> 1] = ab(da | 0) | 0;
                                                {
                                                    if ((Ba | 0) != 0 & !!(ta & 512))
                                                        break bh;
                                                }
                                                ;break Ud;
                                            case 487:
                                                Ef = (ta >> 12) & 3;
                                                if ((sa | 0) > (Ef | 0))
                                                    Uc(13);
                                                da = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                db(da | 0, (Ya[((0) << 2) >> 2] | 0) & 65535);
                                                {
                                                    if ((Ba | 0) != 0 & !!(ta & 512))
                                                        break bh;
                                                }
                                                ;break Ud;
                                            case 493:
                                                Ef = (ta >> 12) & 3;
                                                if ((sa | 0) > (Ef | 0))
                                                    Uc(13);
                                                Xa[((0) << 2) >> 1] = ab((Ya[((2) << 2) >> 2] | 0) & 65535) | 0;
                                                {
                                                    if ((Ba | 0) != 0 & !!(ta & 512))
                                                        break bh;
                                                }
                                                ;break Ud;
                                            case 495:
                                                Ef = (ta >> 12) & 3;
                                                if ((sa | 0) > (Ef | 0))
                                                    Uc(13);
                                                db((Ya[((2) << 2) >> 2] | 0) & 65535, (Ya[((0) << 2) >> 2] | 0) & 65535);
                                                {
                                                    if ((Ba | 0) != 0 & !!(ta & 512))
                                                        break bh;
                                                }
                                                ;break Ud;
                                            case 358:
                                            case 359:
                                            case 496:
                                            case 498:
                                            case 499:
                                            case 294:
                                            case 302:
                                            case 310:
                                            case 318:
                                            case 356:
                                            case 357:
                                            case 256:
                                            case 264:
                                            case 272:
                                            case 280:
                                            case 288:
                                            case 296:
                                            case 304:
                                            case 312:
                                            case 258:
                                            case 266:
                                            case 274:
                                            case 282:
                                            case 290:
                                            case 298:
                                            case 306:
                                            case 314:
                                            case 260:
                                            case 268:
                                            case 276:
                                            case 284:
                                            case 292:
                                            case 300:
                                            case 308:
                                            case 316:
                                            case 416:
                                            case 418:
                                            case 472:
                                            case 473:
                                            case 474:
                                            case 475:
                                            case 476:
                                            case 477:
                                            case 478:
                                            case 479:
                                            case 388:
                                            case 424:
                                            case 502:
                                            case 448:
                                            case 464:
                                            case 466:
                                            case 510:
                                            case 461:
                                            case 462:
                                            case 501:
                                            case 504:
                                            case 505:
                                            case 508:
                                            case 509:
                                            case 506:
                                            case 507:
                                            case 414:
                                            case 415:
                                            case 500:
                                            case 295:
                                            case 303:
                                            case 311:
                                            case 319:
                                            case 468:
                                            case 469:
                                            case 364:
                                            case 366:
                                            case 420:
                                            case 422:
                                            case 426:
                                            case 428:
                                            case 430:
                                            case 384:
                                            case 386:
                                            case 390:
                                            case 392:
                                            case 394:
                                            case 396:
                                            case 398:
                                            case 411:
                                            case 432:
                                            case 433:
                                            case 434:
                                            case 435:
                                            case 436:
                                            case 437:
                                            case 438:
                                            case 439:
                                            case 454:
                                            case 460:
                                            case 471:
                                            case 484:
                                            case 486:
                                            case 492:
                                            case 494:
                                            case 463:
                                            case 458:
                                            case 459:
                                            case 410:
                                            case 412:
                                            case 413:
                                            case 490:
                                            case 480:
                                            case 481:
                                            case 482:
                                            case 483:
                                                b = b & 255;
                                                break;
                                            case 355:
                                            case 470:
                                            case 497:
                                                Uc(6);
                                            case 271:
                                                b = Wa[Oa] | 0;
                                                Oa = (Oa + 1) | 0;
                                                b = b | 256;
                                                switch (b | 0) {
                                                case 384:
                                                case 385:
                                                case 386:
                                                case 387:
                                                case 388:
                                                case 389:
                                                case 390:
                                                case 391:
                                                case 392:
                                                case 393:
                                                case 394:
                                                case 395:
                                                case 396:
                                                case 397:
                                                case 398:
                                                case 399:
                                                    da = cc() | 0;
                                                    if (zd(b & 15) | 0)
                                                        Na = (Na + Oa - Qa + da) & 65535,
                                                        Oa = Qa = 0,
                                                        Sa = 8192;
                                                    break Ud;
                                                case 320:
                                                case 321:
                                                case 322:
                                                case 323:
                                                case 324:
                                                case 325:
                                                case 326:
                                                case 327:
                                                case 328:
                                                case 329:
                                                case 330:
                                                case 331:
                                                case 332:
                                                case 333:
                                                case 334:
                                                case 335:
                                                    hc = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    if ((hc >> 6) == 3) {
                                                        da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Bb(aa) | 0;
                                                    }
                                                    if (zd(b & 15) | 0)
                                                        Xa[(((hc >> 3) & 7) << 2) >> 1] = da;
                                                    break Ud;
                                                case 438:
                                                    hc = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    fc = (hc >> 3) & 7;
                                                    if ((hc >> 6) == 3) {
                                                        Nf = hc & 7;
                                                        da = (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0) & 255;
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = yb(aa) | 0;
                                                    }
                                                    Xa[((fc) << 2) >> 1] = da;
                                                    break Ud;
                                                case 446:
                                                    hc = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    fc = (hc >> 3) & 7;
                                                    if ((hc >> 6) == 3) {
                                                        Nf = hc & 7;
                                                        da = (Wa[(((Nf & 3) << 2) + (Nf >> 2)) >> 0] | 0);
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = yb(aa) | 0;
                                                    }
                                                    Xa[((fc) << 2) >> 1] = (((da) << 24) >> 24);
                                                    break Ud;
                                                case 439:
                                                case 447:
                                                    hc = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    fc = (hc >> 3) & 7;
                                                    if ((hc >> 6) == 3) {
                                                        Nf = hc & 7;
                                                        da = (Ya[((Nf) << 2) >> 2] | 0);
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Bb(aa) | 0;
                                                    }
                                                    Xa[((fc) << 2) >> 1] = da;
                                                    break Ud;
                                                case 431:
                                                    hc = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    fc = (hc >> 3) & 7;
                                                    if ((hc >> 6) == 3) {
                                                        dc = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        dc = Bb(aa) | 0;
                                                    }
                                                    Xa[((fc) << 2) >> 1] = id((Ya[((fc) << 2) >> 2] | 0), dc) | 0;
                                                    break Ud;
                                                case 449:
                                                    hc = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    fc = (hc >> 3) & 7;
                                                    if ((hc >> 6) == 3) {
                                                        Nf = hc & 7;
                                                        da = (Ya[((Nf) << 2) >> 2] | 0);
                                                        dc = uc(0, da, (Ya[((fc) << 2) >> 2] | 0)) | 0;
                                                        Xa[((fc) << 2) >> 1] = da;
                                                        Xa[((Nf) << 2) >> 1] = dc;
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Hb(aa) | 0;
                                                        dc = uc(0, da, (Ya[((fc) << 2) >> 2] | 0)) | 0;
                                                        Nb(aa, dc);
                                                        Xa[((fc) << 2) >> 1] = da;
                                                    }
                                                    break Ud;
                                                case 416:
                                                case 424:
                                                    Kd((Ya[((((b >> 3) & 7) << 4) + (128 + 0)) >> 2] | 0));
                                                    break Ud;
                                                case 417:
                                                case 425:
                                                    cf((b >> 3) & 7, Nd() | 0);
                                                    Od();
                                                    break Ud;
                                                case 434:
                                                case 436:
                                                case 437:
                                                    qg(b & 7);
                                                    break Ud;
                                                case 420:
                                                case 428:
                                                    hc = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    dc = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                                    pc = (b >> 3) & 1;
                                                    if ((hc >> 6) == 3) {
                                                        cg = Wa[Oa] | 0;
                                                        Oa = (Oa + 1) | 0;
                                                        Nf = hc & 7;
                                                        Xa[((Nf) << 2) >> 1] = Fc(pc, (Ya[((Nf) << 2) >> 2] | 0), dc, cg) | 0;
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        cg = Wa[Oa] | 0;
                                                        Oa = (Oa + 1) | 0;
                                                        da = Hb(aa) | 0;
                                                        da = Fc(pc, da, dc, cg) | 0;
                                                        Nb(aa, da);
                                                    }
                                                    break Ud;
                                                case 421:
                                                case 429:
                                                    hc = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    dc = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                                    cg = (Ya[((1) << 2) >> 2] | 0);
                                                    pc = (b >> 3) & 1;
                                                    if ((hc >> 6) == 3) {
                                                        Nf = hc & 7;
                                                        Xa[((Nf) << 2) >> 1] = Fc(pc, (Ya[((Nf) << 2) >> 2] | 0), dc, cg) | 0;
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Hb(aa) | 0;
                                                        da = Fc(pc, da, dc, cg) | 0;
                                                        Nb(aa, da);
                                                    }
                                                    break Ud;
                                                case 442:
                                                    hc = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    pc = (hc >> 3) & 7;
                                                    switch (pc | 0) {
                                                    case 4:
                                                        if ((hc >> 6) == 3) {
                                                            da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                            dc = Wa[Oa] | 0;
                                                            Oa = (Oa + 1) | 0;
                                                        } else {
                                                            aa = gc(hc) | 0;
                                                            dc = Wa[Oa] | 0;
                                                            Oa = (Oa + 1) | 0;
                                                            da = Bb(aa) | 0;
                                                        }
                                                        Kc(da, dc);
                                                        break;
                                                    case 5:
                                                    case 6:
                                                    case 7:
                                                        if ((hc >> 6) == 3) {
                                                            Nf = hc & 7;
                                                            dc = Wa[Oa] | 0;
                                                            Oa = (Oa + 1) | 0;
                                                            Xa[((Nf) << 2) >> 1] = Mc(pc & 3, (Ya[((Nf) << 2) >> 2] | 0), dc) | 0;
                                                        } else {
                                                            aa = gc(hc) | 0;
                                                            dc = Wa[Oa] | 0;
                                                            Oa = (Oa + 1) | 0;
                                                            da = Hb(aa) | 0;
                                                            da = Mc(pc & 3, da, dc) | 0;
                                                            Nb(aa, da);
                                                        }
                                                        break;
                                                    default:
                                                        Uc(6);
                                                    }
                                                    break Ud;
                                                case 419:
                                                    hc = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    dc = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                                    if ((hc >> 6) == 3) {
                                                        da = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        aa = (aa + (((dc & 65535) >> 4) << 1)) | 0;
                                                        da = Bb(aa) | 0;
                                                    }
                                                    Kc(da, dc);
                                                    break Ud;
                                                case 427:
                                                case 435:
                                                case 443:
                                                    hc = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    dc = (Ya[(((hc >> 3) & 7) << 2) >> 2] | 0);
                                                    pc = (b >> 3) & 3;
                                                    if ((hc >> 6) == 3) {
                                                        Nf = hc & 7;
                                                        Xa[((Nf) << 2) >> 1] = Mc(pc, (Ya[((Nf) << 2) >> 2] | 0), dc) | 0;
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        aa = (aa + (((dc & 65535) >> 4) << 1)) | 0;
                                                        da = Hb(aa) | 0;
                                                        da = Mc(pc, da, dc) | 0;
                                                        Nb(aa, da);
                                                    }
                                                    break Ud;
                                                case 444:
                                                case 445:
                                                    hc = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    fc = (hc >> 3) & 7;
                                                    if ((hc >> 6) == 3) {
                                                        dc = (Ya[((hc & 7) << 2) >> 2] | 0);
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        dc = Bb(aa) | 0;
                                                    }
                                                    da = (Ya[((fc) << 2) >> 2] | 0);
                                                    if (b & 1)
                                                        da = Rc(da, dc) | 0;
                                                    else
                                                        da = Pc(da, dc) | 0;
                                                    Xa[((fc) << 2) >> 1] = da;
                                                    break Ud;
                                                case 433:
                                                    hc = Wa[Oa] | 0;
                                                    Oa = (Oa + 1) | 0;
                                                    fc = (hc >> 3) & 7;
                                                    if ((hc >> 6) == 3) {
                                                        Nf = hc & 7;
                                                        da = (Ya[((Nf) << 2) >> 2] | 0);
                                                        dc = uc(5, (Ya[((0) << 2) >> 2] | 0), da) | 0;
                                                        if ((dc | 0) == 0) {
                                                            Xa[((Nf) << 2) >> 1] = (Ya[((fc) << 2) >> 2] | 0);
                                                        } else {
                                                            Xa[((0) << 2) >> 1] = da;
                                                        }
                                                    } else {
                                                        aa = gc(hc) | 0;
                                                        da = Hb(aa) | 0;
                                                        dc = uc(5, (Ya[((0) << 2) >> 2] | 0), da) | 0;
                                                        if ((dc | 0) == 0) {
                                                            Nb(aa, (Ya[((fc) << 2) >> 2] | 0));
                                                        } else {
                                                            Xa[((0) << 2) >> 1] = da;
                                                        }
                                                    }
                                                    break Ud;
                                                case 456:
                                                case 457:
                                                case 458:
                                                case 459:
                                                case 460:
                                                case 461:
                                                case 462:
                                                case 463:
                                                    fc = b & 7;
                                                    da = (Ya[((fc) << 2) >> 2] | 0);
                                                    da = (da >>> 24) | ((da >> 8) & 65280) | ((da << 8) & 16711680) | (da << 24);
                                                    Ya[((fc) << 2) >> 2] = da;
                                                    break Ud;
                                                case 256:
                                                case 257:
                                                case 258:
                                                case 259:
                                                case 288:
                                                case 290:
                                                case 262:
                                                case 291:
                                                case 418:
                                                case 305:
                                                case 400:
                                                case 401:
                                                case 402:
                                                case 403:
                                                case 404:
                                                case 405:
                                                case 406:
                                                case 407:
                                                case 408:
                                                case 409:
                                                case 410:
                                                case 411:
                                                case 412:
                                                case 413:
                                                case 414:
                                                case 415:
                                                case 432:
                                                    b = 15;
                                                    Oa = (Oa - 1) | 0;
                                                    break;
                                                case 260:
                                                case 261:
                                                case 263:
                                                case 264:
                                                case 265:
                                                case 266:
                                                case 267:
                                                case 268:
                                                case 269:
                                                case 270:
                                                case 271:
                                                case 272:
                                                case 273:
                                                case 274:
                                                case 275:
                                                case 276:
                                                case 277:
                                                case 278:
                                                case 279:
                                                case 280:
                                                case 281:
                                                case 282:
                                                case 283:
                                                case 284:
                                                case 285:
                                                case 286:
                                                case 287:
                                                case 289:
                                                case 292:
                                                case 293:
                                                case 294:
                                                case 295:
                                                case 296:
                                                case 297:
                                                case 298:
                                                case 299:
                                                case 300:
                                                case 301:
                                                case 302:
                                                case 303:
                                                case 304:
                                                case 306:
                                                case 307:
                                                case 308:
                                                case 309:
                                                case 310:
                                                case 311:
                                                case 312:
                                                case 313:
                                                case 314:
                                                case 315:
                                                case 316:
                                                case 317:
                                                case 318:
                                                case 319:
                                                case 336:
                                                case 337:
                                                case 338:
                                                case 339:
                                                case 340:
                                                case 341:
                                                case 342:
                                                case 343:
                                                case 344:
                                                case 345:
                                                case 346:
                                                case 347:
                                                case 348:
                                                case 349:
                                                case 350:
                                                case 351:
                                                case 352:
                                                case 353:
                                                case 354:
                                                case 355:
                                                case 356:
                                                case 357:
                                                case 358:
                                                case 359:
                                                case 360:
                                                case 361:
                                                case 362:
                                                case 363:
                                                case 364:
                                                case 365:
                                                case 366:
                                                case 367:
                                                case 368:
                                                case 369:
                                                case 370:
                                                case 371:
                                                case 372:
                                                case 373:
                                                case 374:
                                                case 375:
                                                case 376:
                                                case 377:
                                                case 378:
                                                case 379:
                                                case 380:
                                                case 381:
                                                case 382:
                                                case 383:
                                                case 422:
                                                case 423:
                                                case 426:
                                                case 430:
                                                case 440:
                                                case 441:
                                                case 448:
                                                case 450:
                                                case 451:
                                                case 452:
                                                case 453:
                                                case 454:
                                                case 455:
                                                default:
                                                    Uc(6);
                                                }
                                                break;
                                            default:
                                                Uc(6);
                                            }
                                        }
                                    }
                                    Fa = (Fa - 1) | 0;
                                } while (Fa);za = dh(za, Aa, (Da - Fa) | 0, 0) | 0;
                                Aa = Ga;
                                Na = ((Na + Oa - Qa) | 0);
                                return Zg | 0;
                            }
                            ;function dh(ad, Zc, kd, ld) {
                                ad = ad | 0;
                                Zc = Zc | 0;
                                kd = kd | 0;
                                ld = ld | 0;
                                var sc = 0;
                                ad = (ad + kd) | 0;
                                sc = ((ad >>> 0) < (kd >>> 0));
                                Ga = (Zc + ld + sc) | 0;
                                return ad | 0;
                            }
                            function ch() {
                                return dh(za, Aa, (Da - Fa) | 0, 0) | 0;
                            }
                            function get_cycles() {
                                var r = 0.0;
                                r = +(Aa >>> 0) * 4294967296.0 + (+(za >>> 0));
                                return +r;
                            }
                            function set_irq(eh) {
                                eh = eh | 0;
                                Ba = !!eh;
                            }
                            function fe(He, Zd) {
                                He = He | 0;
                                Zd = Zd | 0;
                                za = dh(za, Aa, (Da - Fa) | 0, 0) | 0;
                                Aa = Ga;
                                Na = Na;
                                hb(He | 0, Zd | 0);
                            }
                            function Uc(He) {
                                He = He | 0;
                                fe(He, 0);
                            }
                            function set_reg(fc, da) {
                                fc = fc | 0;
                                da = da | 0;
                                switch (fc | 0) {
                                case 8:
                                    Na = da;
                                    break;
                                default:
                                    Ya[((fc) << 2) >> 2] = da;
                                    break;
                                }
                            }
                            function get_reg(fc) {
                                fc = fc | 0;
                                var da = 0;
                                switch (fc | 0) {
                                case 8:
                                    da = Na;
                                    break;
                                case 9:
                                    da = va;
                                    break;
                                default:
                                    da = (Ya[((fc) << 2) >> 2] | 0);
                                    break;
                                }
                                return da | 0;
                            }
                            function fh() {
                                var i = 0
                                  , v = 0;
                                for (i = 0; (i | 0) < 256; i = (i + 1) | 0) {
                                    v = i ^ (i >> 4);
                                    v = v ^ (v >> 2);
                                    v = v ^ (v >> 1);
                                    v = (v & 1) ^ 1;
                                    Wa[(i + 3840) >> 0] = v;
                                }
                                for (i = 0; (i | 0) < 32; i = (i + 1) | 0) {
                                    Wa[(i + 3584) >> 0] = ((i | 0) % 17) | 0;
                                }
                                for (i = 0; (i | 0) < 32; i = (i + 1) | 0) {
                                    Wa[(i + 3616) >> 0] = ((i | 0) % 9) | 0;
                                }
                            }
                            function init() {
                                var i = 0;
                                fh();
                                Na = 0;
                                oa = 0;
                                na = 0;
                                ma = 0;
                                pa = 0;
                                qa = 0;
                                ra = 1;
                                sa = 0;
                                ta = 2;
                                ua = (1 << 0);
                                va = 0;
                                wa = 0;
                                xa = 0;
                                Ya[(((2) << 4) + (128 + 12)) >> 2] = (1 << 22);
                                Ya[(((1) << 4) + (128 + 12)) >> 2] = (1 << 22);
                                for (i = 0; (i | 0) < 4194304; i = (i + 4) | 0) {
                                    Ya[(4096 + i) >> 2] = -1;
                                    Ya[(4198400 + i) >> 2] = -1;
                                    Ya[(8392704 + i) >> 2] = -1;
                                    Ya[(12587008 + i) >> 2] = -1;
                                }
                                Ta = 0;
                            }
                            return {
                                init: init,
                                exec_internal: exec_internal,
                                set_reg: set_reg,
                                get_reg: get_reg,
                                st8_phys: st8_phys,
                                ld8_phys: ld8_phys,
                                get_cycles: get_cycles,
                                set_irq: set_irq
                            };
                        }
                        function CPU_X86(gh) {
                            var i, hh, ih, jh;
                            function cb(aa, da) {
                                this.st8_port(aa, da);
                            }
                            function db(aa, da) {
                                this.st16_port(aa, da);
                            }
                            this.mem_size = gh;
                            gh += 16789504;
                            gh = (gh + (1 << 24) - 1) & ~((1 << 24) - 1);
                            ih = new ArrayBuffer(gh);
                            jh = this;
                            var ka = {
                                "ld8_port": function(aa) {
                                    return jh.ld8_port(aa);
                                },
                                "ld16_port": function(aa) {
                                    return jh.ld16_port(aa);
                                },
                                "ld32_port": function(aa) {
                                    return jh.ld32_port(aa);
                                },
                                "st8_port": function(aa, da) {
                                    jh.st8_port(aa, da);
                                },
                                "st16_port": function(aa, da) {
                                    jh.st16_port(aa, da);
                                },
                                "st32_port": function(aa, da) {
                                    jh.st32_port(aa, da);
                                },
                                "get_hard_intno": function() {
                                    return jh.get_hard_intno();
                                },
                                "cpu_abort": function(kh) {
                                    throw ("CPU abort: line=" + kh);
                                },
                                "raise_exception_err2": function(He, Zd) {
                                    throw {
                                        "intno": He,
                                        "error_code": Zd
                                    };
                                },
                                "cpu_log": function(n) {
                                    console.log("cpu_log n=" + n);
                                }
                            };
                            hh = CPU_X86_EXEC(window, ka, ih);
                            hh.init();
                            this.exec_internal = hh.exec_internal;
                            this.set_reg = hh.set_reg;
                            this.get_reg = hh.get_reg;
                            this.st8_phys = hh.st8_phys;
                            this.ld8_phys = hh.ld8_phys;
                            this.get_cycles = hh.get_cycles;
                            this.set_irq = hh.set_irq;
                        }
                        CPU_X86.prototype.exec = function lh(Da) {
                            var mh, Zg, nh, Xg;
                            var Da, Yg;
                            if (Da <= 0)
                                return 256;
                            nh = this.get_cycles() + Da;
                            Zg = 256;
                            Xg = -1;
                            Yg = 0;
                            while (this.get_cycles() < nh) {
                                Da = nh - this.get_cycles();
                                if (Da > 2147483647)
                                    Da = 2147483647;
                                try {
                                    Zg = this.exec_internal(Da, Xg, Yg);
                                    if (Zg != 256)
                                        break;
                                    Xg = -1;
                                } catch (oh) {
                                    if (oh.hasOwnProperty("intno")) {
                                        Xg = oh.intno;
                                        Yg = oh.error_code;
                                    } else {
                                        throw oh;
                                    }
                                }
                            }
                            return Zg;
                        }
                        ;
                        CPU_X86.prototype.load_binary = function(ph, aa, qh) {
                            var rh, jh;
                            jh = this;
                            rh = function(sh, Mg) {
                                var i;
                                if (Mg < 0) {
                                    qh(Mg);
                                } else {
                                    if (typeof sh == "string") {
                                        for (i = 0; i < Mg; i++) {
                                            jh.st8_phys(aa + i, sh.charCodeAt(i));
                                        }
                                    } else {
                                        for (i = 0; i < Mg; i++) {
                                            jh.st8_phys(aa + i, sh[i]);
                                        }
                                    }
                                    qh(Mg);
                                }
                            }
                            ;
                            load_binary(ph, rh);
                        }
                        ;
                        function th(a) {
                            return ((a / 10) << 4) | (a % 10);
                        }
                        function uh(n) {
                            return new Uint8Array(n);
                        }
                        function vh(wh) {
                            var xh, d;
                            xh = uh(128);
                            this.cmos_data = xh;
                            this.cmos_index = 0;
                            d = new Date();
                            xh[0] = th(d.getUTCSeconds());
                            xh[2] = th(d.getUTCMinutes());
                            xh[4] = th(d.getUTCHours());
                            xh[6] = th(d.getUTCDay());
                            xh[7] = th(d.getUTCDate());
                            xh[8] = th(d.getUTCMonth() + 1);
                            xh[9] = th(d.getUTCFullYear() % 100);
                            xh[10] = 38;
                            xh[11] = 2;
                            xh[12] = 0;
                            xh[13] = 128;
                            xh[20] = 2;
                            wh.register_ioport_write(112, 2, 1, this.ioport_write.bind(this));
                            wh.register_ioport_read(112, 2, 1, this.ioport_read.bind(this));
                        }
                        vh.prototype.ioport_write = function(aa, sh) {
                            if (aa == 112) {
                                this.cmos_index = sh & 127;
                            }
                        }
                        ;
                        vh.prototype.ioport_read = function(aa) {
                            var yh;
                            if (aa == 112) {
                                return 255;
                            } else {
                                yh = this.cmos_data[this.cmos_index];
                                if (this.cmos_index == 10)
                                    this.cmos_data[10] ^= 128;
                                else if (this.cmos_index == 12)
                                    this.cmos_data[12] = 0;
                                return yh;
                            }
                        }
                        ;
                        function zh(wh, ug) {
                            wh.register_ioport_write(ug, 2, 1, this.ioport_write.bind(this));
                            wh.register_ioport_read(ug, 2, 1, this.ioport_read.bind(this));
                            this.reset();
                        }
                        zh.prototype.reset = function() {
                            this.last_irr = 0;
                            this.irr = 0;
                            this.imr = 0;
                            this.isr = 0;
                            this.priority_add = 0;
                            this.irq_base = 0;
                            this.read_reg_select = 0;
                            this.special_mask = 0;
                            this.init_state = 0;
                            this.auto_eoi = 0;
                            this.rotate_on_autoeoi = 0;
                            this.init4 = 0;
                            this.elcr = 0;
                            this.elcr_mask = 0;
                        }
                        ;
                        zh.prototype.set_irq1 = function(Ah, lg) {
                            var Nc;
                            Nc = 1 << Ah;
                            if (lg) {
                                if ((this.last_irr & Nc) == 0)
                                    this.irr |= Nc;
                                this.last_irr |= Nc;
                            } else {
                                this.last_irr &= ~Nc;
                            }
                        }
                        ;
                        zh.prototype.get_priority = function(Nc) {
                            var Bh;
                            if (Nc == 0)
                                return -1;
                            Bh = 7;
                            while ((Nc & (1 << ((Bh + this.priority_add) & 7))) == 0)
                                Bh--;
                            return Bh;
                        }
                        ;
                        zh.prototype.get_irq = function() {
                            var Nc, Ch, Bh;
                            Nc = this.irr & ~this.imr;
                            Bh = this.get_priority(Nc);
                            if (Bh < 0)
                                return -1;
                            Ch = this.get_priority(this.isr);
                            if (Bh > Ch) {
                                return Bh;
                            } else {
                                return -1;
                            }
                        }
                        ;
                        zh.prototype.intack = function(Ah) {
                            if (this.auto_eoi) {
                                if (this.rotate_on_auto_eoi)
                                    this.priority_add = (Ah + 1) & 7;
                            } else {
                                this.isr |= (1 << Ah);
                            }
                            if (!(this.elcr & (1 << Ah)))
                                this.irr &= ~(1 << Ah);
                        }
                        ;
                        zh.prototype.ioport_write = function(aa, da) {
                            var Bh;
                            aa &= 1;
                            if (aa == 0) {
                                if (da & 16) {
                                    this.reset();
                                    this.init_state = 1;
                                    this.init4 = da & 1;
                                    if (da & 2)
                                        throw "single mode not supported";
                                    if (da & 8)
                                        throw "level sensitive irq not supported";
                                } else if (da & 8) {
                                    if (da & 2)
                                        this.read_reg_select = da & 1;
                                    if (da & 64)
                                        this.special_mask = (da >> 5) & 1;
                                } else {
                                    switch (da) {
                                    case 0:
                                    case 128:
                                        this.rotate_on_autoeoi = da >> 7;
                                        break;
                                    case 32:
                                    case 160:
                                        Bh = this.get_priority(this.isr);
                                        if (Bh >= 0) {
                                            this.isr &= ~(1 << ((Bh + this.priority_add) & 7));
                                        }
                                        if (da == 160)
                                            this.priority_add = (this.priority_add + 1) & 7;
                                        break;
                                    case 96:
                                    case 97:
                                    case 98:
                                    case 99:
                                    case 100:
                                    case 101:
                                    case 102:
                                    case 103:
                                        Bh = da & 7;
                                        this.isr &= ~(1 << Bh);
                                        break;
                                    case 192:
                                    case 193:
                                    case 194:
                                    case 195:
                                    case 196:
                                    case 197:
                                    case 198:
                                    case 199:
                                        this.priority_add = (da + 1) & 7;
                                        break;
                                    case 224:
                                    case 225:
                                    case 226:
                                    case 227:
                                    case 228:
                                    case 229:
                                    case 230:
                                    case 231:
                                        Bh = da & 7;
                                        this.isr &= ~(1 << Bh);
                                        this.priority_add = (Bh + 1) & 7;
                                        break;
                                    }
                                }
                            } else {
                                switch (this.init_state) {
                                case 0:
                                    this.imr = da;
                                    this.update_irq();
                                    break;
                                case 1:
                                    this.irq_base = da & 248;
                                    this.init_state = 2;
                                    break;
                                case 2:
                                    if (this.init4) {
                                        this.init_state = 3;
                                    } else {
                                        this.init_state = 0;
                                    }
                                    break;
                                case 3:
                                    this.auto_eoi = (da >> 1) & 1;
                                    this.init_state = 0;
                                    break;
                                }
                            }
                        }
                        ;
                        zh.prototype.ioport_read = function(Dh) {
                            var aa, yh;
                            aa = Dh & 1;
                            if (aa == 0) {
                                if (this.read_reg_select)
                                    yh = this.isr;
                                else
                                    yh = this.irr;
                            } else {
                                yh = this.imr;
                            }
                            return yh;
                        }
                        ;
                        function Eh(wh, Fh, Dh, Gh) {
                            this.pics = new Array();
                            this.pics[0] = new zh(wh,Fh);
                            this.pics[1] = new zh(wh,Dh);
                            this.pics[0].elcr_mask = 248;
                            this.pics[1].elcr_mask = 222;
                            this.irq_requested = 0;
                            this.cpu_set_irq = Gh;
                            this.pics[0].update_irq = this.update_irq.bind(this);
                            this.pics[1].update_irq = this.update_irq.bind(this);
                        }
                        Eh.prototype.update_irq = function() {
                            var Hh, Ah;
                            Hh = this.pics[1].get_irq();
                            if (Hh >= 0) {
                                this.pics[0].set_irq1(2, 1);
                                this.pics[0].set_irq1(2, 0);
                            }
                            Ah = this.pics[0].get_irq();
                            if (Ah >= 0) {
                                this.cpu_set_irq(1);
                            } else {
                                this.cpu_set_irq(0);
                            }
                        }
                        ;
                        Eh.prototype.set_irq = function(Ah, lg) {
                            this.pics[Ah >> 3].set_irq1(Ah & 7, lg);
                            this.update_irq();
                        }
                        ;
                        Eh.prototype.get_hard_intno = function() {
                            var Ah, Hh, He;
                            Ah = this.pics[0].get_irq();
                            if (Ah >= 0) {
                                this.pics[0].intack(Ah);
                                if (Ah == 2) {
                                    Hh = this.pics[1].get_irq();
                                    if (Hh >= 0) {
                                        this.pics[1].intack(Hh);
                                    } else {
                                        Hh = 7;
                                    }
                                    He = this.pics[1].irq_base + Hh;
                                    Ah = Hh + 8;
                                } else {
                                    He = this.pics[0].irq_base + Ah;
                                }
                            } else {
                                Ah = 7;
                                He = this.pics[0].irq_base + Ah;
                            }
                            this.update_irq();
                            return He;
                        }
                        ;
                        function Ih(wh, set_irq, Jh) {
                            var s, i;
                            this.pit_channels = new Array();
                            for (i = 0; i < 3; i++) {
                                s = new Kh(Jh);
                                this.pit_channels[i] = s;
                                s.mode = 3;
                                s.gate = (i != 2) >> 0;
                                s.pit_load_count(0);
                            }
                            this.speaker_data_on = 0;
                            this.set_irq = set_irq;
                            wh.register_ioport_write(64, 4, 1, this.ioport_write.bind(this));
                            wh.register_ioport_read(64, 3, 1, this.ioport_read.bind(this));
                            wh.register_ioport_read(97, 1, 1, this.speaker_ioport_read.bind(this));
                            wh.register_ioport_write(97, 1, 1, this.speaker_ioport_write.bind(this));
                        }
                        function Kh(Jh) {
                            this.count = 0;
                            this.latched_count = 0;
                            this.rw_state = 0;
                            this.mode = 0;
                            this.bcd = 0;
                            this.gate = 0;
                            this.count_load_time = 0;
                            this.get_ticks = Jh;
                            this.pit_time_unit = 1193182 / 60000000;
                        }
                        Kh.prototype.get_time = function() {
                            return Math.floor(this.get_ticks() * this.pit_time_unit);
                        }
                        ;
                        Kh.prototype.pit_get_count = function() {
                            var d, Lh;
                            d = this.get_time() - this.count_load_time;
                            switch (this.mode) {
                            case 0:
                            case 1:
                            case 4:
                            case 5:
                                Lh = (this.count - d) & 65535;
                                break;
                            default:
                                Lh = this.count - (d % this.count);
                                break;
                            }
                            return Lh;
                        }
                        ;
                        Kh.prototype.pit_get_out = function() {
                            var d, Mh;
                            d = this.get_time() - this.count_load_time;
                            switch (this.mode) {
                            default:
                            case 0:
                                Mh = (d >= this.count) >> 0;
                                break;
                            case 1:
                                Mh = (d < this.count) >> 0;
                                break;
                            case 2:
                                if ((d % this.count) == 0 && d != 0)
                                    Mh = 1;
                                else
                                    Mh = 0;
                                break;
                            case 3:
                                Mh = ((d % this.count) < (this.count >> 1)) >> 0;
                                break;
                            case 4:
                            case 5:
                                Mh = (d == this.count) >> 0;
                                break;
                            }
                            return Mh;
                        }
                        ;
                        Kh.prototype.get_next_transition_time = function() {
                            var d, Nh, ic, Oh;
                            d = this.get_time() - this.count_load_time;
                            switch (this.mode) {
                            default:
                            case 0:
                            case 1:
                                if (d < this.count)
                                    Nh = this.count;
                                else
                                    return -1;
                                break;
                            case 2:
                                ic = (d / this.count) * this.count;
                                if ((d - ic) == 0 && d != 0)
                                    Nh = ic + this.count;
                                else
                                    Nh = ic + this.count + 1;
                                break;
                            case 3:
                                ic = (d / this.count) * this.count;
                                Oh = ((this.count + 1) >> 1);
                                if ((d - ic) < Oh)
                                    Nh = ic + Oh;
                                else
                                    Nh = ic + this.count;
                                break;
                            case 4:
                            case 5:
                                if (d < this.count)
                                    Nh = this.count;
                                else if (d == this.count)
                                    Nh = this.count + 1;
                                else
                                    return -1;
                                break;
                            }
                            Nh = this.count_load_time + Nh;
                            return Nh;
                        }
                        ;
                        Kh.prototype.pit_load_count = function(da) {
                            if (da == 0)
                                da = 65536;
                            this.count_load_time = this.get_time();
                            this.count = da;
                        }
                        ;
                        Ih.prototype.ioport_write = function(aa, da) {
                            var Ph, Qh, s;
                            aa &= 3;
                            if (aa == 3) {
                                Ph = da >> 6;
                                if (Ph == 3)
                                    return;
                                s = this.pit_channels[Ph];
                                Qh = (da >> 4) & 3;
                                switch (Qh) {
                                case 0:
                                    s.latched_count = s.pit_get_count();
                                    s.rw_state = 4;
                                    break;
                                default:
                                    s.mode = (da >> 1) & 7;
                                    s.bcd = da & 1;
                                    s.rw_state = Qh - 1 + 0;
                                    break;
                                }
                            } else {
                                s = this.pit_channels[aa];
                                switch (s.rw_state) {
                                case 0:
                                    s.pit_load_count(da);
                                    break;
                                case 1:
                                    s.pit_load_count(da << 8);
                                    break;
                                case 2:
                                case 3:
                                    if (s.rw_state & 1) {
                                        s.pit_load_count((s.latched_count & 255) | (da << 8));
                                    } else {
                                        s.latched_count = da;
                                    }
                                    s.rw_state ^= 1;
                                    break;
                                }
                            }
                        }
                        ;
                        Ih.prototype.ioport_read = function(aa) {
                            var yh, ub, s;
                            aa &= 3;
                            s = this.pit_channels[aa];
                            switch (s.rw_state) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                                ub = s.pit_get_count();
                                if (s.rw_state & 1)
                                    yh = (ub >> 8) & 255;
                                else
                                    yh = ub & 255;
                                if (s.rw_state & 2)
                                    s.rw_state ^= 1;
                                break;
                            default:
                            case 4:
                            case 5:
                                if (s.rw_state & 1)
                                    yh = s.latched_count >> 8;
                                else
                                    yh = s.latched_count & 255;
                                s.rw_state ^= 1;
                                break;
                            }
                            return yh;
                        }
                        ;
                        Ih.prototype.speaker_ioport_write = function(aa, da) {
                            this.speaker_data_on = (da >> 1) & 1;
                            this.pit_channels[2].gate = da & 1;
                        }
                        ;
                        Ih.prototype.speaker_ioport_read = function(aa) {
                            var Mh, s, da;
                            s = this.pit_channels[2];
                            Mh = s.pit_get_out();
                            da = (this.speaker_data_on << 1) | s.gate | (Mh << 5);
                            return da;
                        }
                        ;
                        Ih.prototype.update_irq = function() {
                            this.set_irq(1);
                            this.set_irq(0);
                        }
                        ;
                        function Rh(wh, aa, Sh, Th) {
                            this.divider = 0;
                            this.rbr = 0;
                            this.ier = 0;
                            this.iir = 1;
                            this.lcr = 0;
                            this.mcr = 0;
                            this.lsr = 64 | 32;
                            this.msr = 0;
                            this.scr = 0;
                            this.fcr = 0;
                            this.set_irq_func = Sh;
                            this.write_func = Th;
                            this.tx_fifo = "";
                            this.rx_fifo = "";
                            wh.register_ioport_write(1016, 8, 1, this.ioport_write.bind(this));
                            wh.register_ioport_read(1016, 8, 1, this.ioport_read.bind(this));
                        }
                        Rh.prototype.update_irq = function() {
                            if ((this.lsr & 1) && (this.ier & 1)) {
                                this.iir = 4;
                            } else if ((this.lsr & 32) && (this.ier & 2)) {
                                this.iir = 2;
                            } else {
                                this.iir = 1;
                            }
                            if (this.iir != 1) {
                                this.set_irq_func(1);
                            } else {
                                this.set_irq_func(0);
                            }
                        }
                        ;
                        Rh.prototype.write_tx_fifo = function() {
                            if (this.tx_fifo != "") {
                                this.write_func(this.tx_fifo);
                                this.tx_fifo = "";
                                this.lsr |= 32;
                                this.lsr |= 64;
                                this.update_irq();
                            }
                        }
                        ;
                        Rh.prototype.ioport_write = function(aa, da) {
                            aa &= 7;
                            switch (aa) {
                            default:
                            case 0:
                                if (this.lcr & 128) {
                                    this.divider = (this.divider & 65280) | da;
                                } else {
                                    if (this.fcr & 1) {
                                        this.tx_fifo += String.fromCharCode(da);
                                        this.lsr &= ~32;
                                        this.update_irq();
                                        if (this.tx_fifo.length >= 16) {
                                            this.write_tx_fifo();
                                        }
                                    } else {
                                        this.lsr &= ~32;
                                        this.update_irq();
                                        this.write_func(String.fromCharCode(da));
                                        this.lsr |= 32;
                                        this.lsr |= 64;
                                        this.update_irq();
                                    }
                                }
                                break;
                            case 1:
                                if (this.lcr & 128) {
                                    this.divider = (this.divider & 255) | (da << 8);
                                } else {
                                    this.ier = da;
                                    this.update_irq();
                                }
                                break;
                            case 2:
                                if ((this.fcr ^ da) & 1) {
                                    da |= 4 | 2;
                                }
                                if (da & 4)
                                    this.tx_fifo = "";
                                if (da & 2)
                                    this.rx_fifo = "";
                                this.fcr = da & 1;
                                break;
                            case 3:
                                this.lcr = da;
                                break;
                            case 4:
                                this.mcr = da;
                                break;
                            case 5:
                                break;
                            case 6:
                                this.msr = da;
                                break;
                            case 7:
                                this.scr = da;
                                break;
                            }
                        }
                        ;
                        Rh.prototype.ioport_read = function(aa) {
                            var yh;
                            aa &= 7;
                            switch (aa) {
                            default:
                            case 0:
                                if (this.lcr & 128) {
                                    yh = this.divider & 255;
                                } else {
                                    yh = this.rbr;
                                    this.lsr &= ~(1 | 16);
                                    this.update_irq();
                                    this.send_char_from_fifo();
                                }
                                break;
                            case 1:
                                if (this.lcr & 128) {
                                    yh = (this.divider >> 8) & 255;
                                } else {
                                    yh = this.ier;
                                }
                                break;
                            case 2:
                                yh = this.iir;
                                if (this.fcr & 1)
                                    yh |= 192;
                                break;
                            case 3:
                                yh = this.lcr;
                                break;
                            case 4:
                                yh = this.mcr;
                                break;
                            case 5:
                                yh = this.lsr;
                                break;
                            case 6:
                                yh = this.msr;
                                break;
                            case 7:
                                yh = this.scr;
                                break;
                            }
                            return yh;
                        }
                        ;
                        Rh.prototype.send_break = function() {
                            this.rbr = 0;
                            this.lsr |= 16 | 1;
                            this.update_irq();
                        }
                        ;
                        Rh.prototype.send_char = function(Uh) {
                            this.rbr = Uh;
                            this.lsr |= 1;
                            this.update_irq();
                        }
                        ;
                        Rh.prototype.send_char_from_fifo = function() {
                            var Vh;
                            Vh = this.rx_fifo;
                            if (Vh != "" && !(this.lsr & 1)) {
                                this.send_char(Vh.charCodeAt(0));
                                this.rx_fifo = Vh.substr(1, Vh.length - 1);
                            }
                        }
                        ;
                        Rh.prototype.send_chars = function(ba) {
                            this.rx_fifo += ba;
                            this.send_char_from_fifo();
                        }
                        ;
                        function Wh(wh, Xh) {
                            wh.register_ioport_read(100, 1, 1, this.read_status.bind(this));
                            wh.register_ioport_write(100, 1, 1, this.write_command.bind(this));
                            this.reset_request = Xh;
                        }
                        Wh.prototype.read_status = function(aa) {
                            return 0;
                        }
                        ;
                        Wh.prototype.write_command = function(aa, da) {
                            switch (da) {
                            case 254:
                                this.reset_request();
                                break;
                            default:
                                break;
                            }
                        }
                        ;
                        function Yh(wh, ug, Zh, Th, ai) {
                            wh.register_ioport_read(ug, 16, 4, this.ioport_readl.bind(this));
                            wh.register_ioport_write(ug, 16, 4, this.ioport_writel.bind(this));
                            wh.register_ioport_read(ug + 8, 1, 1, this.ioport_readb.bind(this));
                            wh.register_ioport_write(ug + 8, 1, 1, this.ioport_writeb.bind(this));
                            this.cur_pos = 0;
                            this.doc_str = "";
                            this.read_func = Zh;
                            this.write_func = Th;
                            this.get_boot_time = ai;
                        }
                        Yh.prototype.ioport_writeb = function(aa, da) {
                            this.doc_str += String.fromCharCode(da);
                        }
                        ;
                        Yh.prototype.ioport_readb = function(aa) {
                            var c, ba, da;
                            ba = this.doc_str;
                            if (this.cur_pos < ba.length) {
                                da = ba.charCodeAt(this.cur_pos) & 255;
                            } else {
                                da = 0;
                            }
                            this.cur_pos++;
                            return da;
                        }
                        ;
                        Yh.prototype.ioport_writel = function(aa, da) {
                            var ba;
                            aa = (aa >> 2) & 3;
                            switch (aa) {
                            case 0:
                                this.doc_str = this.doc_str.substr(0, da >>> 0);
                                break;
                            case 1:
                                return this.cur_pos = da >>> 0;
                            case 2:
                                ba = String.fromCharCode(da & 255) + String.fromCharCode((da >> 8) & 255) + String.fromCharCode((da >> 16) & 255) + String.fromCharCode((da >> 24) & 255);
                                this.doc_str += ba;
                                break;
                            case 3:
                                this.write_func(this.doc_str);
                            }
                        }
                        ;
                        Yh.prototype.ioport_readl = function(aa) {
                            var da;
                            aa = (aa >> 2) & 3;
                            switch (aa) {
                            case 0:
                                this.doc_str = this.read_func();
                                return this.doc_str.length >> 0;
                            case 1:
                                return this.cur_pos >> 0;
                            case 2:
                                da = this.ioport_readb(0);
                                da |= this.ioport_readb(0) << 8;
                                da |= this.ioport_readb(0) << 16;
                                da |= this.ioport_readb(0) << 24;
                                return da;
                            case 3:
                                if (this.get_boot_time)
                                    return this.get_boot_time() >> 0;
                                else
                                    return 0;
                            }
                        }
                        ;
                        bi.prototype.identify = function() {
                            function ci(di, v) {
                                ei[di * 2] = v & 255;
                                ei[di * 2 + 1] = (v >> 8) & 255;
                            }
                            function fi(di, ba, Mg) {
                                var i, v;
                                for (i = 0; i < Mg; i++) {
                                    if (i < ba.length) {
                                        v = ba.charCodeAt(i) & 255;
                                    } else {
                                        v = 32;
                                    }
                                    ei[di * 2 + (i ^ 1)] = v;
                                }
                            }
                            var ei, i, gi;
                            ei = this.io_buffer;
                            for (i = 0; i < 512; i++)
                                ei[i] = 0;
                            ci(0, 64);
                            ci(1, this.cylinders);
                            ci(3, this.heads);
                            ci(4, 512 * this.sectors);
                            ci(5, 512);
                            ci(6, this.sectors);
                            ci(20, 3);
                            ci(21, 512);
                            ci(22, 4);
                            fi(27, "JSLinux HARDDISK", 40);
                            ci(47, 32768 | 128);
                            ci(48, 0);
                            ci(49, 1 << 9);
                            ci(51, 512);
                            ci(52, 512);
                            ci(54, this.cylinders);
                            ci(55, this.heads);
                            ci(56, this.sectors);
                            gi = this.cylinders * this.heads * this.sectors;
                            ci(57, gi);
                            ci(58, gi >> 16);
                            if (this.mult_sectors)
                                ci(59, 256 | this.mult_sectors);
                            ci(60, this.nb_sectors);
                            ci(61, this.nb_sectors >> 16);
                            ci(80, (1 << 1) | (1 << 2));
                            ci(82, (1 << 14));
                            ci(83, (1 << 14));
                            ci(84, (1 << 14));
                            ci(85, (1 << 14));
                            ci(86, 0);
                            ci(87, (1 << 14));
                        }
                        ;
                        bi.prototype.set_signature = function() {
                            this.select &= 240;
                            this.nsector = 1;
                            this.sector = 1;
                            this.lcyl = 0;
                            this.hcyl = 0;
                        }
                        ;
                        bi.prototype.abort_command = function() {
                            this.status = 64 | 1;
                            this.error = 4;
                        }
                        ;
                        bi.prototype.set_irq = function() {
                            if (!(this.cmd & 2)) {
                                this.ide_if.set_irq_func(1);
                            }
                        }
                        ;
                        bi.prototype.transfer_start = function(hi, ii) {
                            this.end_transfer_func = ii;
                            this.data_index = 0;
                            this.data_end = hi;
                        }
                        ;
                        bi.prototype.transfer_stop = function() {
                            this.end_transfer_func = this.transfer_stop.bind(this);
                            this.data_index = 0;
                            this.data_end = 0;
                        }
                        ;
                        bi.prototype.get_sector = function() {
                            var ji;
                            if (this.select & 64) {
                                ji = ((this.select & 15) << 24) | (this.hcyl << 16) | (this.lcyl << 8) | this.sector;
                            } else {
                                ji = ((this.hcyl << 8) | this.lcyl) * this.heads * this.sectors + (this.select & 15) * this.sectors + (this.sector - 1);
                            }
                            return ji;
                        }
                        ;
                        bi.prototype.set_sector = function(ji) {
                            var ki, r;
                            if (this.select & 64) {
                                this.select = (this.select & 240) | ((ji >> 24) & 15);
                                this.hcyl = (ji >> 16) & 255;
                                this.lcyl = (ji >> 8) & 255;
                                this.sector = ji & 255;
                            } else {
                                ki = ji / (this.heads * this.sectors);
                                r = ji % (this.heads * this.sectors);
                                this.hcyl = (ki >> 8) & 255;
                                this.lcyl = ki & 255;
                                this.select = (this.select & 240) | ((r / this.sectors) & 15);
                                this.sector = (r % this.sectors) + 1;
                            }
                        }
                        ;
                        bi.prototype.sector_read = function() {
                            var ji, n, yh;
                            ji = this.get_sector();
                            n = this.nsector;
                            if (n == 0)
                                n = 256;
                            if (n > this.req_nb_sectors)
                                n = this.req_nb_sectors;
                            this.io_nb_sectors = n;
                            yh = this.bs.read_async(ji, this.io_buffer, n, this.sector_read_cb.bind(this));
                            if (yh < 0) {
                                this.abort_command();
                                this.set_irq();
                            } else if (yh == 0) {
                                this.sector_read_cb();
                            } else {
                                this.status = 64 | 16 | 128;
                                this.error = 0;
                            }
                        }
                        ;
                        bi.prototype.sector_read_cb = function() {
                            var n, li;
                            n = this.io_nb_sectors;
                            this.set_sector(this.get_sector() + n);
                            this.nsector = (this.nsector - n) & 255;
                            if (this.nsector == 0)
                                li = this.sector_read_cb_end.bind(this);
                            else
                                li = this.sector_read.bind(this);
                            this.transfer_start(512 * n, li);
                            this.set_irq();
                            this.status = 64 | 16 | 8;
                            this.error = 0;
                        }
                        ;
                        bi.prototype.sector_read_cb_end = function() {
                            this.status = 64 | 16;
                            this.error = 0;
                            this.transfer_stop();
                        }
                        ;
                        bi.prototype.sector_write_cb1 = function() {
                            var ji, yh;
                            this.transfer_stop();
                            ji = this.get_sector();
                            yh = this.bs.write_async(ji, this.io_buffer, this.io_nb_sectors, this.sector_write_cb2.bind(this));
                            if (yh < 0) {
                                this.abort_command();
                                this.set_irq();
                            } else if (yh == 0) {
                                this.sector_write_cb2();
                            } else {
                                this.status = 64 | 16 | 128;
                            }
                        }
                        ;
                        bi.prototype.sector_write_cb2 = function() {
                            var n;
                            n = this.io_nb_sectors;
                            this.set_sector(this.get_sector() + n);
                            this.nsector = (this.nsector - n) & 255;
                            if (this.nsector == 0) {
                                this.status = 64 | 16;
                            } else {
                                n = this.nsector;
                                if (n > this.req_nb_sectors)
                                    n = this.req_nb_sectors;
                                this.io_nb_sectors = n;
                                this.transfer_start(512 * n, this.sector_write_cb1.bind(this));
                                this.status = 64 | 16 | 8;
                            }
                            this.set_irq();
                        }
                        ;
                        bi.prototype.sector_write = function() {
                            var n;
                            n = this.nsector;
                            if (n == 0)
                                n = 256;
                            if (n > this.req_nb_sectors)
                                n = this.req_nb_sectors;
                            this.io_nb_sectors = n;
                            this.transfer_start(512 * n, this.sector_write_cb1.bind(this));
                            this.status = 64 | 16 | 8;
                        }
                        ;
                        bi.prototype.identify_cb = function() {
                            this.transfer_stop();
                            this.status = 64;
                        }
                        ;
                        bi.prototype.exec_cmd = function(da) {
                            var n;
                            switch (da) {
                            case 161:
                            case 236:
                                this.identify();
                                this.status = 64 | 16 | 8;
                                this.transfer_start(512, this.identify_cb.bind(this));
                                this.set_irq();
                                break;
                            case 145:
                            case 16:
                                this.error = 0;
                                this.status = 64 | 16;
                                this.set_irq();
                                break;
                            case 198:
                                if (this.nsector > 128 || (this.nsector & (this.nsector - 1)) != 0) {
                                    this.abort_command();
                                } else {
                                    this.mult_sectors = this.nsector;
                                    this.status = 64;
                                }
                                this.set_irq();
                                break;
                            case 32:
                            case 33:
                                this.req_nb_sectors = 1;
                                this.sector_read();
                                break;
                            case 48:
                            case 49:
                                this.req_nb_sectors = 1;
                                this.sector_write();
                                break;
                            case 196:
                                if (!this.mult_sectors) {
                                    this.abort_command();
                                    this.set_irq();
                                } else {
                                    this.req_nb_sectors = this.mult_sectors;
                                    this.sector_read();
                                }
                                break;
                            case 197:
                                if (!this.mult_sectors) {
                                    this.abort_command();
                                    this.set_irq();
                                } else {
                                    this.req_nb_sectors = this.mult_sectors;
                                    this.sector_write();
                                }
                                break;
                            case 248:
                                this.set_sector(this.nb_sectors - 1);
                                this.status = 64;
                                this.set_irq();
                                break;
                            default:
                                this.abort_command();
                                this.set_irq();
                                break;
                            }
                        }
                        ;
                        mi.prototype.ioport_write = function(aa, da) {
                            var s = this.cur_drive;
                            var ni;
                            aa &= 7;
                            switch (aa) {
                            case 0:
                                break;
                            case 1:
                                if (s) {
                                    s.feature = da;
                                }
                                break;
                            case 2:
                                if (s) {
                                    s.nsector = da;
                                }
                                break;
                            case 3:
                                if (s) {
                                    s.sector = da;
                                }
                                break;
                            case 4:
                                if (s) {
                                    s.lcyl = da;
                                }
                                break;
                            case 5:
                                if (s) {
                                    s.hcyl = da;
                                }
                                break;
                            case 6:
                                s = this.cur_drive = this.drives[(da >> 4) & 1];
                                if (s) {
                                    s.select = da;
                                }
                                break;
                            default:
                            case 7:
                                if (s) {
                                    s.exec_cmd(da);
                                }
                                break;
                            }
                        }
                        ;
                        mi.prototype.ioport_read = function(aa) {
                            var s = this.cur_drive;
                            var yh;
                            aa &= 7;
                            if (!s) {
                                yh = 255;
                            } else {
                                switch (aa) {
                                case 0:
                                    yh = 255;
                                    break;
                                case 1:
                                    yh = s.error;
                                    break;
                                case 2:
                                    yh = s.nsector;
                                    break;
                                case 3:
                                    yh = s.sector;
                                    break;
                                case 4:
                                    yh = s.lcyl;
                                    break;
                                case 5:
                                    yh = s.hcyl;
                                    break;
                                case 6:
                                    yh = s.select;
                                    break;
                                default:
                                case 7:
                                    yh = s.status;
                                    this.set_irq_func(0);
                                    break;
                                }
                            }
                            return yh;
                        }
                        ;
                        mi.prototype.status_read = function(aa) {
                            var s = this.cur_drive;
                            var yh;
                            if (s) {
                                yh = s.status;
                            } else {
                                yh = 0;
                            }
                            return yh;
                        }
                        ;
                        mi.prototype.cmd_write = function(aa, da) {
                            var i, s;
                            if (!(this.cmd & 4) && (da & 4)) {
                                for (i = 0; i < 2; i++) {
                                    s = this.drives[i];
                                    if (s) {
                                        s.status = 128 | 16;
                                        s.error = 1;
                                    }
                                }
                            } else if ((this.cmd & 4) && !(da & 4)) {
                                for (i = 0; i < 2; i++) {
                                    s = this.drives[i];
                                    if (s) {
                                        s.status = 64 | 16;
                                        s.set_signature();
                                    }
                                }
                            }
                            for (i = 0; i < 2; i++) {
                                s = this.drives[i];
                                if (s) {
                                    s.cmd = da;
                                }
                            }
                        }
                        ;
                        mi.prototype.data_writew = function(aa, da) {
                            var s = this.cur_drive;
                            var p, ei;
                            if (!s)
                                return;
                            p = s.data_index;
                            ei = s.io_buffer;
                            ei[p] = da & 255;
                            ei[p + 1] = (da >> 8) & 255;
                            p += 2;
                            s.data_index = p;
                            if (p >= s.data_end)
                                s.end_transfer_func();
                        }
                        ;
                        mi.prototype.data_readw = function(aa) {
                            var s = this.cur_drive;
                            var p, yh, ei;
                            if (!s) {
                                yh = 0;
                            } else {
                                p = s.data_index;
                                ei = s.io_buffer;
                                yh = ei[p] | (ei[p + 1] << 8);
                                p += 2;
                                s.data_index = p;
                                if (p >= s.data_end)
                                    s.end_transfer_func();
                            }
                            return yh;
                        }
                        ;
                        mi.prototype.data_writel = function(aa, da) {
                            var s = this.cur_drive;
                            var p, ei;
                            if (!s)
                                return;
                            p = s.data_index;
                            ei = s.io_buffer;
                            ei[p] = da & 255;
                            ei[p + 1] = (da >> 8) & 255;
                            ei[p + 2] = (da >> 16) & 255;
                            ei[p + 3] = (da >> 24) & 255;
                            p += 4;
                            s.data_index = p;
                            if (p >= s.data_end)
                                s.end_transfer_func();
                        }
                        ;
                        mi.prototype.data_readl = function(aa) {
                            var s = this.cur_drive;
                            var p, yh, ei;
                            if (!s) {
                                yh = 0;
                            } else {
                                p = s.data_index;
                                ei = s.io_buffer;
                                yh = ei[p] | (ei[p + 1] << 8) | (ei[p + 2] << 16) | (ei[p + 3] << 24);
                                p += 4;
                                s.data_index = p;
                                if (p >= s.data_end)
                                    s.end_transfer_func();
                            }
                            return yh;
                        }
                        ;
                        function bi(oi, pi) {
                            var qi, ri;
                            this.ide_if = oi;
                            this.bs = pi;
                            ri = pi.get_sector_count();
                            qi = ri / (16 * 63);
                            if (qi > 16383)
                                qi = 16383;
                            else if (qi < 2)
                                qi = 2;
                            this.cylinders = qi;
                            this.heads = 16;
                            this.sectors = 63;
                            this.nb_sectors = ri;
                            this.mult_sectors = 128;
                            this.feature = 0;
                            this.error = 0;
                            this.nsector = 0;
                            this.sector = 0;
                            this.lcyl = 0;
                            this.hcyl = 0;
                            this.select = 160;
                            this.status = 64 | 16;
                            this.cmd = 0;
                            this.io_buffer = uh(128 * 512 + 4);
                            this.data_index = 0;
                            this.data_end = 0;
                            this.end_transfer_func = this.transfer_stop.bind(this);
                            this.req_nb_sectors = 0;
                            this.io_nb_sectors = 0;
                        }
                        function mi(wh, aa, si, Sh, ti) {
                            var i, ui;
                            this.set_irq_func = Sh;
                            this.drives = [];
                            for (i = 0; i < 2; i++) {
                                if (ti[i]) {
                                    ui = new bi(this,ti[i]);
                                } else {
                                    ui = null;
                                }
                                this.drives[i] = ui;
                            }
                            this.cur_drive = this.drives[0];
                            wh.register_ioport_write(aa, 8, 1, this.ioport_write.bind(this));
                            wh.register_ioport_read(aa, 8, 1, this.ioport_read.bind(this));
                            if (si) {
                                wh.register_ioport_read(si, 1, 1, this.status_read.bind(this));
                                wh.register_ioport_write(si, 1, 1, this.cmd_write.bind(this));
                            }
                            wh.register_ioport_write(aa, 2, 2, this.data_writew.bind(this));
                            wh.register_ioport_read(aa, 2, 2, this.data_readw.bind(this));
                            wh.register_ioport_write(aa, 4, 4, this.data_writel.bind(this));
                            wh.register_ioport_read(aa, 4, 4, this.data_readl.bind(this));
                        }
                        function vi(ph, wi, xi) {
                            if (ph.indexOf("%d") < 0)
                                throw "Invalid URL";
                            if (xi <= 0 || wi <= 0)
                                throw "Invalid parameters";
                            this.block_sectors = wi * 2;
                            this.nb_sectors = this.block_sectors * xi;
                            this.url = ph;
                            this.max_cache_size = Math.max(1, Math.ceil(2536 / wi));
                            this.cache = new Array();
                            this.sector_num = 0;
                            this.sector_index = 0;
                            this.sector_count = 0;
                            this.sector_buf = null;
                            this.sector_cb = null;
                        }
                        vi.prototype.get_sector_count = function() {
                            return this.nb_sectors;
                        }
                        ;
                        vi.prototype.get_time = function() {
                            return +new Date();
                        }
                        ;
                        vi.prototype.get_cached_block = function(yi) {
                            var zi, i, Ai = this.cache;
                            for (i = 0; i < Ai.length; i++) {
                                zi = Ai[i];
                                if (zi.block_num == yi)
                                    return zi;
                            }
                            return null;
                        }
                        ;
                        vi.prototype.new_cached_block = function(yi) {
                            var zi, Bi, i, j, Ci, Ai = this.cache;
                            zi = new Object();
                            zi.block_num = yi;
                            zi.time = this.get_time();
                            if (Ai.length < this.max_cache_size) {
                                j = Ai.length;
                            } else {
                                for (i = 0; i < Ai.length; i++) {
                                    Bi = Ai[i];
                                    if (i == 0 || Bi.time < Ci) {
                                        Ci = Bi.time;
                                        j = i;
                                    }
                                }
                            }
                            Ai[j] = zi;
                            return zi;
                        }
                        ;
                        vi.prototype.get_url = function(ph, yi) {
                            var p, s;
                            s = yi.toString();
                            while (s.length < 9)
                                s = "0" + s;
                            p = ph.indexOf("%d");
                            return ph.substr(0, p) + s + ph.substring(p + 2, ph.length);
                        }
                        ;
                        vi.prototype.read_async_cb = function(Di) {
                            var yi, l, Qe, zi, i, Ei, Fi, Gi, Hi;
                            var Ii, ph;
                            while (this.sector_index < this.sector_count) {
                                yi = Math.floor(this.sector_num / this.block_sectors);
                                zi = this.get_cached_block(yi);
                                if (zi) {
                                    Qe = this.sector_num - yi * this.block_sectors;
                                    l = Math.min(this.sector_count - this.sector_index, this.block_sectors - Qe);
                                    Ei = l * 512;
                                    Fi = this.sector_buf;
                                    Gi = this.sector_index * 512;
                                    Hi = zi.buf;
                                    Ii = Qe * 512;
                                    for (i = 0; i < Ei; i++) {
                                        Fi[i + Gi] = Hi[i + Ii];
                                    }
                                    this.sector_index += l;
                                    this.sector_num += l;
                                } else {
                                    ph = this.get_url(this.url, yi);
                                    load_binary(ph, this.read_async_cb2.bind(this));
                                    return;
                                }
                            }
                            this.sector_buf = null;
                            if (!Di) {
                                this.sector_cb(0);
                            }
                        }
                        ;
                        vi.prototype.add_block = function(yi, sh, Mg) {
                            var zi, Ji, i;
                            zi = this.new_cached_block(yi);
                            Ji = zi.buf = uh(this.block_sectors * 512);
                            if (typeof sh == "string") {
                                for (i = 0; i < Mg; i++)
                                    Ji[i] = sh.charCodeAt(i) & 255;
                            } else {
                                for (i = 0; i < Mg; i++)
                                    Ji[i] = sh[i];
                            }
                        }
                        ;
                        vi.prototype.read_async_cb2 = function(sh, Mg) {
                            var yi;
                            if (Mg < 0 || Mg != (this.block_sectors * 512)) {
                                this.sector_cb(-1);
                            } else {
                                yi = Math.floor(this.sector_num / this.block_sectors);
                                this.add_block(yi, sh, Mg);
                                this.read_async_cb(false);
                            }
                        }
                        ;
                        vi.prototype.read_async = function(ji, Ji, n, Ki) {
                            if ((ji + n) > this.nb_sectors)
                                return -1;
                            this.sector_num = ji;
                            this.sector_buf = Ji;
                            this.sector_index = 0;
                            this.sector_count = n;
                            this.sector_cb = Ki;
                            this.read_async_cb(true);
                            if (this.sector_index >= this.sector_count) {
                                return 0;
                            } else {
                                return 1;
                            }
                        }
                        ;
                        vi.prototype.preload = function(ei, qh) {
                            var i, ph, yi;
                            if (ei.length == 0) {
                                setTimeout(qh, 0);
                            } else {
                                this.preload_cb2 = qh;
                                this.preload_count = ei.length;
                                for (i = 0; i < ei.length; i++) {
                                    yi = ei[i];
                                    ph = this.get_url(this.url, yi);
                                    load_binary(ph, this.preload_cb.bind(this, yi));
                                }
                            }
                        }
                        ;
                        vi.prototype.preload_cb = function(yi, sh, Mg) {
                            if (Mg < 0) {} else {
                                this.add_block(yi, sh, Mg);
                                this.preload_count--;
                                if (this.preload_count == 0) {
                                    this.preload_cb2(0);
                                }
                            }
                        }
                        ;
                        vi.prototype.write_async = function(ji, Ji, n, Ki) {
                            return -1;
                        }
                        ;
                        Li.prototype.reset = function() {
                            this.isr = 128;
                        }
                        ;
                        Li.prototype.update_irq = function() {
                            var Mi;
                            Mi = (this.isr & this.imr) & 127;
                            if (Mi)
                                this.set_irq_func(1);
                            else
                                this.set_irq_func(0);
                        }
                        ;
                        Li.prototype.compute_mcast_idx = function(Ni) {
                            var Oi, sc, i, j, b;
                            Oi = -1;
                            for (i = 0; i < 6; i++) {
                                b = Ni[i];
                                for (j = 0; j < 8; j++) {
                                    sc = (Oi >>> 31) ^ (b & 1);
                                    Oi <<= 1;
                                    b >>= 1;
                                    if (sc)
                                        Oi = (Oi ^ 79764918) | sc;
                                }
                            }
                            return Oi >>> 26;
                        }
                        ;
                        Li.prototype.buffer_full = function() {
                            var Pi, kc, Qi;
                            kc = this.curpag << 8;
                            Qi = this.boundary << 8;
                            if (kc < Qi)
                                Pi = Qi - kc;
                            else
                                Pi = (this.stop - this.start) - (kc - Qi);
                            return ( Pi < (1514 + 4)) ;
                        }
                        ;
                        Li.prototype.receive_packet = function(Ji) {
                            var Ri, Si, Mg, kc, Ti, hi, Ui, aa;
                            var Vi, i;
                            hi = Ji.length;
                            if (this.cmd & 1 || this.buffer_full() || hi < 6)
                                return;
                            if (this.rxcr & 16) {} else {
                                if (Ji[0] == 255 && Ji[1] == 255 && Ji[2] == 255 && Ji[3] == 255 && Ji[4] == 255 && Ji[5] == 255) {
                                    if (!(this.rxcr & 4))
                                        return;
                                } else if (Ji[0] & 1) {
                                    if (!(this.rxcr & 8))
                                        return;
                                    Ti = Wi(Ji);
                                    if (!(this.mult[Ti >> 3] & (1 << (Ti & 7))))
                                        return;
                                } else if (this.phys[0] == Ji[0] && this.phys[1] == Ji[1] && this.phys[2] == Ji[2] && this.phys[3] == Ji[3] && this.phys[4] == Ji[4] && this.phys[5] == Ji[5]) {} else {
                                    return;
                                }
                            }
                            if (hi < 60)
                                hi = 60;
                            kc = this.curpag << 8;
                            Ui = this.mem;
                            Ri = hi + 4;
                            Si = kc + ((Ri + 4 + 255) & ~255);
                            if (Si >= this.stop)
                                Si -= (this.stop - this.start);
                            this.rsr = 1;
                            if (Ji[0] & 1)
                                this.rsr |= 32;
                            aa = kc & 32767;
                            if (aa >= 16384) {
                                Ui[aa] = this.rsr & 255;
                                Ui[aa + 1] = (Si >> 8) & 255;
                                Ui[aa + 2] = Ri & 255;
                                Ui[aa + 3] = (Ri >> 8) & 255;
                            }
                            kc += 4;
                            while (hi > 0) {
                                if (kc >= this.stop)
                                    break;
                                Mg = Math.min(hi, this.stop - kc);
                                if (Vi < Ji.length)
                                    Mg = Math.min(Mg, Ji.length - Vi);
                                Mg = Math.min(Mg, 16384 - (kc & 16383));
                                aa = kc & 32767;
                                if (aa >= 16384) {
                                    if (Vi < Ji.length) {
                                        for (i = 0; i < Mg; i++)
                                            Ui[aa + i] = Ji[Vi + i];
                                    } else {
                                        for (i = 0; i < Mg; i++)
                                            Ui[aa + i] = 0;
                                    }
                                }
                                Vi += Mg;
                                kc += Mg;
                                if (kc == this.stop)
                                    kc = this.start;
                                hi -= Mg;
                            }
                            this.curpag = Si >> 8;
                            this.isr |= 1;
                            this.update_irq();
                        }
                        ;
                        Li.prototype.send_packet = function() {
                            var kc;
                            kc = (this.tpsr << 8) & 32767;
                            if (kc + this.tcnt <= (32 * 1024)) {
                                this.send_packet_func(this.mem, kc, this.tcnt);
                            }
                            this.tsr = 1;
                            this.isr |= 2;
                            this.cmd &= ~4;
                            this.update_irq();
                        }
                        ;
                        Li.prototype.ioport_write = function(aa, da) {
                            var Qe, Xi;
                            aa &= 15;
                            if (aa == 0) {
                                this.cmd = da;
                                if (!(da & 1)) {
                                    this.isr &= ~128;
                                    if ((da & (8 | 16)) && this.rcnt == 0) {
                                        this.isr |= 64;
                                        this.update_irq();
                                    }
                                    if (da & 4) {
                                        this.send_packet();
                                    }
                                }
                            } else {
                                Xi = this.cmd >> 6;
                                Qe = aa | (Xi << 4);
                                switch (Qe) {
                                case 1:
                                    this.start = da << 8;
                                    break;
                                case 2:
                                    this.stop = da << 8;
                                    break;
                                case 3:
                                    this.boundary = da;
                                    break;
                                case 15:
                                    this.imr = da;
                                    this.update_irq();
                                    break;
                                case 4:
                                    this.tpsr = da;
                                    break;
                                case 5:
                                    this.tcnt = (this.tcnt & 65280) | da;
                                    break;
                                case 6:
                                    this.tcnt = (this.tcnt & 255) | (da << 8);
                                    break;
                                case 8:
                                    this.rsar = (this.rsar & 65280) | da;
                                    break;
                                case 9:
                                    this.rsar = (this.rsar & 255) | (da << 8);
                                    break;
                                case 10:
                                    this.rcnt = (this.rcnt & 65280) | da;
                                    break;
                                case 11:
                                    this.rcnt = (this.rcnt & 255) | (da << 8);
                                    break;
                                case 12:
                                    this.rxcr = da;
                                    break;
                                case 14:
                                    this.dcfg = da;
                                    break;
                                case 7:
                                    this.isr &= ~(da & 127);
                                    this.update_irq();
                                    break;
                                case 17:
                                case 17 + 1:
                                case 17 + 2:
                                case 17 + 3:
                                case 17 + 4:
                                case 17 + 5:
                                    this.phys[Qe - 17] = da;
                                    break;
                                case 23:
                                    this.curpag = da;
                                    break;
                                case 24:
                                case 24 + 1:
                                case 24 + 2:
                                case 24 + 3:
                                case 24 + 4:
                                case 24 + 5:
                                case 24 + 6:
                                case 24 + 7:
                                    this.mult[Qe - 24] = da;
                                    break;
                                }
                            }
                        }
                        ;
                        Li.prototype.ioport_read = function(aa) {
                            var Qe, Xi, yh;
                            aa &= 15;
                            if (aa == 0) {
                                yh = this.cmd;
                            } else {
                                Xi = this.cmd >> 6;
                                Qe = aa | (Xi << 4);
                                switch (Qe) {
                                case 4:
                                    yh = this.tsr;
                                    break;
                                case 3:
                                    yh = this.boundary;
                                    break;
                                case 7:
                                    yh = this.isr;
                                    break;
                                case 8:
                                    yh = this.rsar & 255;
                                    break;
                                case 9:
                                    yh = this.rsar >> 8;
                                    break;
                                case 17:
                                case 17 + 1:
                                case 17 + 2:
                                case 17 + 3:
                                case 17 + 4:
                                case 17 + 5:
                                    yh = this.phys[Qe - 17];
                                    break;
                                case 23:
                                    yh = this.curpag;
                                    break;
                                case 24:
                                case 24 + 1:
                                case 24 + 2:
                                case 24 + 3:
                                case 24 + 4:
                                case 24 + 5:
                                case 24 + 6:
                                case 24 + 7:
                                    yh = this.mult[Qe - 24];
                                    break;
                                case 12:
                                    yh = this.rsr;
                                    break;
                                case 33:
                                    yh = this.start >> 8;
                                    break;
                                case 34:
                                    yh = this.stop >> 8;
                                    break;
                                case 10:
                                    yh = 80;
                                    break;
                                case 11:
                                    yh = 67;
                                    break;
                                case 51:
                                    yh = 0;
                                    break;
                                case 53:
                                    yh = 64;
                                    break;
                                case 54:
                                    yh = 64;
                                    break;
                                default:
                                    yh = 0;
                                    break;
                                }
                            }
                            return yh;
                        }
                        ;
                        Li.prototype.dma_update = function(Mg) {
                            this.rsar += Mg;
                            if (this.rsar == this.stop)
                                this.rsar = this.start;
                            if (this.rcnt <= Mg) {
                                this.rcnt = 0;
                                this.isr |= 64;
                                this.update_irq();
                            } else {
                                this.rcnt -= Mg;
                            }
                        }
                        ;
                        Li.prototype.asic_ioport_write = function(aa, da) {
                            var aa;
                            if (this.rcnt == 0)
                                return;
                            if (this.dcfg & 1) {
                                aa = (this.rsar & ~1) & 32767;
                                if (aa >= 16384) {
                                    this.mem[aa] = da & 255;
                                    this.mem[aa + 1] = (da >> 8) & 255;
                                }
                                this.dma_update(2);
                            } else {
                                aa = this.rsar & 32767;
                                if (aa >= 16384) {
                                    this.mem[aa] = da & 255;
                                }
                                this.dma_update(1);
                            }
                        }
                        ;
                        Li.prototype.asic_ioport_read = function(aa) {
                            var aa, yh;
                            if (this.dcfg & 1) {
                                aa = (this.rsar & ~1) & 32767;
                                yh = this.mem[aa] | (this.mem[aa + 1] << 8);
                                this.dma_update(2);
                            } else {
                                aa = this.rsar & 32767;
                                yh = this.mem[aa];
                                this.dma_update(1);
                            }
                            return yh;
                        }
                        ;
                        Li.prototype.asic_ioport_writel = function(aa, da) {
                            var aa;
                            if (this.rcnt == 0)
                                return;
                            aa = (this.rsar & ~1) & 32767;
                            if (aa >= 16384) {
                                this.mem[aa] = da & 255;
                                this.mem[aa + 1] = (da >> 8) & 255;
                            }
                            aa = (aa + 2) & 32767;
                            if (aa >= 16384) {
                                this.mem[aa] = (da >> 16) & 255;
                                this.mem[aa + 1] = (da >> 24) & 255;
                            }
                            this.dma_update(4);
                        }
                        ;
                        Li.prototype.asic_ioport_readl = function(aa) {
                            var aa, yh;
                            aa = (this.rsar & ~1) & 32767;
                            yh = this.mem[aa] | (this.mem[aa + 1] << 8);
                            aa = (aa + 2) & 32767;
                            yh |= (this.mem[aa] << 16) | (this.mem[aa + 1] << 24);
                            this.dma_update(4);
                            return yh;
                        }
                        ;
                        Li.prototype.reset_ioport_write = function(aa, da) {}
                        ;
                        Li.prototype.reset_ioport_read = function(aa) {
                            this.reset();
                        }
                        ;
                        function Li(wh, ic, Sh, Yi, Zi) {
                            var i;
                            this.set_irq_func = Sh;
                            this.send_packet_func = Zi;
                            wh.register_ioport_write(ic, 16, 1, this.ioport_write.bind(this));
                            wh.register_ioport_read(ic, 16, 1, this.ioport_read.bind(this));
                            wh.register_ioport_write(ic + 16, 1, 1, this.asic_ioport_write.bind(this));
                            wh.register_ioport_read(ic + 16, 1, 1, this.asic_ioport_read.bind(this));
                            wh.register_ioport_write(ic + 16, 2, 2, this.asic_ioport_write.bind(this));
                            wh.register_ioport_read(ic + 16, 2, 2, this.asic_ioport_read.bind(this));
                            wh.register_ioport_write(ic + 31, 1, 1, this.reset_ioport_write.bind(this));
                            wh.register_ioport_read(ic + 31, 1, 1, this.reset_ioport_read.bind(this));
                            this.cmd = 0;
                            this.start = 0;
                            this.stop = 0;
                            this.boundary = 0;
                            this.tsr = 0;
                            this.tpsr = 0;
                            this.tcnt = 0;
                            this.rcnt = 0;
                            this.rsar = 0;
                            this.rsr = 0;
                            this.rxcr = 0;
                            this.isr = 0;
                            this.dcfg = 0;
                            this.imr = 0;
                            this.phys = uh(6);
                            this.curpag = 0;
                            this.mult = uh(8);
                            this.mem = uh((32 * 1024));
                            for (i = 0; i < 6; i++)
                                this.mem[i] = Yi[i];
                            this.mem[14] = 87;
                            this.mem[15] = 87;
                            for (i = 15; i >= 0; i--) {
                                this.mem[2 * i] = this.mem[i];
                                this.mem[2 * i + 1] = this.mem[i];
                            }
                            this.reset();
                        }
                        function aj(Ji, kc, Mg) {
                            console.log("send packet len=" + Mg);
                        }
                        function Gh(lg) {
                            this.set_irq(lg);
                        }
                        function bj() {
                            return this.get_cycles();
                        }
                        function PCEmulator(cj) {
                            var jh, dj, ej, i, p;
                            jh = new CPU_X86(cj.mem_size);
                            this.cpu = jh;
                            this.init_ioports();
                            this.register_ioport_write(128, 1, 1, this.ioport80_write);
                            this.pic = new Eh(this,32,160,Gh.bind(jh));
                            this.pit = new Ih(this,this.pic.set_irq.bind(this.pic, 0),bj.bind(jh));
                            this.last_halted = false;
                            this.pit_timeout = (60000000 / 100);
                            this.cmos = new vh(this);
                            this.serial = new Rh(this,1016,this.pic.set_irq.bind(this.pic, 4),cj.serial_write);
                            this.kbd = new Wh(this,this.reset.bind(this));
                            this.reset_request = 0;
                            ej = ["hda", "hdb"];
                            dj = new Array();
                            for (i = 0; i < ej.length; i++) {
                                p = cj[ej[i]];
                                dj[i] = null;
                                if (p) {
                                    dj[i] = new vi(p.url,p.block_size,p.nb_blocks);
                                }
                            }
                            this.ide0 = new mi(this,496,1014,this.pic.set_irq.bind(this.pic, 14),dj);
                            this.net0 = new Li(this,768,this.pic.set_irq.bind(this.pic, 9),[170, 170, 170, 170, 170, 170],aj);
                            if (cj.clipboard_get && cj.clipboard_set) {
                                this.jsclipboard = new Yh(this,960,cj.clipboard_get,cj.clipboard_set,cj.get_boot_time);
                            }
                            jh.ld8_port = this.ld8_port.bind(this);
                            jh.ld16_port = this.ld16_port.bind(this);
                            jh.ld32_port = this.ld32_port.bind(this);
                            jh.st8_port = this.st8_port.bind(this);
                            jh.st16_port = this.st16_port.bind(this);
                            jh.st32_port = this.st32_port.bind(this);
                            jh.get_hard_intno = this.pic.get_hard_intno.bind(this.pic);
                        }
                        PCEmulator.prototype.load_binary = function(ph, nb, qh) {
                            return this.cpu.load_binary(ph, nb, qh);
                        }
                        ;
                        PCEmulator.prototype.start = function() {
                            setTimeout(this.timer_func.bind(this), 10);
                        }
                        ;
                        PCEmulator.prototype.timer_func = function() {
                            var Zg, fj, gj, hj, ij, wh, jh, n;
                            var jj, kj;
                            wh = this;
                            jh = wh.cpu;
                            jj = jh.get_cycles();
                            gj = jj + 3000000;
                            hj = false;
                            ij = false;
                            if (wh.last_halted) {
                                wh.pit.update_irq();
                                wh.pit_timeout = jj + (60000000 / 100);
                            }
                            for (; ; ) {
                                jj = jh.get_cycles();
                                n = gj - jj;
                                if (n <= 0)
                                    break;
                                kj = wh.pit_timeout - jj;
                                if (kj < n)
                                    n = kj;
                                wh.serial.write_tx_fifo();
                                Zg = jh.exec(n);
                                jj = jh.get_cycles();
                                kj = wh.pit_timeout - jj;
                                if (kj <= 0) {
                                    wh.pit.update_irq();
                                    wh.pit_timeout = jj + (60000000 / 100);
                                }
                                if (Zg == 257) {
                                    ij = true;
                                    break;
                                } else {
                                    if (wh.reset_request) {
                                        hj = true;
                                        break;
                                    }
                                }
                            }
                            if (!hj) {
                                wh.last_halted = ij;
                                if (ij) {
                                    setTimeout(this.timer_func.bind(this), 10);
                                } else {
                                    setTimeout(this.timer_func.bind(this), 0);
                                }
                            }
                        }
                        ;
                        PCEmulator.prototype.init_ioports = function() {
                            var i, lj, mj;
                            this.ioport_readb_table = new Array();
                            this.ioport_writeb_table = new Array();
                            this.ioport_readw_table = new Array();
                            this.ioport_writew_table = new Array();
                            this.ioport_readl_table = new Array();
                            this.ioport_writel_table = new Array();
                            lj = this.default_ioport_readw.bind(this);
                            mj = this.default_ioport_writew.bind(this);
                            for (i = 0; i < 1024; i++) {
                                this.ioport_readb_table[i] = this.default_ioport_readb;
                                this.ioport_writeb_table[i] = this.default_ioport_writeb;
                                this.ioport_readw_table[i] = lj;
                                this.ioport_writew_table[i] = mj;
                                this.ioport_readl_table[i] = this.default_ioport_readl;
                                this.ioport_writel_table[i] = this.default_ioport_writel;
                            }
                        }
                        ;
                        PCEmulator.prototype.default_ioport_readb = function(ug) {
                            var da;
                            da = 255;
                            return da;
                        }
                        ;
                        PCEmulator.prototype.default_ioport_readw = function(ug) {
                            var da;
                            da = this.ioport_readb_table[ug](ug);
                            ug = (ug + 1) & (1024 - 1);
                            da |= this.ioport_readb_table[ug](ug) << 8;
                            return da;
                        }
                        ;
                        PCEmulator.prototype.default_ioport_readl = function(ug) {
                            var da;
                            da = -1;
                            return da;
                        }
                        ;
                        PCEmulator.prototype.default_ioport_writeb = function(ug, da) {}
                        ;
                        PCEmulator.prototype.default_ioport_writew = function(ug, da) {
                            this.ioport_writeb_table[ug](ug, da & 255);
                            ug = (ug + 1) & (1024 - 1);
                            this.ioport_writeb_table[ug](ug, (da >> 8) & 255);
                        }
                        ;
                        PCEmulator.prototype.default_ioport_writel = function(ug, da) {}
                        ;
                        PCEmulator.prototype.ld8_port = function(ug) {
                            var da;
                            da = this.ioport_readb_table[ug & (1024 - 1)](ug);
                            return da;
                        }
                        ;
                        PCEmulator.prototype.ld16_port = function(ug) {
                            var da;
                            da = this.ioport_readw_table[ug & (1024 - 1)](ug);
                            return da;
                        }
                        ;
                        PCEmulator.prototype.ld32_port = function(ug) {
                            var da;
                            da = this.ioport_readl_table[ug & (1024 - 1)](ug);
                            return da;
                        }
                        ;
                        PCEmulator.prototype.st8_port = function(ug, da) {
                            this.ioport_writeb_table[ug & (1024 - 1)](ug, da);
                        }
                        ;
                        PCEmulator.prototype.st16_port = function(ug, da) {
                            this.ioport_writew_table[ug & (1024 - 1)](ug, da);
                        }
                        ;
                        PCEmulator.prototype.st32_port = function(ug, da) {
                            this.ioport_writel_table[ug & (1024 - 1)](ug, da);
                        }
                        ;
                        PCEmulator.prototype.register_ioport_read = function(start, Mg, hi, li) {
                            var i;
                            switch (hi) {
                            case 1:
                                for (i = start; i < start + Mg; i++) {
                                    this.ioport_readb_table[i] = li;
                                }
                                break;
                            case 2:
                                for (i = start; i < start + Mg; i += 2) {
                                    this.ioport_readw_table[i] = li;
                                }
                                break;
                            case 4:
                                for (i = start; i < start + Mg; i += 4) {
                                    this.ioport_readl_table[i] = li;
                                }
                                break;
                            }
                        }
                        ;
                        PCEmulator.prototype.register_ioport_write = function(start, Mg, hi, li) {
                            var i;
                            switch (hi) {
                            case 1:
                                for (i = start; i < start + Mg; i++) {
                                    this.ioport_writeb_table[i] = li;
                                }
                                break;
                            case 2:
                                for (i = start; i < start + Mg; i += 2) {
                                    this.ioport_writew_table[i] = li;
                                }
                                break;
                            case 4:
                                for (i = start; i < start + Mg; i += 4) {
                                    this.ioport_writel_table[i] = li;
                                }
                                break;
                            }
                        }
                        ;
                        PCEmulator.prototype.ioport80_write = function(aa, sh) {}
                        ;
                        PCEmulator.prototype.reset = function() {
                            this.reset_request = 1;
                        }
                        ;

