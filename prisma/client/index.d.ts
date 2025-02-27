
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model registrations
 * This model contains an expression index which requires additional setup for migrations. Visit https://pris.ly/d/expression-indexes for more info.
 */
export type registrations = $Result.DefaultSelection<Prisma.$registrationsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Registrations
 * const registrations = await prisma.registrations.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Registrations
   * const registrations = await prisma.registrations.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Executes a typed SQL query and returns a typed result
   * @example
   * ```
   * import { myQuery } from '@prisma/client/sql'
   * 
   * const result = await prisma.$queryRawTyped(myQuery())
   * ```
   */
  $queryRawTyped<T>(typedSql: runtime.TypedSql<unknown[], T>): Prisma.PrismaPromise<T[]>

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.registrations`: Exposes CRUD operations for the **registrations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Registrations
    * const registrations = await prisma.registrations.findMany()
    * ```
    */
  get registrations(): Prisma.registrationsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.4.1
   * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    registrations: 'registrations'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "registrations"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      registrations: {
        payload: Prisma.$registrationsPayload<ExtArgs>
        fields: Prisma.registrationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.registrationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.registrationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>
          }
          findFirst: {
            args: Prisma.registrationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.registrationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>
          }
          findMany: {
            args: Prisma.registrationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>[]
          }
          create: {
            args: Prisma.registrationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>
          }
          createMany: {
            args: Prisma.registrationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.registrationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>[]
          }
          delete: {
            args: Prisma.registrationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>
          }
          update: {
            args: Prisma.registrationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>
          }
          deleteMany: {
            args: Prisma.registrationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.registrationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.registrationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>[]
          }
          upsert: {
            args: Prisma.registrationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>
          }
          aggregate: {
            args: Prisma.RegistrationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegistrations>
          }
          groupBy: {
            args: Prisma.registrationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegistrationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.registrationsCountArgs<ExtArgs>
            result: $Utils.Optional<RegistrationsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRawTyped: {
          args: runtime.UnknownTypedSql,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    registrations?: registrationsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model registrations
   */

  export type AggregateRegistrations = {
    _count: RegistrationsCountAggregateOutputType | null
    _avg: RegistrationsAvgAggregateOutputType | null
    _sum: RegistrationsSumAggregateOutputType | null
    _min: RegistrationsMinAggregateOutputType | null
    _max: RegistrationsMaxAggregateOutputType | null
  }

  export type RegistrationsAvgAggregateOutputType = {
    id: number | null
    max_vykon: number | null
    max_vykon_otacky: number | null
    zdvihovy_objem: number | null
    korigovany_soucinitel_absorpce: number | null
    co2: number | null
    co2_mesto: number | null
    co2_mimo_mesto: number | null
    specificke_co2: number | null
    snizeni_emisi_nedc: number | null
    snizeni_emisi_wltp: number | null
    spotreba_mesto: number | null
    spotreba_mimo_mesto: number | null
    spotreba_kombinovana: number | null
    spotreba_el_mobil: number | null
    dojezd_zr: number | null
    pocet_mist_celkem: number | null
    pocet_mist_k_sezeni: number | null
    pocet_mist_k_stani: number | null
    delka: number | null
    sirka: number | null
    vyska: number | null
    rozvor: number | null
    rozchod: number | null
    provozni_hmotnost: number | null
    nejvetsi_technicky_pripustna_hmotnost: number | null
    nejvetsi_povolena_hmotnost: number | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden: number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho: number | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz: number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho: number | null
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy: number | null
    nejvetsi_povolena_hmotnost_jizdni_soupravy: number | null
    pocet_naprav: number | null
    vnejsi_hluk_vozidla_stojici: number | null
    vnejsi_hluk_vozidla_otacky: number | null
    vnejsi_hluk_vozidla_jizda: number | null
    nejvyssi_rychlost: number | null
    pomer_vykon_hmotnost: number | null
    faktor_odchylky_de: number | null
    faktor_verifikace_vf: number | null
    pcv: number | null
    hmotnosti_provozni_do: number | null
    hmotnosti_zatizeni_sz: number | null
    objem_cisterny: number | null
    zatizeni_strechy: number | null
    nejvyssi_rychlost_omezeni: number | null
    rok_vyroby: number | null
    delka_do: number | null
    lozna_delka: number | null
    lozna_sirka: number | null
    vyska_do: number | null
  }

  export type RegistrationsSumAggregateOutputType = {
    id: number | null
    max_vykon: number | null
    max_vykon_otacky: number | null
    zdvihovy_objem: number | null
    korigovany_soucinitel_absorpce: number | null
    co2: number | null
    co2_mesto: number | null
    co2_mimo_mesto: number | null
    specificke_co2: number | null
    snizeni_emisi_nedc: number | null
    snizeni_emisi_wltp: number | null
    spotreba_mesto: number | null
    spotreba_mimo_mesto: number | null
    spotreba_kombinovana: number | null
    spotreba_el_mobil: number | null
    dojezd_zr: number | null
    pocet_mist_celkem: number | null
    pocet_mist_k_sezeni: number | null
    pocet_mist_k_stani: number | null
    delka: number | null
    sirka: number | null
    vyska: number | null
    rozvor: number | null
    rozchod: number | null
    provozni_hmotnost: number | null
    nejvetsi_technicky_pripustna_hmotnost: number | null
    nejvetsi_povolena_hmotnost: number | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden: number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho: number | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz: number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho: number | null
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy: number | null
    nejvetsi_povolena_hmotnost_jizdni_soupravy: number | null
    pocet_naprav: number | null
    vnejsi_hluk_vozidla_stojici: number | null
    vnejsi_hluk_vozidla_otacky: number | null
    vnejsi_hluk_vozidla_jizda: number | null
    nejvyssi_rychlost: number | null
    pomer_vykon_hmotnost: number | null
    faktor_odchylky_de: number | null
    faktor_verifikace_vf: number | null
    pcv: number | null
    hmotnosti_provozni_do: number | null
    hmotnosti_zatizeni_sz: number | null
    objem_cisterny: number | null
    zatizeni_strechy: number | null
    nejvyssi_rychlost_omezeni: number | null
    rok_vyroby: number | null
    delka_do: number | null
    lozna_delka: number | null
    lozna_sirka: number | null
    vyska_do: number | null
  }

  export type RegistrationsMinAggregateOutputType = {
    id: number | null
    datum_1_registrace: Date | null
    datum_1_registrace_v_cr: Date | null
    ztp: string | null
    es_eu: string | null
    druh_vozidla: string | null
    druh_vozidla_2_radek: string | null
    kategorie_vozidla: string | null
    tovarni_znacka: string | null
    typ: string | null
    varianta: string | null
    verze: string | null
    vin: string | null
    obchodni_oznaceni: string | null
    vyrobce_vozidla: string | null
    vyrobce_motoru: string | null
    typ_motoru: string | null
    max_vykon: number | null
    max_vykon_otacky: number | null
    palivo: string | null
    zdvihovy_objem: number | null
    plne_elektricke_vozidlo: boolean | null
    hybridni_vozidlo: boolean | null
    trida_hybridniho_vozidla: string | null
    emisni_limit: string | null
    stupe__plneni_emisni_urovne: string | null
    korigovany_soucinitel_absorpce: number | null
    co2: number | null
    co2_mesto: number | null
    co2_mimo_mesto: number | null
    specificke_co2: number | null
    snizeni_emisi_nedc: number | null
    snizeni_emisi_wltp: number | null
    spotreba_mesto: number | null
    spotreba_mimo_mesto: number | null
    spotreba_kombinovana: number | null
    spotreba_pri_rychlosti: string | null
    spotreba_el_mobil: number | null
    dojezd_zr: number | null
    vyrobce_karoserie: string | null
    druh_karoserie: string | null
    vyrobni_cislo_karoserie: string | null
    barva: string | null
    barva_doplnkova: string | null
    pocet_mist_celkem: number | null
    pocet_mist_k_sezeni: number | null
    pocet_mist_k_stani: number | null
    delka: number | null
    sirka: number | null
    vyska: number | null
    rozvor: number | null
    rozchod: number | null
    provozni_hmotnost: number | null
    nejvetsi_technicky_pripustna_hmotnost: number | null
    nejvetsi_povolena_hmotnost: number | null
    nejvetsi_technicky_pripustna_hmotnost_na_napravu: string | null
    nejvetsi_povolena_hmotnost_na_napravu: string | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden: number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho: number | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz: number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho: number | null
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy: number | null
    nejvetsi_povolena_hmotnost_jizdni_soupravy: number | null
    hmotnosti_vozidla_pri_testu_wltp: string | null
    predpis_spotreba_paliva: string | null
    prumerna_hodnota_uzitecneho_zatizeni: string | null
    spojovaci_zarizeni: string | null
    pocet_naprav: number | null
    naprav_pohanenych: string | null
    kola_a_pneumatiky_naprava_1: string | null
    kola_a_pneumatiky_naprava_2: string | null
    kola_a_pneumatiky_naprava_3: string | null
    kola_a_pneumatiky_naprava_4: string | null
    vnejsi_hluk_vozidla_stojici: number | null
    vnejsi_hluk_vozidla_otacky: number | null
    vnejsi_hluk_vozidla_jizda: number | null
    nejvyssi_rychlost: number | null
    pomer_vykon_hmotnost: number | null
    inovativni_technologie: string | null
    stupe__dokonceni: string | null
    faktor_odchylky_de: number | null
    faktor_verifikace_vf: number | null
    ucel_vozidla: string | null
    dalsi_zaznamy: string | null
    alternativni_provedeni: string | null
    cislo_tp: string | null
    cislo_orv: string | null
    druh_rz: string | null
    zarazeni_vozidla: string | null
    status: string | null
    pcv: number | null
    abs: boolean | null
    airbag: string | null
    asr: boolean | null
    brzdy_nouzova: boolean | null
    brzdy_odlehcovaci: boolean | null
    brzdy_parkovaci: boolean | null
    brzdy_provozni: boolean | null
    dopl_kovy_text_na_tp: string | null
    hmotnosti_provozni_do: number | null
    hmotnosti_zatizeni_sz: number | null
    hmotnosti_zatizeni_sz_typ: string | null
    hydropohon: boolean | null
    objem_cisterny: number | null
    zatizeni_strechy: number | null
    cislo_motoru: string | null
    nejvyssi_rychlost_omezeni: number | null
    ovladani_brzd_sz: string | null
    ovladani_brzd_sz_druh: string | null
    retarder: boolean | null
    rok_vyroby: number | null
    delka_do: number | null
    lozna_delka: number | null
    lozna_sirka: number | null
    vyska_do: number | null
    typ_kod: string | null
    rm_zaniku: string | null
  }

  export type RegistrationsMaxAggregateOutputType = {
    id: number | null
    datum_1_registrace: Date | null
    datum_1_registrace_v_cr: Date | null
    ztp: string | null
    es_eu: string | null
    druh_vozidla: string | null
    druh_vozidla_2_radek: string | null
    kategorie_vozidla: string | null
    tovarni_znacka: string | null
    typ: string | null
    varianta: string | null
    verze: string | null
    vin: string | null
    obchodni_oznaceni: string | null
    vyrobce_vozidla: string | null
    vyrobce_motoru: string | null
    typ_motoru: string | null
    max_vykon: number | null
    max_vykon_otacky: number | null
    palivo: string | null
    zdvihovy_objem: number | null
    plne_elektricke_vozidlo: boolean | null
    hybridni_vozidlo: boolean | null
    trida_hybridniho_vozidla: string | null
    emisni_limit: string | null
    stupe__plneni_emisni_urovne: string | null
    korigovany_soucinitel_absorpce: number | null
    co2: number | null
    co2_mesto: number | null
    co2_mimo_mesto: number | null
    specificke_co2: number | null
    snizeni_emisi_nedc: number | null
    snizeni_emisi_wltp: number | null
    spotreba_mesto: number | null
    spotreba_mimo_mesto: number | null
    spotreba_kombinovana: number | null
    spotreba_pri_rychlosti: string | null
    spotreba_el_mobil: number | null
    dojezd_zr: number | null
    vyrobce_karoserie: string | null
    druh_karoserie: string | null
    vyrobni_cislo_karoserie: string | null
    barva: string | null
    barva_doplnkova: string | null
    pocet_mist_celkem: number | null
    pocet_mist_k_sezeni: number | null
    pocet_mist_k_stani: number | null
    delka: number | null
    sirka: number | null
    vyska: number | null
    rozvor: number | null
    rozchod: number | null
    provozni_hmotnost: number | null
    nejvetsi_technicky_pripustna_hmotnost: number | null
    nejvetsi_povolena_hmotnost: number | null
    nejvetsi_technicky_pripustna_hmotnost_na_napravu: string | null
    nejvetsi_povolena_hmotnost_na_napravu: string | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden: number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho: number | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz: number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho: number | null
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy: number | null
    nejvetsi_povolena_hmotnost_jizdni_soupravy: number | null
    hmotnosti_vozidla_pri_testu_wltp: string | null
    predpis_spotreba_paliva: string | null
    prumerna_hodnota_uzitecneho_zatizeni: string | null
    spojovaci_zarizeni: string | null
    pocet_naprav: number | null
    naprav_pohanenych: string | null
    kola_a_pneumatiky_naprava_1: string | null
    kola_a_pneumatiky_naprava_2: string | null
    kola_a_pneumatiky_naprava_3: string | null
    kola_a_pneumatiky_naprava_4: string | null
    vnejsi_hluk_vozidla_stojici: number | null
    vnejsi_hluk_vozidla_otacky: number | null
    vnejsi_hluk_vozidla_jizda: number | null
    nejvyssi_rychlost: number | null
    pomer_vykon_hmotnost: number | null
    inovativni_technologie: string | null
    stupe__dokonceni: string | null
    faktor_odchylky_de: number | null
    faktor_verifikace_vf: number | null
    ucel_vozidla: string | null
    dalsi_zaznamy: string | null
    alternativni_provedeni: string | null
    cislo_tp: string | null
    cislo_orv: string | null
    druh_rz: string | null
    zarazeni_vozidla: string | null
    status: string | null
    pcv: number | null
    abs: boolean | null
    airbag: string | null
    asr: boolean | null
    brzdy_nouzova: boolean | null
    brzdy_odlehcovaci: boolean | null
    brzdy_parkovaci: boolean | null
    brzdy_provozni: boolean | null
    dopl_kovy_text_na_tp: string | null
    hmotnosti_provozni_do: number | null
    hmotnosti_zatizeni_sz: number | null
    hmotnosti_zatizeni_sz_typ: string | null
    hydropohon: boolean | null
    objem_cisterny: number | null
    zatizeni_strechy: number | null
    cislo_motoru: string | null
    nejvyssi_rychlost_omezeni: number | null
    ovladani_brzd_sz: string | null
    ovladani_brzd_sz_druh: string | null
    retarder: boolean | null
    rok_vyroby: number | null
    delka_do: number | null
    lozna_delka: number | null
    lozna_sirka: number | null
    vyska_do: number | null
    typ_kod: string | null
    rm_zaniku: string | null
  }

  export type RegistrationsCountAggregateOutputType = {
    id: number
    datum_1_registrace: number
    datum_1_registrace_v_cr: number
    ztp: number
    es_eu: number
    druh_vozidla: number
    druh_vozidla_2_radek: number
    kategorie_vozidla: number
    tovarni_znacka: number
    typ: number
    varianta: number
    verze: number
    vin: number
    obchodni_oznaceni: number
    vyrobce_vozidla: number
    vyrobce_motoru: number
    typ_motoru: number
    max_vykon: number
    max_vykon_otacky: number
    palivo: number
    zdvihovy_objem: number
    plne_elektricke_vozidlo: number
    hybridni_vozidlo: number
    trida_hybridniho_vozidla: number
    emisni_limit: number
    stupe__plneni_emisni_urovne: number
    korigovany_soucinitel_absorpce: number
    co2: number
    co2_mesto: number
    co2_mimo_mesto: number
    specificke_co2: number
    snizeni_emisi_nedc: number
    snizeni_emisi_wltp: number
    spotreba_mesto: number
    spotreba_mimo_mesto: number
    spotreba_kombinovana: number
    spotreba_pri_rychlosti: number
    spotreba_el_mobil: number
    dojezd_zr: number
    vyrobce_karoserie: number
    druh_karoserie: number
    vyrobni_cislo_karoserie: number
    barva: number
    barva_doplnkova: number
    pocet_mist_celkem: number
    pocet_mist_k_sezeni: number
    pocet_mist_k_stani: number
    delka: number
    sirka: number
    vyska: number
    rozvor: number
    rozchod: number
    provozni_hmotnost: number
    nejvetsi_technicky_pripustna_hmotnost: number
    nejvetsi_povolena_hmotnost: number
    nejvetsi_technicky_pripustna_hmotnost_na_napravu: number
    nejvetsi_povolena_hmotnost_na_napravu: number
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden: number
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho: number
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz: number
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho: number
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy: number
    nejvetsi_povolena_hmotnost_jizdni_soupravy: number
    hmotnosti_vozidla_pri_testu_wltp: number
    predpis_spotreba_paliva: number
    prumerna_hodnota_uzitecneho_zatizeni: number
    spojovaci_zarizeni: number
    pocet_naprav: number
    naprav_pohanenych: number
    kola_a_pneumatiky_naprava_1: number
    kola_a_pneumatiky_naprava_2: number
    kola_a_pneumatiky_naprava_3: number
    kola_a_pneumatiky_naprava_4: number
    vnejsi_hluk_vozidla_stojici: number
    vnejsi_hluk_vozidla_otacky: number
    vnejsi_hluk_vozidla_jizda: number
    nejvyssi_rychlost: number
    pomer_vykon_hmotnost: number
    inovativni_technologie: number
    stupe__dokonceni: number
    faktor_odchylky_de: number
    faktor_verifikace_vf: number
    ucel_vozidla: number
    dalsi_zaznamy: number
    alternativni_provedeni: number
    cislo_tp: number
    cislo_orv: number
    druh_rz: number
    zarazeni_vozidla: number
    status: number
    pcv: number
    abs: number
    airbag: number
    asr: number
    brzdy_nouzova: number
    brzdy_odlehcovaci: number
    brzdy_parkovaci: number
    brzdy_provozni: number
    dopl_kovy_text_na_tp: number
    hmotnosti_provozni_do: number
    hmotnosti_zatizeni_sz: number
    hmotnosti_zatizeni_sz_typ: number
    hydropohon: number
    objem_cisterny: number
    zatizeni_strechy: number
    cislo_motoru: number
    nejvyssi_rychlost_omezeni: number
    ovladani_brzd_sz: number
    ovladani_brzd_sz_druh: number
    retarder: number
    rok_vyroby: number
    delka_do: number
    lozna_delka: number
    lozna_sirka: number
    vyska_do: number
    typ_kod: number
    rm_zaniku: number
    _all: number
  }


  export type RegistrationsAvgAggregateInputType = {
    id?: true
    max_vykon?: true
    max_vykon_otacky?: true
    zdvihovy_objem?: true
    korigovany_soucinitel_absorpce?: true
    co2?: true
    co2_mesto?: true
    co2_mimo_mesto?: true
    specificke_co2?: true
    snizeni_emisi_nedc?: true
    snizeni_emisi_wltp?: true
    spotreba_mesto?: true
    spotreba_mimo_mesto?: true
    spotreba_kombinovana?: true
    spotreba_el_mobil?: true
    dojezd_zr?: true
    pocet_mist_celkem?: true
    pocet_mist_k_sezeni?: true
    pocet_mist_k_stani?: true
    delka?: true
    sirka?: true
    vyska?: true
    rozvor?: true
    rozchod?: true
    provozni_hmotnost?: true
    nejvetsi_technicky_pripustna_hmotnost?: true
    nejvetsi_povolena_hmotnost?: true
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: true
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: true
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: true
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: true
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: true
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: true
    pocet_naprav?: true
    vnejsi_hluk_vozidla_stojici?: true
    vnejsi_hluk_vozidla_otacky?: true
    vnejsi_hluk_vozidla_jizda?: true
    nejvyssi_rychlost?: true
    pomer_vykon_hmotnost?: true
    faktor_odchylky_de?: true
    faktor_verifikace_vf?: true
    pcv?: true
    hmotnosti_provozni_do?: true
    hmotnosti_zatizeni_sz?: true
    objem_cisterny?: true
    zatizeni_strechy?: true
    nejvyssi_rychlost_omezeni?: true
    rok_vyroby?: true
    delka_do?: true
    lozna_delka?: true
    lozna_sirka?: true
    vyska_do?: true
  }

  export type RegistrationsSumAggregateInputType = {
    id?: true
    max_vykon?: true
    max_vykon_otacky?: true
    zdvihovy_objem?: true
    korigovany_soucinitel_absorpce?: true
    co2?: true
    co2_mesto?: true
    co2_mimo_mesto?: true
    specificke_co2?: true
    snizeni_emisi_nedc?: true
    snizeni_emisi_wltp?: true
    spotreba_mesto?: true
    spotreba_mimo_mesto?: true
    spotreba_kombinovana?: true
    spotreba_el_mobil?: true
    dojezd_zr?: true
    pocet_mist_celkem?: true
    pocet_mist_k_sezeni?: true
    pocet_mist_k_stani?: true
    delka?: true
    sirka?: true
    vyska?: true
    rozvor?: true
    rozchod?: true
    provozni_hmotnost?: true
    nejvetsi_technicky_pripustna_hmotnost?: true
    nejvetsi_povolena_hmotnost?: true
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: true
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: true
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: true
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: true
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: true
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: true
    pocet_naprav?: true
    vnejsi_hluk_vozidla_stojici?: true
    vnejsi_hluk_vozidla_otacky?: true
    vnejsi_hluk_vozidla_jizda?: true
    nejvyssi_rychlost?: true
    pomer_vykon_hmotnost?: true
    faktor_odchylky_de?: true
    faktor_verifikace_vf?: true
    pcv?: true
    hmotnosti_provozni_do?: true
    hmotnosti_zatizeni_sz?: true
    objem_cisterny?: true
    zatizeni_strechy?: true
    nejvyssi_rychlost_omezeni?: true
    rok_vyroby?: true
    delka_do?: true
    lozna_delka?: true
    lozna_sirka?: true
    vyska_do?: true
  }

  export type RegistrationsMinAggregateInputType = {
    id?: true
    datum_1_registrace?: true
    datum_1_registrace_v_cr?: true
    ztp?: true
    es_eu?: true
    druh_vozidla?: true
    druh_vozidla_2_radek?: true
    kategorie_vozidla?: true
    tovarni_znacka?: true
    typ?: true
    varianta?: true
    verze?: true
    vin?: true
    obchodni_oznaceni?: true
    vyrobce_vozidla?: true
    vyrobce_motoru?: true
    typ_motoru?: true
    max_vykon?: true
    max_vykon_otacky?: true
    palivo?: true
    zdvihovy_objem?: true
    plne_elektricke_vozidlo?: true
    hybridni_vozidlo?: true
    trida_hybridniho_vozidla?: true
    emisni_limit?: true
    stupe__plneni_emisni_urovne?: true
    korigovany_soucinitel_absorpce?: true
    co2?: true
    co2_mesto?: true
    co2_mimo_mesto?: true
    specificke_co2?: true
    snizeni_emisi_nedc?: true
    snizeni_emisi_wltp?: true
    spotreba_mesto?: true
    spotreba_mimo_mesto?: true
    spotreba_kombinovana?: true
    spotreba_pri_rychlosti?: true
    spotreba_el_mobil?: true
    dojezd_zr?: true
    vyrobce_karoserie?: true
    druh_karoserie?: true
    vyrobni_cislo_karoserie?: true
    barva?: true
    barva_doplnkova?: true
    pocet_mist_celkem?: true
    pocet_mist_k_sezeni?: true
    pocet_mist_k_stani?: true
    delka?: true
    sirka?: true
    vyska?: true
    rozvor?: true
    rozchod?: true
    provozni_hmotnost?: true
    nejvetsi_technicky_pripustna_hmotnost?: true
    nejvetsi_povolena_hmotnost?: true
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: true
    nejvetsi_povolena_hmotnost_na_napravu?: true
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: true
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: true
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: true
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: true
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: true
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: true
    hmotnosti_vozidla_pri_testu_wltp?: true
    predpis_spotreba_paliva?: true
    prumerna_hodnota_uzitecneho_zatizeni?: true
    spojovaci_zarizeni?: true
    pocet_naprav?: true
    naprav_pohanenych?: true
    kola_a_pneumatiky_naprava_1?: true
    kola_a_pneumatiky_naprava_2?: true
    kola_a_pneumatiky_naprava_3?: true
    kola_a_pneumatiky_naprava_4?: true
    vnejsi_hluk_vozidla_stojici?: true
    vnejsi_hluk_vozidla_otacky?: true
    vnejsi_hluk_vozidla_jizda?: true
    nejvyssi_rychlost?: true
    pomer_vykon_hmotnost?: true
    inovativni_technologie?: true
    stupe__dokonceni?: true
    faktor_odchylky_de?: true
    faktor_verifikace_vf?: true
    ucel_vozidla?: true
    dalsi_zaznamy?: true
    alternativni_provedeni?: true
    cislo_tp?: true
    cislo_orv?: true
    druh_rz?: true
    zarazeni_vozidla?: true
    status?: true
    pcv?: true
    abs?: true
    airbag?: true
    asr?: true
    brzdy_nouzova?: true
    brzdy_odlehcovaci?: true
    brzdy_parkovaci?: true
    brzdy_provozni?: true
    dopl_kovy_text_na_tp?: true
    hmotnosti_provozni_do?: true
    hmotnosti_zatizeni_sz?: true
    hmotnosti_zatizeni_sz_typ?: true
    hydropohon?: true
    objem_cisterny?: true
    zatizeni_strechy?: true
    cislo_motoru?: true
    nejvyssi_rychlost_omezeni?: true
    ovladani_brzd_sz?: true
    ovladani_brzd_sz_druh?: true
    retarder?: true
    rok_vyroby?: true
    delka_do?: true
    lozna_delka?: true
    lozna_sirka?: true
    vyska_do?: true
    typ_kod?: true
    rm_zaniku?: true
  }

  export type RegistrationsMaxAggregateInputType = {
    id?: true
    datum_1_registrace?: true
    datum_1_registrace_v_cr?: true
    ztp?: true
    es_eu?: true
    druh_vozidla?: true
    druh_vozidla_2_radek?: true
    kategorie_vozidla?: true
    tovarni_znacka?: true
    typ?: true
    varianta?: true
    verze?: true
    vin?: true
    obchodni_oznaceni?: true
    vyrobce_vozidla?: true
    vyrobce_motoru?: true
    typ_motoru?: true
    max_vykon?: true
    max_vykon_otacky?: true
    palivo?: true
    zdvihovy_objem?: true
    plne_elektricke_vozidlo?: true
    hybridni_vozidlo?: true
    trida_hybridniho_vozidla?: true
    emisni_limit?: true
    stupe__plneni_emisni_urovne?: true
    korigovany_soucinitel_absorpce?: true
    co2?: true
    co2_mesto?: true
    co2_mimo_mesto?: true
    specificke_co2?: true
    snizeni_emisi_nedc?: true
    snizeni_emisi_wltp?: true
    spotreba_mesto?: true
    spotreba_mimo_mesto?: true
    spotreba_kombinovana?: true
    spotreba_pri_rychlosti?: true
    spotreba_el_mobil?: true
    dojezd_zr?: true
    vyrobce_karoserie?: true
    druh_karoserie?: true
    vyrobni_cislo_karoserie?: true
    barva?: true
    barva_doplnkova?: true
    pocet_mist_celkem?: true
    pocet_mist_k_sezeni?: true
    pocet_mist_k_stani?: true
    delka?: true
    sirka?: true
    vyska?: true
    rozvor?: true
    rozchod?: true
    provozni_hmotnost?: true
    nejvetsi_technicky_pripustna_hmotnost?: true
    nejvetsi_povolena_hmotnost?: true
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: true
    nejvetsi_povolena_hmotnost_na_napravu?: true
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: true
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: true
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: true
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: true
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: true
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: true
    hmotnosti_vozidla_pri_testu_wltp?: true
    predpis_spotreba_paliva?: true
    prumerna_hodnota_uzitecneho_zatizeni?: true
    spojovaci_zarizeni?: true
    pocet_naprav?: true
    naprav_pohanenych?: true
    kola_a_pneumatiky_naprava_1?: true
    kola_a_pneumatiky_naprava_2?: true
    kola_a_pneumatiky_naprava_3?: true
    kola_a_pneumatiky_naprava_4?: true
    vnejsi_hluk_vozidla_stojici?: true
    vnejsi_hluk_vozidla_otacky?: true
    vnejsi_hluk_vozidla_jizda?: true
    nejvyssi_rychlost?: true
    pomer_vykon_hmotnost?: true
    inovativni_technologie?: true
    stupe__dokonceni?: true
    faktor_odchylky_de?: true
    faktor_verifikace_vf?: true
    ucel_vozidla?: true
    dalsi_zaznamy?: true
    alternativni_provedeni?: true
    cislo_tp?: true
    cislo_orv?: true
    druh_rz?: true
    zarazeni_vozidla?: true
    status?: true
    pcv?: true
    abs?: true
    airbag?: true
    asr?: true
    brzdy_nouzova?: true
    brzdy_odlehcovaci?: true
    brzdy_parkovaci?: true
    brzdy_provozni?: true
    dopl_kovy_text_na_tp?: true
    hmotnosti_provozni_do?: true
    hmotnosti_zatizeni_sz?: true
    hmotnosti_zatizeni_sz_typ?: true
    hydropohon?: true
    objem_cisterny?: true
    zatizeni_strechy?: true
    cislo_motoru?: true
    nejvyssi_rychlost_omezeni?: true
    ovladani_brzd_sz?: true
    ovladani_brzd_sz_druh?: true
    retarder?: true
    rok_vyroby?: true
    delka_do?: true
    lozna_delka?: true
    lozna_sirka?: true
    vyska_do?: true
    typ_kod?: true
    rm_zaniku?: true
  }

  export type RegistrationsCountAggregateInputType = {
    id?: true
    datum_1_registrace?: true
    datum_1_registrace_v_cr?: true
    ztp?: true
    es_eu?: true
    druh_vozidla?: true
    druh_vozidla_2_radek?: true
    kategorie_vozidla?: true
    tovarni_znacka?: true
    typ?: true
    varianta?: true
    verze?: true
    vin?: true
    obchodni_oznaceni?: true
    vyrobce_vozidla?: true
    vyrobce_motoru?: true
    typ_motoru?: true
    max_vykon?: true
    max_vykon_otacky?: true
    palivo?: true
    zdvihovy_objem?: true
    plne_elektricke_vozidlo?: true
    hybridni_vozidlo?: true
    trida_hybridniho_vozidla?: true
    emisni_limit?: true
    stupe__plneni_emisni_urovne?: true
    korigovany_soucinitel_absorpce?: true
    co2?: true
    co2_mesto?: true
    co2_mimo_mesto?: true
    specificke_co2?: true
    snizeni_emisi_nedc?: true
    snizeni_emisi_wltp?: true
    spotreba_mesto?: true
    spotreba_mimo_mesto?: true
    spotreba_kombinovana?: true
    spotreba_pri_rychlosti?: true
    spotreba_el_mobil?: true
    dojezd_zr?: true
    vyrobce_karoserie?: true
    druh_karoserie?: true
    vyrobni_cislo_karoserie?: true
    barva?: true
    barva_doplnkova?: true
    pocet_mist_celkem?: true
    pocet_mist_k_sezeni?: true
    pocet_mist_k_stani?: true
    delka?: true
    sirka?: true
    vyska?: true
    rozvor?: true
    rozchod?: true
    provozni_hmotnost?: true
    nejvetsi_technicky_pripustna_hmotnost?: true
    nejvetsi_povolena_hmotnost?: true
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: true
    nejvetsi_povolena_hmotnost_na_napravu?: true
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: true
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: true
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: true
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: true
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: true
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: true
    hmotnosti_vozidla_pri_testu_wltp?: true
    predpis_spotreba_paliva?: true
    prumerna_hodnota_uzitecneho_zatizeni?: true
    spojovaci_zarizeni?: true
    pocet_naprav?: true
    naprav_pohanenych?: true
    kola_a_pneumatiky_naprava_1?: true
    kola_a_pneumatiky_naprava_2?: true
    kola_a_pneumatiky_naprava_3?: true
    kola_a_pneumatiky_naprava_4?: true
    vnejsi_hluk_vozidla_stojici?: true
    vnejsi_hluk_vozidla_otacky?: true
    vnejsi_hluk_vozidla_jizda?: true
    nejvyssi_rychlost?: true
    pomer_vykon_hmotnost?: true
    inovativni_technologie?: true
    stupe__dokonceni?: true
    faktor_odchylky_de?: true
    faktor_verifikace_vf?: true
    ucel_vozidla?: true
    dalsi_zaznamy?: true
    alternativni_provedeni?: true
    cislo_tp?: true
    cislo_orv?: true
    druh_rz?: true
    zarazeni_vozidla?: true
    status?: true
    pcv?: true
    abs?: true
    airbag?: true
    asr?: true
    brzdy_nouzova?: true
    brzdy_odlehcovaci?: true
    brzdy_parkovaci?: true
    brzdy_provozni?: true
    dopl_kovy_text_na_tp?: true
    hmotnosti_provozni_do?: true
    hmotnosti_zatizeni_sz?: true
    hmotnosti_zatizeni_sz_typ?: true
    hydropohon?: true
    objem_cisterny?: true
    zatizeni_strechy?: true
    cislo_motoru?: true
    nejvyssi_rychlost_omezeni?: true
    ovladani_brzd_sz?: true
    ovladani_brzd_sz_druh?: true
    retarder?: true
    rok_vyroby?: true
    delka_do?: true
    lozna_delka?: true
    lozna_sirka?: true
    vyska_do?: true
    typ_kod?: true
    rm_zaniku?: true
    _all?: true
  }

  export type RegistrationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which registrations to aggregate.
     */
    where?: registrationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of registrations to fetch.
     */
    orderBy?: registrationsOrderByWithRelationInput | registrationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: registrationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned registrations
    **/
    _count?: true | RegistrationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RegistrationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RegistrationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegistrationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegistrationsMaxAggregateInputType
  }

  export type GetRegistrationsAggregateType<T extends RegistrationsAggregateArgs> = {
        [P in keyof T & keyof AggregateRegistrations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegistrations[P]>
      : GetScalarType<T[P], AggregateRegistrations[P]>
  }




  export type registrationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: registrationsWhereInput
    orderBy?: registrationsOrderByWithAggregationInput | registrationsOrderByWithAggregationInput[]
    by: RegistrationsScalarFieldEnum[] | RegistrationsScalarFieldEnum
    having?: registrationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegistrationsCountAggregateInputType | true
    _avg?: RegistrationsAvgAggregateInputType
    _sum?: RegistrationsSumAggregateInputType
    _min?: RegistrationsMinAggregateInputType
    _max?: RegistrationsMaxAggregateInputType
  }

  export type RegistrationsGroupByOutputType = {
    id: number
    datum_1_registrace: Date | null
    datum_1_registrace_v_cr: Date | null
    ztp: string | null
    es_eu: string | null
    druh_vozidla: string | null
    druh_vozidla_2_radek: string | null
    kategorie_vozidla: string | null
    tovarni_znacka: string | null
    typ: string | null
    varianta: string | null
    verze: string | null
    vin: string | null
    obchodni_oznaceni: string | null
    vyrobce_vozidla: string | null
    vyrobce_motoru: string | null
    typ_motoru: string | null
    max_vykon: number | null
    max_vykon_otacky: number | null
    palivo: string | null
    zdvihovy_objem: number | null
    plne_elektricke_vozidlo: boolean | null
    hybridni_vozidlo: boolean | null
    trida_hybridniho_vozidla: string | null
    emisni_limit: string | null
    stupe__plneni_emisni_urovne: string | null
    korigovany_soucinitel_absorpce: number | null
    co2: number | null
    co2_mesto: number | null
    co2_mimo_mesto: number | null
    specificke_co2: number | null
    snizeni_emisi_nedc: number | null
    snizeni_emisi_wltp: number | null
    spotreba_mesto: number | null
    spotreba_mimo_mesto: number | null
    spotreba_kombinovana: number | null
    spotreba_pri_rychlosti: string | null
    spotreba_el_mobil: number | null
    dojezd_zr: number | null
    vyrobce_karoserie: string | null
    druh_karoserie: string | null
    vyrobni_cislo_karoserie: string | null
    barva: string | null
    barva_doplnkova: string | null
    pocet_mist_celkem: number | null
    pocet_mist_k_sezeni: number | null
    pocet_mist_k_stani: number | null
    delka: number | null
    sirka: number | null
    vyska: number | null
    rozvor: number | null
    rozchod: number | null
    provozni_hmotnost: number | null
    nejvetsi_technicky_pripustna_hmotnost: number | null
    nejvetsi_povolena_hmotnost: number | null
    nejvetsi_technicky_pripustna_hmotnost_na_napravu: string | null
    nejvetsi_povolena_hmotnost_na_napravu: string | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden: number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho: number | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz: number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho: number | null
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy: number | null
    nejvetsi_povolena_hmotnost_jizdni_soupravy: number | null
    hmotnosti_vozidla_pri_testu_wltp: string | null
    predpis_spotreba_paliva: string | null
    prumerna_hodnota_uzitecneho_zatizeni: string | null
    spojovaci_zarizeni: string | null
    pocet_naprav: number | null
    naprav_pohanenych: string | null
    kola_a_pneumatiky_naprava_1: string | null
    kola_a_pneumatiky_naprava_2: string | null
    kola_a_pneumatiky_naprava_3: string | null
    kola_a_pneumatiky_naprava_4: string | null
    vnejsi_hluk_vozidla_stojici: number | null
    vnejsi_hluk_vozidla_otacky: number | null
    vnejsi_hluk_vozidla_jizda: number | null
    nejvyssi_rychlost: number | null
    pomer_vykon_hmotnost: number | null
    inovativni_technologie: string | null
    stupe__dokonceni: string | null
    faktor_odchylky_de: number | null
    faktor_verifikace_vf: number | null
    ucel_vozidla: string | null
    dalsi_zaznamy: string | null
    alternativni_provedeni: string | null
    cislo_tp: string | null
    cislo_orv: string | null
    druh_rz: string | null
    zarazeni_vozidla: string | null
    status: string | null
    pcv: number | null
    abs: boolean | null
    airbag: string | null
    asr: boolean | null
    brzdy_nouzova: boolean | null
    brzdy_odlehcovaci: boolean | null
    brzdy_parkovaci: boolean | null
    brzdy_provozni: boolean | null
    dopl_kovy_text_na_tp: string | null
    hmotnosti_provozni_do: number | null
    hmotnosti_zatizeni_sz: number | null
    hmotnosti_zatizeni_sz_typ: string | null
    hydropohon: boolean | null
    objem_cisterny: number | null
    zatizeni_strechy: number | null
    cislo_motoru: string | null
    nejvyssi_rychlost_omezeni: number | null
    ovladani_brzd_sz: string | null
    ovladani_brzd_sz_druh: string | null
    retarder: boolean | null
    rok_vyroby: number | null
    delka_do: number | null
    lozna_delka: number | null
    lozna_sirka: number | null
    vyska_do: number | null
    typ_kod: string | null
    rm_zaniku: string | null
    _count: RegistrationsCountAggregateOutputType | null
    _avg: RegistrationsAvgAggregateOutputType | null
    _sum: RegistrationsSumAggregateOutputType | null
    _min: RegistrationsMinAggregateOutputType | null
    _max: RegistrationsMaxAggregateOutputType | null
  }

  type GetRegistrationsGroupByPayload<T extends registrationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegistrationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegistrationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegistrationsGroupByOutputType[P]>
            : GetScalarType<T[P], RegistrationsGroupByOutputType[P]>
        }
      >
    >


  export type registrationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    datum_1_registrace?: boolean
    datum_1_registrace_v_cr?: boolean
    ztp?: boolean
    es_eu?: boolean
    druh_vozidla?: boolean
    druh_vozidla_2_radek?: boolean
    kategorie_vozidla?: boolean
    tovarni_znacka?: boolean
    typ?: boolean
    varianta?: boolean
    verze?: boolean
    vin?: boolean
    obchodni_oznaceni?: boolean
    vyrobce_vozidla?: boolean
    vyrobce_motoru?: boolean
    typ_motoru?: boolean
    max_vykon?: boolean
    max_vykon_otacky?: boolean
    palivo?: boolean
    zdvihovy_objem?: boolean
    plne_elektricke_vozidlo?: boolean
    hybridni_vozidlo?: boolean
    trida_hybridniho_vozidla?: boolean
    emisni_limit?: boolean
    stupe__plneni_emisni_urovne?: boolean
    korigovany_soucinitel_absorpce?: boolean
    co2?: boolean
    co2_mesto?: boolean
    co2_mimo_mesto?: boolean
    specificke_co2?: boolean
    snizeni_emisi_nedc?: boolean
    snizeni_emisi_wltp?: boolean
    spotreba_mesto?: boolean
    spotreba_mimo_mesto?: boolean
    spotreba_kombinovana?: boolean
    spotreba_pri_rychlosti?: boolean
    spotreba_el_mobil?: boolean
    dojezd_zr?: boolean
    vyrobce_karoserie?: boolean
    druh_karoserie?: boolean
    vyrobni_cislo_karoserie?: boolean
    barva?: boolean
    barva_doplnkova?: boolean
    pocet_mist_celkem?: boolean
    pocet_mist_k_sezeni?: boolean
    pocet_mist_k_stani?: boolean
    delka?: boolean
    sirka?: boolean
    vyska?: boolean
    rozvor?: boolean
    rozchod?: boolean
    provozni_hmotnost?: boolean
    nejvetsi_technicky_pripustna_hmotnost?: boolean
    nejvetsi_povolena_hmotnost?: boolean
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: boolean
    nejvetsi_povolena_hmotnost_na_napravu?: boolean
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: boolean
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: boolean
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: boolean
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: boolean
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: boolean
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: boolean
    hmotnosti_vozidla_pri_testu_wltp?: boolean
    predpis_spotreba_paliva?: boolean
    prumerna_hodnota_uzitecneho_zatizeni?: boolean
    spojovaci_zarizeni?: boolean
    pocet_naprav?: boolean
    naprav_pohanenych?: boolean
    kola_a_pneumatiky_naprava_1?: boolean
    kola_a_pneumatiky_naprava_2?: boolean
    kola_a_pneumatiky_naprava_3?: boolean
    kola_a_pneumatiky_naprava_4?: boolean
    vnejsi_hluk_vozidla_stojici?: boolean
    vnejsi_hluk_vozidla_otacky?: boolean
    vnejsi_hluk_vozidla_jizda?: boolean
    nejvyssi_rychlost?: boolean
    pomer_vykon_hmotnost?: boolean
    inovativni_technologie?: boolean
    stupe__dokonceni?: boolean
    faktor_odchylky_de?: boolean
    faktor_verifikace_vf?: boolean
    ucel_vozidla?: boolean
    dalsi_zaznamy?: boolean
    alternativni_provedeni?: boolean
    cislo_tp?: boolean
    cislo_orv?: boolean
    druh_rz?: boolean
    zarazeni_vozidla?: boolean
    status?: boolean
    pcv?: boolean
    abs?: boolean
    airbag?: boolean
    asr?: boolean
    brzdy_nouzova?: boolean
    brzdy_odlehcovaci?: boolean
    brzdy_parkovaci?: boolean
    brzdy_provozni?: boolean
    dopl_kovy_text_na_tp?: boolean
    hmotnosti_provozni_do?: boolean
    hmotnosti_zatizeni_sz?: boolean
    hmotnosti_zatizeni_sz_typ?: boolean
    hydropohon?: boolean
    objem_cisterny?: boolean
    zatizeni_strechy?: boolean
    cislo_motoru?: boolean
    nejvyssi_rychlost_omezeni?: boolean
    ovladani_brzd_sz?: boolean
    ovladani_brzd_sz_druh?: boolean
    retarder?: boolean
    rok_vyroby?: boolean
    delka_do?: boolean
    lozna_delka?: boolean
    lozna_sirka?: boolean
    vyska_do?: boolean
    typ_kod?: boolean
    rm_zaniku?: boolean
  }, ExtArgs["result"]["registrations"]>

  export type registrationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    datum_1_registrace?: boolean
    datum_1_registrace_v_cr?: boolean
    ztp?: boolean
    es_eu?: boolean
    druh_vozidla?: boolean
    druh_vozidla_2_radek?: boolean
    kategorie_vozidla?: boolean
    tovarni_znacka?: boolean
    typ?: boolean
    varianta?: boolean
    verze?: boolean
    vin?: boolean
    obchodni_oznaceni?: boolean
    vyrobce_vozidla?: boolean
    vyrobce_motoru?: boolean
    typ_motoru?: boolean
    max_vykon?: boolean
    max_vykon_otacky?: boolean
    palivo?: boolean
    zdvihovy_objem?: boolean
    plne_elektricke_vozidlo?: boolean
    hybridni_vozidlo?: boolean
    trida_hybridniho_vozidla?: boolean
    emisni_limit?: boolean
    stupe__plneni_emisni_urovne?: boolean
    korigovany_soucinitel_absorpce?: boolean
    co2?: boolean
    co2_mesto?: boolean
    co2_mimo_mesto?: boolean
    specificke_co2?: boolean
    snizeni_emisi_nedc?: boolean
    snizeni_emisi_wltp?: boolean
    spotreba_mesto?: boolean
    spotreba_mimo_mesto?: boolean
    spotreba_kombinovana?: boolean
    spotreba_pri_rychlosti?: boolean
    spotreba_el_mobil?: boolean
    dojezd_zr?: boolean
    vyrobce_karoserie?: boolean
    druh_karoserie?: boolean
    vyrobni_cislo_karoserie?: boolean
    barva?: boolean
    barva_doplnkova?: boolean
    pocet_mist_celkem?: boolean
    pocet_mist_k_sezeni?: boolean
    pocet_mist_k_stani?: boolean
    delka?: boolean
    sirka?: boolean
    vyska?: boolean
    rozvor?: boolean
    rozchod?: boolean
    provozni_hmotnost?: boolean
    nejvetsi_technicky_pripustna_hmotnost?: boolean
    nejvetsi_povolena_hmotnost?: boolean
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: boolean
    nejvetsi_povolena_hmotnost_na_napravu?: boolean
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: boolean
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: boolean
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: boolean
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: boolean
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: boolean
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: boolean
    hmotnosti_vozidla_pri_testu_wltp?: boolean
    predpis_spotreba_paliva?: boolean
    prumerna_hodnota_uzitecneho_zatizeni?: boolean
    spojovaci_zarizeni?: boolean
    pocet_naprav?: boolean
    naprav_pohanenych?: boolean
    kola_a_pneumatiky_naprava_1?: boolean
    kola_a_pneumatiky_naprava_2?: boolean
    kola_a_pneumatiky_naprava_3?: boolean
    kola_a_pneumatiky_naprava_4?: boolean
    vnejsi_hluk_vozidla_stojici?: boolean
    vnejsi_hluk_vozidla_otacky?: boolean
    vnejsi_hluk_vozidla_jizda?: boolean
    nejvyssi_rychlost?: boolean
    pomer_vykon_hmotnost?: boolean
    inovativni_technologie?: boolean
    stupe__dokonceni?: boolean
    faktor_odchylky_de?: boolean
    faktor_verifikace_vf?: boolean
    ucel_vozidla?: boolean
    dalsi_zaznamy?: boolean
    alternativni_provedeni?: boolean
    cislo_tp?: boolean
    cislo_orv?: boolean
    druh_rz?: boolean
    zarazeni_vozidla?: boolean
    status?: boolean
    pcv?: boolean
    abs?: boolean
    airbag?: boolean
    asr?: boolean
    brzdy_nouzova?: boolean
    brzdy_odlehcovaci?: boolean
    brzdy_parkovaci?: boolean
    brzdy_provozni?: boolean
    dopl_kovy_text_na_tp?: boolean
    hmotnosti_provozni_do?: boolean
    hmotnosti_zatizeni_sz?: boolean
    hmotnosti_zatizeni_sz_typ?: boolean
    hydropohon?: boolean
    objem_cisterny?: boolean
    zatizeni_strechy?: boolean
    cislo_motoru?: boolean
    nejvyssi_rychlost_omezeni?: boolean
    ovladani_brzd_sz?: boolean
    ovladani_brzd_sz_druh?: boolean
    retarder?: boolean
    rok_vyroby?: boolean
    delka_do?: boolean
    lozna_delka?: boolean
    lozna_sirka?: boolean
    vyska_do?: boolean
    typ_kod?: boolean
    rm_zaniku?: boolean
  }, ExtArgs["result"]["registrations"]>

  export type registrationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    datum_1_registrace?: boolean
    datum_1_registrace_v_cr?: boolean
    ztp?: boolean
    es_eu?: boolean
    druh_vozidla?: boolean
    druh_vozidla_2_radek?: boolean
    kategorie_vozidla?: boolean
    tovarni_znacka?: boolean
    typ?: boolean
    varianta?: boolean
    verze?: boolean
    vin?: boolean
    obchodni_oznaceni?: boolean
    vyrobce_vozidla?: boolean
    vyrobce_motoru?: boolean
    typ_motoru?: boolean
    max_vykon?: boolean
    max_vykon_otacky?: boolean
    palivo?: boolean
    zdvihovy_objem?: boolean
    plne_elektricke_vozidlo?: boolean
    hybridni_vozidlo?: boolean
    trida_hybridniho_vozidla?: boolean
    emisni_limit?: boolean
    stupe__plneni_emisni_urovne?: boolean
    korigovany_soucinitel_absorpce?: boolean
    co2?: boolean
    co2_mesto?: boolean
    co2_mimo_mesto?: boolean
    specificke_co2?: boolean
    snizeni_emisi_nedc?: boolean
    snizeni_emisi_wltp?: boolean
    spotreba_mesto?: boolean
    spotreba_mimo_mesto?: boolean
    spotreba_kombinovana?: boolean
    spotreba_pri_rychlosti?: boolean
    spotreba_el_mobil?: boolean
    dojezd_zr?: boolean
    vyrobce_karoserie?: boolean
    druh_karoserie?: boolean
    vyrobni_cislo_karoserie?: boolean
    barva?: boolean
    barva_doplnkova?: boolean
    pocet_mist_celkem?: boolean
    pocet_mist_k_sezeni?: boolean
    pocet_mist_k_stani?: boolean
    delka?: boolean
    sirka?: boolean
    vyska?: boolean
    rozvor?: boolean
    rozchod?: boolean
    provozni_hmotnost?: boolean
    nejvetsi_technicky_pripustna_hmotnost?: boolean
    nejvetsi_povolena_hmotnost?: boolean
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: boolean
    nejvetsi_povolena_hmotnost_na_napravu?: boolean
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: boolean
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: boolean
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: boolean
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: boolean
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: boolean
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: boolean
    hmotnosti_vozidla_pri_testu_wltp?: boolean
    predpis_spotreba_paliva?: boolean
    prumerna_hodnota_uzitecneho_zatizeni?: boolean
    spojovaci_zarizeni?: boolean
    pocet_naprav?: boolean
    naprav_pohanenych?: boolean
    kola_a_pneumatiky_naprava_1?: boolean
    kola_a_pneumatiky_naprava_2?: boolean
    kola_a_pneumatiky_naprava_3?: boolean
    kola_a_pneumatiky_naprava_4?: boolean
    vnejsi_hluk_vozidla_stojici?: boolean
    vnejsi_hluk_vozidla_otacky?: boolean
    vnejsi_hluk_vozidla_jizda?: boolean
    nejvyssi_rychlost?: boolean
    pomer_vykon_hmotnost?: boolean
    inovativni_technologie?: boolean
    stupe__dokonceni?: boolean
    faktor_odchylky_de?: boolean
    faktor_verifikace_vf?: boolean
    ucel_vozidla?: boolean
    dalsi_zaznamy?: boolean
    alternativni_provedeni?: boolean
    cislo_tp?: boolean
    cislo_orv?: boolean
    druh_rz?: boolean
    zarazeni_vozidla?: boolean
    status?: boolean
    pcv?: boolean
    abs?: boolean
    airbag?: boolean
    asr?: boolean
    brzdy_nouzova?: boolean
    brzdy_odlehcovaci?: boolean
    brzdy_parkovaci?: boolean
    brzdy_provozni?: boolean
    dopl_kovy_text_na_tp?: boolean
    hmotnosti_provozni_do?: boolean
    hmotnosti_zatizeni_sz?: boolean
    hmotnosti_zatizeni_sz_typ?: boolean
    hydropohon?: boolean
    objem_cisterny?: boolean
    zatizeni_strechy?: boolean
    cislo_motoru?: boolean
    nejvyssi_rychlost_omezeni?: boolean
    ovladani_brzd_sz?: boolean
    ovladani_brzd_sz_druh?: boolean
    retarder?: boolean
    rok_vyroby?: boolean
    delka_do?: boolean
    lozna_delka?: boolean
    lozna_sirka?: boolean
    vyska_do?: boolean
    typ_kod?: boolean
    rm_zaniku?: boolean
  }, ExtArgs["result"]["registrations"]>

  export type registrationsSelectScalar = {
    id?: boolean
    datum_1_registrace?: boolean
    datum_1_registrace_v_cr?: boolean
    ztp?: boolean
    es_eu?: boolean
    druh_vozidla?: boolean
    druh_vozidla_2_radek?: boolean
    kategorie_vozidla?: boolean
    tovarni_znacka?: boolean
    typ?: boolean
    varianta?: boolean
    verze?: boolean
    vin?: boolean
    obchodni_oznaceni?: boolean
    vyrobce_vozidla?: boolean
    vyrobce_motoru?: boolean
    typ_motoru?: boolean
    max_vykon?: boolean
    max_vykon_otacky?: boolean
    palivo?: boolean
    zdvihovy_objem?: boolean
    plne_elektricke_vozidlo?: boolean
    hybridni_vozidlo?: boolean
    trida_hybridniho_vozidla?: boolean
    emisni_limit?: boolean
    stupe__plneni_emisni_urovne?: boolean
    korigovany_soucinitel_absorpce?: boolean
    co2?: boolean
    co2_mesto?: boolean
    co2_mimo_mesto?: boolean
    specificke_co2?: boolean
    snizeni_emisi_nedc?: boolean
    snizeni_emisi_wltp?: boolean
    spotreba_mesto?: boolean
    spotreba_mimo_mesto?: boolean
    spotreba_kombinovana?: boolean
    spotreba_pri_rychlosti?: boolean
    spotreba_el_mobil?: boolean
    dojezd_zr?: boolean
    vyrobce_karoserie?: boolean
    druh_karoserie?: boolean
    vyrobni_cislo_karoserie?: boolean
    barva?: boolean
    barva_doplnkova?: boolean
    pocet_mist_celkem?: boolean
    pocet_mist_k_sezeni?: boolean
    pocet_mist_k_stani?: boolean
    delka?: boolean
    sirka?: boolean
    vyska?: boolean
    rozvor?: boolean
    rozchod?: boolean
    provozni_hmotnost?: boolean
    nejvetsi_technicky_pripustna_hmotnost?: boolean
    nejvetsi_povolena_hmotnost?: boolean
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: boolean
    nejvetsi_povolena_hmotnost_na_napravu?: boolean
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: boolean
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: boolean
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: boolean
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: boolean
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: boolean
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: boolean
    hmotnosti_vozidla_pri_testu_wltp?: boolean
    predpis_spotreba_paliva?: boolean
    prumerna_hodnota_uzitecneho_zatizeni?: boolean
    spojovaci_zarizeni?: boolean
    pocet_naprav?: boolean
    naprav_pohanenych?: boolean
    kola_a_pneumatiky_naprava_1?: boolean
    kola_a_pneumatiky_naprava_2?: boolean
    kola_a_pneumatiky_naprava_3?: boolean
    kola_a_pneumatiky_naprava_4?: boolean
    vnejsi_hluk_vozidla_stojici?: boolean
    vnejsi_hluk_vozidla_otacky?: boolean
    vnejsi_hluk_vozidla_jizda?: boolean
    nejvyssi_rychlost?: boolean
    pomer_vykon_hmotnost?: boolean
    inovativni_technologie?: boolean
    stupe__dokonceni?: boolean
    faktor_odchylky_de?: boolean
    faktor_verifikace_vf?: boolean
    ucel_vozidla?: boolean
    dalsi_zaznamy?: boolean
    alternativni_provedeni?: boolean
    cislo_tp?: boolean
    cislo_orv?: boolean
    druh_rz?: boolean
    zarazeni_vozidla?: boolean
    status?: boolean
    pcv?: boolean
    abs?: boolean
    airbag?: boolean
    asr?: boolean
    brzdy_nouzova?: boolean
    brzdy_odlehcovaci?: boolean
    brzdy_parkovaci?: boolean
    brzdy_provozni?: boolean
    dopl_kovy_text_na_tp?: boolean
    hmotnosti_provozni_do?: boolean
    hmotnosti_zatizeni_sz?: boolean
    hmotnosti_zatizeni_sz_typ?: boolean
    hydropohon?: boolean
    objem_cisterny?: boolean
    zatizeni_strechy?: boolean
    cislo_motoru?: boolean
    nejvyssi_rychlost_omezeni?: boolean
    ovladani_brzd_sz?: boolean
    ovladani_brzd_sz_druh?: boolean
    retarder?: boolean
    rok_vyroby?: boolean
    delka_do?: boolean
    lozna_delka?: boolean
    lozna_sirka?: boolean
    vyska_do?: boolean
    typ_kod?: boolean
    rm_zaniku?: boolean
  }

  export type registrationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "datum_1_registrace" | "datum_1_registrace_v_cr" | "ztp" | "es_eu" | "druh_vozidla" | "druh_vozidla_2_radek" | "kategorie_vozidla" | "tovarni_znacka" | "typ" | "varianta" | "verze" | "vin" | "obchodni_oznaceni" | "vyrobce_vozidla" | "vyrobce_motoru" | "typ_motoru" | "max_vykon" | "max_vykon_otacky" | "palivo" | "zdvihovy_objem" | "plne_elektricke_vozidlo" | "hybridni_vozidlo" | "trida_hybridniho_vozidla" | "emisni_limit" | "stupe__plneni_emisni_urovne" | "korigovany_soucinitel_absorpce" | "co2" | "co2_mesto" | "co2_mimo_mesto" | "specificke_co2" | "snizeni_emisi_nedc" | "snizeni_emisi_wltp" | "spotreba_mesto" | "spotreba_mimo_mesto" | "spotreba_kombinovana" | "spotreba_pri_rychlosti" | "spotreba_el_mobil" | "dojezd_zr" | "vyrobce_karoserie" | "druh_karoserie" | "vyrobni_cislo_karoserie" | "barva" | "barva_doplnkova" | "pocet_mist_celkem" | "pocet_mist_k_sezeni" | "pocet_mist_k_stani" | "delka" | "sirka" | "vyska" | "rozvor" | "rozchod" | "provozni_hmotnost" | "nejvetsi_technicky_pripustna_hmotnost" | "nejvetsi_povolena_hmotnost" | "nejvetsi_technicky_pripustna_hmotnost_na_napravu" | "nejvetsi_povolena_hmotnost_na_napravu" | "nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden" | "nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho" | "nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz" | "nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho" | "nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy" | "nejvetsi_povolena_hmotnost_jizdni_soupravy" | "hmotnosti_vozidla_pri_testu_wltp" | "predpis_spotreba_paliva" | "prumerna_hodnota_uzitecneho_zatizeni" | "spojovaci_zarizeni" | "pocet_naprav" | "naprav_pohanenych" | "kola_a_pneumatiky_naprava_1" | "kola_a_pneumatiky_naprava_2" | "kola_a_pneumatiky_naprava_3" | "kola_a_pneumatiky_naprava_4" | "vnejsi_hluk_vozidla_stojici" | "vnejsi_hluk_vozidla_otacky" | "vnejsi_hluk_vozidla_jizda" | "nejvyssi_rychlost" | "pomer_vykon_hmotnost" | "inovativni_technologie" | "stupe__dokonceni" | "faktor_odchylky_de" | "faktor_verifikace_vf" | "ucel_vozidla" | "dalsi_zaznamy" | "alternativni_provedeni" | "cislo_tp" | "cislo_orv" | "druh_rz" | "zarazeni_vozidla" | "status" | "pcv" | "abs" | "airbag" | "asr" | "brzdy_nouzova" | "brzdy_odlehcovaci" | "brzdy_parkovaci" | "brzdy_provozni" | "dopl_kovy_text_na_tp" | "hmotnosti_provozni_do" | "hmotnosti_zatizeni_sz" | "hmotnosti_zatizeni_sz_typ" | "hydropohon" | "objem_cisterny" | "zatizeni_strechy" | "cislo_motoru" | "nejvyssi_rychlost_omezeni" | "ovladani_brzd_sz" | "ovladani_brzd_sz_druh" | "retarder" | "rok_vyroby" | "delka_do" | "lozna_delka" | "lozna_sirka" | "vyska_do" | "typ_kod" | "rm_zaniku", ExtArgs["result"]["registrations"]>

  export type $registrationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "registrations"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      datum_1_registrace: Date | null
      datum_1_registrace_v_cr: Date | null
      ztp: string | null
      es_eu: string | null
      druh_vozidla: string | null
      druh_vozidla_2_radek: string | null
      kategorie_vozidla: string | null
      tovarni_znacka: string | null
      typ: string | null
      varianta: string | null
      verze: string | null
      vin: string | null
      obchodni_oznaceni: string | null
      vyrobce_vozidla: string | null
      vyrobce_motoru: string | null
      typ_motoru: string | null
      max_vykon: number | null
      max_vykon_otacky: number | null
      palivo: string | null
      zdvihovy_objem: number | null
      plne_elektricke_vozidlo: boolean | null
      hybridni_vozidlo: boolean | null
      trida_hybridniho_vozidla: string | null
      emisni_limit: string | null
      stupe__plneni_emisni_urovne: string | null
      korigovany_soucinitel_absorpce: number | null
      co2: number | null
      co2_mesto: number | null
      co2_mimo_mesto: number | null
      specificke_co2: number | null
      snizeni_emisi_nedc: number | null
      snizeni_emisi_wltp: number | null
      spotreba_mesto: number | null
      spotreba_mimo_mesto: number | null
      spotreba_kombinovana: number | null
      spotreba_pri_rychlosti: string | null
      spotreba_el_mobil: number | null
      dojezd_zr: number | null
      vyrobce_karoserie: string | null
      druh_karoserie: string | null
      vyrobni_cislo_karoserie: string | null
      barva: string | null
      barva_doplnkova: string | null
      pocet_mist_celkem: number | null
      pocet_mist_k_sezeni: number | null
      pocet_mist_k_stani: number | null
      delka: number | null
      sirka: number | null
      vyska: number | null
      rozvor: number | null
      rozchod: number | null
      provozni_hmotnost: number | null
      nejvetsi_technicky_pripustna_hmotnost: number | null
      nejvetsi_povolena_hmotnost: number | null
      nejvetsi_technicky_pripustna_hmotnost_na_napravu: string | null
      nejvetsi_povolena_hmotnost_na_napravu: string | null
      nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden: number | null
      nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho: number | null
      nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz: number | null
      nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho: number | null
      nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy: number | null
      nejvetsi_povolena_hmotnost_jizdni_soupravy: number | null
      hmotnosti_vozidla_pri_testu_wltp: string | null
      predpis_spotreba_paliva: string | null
      prumerna_hodnota_uzitecneho_zatizeni: string | null
      spojovaci_zarizeni: string | null
      pocet_naprav: number | null
      naprav_pohanenych: string | null
      kola_a_pneumatiky_naprava_1: string | null
      kola_a_pneumatiky_naprava_2: string | null
      kola_a_pneumatiky_naprava_3: string | null
      kola_a_pneumatiky_naprava_4: string | null
      vnejsi_hluk_vozidla_stojici: number | null
      vnejsi_hluk_vozidla_otacky: number | null
      vnejsi_hluk_vozidla_jizda: number | null
      nejvyssi_rychlost: number | null
      pomer_vykon_hmotnost: number | null
      inovativni_technologie: string | null
      stupe__dokonceni: string | null
      faktor_odchylky_de: number | null
      faktor_verifikace_vf: number | null
      ucel_vozidla: string | null
      dalsi_zaznamy: string | null
      alternativni_provedeni: string | null
      cislo_tp: string | null
      cislo_orv: string | null
      druh_rz: string | null
      zarazeni_vozidla: string | null
      status: string | null
      pcv: number | null
      abs: boolean | null
      airbag: string | null
      asr: boolean | null
      brzdy_nouzova: boolean | null
      brzdy_odlehcovaci: boolean | null
      brzdy_parkovaci: boolean | null
      brzdy_provozni: boolean | null
      dopl_kovy_text_na_tp: string | null
      hmotnosti_provozni_do: number | null
      hmotnosti_zatizeni_sz: number | null
      hmotnosti_zatizeni_sz_typ: string | null
      hydropohon: boolean | null
      objem_cisterny: number | null
      zatizeni_strechy: number | null
      cislo_motoru: string | null
      nejvyssi_rychlost_omezeni: number | null
      ovladani_brzd_sz: string | null
      ovladani_brzd_sz_druh: string | null
      retarder: boolean | null
      rok_vyroby: number | null
      delka_do: number | null
      lozna_delka: number | null
      lozna_sirka: number | null
      vyska_do: number | null
      typ_kod: string | null
      rm_zaniku: string | null
    }, ExtArgs["result"]["registrations"]>
    composites: {}
  }

  type registrationsGetPayload<S extends boolean | null | undefined | registrationsDefaultArgs> = $Result.GetResult<Prisma.$registrationsPayload, S>

  type registrationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<registrationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegistrationsCountAggregateInputType | true
    }

  export interface registrationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['registrations'], meta: { name: 'registrations' } }
    /**
     * Find zero or one Registrations that matches the filter.
     * @param {registrationsFindUniqueArgs} args - Arguments to find a Registrations
     * @example
     * // Get one Registrations
     * const registrations = await prisma.registrations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends registrationsFindUniqueArgs>(args: SelectSubset<T, registrationsFindUniqueArgs<ExtArgs>>): Prisma__registrationsClient<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Registrations that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {registrationsFindUniqueOrThrowArgs} args - Arguments to find a Registrations
     * @example
     * // Get one Registrations
     * const registrations = await prisma.registrations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends registrationsFindUniqueOrThrowArgs>(args: SelectSubset<T, registrationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__registrationsClient<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Registrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrationsFindFirstArgs} args - Arguments to find a Registrations
     * @example
     * // Get one Registrations
     * const registrations = await prisma.registrations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends registrationsFindFirstArgs>(args?: SelectSubset<T, registrationsFindFirstArgs<ExtArgs>>): Prisma__registrationsClient<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Registrations that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrationsFindFirstOrThrowArgs} args - Arguments to find a Registrations
     * @example
     * // Get one Registrations
     * const registrations = await prisma.registrations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends registrationsFindFirstOrThrowArgs>(args?: SelectSubset<T, registrationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__registrationsClient<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Registrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Registrations
     * const registrations = await prisma.registrations.findMany()
     * 
     * // Get first 10 Registrations
     * const registrations = await prisma.registrations.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const registrationsWithIdOnly = await prisma.registrations.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends registrationsFindManyArgs>(args?: SelectSubset<T, registrationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Registrations.
     * @param {registrationsCreateArgs} args - Arguments to create a Registrations.
     * @example
     * // Create one Registrations
     * const Registrations = await prisma.registrations.create({
     *   data: {
     *     // ... data to create a Registrations
     *   }
     * })
     * 
     */
    create<T extends registrationsCreateArgs>(args: SelectSubset<T, registrationsCreateArgs<ExtArgs>>): Prisma__registrationsClient<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Registrations.
     * @param {registrationsCreateManyArgs} args - Arguments to create many Registrations.
     * @example
     * // Create many Registrations
     * const registrations = await prisma.registrations.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends registrationsCreateManyArgs>(args?: SelectSubset<T, registrationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Registrations and returns the data saved in the database.
     * @param {registrationsCreateManyAndReturnArgs} args - Arguments to create many Registrations.
     * @example
     * // Create many Registrations
     * const registrations = await prisma.registrations.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Registrations and only return the `id`
     * const registrationsWithIdOnly = await prisma.registrations.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends registrationsCreateManyAndReturnArgs>(args?: SelectSubset<T, registrationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Registrations.
     * @param {registrationsDeleteArgs} args - Arguments to delete one Registrations.
     * @example
     * // Delete one Registrations
     * const Registrations = await prisma.registrations.delete({
     *   where: {
     *     // ... filter to delete one Registrations
     *   }
     * })
     * 
     */
    delete<T extends registrationsDeleteArgs>(args: SelectSubset<T, registrationsDeleteArgs<ExtArgs>>): Prisma__registrationsClient<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Registrations.
     * @param {registrationsUpdateArgs} args - Arguments to update one Registrations.
     * @example
     * // Update one Registrations
     * const registrations = await prisma.registrations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends registrationsUpdateArgs>(args: SelectSubset<T, registrationsUpdateArgs<ExtArgs>>): Prisma__registrationsClient<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Registrations.
     * @param {registrationsDeleteManyArgs} args - Arguments to filter Registrations to delete.
     * @example
     * // Delete a few Registrations
     * const { count } = await prisma.registrations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends registrationsDeleteManyArgs>(args?: SelectSubset<T, registrationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Registrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Registrations
     * const registrations = await prisma.registrations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends registrationsUpdateManyArgs>(args: SelectSubset<T, registrationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Registrations and returns the data updated in the database.
     * @param {registrationsUpdateManyAndReturnArgs} args - Arguments to update many Registrations.
     * @example
     * // Update many Registrations
     * const registrations = await prisma.registrations.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Registrations and only return the `id`
     * const registrationsWithIdOnly = await prisma.registrations.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends registrationsUpdateManyAndReturnArgs>(args: SelectSubset<T, registrationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Registrations.
     * @param {registrationsUpsertArgs} args - Arguments to update or create a Registrations.
     * @example
     * // Update or create a Registrations
     * const registrations = await prisma.registrations.upsert({
     *   create: {
     *     // ... data to create a Registrations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Registrations we want to update
     *   }
     * })
     */
    upsert<T extends registrationsUpsertArgs>(args: SelectSubset<T, registrationsUpsertArgs<ExtArgs>>): Prisma__registrationsClient<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Registrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrationsCountArgs} args - Arguments to filter Registrations to count.
     * @example
     * // Count the number of Registrations
     * const count = await prisma.registrations.count({
     *   where: {
     *     // ... the filter for the Registrations we want to count
     *   }
     * })
    **/
    count<T extends registrationsCountArgs>(
      args?: Subset<T, registrationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegistrationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Registrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegistrationsAggregateArgs>(args: Subset<T, RegistrationsAggregateArgs>): Prisma.PrismaPromise<GetRegistrationsAggregateType<T>>

    /**
     * Group by Registrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends registrationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: registrationsGroupByArgs['orderBy'] }
        : { orderBy?: registrationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, registrationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegistrationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the registrations model
   */
  readonly fields: registrationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for registrations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__registrationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the registrations model
   */ 
  interface registrationsFieldRefs {
    readonly id: FieldRef<"registrations", 'Int'>
    readonly datum_1_registrace: FieldRef<"registrations", 'DateTime'>
    readonly datum_1_registrace_v_cr: FieldRef<"registrations", 'DateTime'>
    readonly ztp: FieldRef<"registrations", 'String'>
    readonly es_eu: FieldRef<"registrations", 'String'>
    readonly druh_vozidla: FieldRef<"registrations", 'String'>
    readonly druh_vozidla_2_radek: FieldRef<"registrations", 'String'>
    readonly kategorie_vozidla: FieldRef<"registrations", 'String'>
    readonly tovarni_znacka: FieldRef<"registrations", 'String'>
    readonly typ: FieldRef<"registrations", 'String'>
    readonly varianta: FieldRef<"registrations", 'String'>
    readonly verze: FieldRef<"registrations", 'String'>
    readonly vin: FieldRef<"registrations", 'String'>
    readonly obchodni_oznaceni: FieldRef<"registrations", 'String'>
    readonly vyrobce_vozidla: FieldRef<"registrations", 'String'>
    readonly vyrobce_motoru: FieldRef<"registrations", 'String'>
    readonly typ_motoru: FieldRef<"registrations", 'String'>
    readonly max_vykon: FieldRef<"registrations", 'Float'>
    readonly max_vykon_otacky: FieldRef<"registrations", 'Float'>
    readonly palivo: FieldRef<"registrations", 'String'>
    readonly zdvihovy_objem: FieldRef<"registrations", 'Float'>
    readonly plne_elektricke_vozidlo: FieldRef<"registrations", 'Boolean'>
    readonly hybridni_vozidlo: FieldRef<"registrations", 'Boolean'>
    readonly trida_hybridniho_vozidla: FieldRef<"registrations", 'String'>
    readonly emisni_limit: FieldRef<"registrations", 'String'>
    readonly stupe__plneni_emisni_urovne: FieldRef<"registrations", 'String'>
    readonly korigovany_soucinitel_absorpce: FieldRef<"registrations", 'Float'>
    readonly co2: FieldRef<"registrations", 'Float'>
    readonly co2_mesto: FieldRef<"registrations", 'Float'>
    readonly co2_mimo_mesto: FieldRef<"registrations", 'Float'>
    readonly specificke_co2: FieldRef<"registrations", 'Float'>
    readonly snizeni_emisi_nedc: FieldRef<"registrations", 'Float'>
    readonly snizeni_emisi_wltp: FieldRef<"registrations", 'Float'>
    readonly spotreba_mesto: FieldRef<"registrations", 'Float'>
    readonly spotreba_mimo_mesto: FieldRef<"registrations", 'Float'>
    readonly spotreba_kombinovana: FieldRef<"registrations", 'Float'>
    readonly spotreba_pri_rychlosti: FieldRef<"registrations", 'String'>
    readonly spotreba_el_mobil: FieldRef<"registrations", 'Int'>
    readonly dojezd_zr: FieldRef<"registrations", 'Int'>
    readonly vyrobce_karoserie: FieldRef<"registrations", 'String'>
    readonly druh_karoserie: FieldRef<"registrations", 'String'>
    readonly vyrobni_cislo_karoserie: FieldRef<"registrations", 'String'>
    readonly barva: FieldRef<"registrations", 'String'>
    readonly barva_doplnkova: FieldRef<"registrations", 'String'>
    readonly pocet_mist_celkem: FieldRef<"registrations", 'Int'>
    readonly pocet_mist_k_sezeni: FieldRef<"registrations", 'Int'>
    readonly pocet_mist_k_stani: FieldRef<"registrations", 'Int'>
    readonly delka: FieldRef<"registrations", 'Int'>
    readonly sirka: FieldRef<"registrations", 'Int'>
    readonly vyska: FieldRef<"registrations", 'Int'>
    readonly rozvor: FieldRef<"registrations", 'Int'>
    readonly rozchod: FieldRef<"registrations", 'Int'>
    readonly provozni_hmotnost: FieldRef<"registrations", 'Int'>
    readonly nejvetsi_technicky_pripustna_hmotnost: FieldRef<"registrations", 'Int'>
    readonly nejvetsi_povolena_hmotnost: FieldRef<"registrations", 'Int'>
    readonly nejvetsi_technicky_pripustna_hmotnost_na_napravu: FieldRef<"registrations", 'String'>
    readonly nejvetsi_povolena_hmotnost_na_napravu: FieldRef<"registrations", 'String'>
    readonly nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden: FieldRef<"registrations", 'Int'>
    readonly nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho: FieldRef<"registrations", 'Int'>
    readonly nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz: FieldRef<"registrations", 'Int'>
    readonly nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho: FieldRef<"registrations", 'Int'>
    readonly nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy: FieldRef<"registrations", 'Int'>
    readonly nejvetsi_povolena_hmotnost_jizdni_soupravy: FieldRef<"registrations", 'Int'>
    readonly hmotnosti_vozidla_pri_testu_wltp: FieldRef<"registrations", 'String'>
    readonly predpis_spotreba_paliva: FieldRef<"registrations", 'String'>
    readonly prumerna_hodnota_uzitecneho_zatizeni: FieldRef<"registrations", 'String'>
    readonly spojovaci_zarizeni: FieldRef<"registrations", 'String'>
    readonly pocet_naprav: FieldRef<"registrations", 'Int'>
    readonly naprav_pohanenych: FieldRef<"registrations", 'String'>
    readonly kola_a_pneumatiky_naprava_1: FieldRef<"registrations", 'String'>
    readonly kola_a_pneumatiky_naprava_2: FieldRef<"registrations", 'String'>
    readonly kola_a_pneumatiky_naprava_3: FieldRef<"registrations", 'String'>
    readonly kola_a_pneumatiky_naprava_4: FieldRef<"registrations", 'String'>
    readonly vnejsi_hluk_vozidla_stojici: FieldRef<"registrations", 'Float'>
    readonly vnejsi_hluk_vozidla_otacky: FieldRef<"registrations", 'Float'>
    readonly vnejsi_hluk_vozidla_jizda: FieldRef<"registrations", 'Float'>
    readonly nejvyssi_rychlost: FieldRef<"registrations", 'Float'>
    readonly pomer_vykon_hmotnost: FieldRef<"registrations", 'Float'>
    readonly inovativni_technologie: FieldRef<"registrations", 'String'>
    readonly stupe__dokonceni: FieldRef<"registrations", 'String'>
    readonly faktor_odchylky_de: FieldRef<"registrations", 'Float'>
    readonly faktor_verifikace_vf: FieldRef<"registrations", 'Int'>
    readonly ucel_vozidla: FieldRef<"registrations", 'String'>
    readonly dalsi_zaznamy: FieldRef<"registrations", 'String'>
    readonly alternativni_provedeni: FieldRef<"registrations", 'String'>
    readonly cislo_tp: FieldRef<"registrations", 'String'>
    readonly cislo_orv: FieldRef<"registrations", 'String'>
    readonly druh_rz: FieldRef<"registrations", 'String'>
    readonly zarazeni_vozidla: FieldRef<"registrations", 'String'>
    readonly status: FieldRef<"registrations", 'String'>
    readonly pcv: FieldRef<"registrations", 'Int'>
    readonly abs: FieldRef<"registrations", 'Boolean'>
    readonly airbag: FieldRef<"registrations", 'String'>
    readonly asr: FieldRef<"registrations", 'Boolean'>
    readonly brzdy_nouzova: FieldRef<"registrations", 'Boolean'>
    readonly brzdy_odlehcovaci: FieldRef<"registrations", 'Boolean'>
    readonly brzdy_parkovaci: FieldRef<"registrations", 'Boolean'>
    readonly brzdy_provozni: FieldRef<"registrations", 'Boolean'>
    readonly dopl_kovy_text_na_tp: FieldRef<"registrations", 'String'>
    readonly hmotnosti_provozni_do: FieldRef<"registrations", 'Int'>
    readonly hmotnosti_zatizeni_sz: FieldRef<"registrations", 'Int'>
    readonly hmotnosti_zatizeni_sz_typ: FieldRef<"registrations", 'String'>
    readonly hydropohon: FieldRef<"registrations", 'Boolean'>
    readonly objem_cisterny: FieldRef<"registrations", 'Float'>
    readonly zatizeni_strechy: FieldRef<"registrations", 'Int'>
    readonly cislo_motoru: FieldRef<"registrations", 'String'>
    readonly nejvyssi_rychlost_omezeni: FieldRef<"registrations", 'Int'>
    readonly ovladani_brzd_sz: FieldRef<"registrations", 'String'>
    readonly ovladani_brzd_sz_druh: FieldRef<"registrations", 'String'>
    readonly retarder: FieldRef<"registrations", 'Boolean'>
    readonly rok_vyroby: FieldRef<"registrations", 'Int'>
    readonly delka_do: FieldRef<"registrations", 'Int'>
    readonly lozna_delka: FieldRef<"registrations", 'Int'>
    readonly lozna_sirka: FieldRef<"registrations", 'Int'>
    readonly vyska_do: FieldRef<"registrations", 'Int'>
    readonly typ_kod: FieldRef<"registrations", 'String'>
    readonly rm_zaniku: FieldRef<"registrations", 'String'>
  }
    

  // Custom InputTypes
  /**
   * registrations findUnique
   */
  export type registrationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Filter, which registrations to fetch.
     */
    where: registrationsWhereUniqueInput
  }

  /**
   * registrations findUniqueOrThrow
   */
  export type registrationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Filter, which registrations to fetch.
     */
    where: registrationsWhereUniqueInput
  }

  /**
   * registrations findFirst
   */
  export type registrationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Filter, which registrations to fetch.
     */
    where?: registrationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of registrations to fetch.
     */
    orderBy?: registrationsOrderByWithRelationInput | registrationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for registrations.
     */
    cursor?: registrationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of registrations.
     */
    distinct?: RegistrationsScalarFieldEnum | RegistrationsScalarFieldEnum[]
  }

  /**
   * registrations findFirstOrThrow
   */
  export type registrationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Filter, which registrations to fetch.
     */
    where?: registrationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of registrations to fetch.
     */
    orderBy?: registrationsOrderByWithRelationInput | registrationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for registrations.
     */
    cursor?: registrationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of registrations.
     */
    distinct?: RegistrationsScalarFieldEnum | RegistrationsScalarFieldEnum[]
  }

  /**
   * registrations findMany
   */
  export type registrationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Filter, which registrations to fetch.
     */
    where?: registrationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of registrations to fetch.
     */
    orderBy?: registrationsOrderByWithRelationInput | registrationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing registrations.
     */
    cursor?: registrationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` registrations.
     */
    skip?: number
    distinct?: RegistrationsScalarFieldEnum | RegistrationsScalarFieldEnum[]
  }

  /**
   * registrations create
   */
  export type registrationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * The data needed to create a registrations.
     */
    data?: XOR<registrationsCreateInput, registrationsUncheckedCreateInput>
  }

  /**
   * registrations createMany
   */
  export type registrationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many registrations.
     */
    data: registrationsCreateManyInput | registrationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * registrations createManyAndReturn
   */
  export type registrationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * The data used to create many registrations.
     */
    data: registrationsCreateManyInput | registrationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * registrations update
   */
  export type registrationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * The data needed to update a registrations.
     */
    data: XOR<registrationsUpdateInput, registrationsUncheckedUpdateInput>
    /**
     * Choose, which registrations to update.
     */
    where: registrationsWhereUniqueInput
  }

  /**
   * registrations updateMany
   */
  export type registrationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update registrations.
     */
    data: XOR<registrationsUpdateManyMutationInput, registrationsUncheckedUpdateManyInput>
    /**
     * Filter which registrations to update
     */
    where?: registrationsWhereInput
    /**
     * Limit how many registrations to update.
     */
    limit?: number
  }

  /**
   * registrations updateManyAndReturn
   */
  export type registrationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * The data used to update registrations.
     */
    data: XOR<registrationsUpdateManyMutationInput, registrationsUncheckedUpdateManyInput>
    /**
     * Filter which registrations to update
     */
    where?: registrationsWhereInput
    /**
     * Limit how many registrations to update.
     */
    limit?: number
  }

  /**
   * registrations upsert
   */
  export type registrationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * The filter to search for the registrations to update in case it exists.
     */
    where: registrationsWhereUniqueInput
    /**
     * In case the registrations found by the `where` argument doesn't exist, create a new registrations with this data.
     */
    create: XOR<registrationsCreateInput, registrationsUncheckedCreateInput>
    /**
     * In case the registrations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<registrationsUpdateInput, registrationsUncheckedUpdateInput>
  }

  /**
   * registrations delete
   */
  export type registrationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Filter which registrations to delete.
     */
    where: registrationsWhereUniqueInput
  }

  /**
   * registrations deleteMany
   */
  export type registrationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which registrations to delete
     */
    where?: registrationsWhereInput
    /**
     * Limit how many registrations to delete.
     */
    limit?: number
  }

  /**
   * registrations without action
   */
  export type registrationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RegistrationsScalarFieldEnum: {
    id: 'id',
    datum_1_registrace: 'datum_1_registrace',
    datum_1_registrace_v_cr: 'datum_1_registrace_v_cr',
    ztp: 'ztp',
    es_eu: 'es_eu',
    druh_vozidla: 'druh_vozidla',
    druh_vozidla_2_radek: 'druh_vozidla_2_radek',
    kategorie_vozidla: 'kategorie_vozidla',
    tovarni_znacka: 'tovarni_znacka',
    typ: 'typ',
    varianta: 'varianta',
    verze: 'verze',
    vin: 'vin',
    obchodni_oznaceni: 'obchodni_oznaceni',
    vyrobce_vozidla: 'vyrobce_vozidla',
    vyrobce_motoru: 'vyrobce_motoru',
    typ_motoru: 'typ_motoru',
    max_vykon: 'max_vykon',
    max_vykon_otacky: 'max_vykon_otacky',
    palivo: 'palivo',
    zdvihovy_objem: 'zdvihovy_objem',
    plne_elektricke_vozidlo: 'plne_elektricke_vozidlo',
    hybridni_vozidlo: 'hybridni_vozidlo',
    trida_hybridniho_vozidla: 'trida_hybridniho_vozidla',
    emisni_limit: 'emisni_limit',
    stupe__plneni_emisni_urovne: 'stupe__plneni_emisni_urovne',
    korigovany_soucinitel_absorpce: 'korigovany_soucinitel_absorpce',
    co2: 'co2',
    co2_mesto: 'co2_mesto',
    co2_mimo_mesto: 'co2_mimo_mesto',
    specificke_co2: 'specificke_co2',
    snizeni_emisi_nedc: 'snizeni_emisi_nedc',
    snizeni_emisi_wltp: 'snizeni_emisi_wltp',
    spotreba_mesto: 'spotreba_mesto',
    spotreba_mimo_mesto: 'spotreba_mimo_mesto',
    spotreba_kombinovana: 'spotreba_kombinovana',
    spotreba_pri_rychlosti: 'spotreba_pri_rychlosti',
    spotreba_el_mobil: 'spotreba_el_mobil',
    dojezd_zr: 'dojezd_zr',
    vyrobce_karoserie: 'vyrobce_karoserie',
    druh_karoserie: 'druh_karoserie',
    vyrobni_cislo_karoserie: 'vyrobni_cislo_karoserie',
    barva: 'barva',
    barva_doplnkova: 'barva_doplnkova',
    pocet_mist_celkem: 'pocet_mist_celkem',
    pocet_mist_k_sezeni: 'pocet_mist_k_sezeni',
    pocet_mist_k_stani: 'pocet_mist_k_stani',
    delka: 'delka',
    sirka: 'sirka',
    vyska: 'vyska',
    rozvor: 'rozvor',
    rozchod: 'rozchod',
    provozni_hmotnost: 'provozni_hmotnost',
    nejvetsi_technicky_pripustna_hmotnost: 'nejvetsi_technicky_pripustna_hmotnost',
    nejvetsi_povolena_hmotnost: 'nejvetsi_povolena_hmotnost',
    nejvetsi_technicky_pripustna_hmotnost_na_napravu: 'nejvetsi_technicky_pripustna_hmotnost_na_napravu',
    nejvetsi_povolena_hmotnost_na_napravu: 'nejvetsi_povolena_hmotnost_na_napravu',
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden: 'nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden',
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho: 'nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho',
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz: 'nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz',
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho: 'nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho',
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy: 'nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy',
    nejvetsi_povolena_hmotnost_jizdni_soupravy: 'nejvetsi_povolena_hmotnost_jizdni_soupravy',
    hmotnosti_vozidla_pri_testu_wltp: 'hmotnosti_vozidla_pri_testu_wltp',
    predpis_spotreba_paliva: 'predpis_spotreba_paliva',
    prumerna_hodnota_uzitecneho_zatizeni: 'prumerna_hodnota_uzitecneho_zatizeni',
    spojovaci_zarizeni: 'spojovaci_zarizeni',
    pocet_naprav: 'pocet_naprav',
    naprav_pohanenych: 'naprav_pohanenych',
    kola_a_pneumatiky_naprava_1: 'kola_a_pneumatiky_naprava_1',
    kola_a_pneumatiky_naprava_2: 'kola_a_pneumatiky_naprava_2',
    kola_a_pneumatiky_naprava_3: 'kola_a_pneumatiky_naprava_3',
    kola_a_pneumatiky_naprava_4: 'kola_a_pneumatiky_naprava_4',
    vnejsi_hluk_vozidla_stojici: 'vnejsi_hluk_vozidla_stojici',
    vnejsi_hluk_vozidla_otacky: 'vnejsi_hluk_vozidla_otacky',
    vnejsi_hluk_vozidla_jizda: 'vnejsi_hluk_vozidla_jizda',
    nejvyssi_rychlost: 'nejvyssi_rychlost',
    pomer_vykon_hmotnost: 'pomer_vykon_hmotnost',
    inovativni_technologie: 'inovativni_technologie',
    stupe__dokonceni: 'stupe__dokonceni',
    faktor_odchylky_de: 'faktor_odchylky_de',
    faktor_verifikace_vf: 'faktor_verifikace_vf',
    ucel_vozidla: 'ucel_vozidla',
    dalsi_zaznamy: 'dalsi_zaznamy',
    alternativni_provedeni: 'alternativni_provedeni',
    cislo_tp: 'cislo_tp',
    cislo_orv: 'cislo_orv',
    druh_rz: 'druh_rz',
    zarazeni_vozidla: 'zarazeni_vozidla',
    status: 'status',
    pcv: 'pcv',
    abs: 'abs',
    airbag: 'airbag',
    asr: 'asr',
    brzdy_nouzova: 'brzdy_nouzova',
    brzdy_odlehcovaci: 'brzdy_odlehcovaci',
    brzdy_parkovaci: 'brzdy_parkovaci',
    brzdy_provozni: 'brzdy_provozni',
    dopl_kovy_text_na_tp: 'dopl_kovy_text_na_tp',
    hmotnosti_provozni_do: 'hmotnosti_provozni_do',
    hmotnosti_zatizeni_sz: 'hmotnosti_zatizeni_sz',
    hmotnosti_zatizeni_sz_typ: 'hmotnosti_zatizeni_sz_typ',
    hydropohon: 'hydropohon',
    objem_cisterny: 'objem_cisterny',
    zatizeni_strechy: 'zatizeni_strechy',
    cislo_motoru: 'cislo_motoru',
    nejvyssi_rychlost_omezeni: 'nejvyssi_rychlost_omezeni',
    ovladani_brzd_sz: 'ovladani_brzd_sz',
    ovladani_brzd_sz_druh: 'ovladani_brzd_sz_druh',
    retarder: 'retarder',
    rok_vyroby: 'rok_vyroby',
    delka_do: 'delka_do',
    lozna_delka: 'lozna_delka',
    lozna_sirka: 'lozna_sirka',
    vyska_do: 'vyska_do',
    typ_kod: 'typ_kod',
    rm_zaniku: 'rm_zaniku'
  };

  export type RegistrationsScalarFieldEnum = (typeof RegistrationsScalarFieldEnum)[keyof typeof RegistrationsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type registrationsWhereInput = {
    AND?: registrationsWhereInput | registrationsWhereInput[]
    OR?: registrationsWhereInput[]
    NOT?: registrationsWhereInput | registrationsWhereInput[]
    id?: IntFilter<"registrations"> | number
    datum_1_registrace?: DateTimeNullableFilter<"registrations"> | Date | string | null
    datum_1_registrace_v_cr?: DateTimeNullableFilter<"registrations"> | Date | string | null
    ztp?: StringNullableFilter<"registrations"> | string | null
    es_eu?: StringNullableFilter<"registrations"> | string | null
    druh_vozidla?: StringNullableFilter<"registrations"> | string | null
    druh_vozidla_2_radek?: StringNullableFilter<"registrations"> | string | null
    kategorie_vozidla?: StringNullableFilter<"registrations"> | string | null
    tovarni_znacka?: StringNullableFilter<"registrations"> | string | null
    typ?: StringNullableFilter<"registrations"> | string | null
    varianta?: StringNullableFilter<"registrations"> | string | null
    verze?: StringNullableFilter<"registrations"> | string | null
    vin?: StringNullableFilter<"registrations"> | string | null
    obchodni_oznaceni?: StringNullableFilter<"registrations"> | string | null
    vyrobce_vozidla?: StringNullableFilter<"registrations"> | string | null
    vyrobce_motoru?: StringNullableFilter<"registrations"> | string | null
    typ_motoru?: StringNullableFilter<"registrations"> | string | null
    max_vykon?: FloatNullableFilter<"registrations"> | number | null
    max_vykon_otacky?: FloatNullableFilter<"registrations"> | number | null
    palivo?: StringNullableFilter<"registrations"> | string | null
    zdvihovy_objem?: FloatNullableFilter<"registrations"> | number | null
    plne_elektricke_vozidlo?: BoolNullableFilter<"registrations"> | boolean | null
    hybridni_vozidlo?: BoolNullableFilter<"registrations"> | boolean | null
    trida_hybridniho_vozidla?: StringNullableFilter<"registrations"> | string | null
    emisni_limit?: StringNullableFilter<"registrations"> | string | null
    stupe__plneni_emisni_urovne?: StringNullableFilter<"registrations"> | string | null
    korigovany_soucinitel_absorpce?: FloatNullableFilter<"registrations"> | number | null
    co2?: FloatNullableFilter<"registrations"> | number | null
    co2_mesto?: FloatNullableFilter<"registrations"> | number | null
    co2_mimo_mesto?: FloatNullableFilter<"registrations"> | number | null
    specificke_co2?: FloatNullableFilter<"registrations"> | number | null
    snizeni_emisi_nedc?: FloatNullableFilter<"registrations"> | number | null
    snizeni_emisi_wltp?: FloatNullableFilter<"registrations"> | number | null
    spotreba_mesto?: FloatNullableFilter<"registrations"> | number | null
    spotreba_mimo_mesto?: FloatNullableFilter<"registrations"> | number | null
    spotreba_kombinovana?: FloatNullableFilter<"registrations"> | number | null
    spotreba_pri_rychlosti?: StringNullableFilter<"registrations"> | string | null
    spotreba_el_mobil?: IntNullableFilter<"registrations"> | number | null
    dojezd_zr?: IntNullableFilter<"registrations"> | number | null
    vyrobce_karoserie?: StringNullableFilter<"registrations"> | string | null
    druh_karoserie?: StringNullableFilter<"registrations"> | string | null
    vyrobni_cislo_karoserie?: StringNullableFilter<"registrations"> | string | null
    barva?: StringNullableFilter<"registrations"> | string | null
    barva_doplnkova?: StringNullableFilter<"registrations"> | string | null
    pocet_mist_celkem?: IntNullableFilter<"registrations"> | number | null
    pocet_mist_k_sezeni?: IntNullableFilter<"registrations"> | number | null
    pocet_mist_k_stani?: IntNullableFilter<"registrations"> | number | null
    delka?: IntNullableFilter<"registrations"> | number | null
    sirka?: IntNullableFilter<"registrations"> | number | null
    vyska?: IntNullableFilter<"registrations"> | number | null
    rozvor?: IntNullableFilter<"registrations"> | number | null
    rozchod?: IntNullableFilter<"registrations"> | number | null
    provozni_hmotnost?: IntNullableFilter<"registrations"> | number | null
    nejvetsi_technicky_pripustna_hmotnost?: IntNullableFilter<"registrations"> | number | null
    nejvetsi_povolena_hmotnost?: IntNullableFilter<"registrations"> | number | null
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: StringNullableFilter<"registrations"> | string | null
    nejvetsi_povolena_hmotnost_na_napravu?: StringNullableFilter<"registrations"> | string | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: IntNullableFilter<"registrations"> | number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: IntNullableFilter<"registrations"> | number | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: IntNullableFilter<"registrations"> | number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: IntNullableFilter<"registrations"> | number | null
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: IntNullableFilter<"registrations"> | number | null
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: IntNullableFilter<"registrations"> | number | null
    hmotnosti_vozidla_pri_testu_wltp?: StringNullableFilter<"registrations"> | string | null
    predpis_spotreba_paliva?: StringNullableFilter<"registrations"> | string | null
    prumerna_hodnota_uzitecneho_zatizeni?: StringNullableFilter<"registrations"> | string | null
    spojovaci_zarizeni?: StringNullableFilter<"registrations"> | string | null
    pocet_naprav?: IntNullableFilter<"registrations"> | number | null
    naprav_pohanenych?: StringNullableFilter<"registrations"> | string | null
    kola_a_pneumatiky_naprava_1?: StringNullableFilter<"registrations"> | string | null
    kola_a_pneumatiky_naprava_2?: StringNullableFilter<"registrations"> | string | null
    kola_a_pneumatiky_naprava_3?: StringNullableFilter<"registrations"> | string | null
    kola_a_pneumatiky_naprava_4?: StringNullableFilter<"registrations"> | string | null
    vnejsi_hluk_vozidla_stojici?: FloatNullableFilter<"registrations"> | number | null
    vnejsi_hluk_vozidla_otacky?: FloatNullableFilter<"registrations"> | number | null
    vnejsi_hluk_vozidla_jizda?: FloatNullableFilter<"registrations"> | number | null
    nejvyssi_rychlost?: FloatNullableFilter<"registrations"> | number | null
    pomer_vykon_hmotnost?: FloatNullableFilter<"registrations"> | number | null
    inovativni_technologie?: StringNullableFilter<"registrations"> | string | null
    stupe__dokonceni?: StringNullableFilter<"registrations"> | string | null
    faktor_odchylky_de?: FloatNullableFilter<"registrations"> | number | null
    faktor_verifikace_vf?: IntNullableFilter<"registrations"> | number | null
    ucel_vozidla?: StringNullableFilter<"registrations"> | string | null
    dalsi_zaznamy?: StringNullableFilter<"registrations"> | string | null
    alternativni_provedeni?: StringNullableFilter<"registrations"> | string | null
    cislo_tp?: StringNullableFilter<"registrations"> | string | null
    cislo_orv?: StringNullableFilter<"registrations"> | string | null
    druh_rz?: StringNullableFilter<"registrations"> | string | null
    zarazeni_vozidla?: StringNullableFilter<"registrations"> | string | null
    status?: StringNullableFilter<"registrations"> | string | null
    pcv?: IntNullableFilter<"registrations"> | number | null
    abs?: BoolNullableFilter<"registrations"> | boolean | null
    airbag?: StringNullableFilter<"registrations"> | string | null
    asr?: BoolNullableFilter<"registrations"> | boolean | null
    brzdy_nouzova?: BoolNullableFilter<"registrations"> | boolean | null
    brzdy_odlehcovaci?: BoolNullableFilter<"registrations"> | boolean | null
    brzdy_parkovaci?: BoolNullableFilter<"registrations"> | boolean | null
    brzdy_provozni?: BoolNullableFilter<"registrations"> | boolean | null
    dopl_kovy_text_na_tp?: StringNullableFilter<"registrations"> | string | null
    hmotnosti_provozni_do?: IntNullableFilter<"registrations"> | number | null
    hmotnosti_zatizeni_sz?: IntNullableFilter<"registrations"> | number | null
    hmotnosti_zatizeni_sz_typ?: StringNullableFilter<"registrations"> | string | null
    hydropohon?: BoolNullableFilter<"registrations"> | boolean | null
    objem_cisterny?: FloatNullableFilter<"registrations"> | number | null
    zatizeni_strechy?: IntNullableFilter<"registrations"> | number | null
    cislo_motoru?: StringNullableFilter<"registrations"> | string | null
    nejvyssi_rychlost_omezeni?: IntNullableFilter<"registrations"> | number | null
    ovladani_brzd_sz?: StringNullableFilter<"registrations"> | string | null
    ovladani_brzd_sz_druh?: StringNullableFilter<"registrations"> | string | null
    retarder?: BoolNullableFilter<"registrations"> | boolean | null
    rok_vyroby?: IntNullableFilter<"registrations"> | number | null
    delka_do?: IntNullableFilter<"registrations"> | number | null
    lozna_delka?: IntNullableFilter<"registrations"> | number | null
    lozna_sirka?: IntNullableFilter<"registrations"> | number | null
    vyska_do?: IntNullableFilter<"registrations"> | number | null
    typ_kod?: StringNullableFilter<"registrations"> | string | null
    rm_zaniku?: StringNullableFilter<"registrations"> | string | null
  }

  export type registrationsOrderByWithRelationInput = {
    id?: SortOrder
    datum_1_registrace?: SortOrderInput | SortOrder
    datum_1_registrace_v_cr?: SortOrderInput | SortOrder
    ztp?: SortOrderInput | SortOrder
    es_eu?: SortOrderInput | SortOrder
    druh_vozidla?: SortOrderInput | SortOrder
    druh_vozidla_2_radek?: SortOrderInput | SortOrder
    kategorie_vozidla?: SortOrderInput | SortOrder
    tovarni_znacka?: SortOrderInput | SortOrder
    typ?: SortOrderInput | SortOrder
    varianta?: SortOrderInput | SortOrder
    verze?: SortOrderInput | SortOrder
    vin?: SortOrderInput | SortOrder
    obchodni_oznaceni?: SortOrderInput | SortOrder
    vyrobce_vozidla?: SortOrderInput | SortOrder
    vyrobce_motoru?: SortOrderInput | SortOrder
    typ_motoru?: SortOrderInput | SortOrder
    max_vykon?: SortOrderInput | SortOrder
    max_vykon_otacky?: SortOrderInput | SortOrder
    palivo?: SortOrderInput | SortOrder
    zdvihovy_objem?: SortOrderInput | SortOrder
    plne_elektricke_vozidlo?: SortOrderInput | SortOrder
    hybridni_vozidlo?: SortOrderInput | SortOrder
    trida_hybridniho_vozidla?: SortOrderInput | SortOrder
    emisni_limit?: SortOrderInput | SortOrder
    stupe__plneni_emisni_urovne?: SortOrderInput | SortOrder
    korigovany_soucinitel_absorpce?: SortOrderInput | SortOrder
    co2?: SortOrderInput | SortOrder
    co2_mesto?: SortOrderInput | SortOrder
    co2_mimo_mesto?: SortOrderInput | SortOrder
    specificke_co2?: SortOrderInput | SortOrder
    snizeni_emisi_nedc?: SortOrderInput | SortOrder
    snizeni_emisi_wltp?: SortOrderInput | SortOrder
    spotreba_mesto?: SortOrderInput | SortOrder
    spotreba_mimo_mesto?: SortOrderInput | SortOrder
    spotreba_kombinovana?: SortOrderInput | SortOrder
    spotreba_pri_rychlosti?: SortOrderInput | SortOrder
    spotreba_el_mobil?: SortOrderInput | SortOrder
    dojezd_zr?: SortOrderInput | SortOrder
    vyrobce_karoserie?: SortOrderInput | SortOrder
    druh_karoserie?: SortOrderInput | SortOrder
    vyrobni_cislo_karoserie?: SortOrderInput | SortOrder
    barva?: SortOrderInput | SortOrder
    barva_doplnkova?: SortOrderInput | SortOrder
    pocet_mist_celkem?: SortOrderInput | SortOrder
    pocet_mist_k_sezeni?: SortOrderInput | SortOrder
    pocet_mist_k_stani?: SortOrderInput | SortOrder
    delka?: SortOrderInput | SortOrder
    sirka?: SortOrderInput | SortOrder
    vyska?: SortOrderInput | SortOrder
    rozvor?: SortOrderInput | SortOrder
    rozchod?: SortOrderInput | SortOrder
    provozni_hmotnost?: SortOrderInput | SortOrder
    nejvetsi_technicky_pripustna_hmotnost?: SortOrderInput | SortOrder
    nejvetsi_povolena_hmotnost?: SortOrderInput | SortOrder
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: SortOrderInput | SortOrder
    nejvetsi_povolena_hmotnost_na_napravu?: SortOrderInput | SortOrder
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: SortOrderInput | SortOrder
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: SortOrderInput | SortOrder
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: SortOrderInput | SortOrder
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: SortOrderInput | SortOrder
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: SortOrderInput | SortOrder
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: SortOrderInput | SortOrder
    hmotnosti_vozidla_pri_testu_wltp?: SortOrderInput | SortOrder
    predpis_spotreba_paliva?: SortOrderInput | SortOrder
    prumerna_hodnota_uzitecneho_zatizeni?: SortOrderInput | SortOrder
    spojovaci_zarizeni?: SortOrderInput | SortOrder
    pocet_naprav?: SortOrderInput | SortOrder
    naprav_pohanenych?: SortOrderInput | SortOrder
    kola_a_pneumatiky_naprava_1?: SortOrderInput | SortOrder
    kola_a_pneumatiky_naprava_2?: SortOrderInput | SortOrder
    kola_a_pneumatiky_naprava_3?: SortOrderInput | SortOrder
    kola_a_pneumatiky_naprava_4?: SortOrderInput | SortOrder
    vnejsi_hluk_vozidla_stojici?: SortOrderInput | SortOrder
    vnejsi_hluk_vozidla_otacky?: SortOrderInput | SortOrder
    vnejsi_hluk_vozidla_jizda?: SortOrderInput | SortOrder
    nejvyssi_rychlost?: SortOrderInput | SortOrder
    pomer_vykon_hmotnost?: SortOrderInput | SortOrder
    inovativni_technologie?: SortOrderInput | SortOrder
    stupe__dokonceni?: SortOrderInput | SortOrder
    faktor_odchylky_de?: SortOrderInput | SortOrder
    faktor_verifikace_vf?: SortOrderInput | SortOrder
    ucel_vozidla?: SortOrderInput | SortOrder
    dalsi_zaznamy?: SortOrderInput | SortOrder
    alternativni_provedeni?: SortOrderInput | SortOrder
    cislo_tp?: SortOrderInput | SortOrder
    cislo_orv?: SortOrderInput | SortOrder
    druh_rz?: SortOrderInput | SortOrder
    zarazeni_vozidla?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    pcv?: SortOrderInput | SortOrder
    abs?: SortOrderInput | SortOrder
    airbag?: SortOrderInput | SortOrder
    asr?: SortOrderInput | SortOrder
    brzdy_nouzova?: SortOrderInput | SortOrder
    brzdy_odlehcovaci?: SortOrderInput | SortOrder
    brzdy_parkovaci?: SortOrderInput | SortOrder
    brzdy_provozni?: SortOrderInput | SortOrder
    dopl_kovy_text_na_tp?: SortOrderInput | SortOrder
    hmotnosti_provozni_do?: SortOrderInput | SortOrder
    hmotnosti_zatizeni_sz?: SortOrderInput | SortOrder
    hmotnosti_zatizeni_sz_typ?: SortOrderInput | SortOrder
    hydropohon?: SortOrderInput | SortOrder
    objem_cisterny?: SortOrderInput | SortOrder
    zatizeni_strechy?: SortOrderInput | SortOrder
    cislo_motoru?: SortOrderInput | SortOrder
    nejvyssi_rychlost_omezeni?: SortOrderInput | SortOrder
    ovladani_brzd_sz?: SortOrderInput | SortOrder
    ovladani_brzd_sz_druh?: SortOrderInput | SortOrder
    retarder?: SortOrderInput | SortOrder
    rok_vyroby?: SortOrderInput | SortOrder
    delka_do?: SortOrderInput | SortOrder
    lozna_delka?: SortOrderInput | SortOrder
    lozna_sirka?: SortOrderInput | SortOrder
    vyska_do?: SortOrderInput | SortOrder
    typ_kod?: SortOrderInput | SortOrder
    rm_zaniku?: SortOrderInput | SortOrder
  }

  export type registrationsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: registrationsWhereInput | registrationsWhereInput[]
    OR?: registrationsWhereInput[]
    NOT?: registrationsWhereInput | registrationsWhereInput[]
    datum_1_registrace?: DateTimeNullableFilter<"registrations"> | Date | string | null
    datum_1_registrace_v_cr?: DateTimeNullableFilter<"registrations"> | Date | string | null
    ztp?: StringNullableFilter<"registrations"> | string | null
    es_eu?: StringNullableFilter<"registrations"> | string | null
    druh_vozidla?: StringNullableFilter<"registrations"> | string | null
    druh_vozidla_2_radek?: StringNullableFilter<"registrations"> | string | null
    kategorie_vozidla?: StringNullableFilter<"registrations"> | string | null
    tovarni_znacka?: StringNullableFilter<"registrations"> | string | null
    typ?: StringNullableFilter<"registrations"> | string | null
    varianta?: StringNullableFilter<"registrations"> | string | null
    verze?: StringNullableFilter<"registrations"> | string | null
    vin?: StringNullableFilter<"registrations"> | string | null
    obchodni_oznaceni?: StringNullableFilter<"registrations"> | string | null
    vyrobce_vozidla?: StringNullableFilter<"registrations"> | string | null
    vyrobce_motoru?: StringNullableFilter<"registrations"> | string | null
    typ_motoru?: StringNullableFilter<"registrations"> | string | null
    max_vykon?: FloatNullableFilter<"registrations"> | number | null
    max_vykon_otacky?: FloatNullableFilter<"registrations"> | number | null
    palivo?: StringNullableFilter<"registrations"> | string | null
    zdvihovy_objem?: FloatNullableFilter<"registrations"> | number | null
    plne_elektricke_vozidlo?: BoolNullableFilter<"registrations"> | boolean | null
    hybridni_vozidlo?: BoolNullableFilter<"registrations"> | boolean | null
    trida_hybridniho_vozidla?: StringNullableFilter<"registrations"> | string | null
    emisni_limit?: StringNullableFilter<"registrations"> | string | null
    stupe__plneni_emisni_urovne?: StringNullableFilter<"registrations"> | string | null
    korigovany_soucinitel_absorpce?: FloatNullableFilter<"registrations"> | number | null
    co2?: FloatNullableFilter<"registrations"> | number | null
    co2_mesto?: FloatNullableFilter<"registrations"> | number | null
    co2_mimo_mesto?: FloatNullableFilter<"registrations"> | number | null
    specificke_co2?: FloatNullableFilter<"registrations"> | number | null
    snizeni_emisi_nedc?: FloatNullableFilter<"registrations"> | number | null
    snizeni_emisi_wltp?: FloatNullableFilter<"registrations"> | number | null
    spotreba_mesto?: FloatNullableFilter<"registrations"> | number | null
    spotreba_mimo_mesto?: FloatNullableFilter<"registrations"> | number | null
    spotreba_kombinovana?: FloatNullableFilter<"registrations"> | number | null
    spotreba_pri_rychlosti?: StringNullableFilter<"registrations"> | string | null
    spotreba_el_mobil?: IntNullableFilter<"registrations"> | number | null
    dojezd_zr?: IntNullableFilter<"registrations"> | number | null
    vyrobce_karoserie?: StringNullableFilter<"registrations"> | string | null
    druh_karoserie?: StringNullableFilter<"registrations"> | string | null
    vyrobni_cislo_karoserie?: StringNullableFilter<"registrations"> | string | null
    barva?: StringNullableFilter<"registrations"> | string | null
    barva_doplnkova?: StringNullableFilter<"registrations"> | string | null
    pocet_mist_celkem?: IntNullableFilter<"registrations"> | number | null
    pocet_mist_k_sezeni?: IntNullableFilter<"registrations"> | number | null
    pocet_mist_k_stani?: IntNullableFilter<"registrations"> | number | null
    delka?: IntNullableFilter<"registrations"> | number | null
    sirka?: IntNullableFilter<"registrations"> | number | null
    vyska?: IntNullableFilter<"registrations"> | number | null
    rozvor?: IntNullableFilter<"registrations"> | number | null
    rozchod?: IntNullableFilter<"registrations"> | number | null
    provozni_hmotnost?: IntNullableFilter<"registrations"> | number | null
    nejvetsi_technicky_pripustna_hmotnost?: IntNullableFilter<"registrations"> | number | null
    nejvetsi_povolena_hmotnost?: IntNullableFilter<"registrations"> | number | null
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: StringNullableFilter<"registrations"> | string | null
    nejvetsi_povolena_hmotnost_na_napravu?: StringNullableFilter<"registrations"> | string | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: IntNullableFilter<"registrations"> | number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: IntNullableFilter<"registrations"> | number | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: IntNullableFilter<"registrations"> | number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: IntNullableFilter<"registrations"> | number | null
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: IntNullableFilter<"registrations"> | number | null
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: IntNullableFilter<"registrations"> | number | null
    hmotnosti_vozidla_pri_testu_wltp?: StringNullableFilter<"registrations"> | string | null
    predpis_spotreba_paliva?: StringNullableFilter<"registrations"> | string | null
    prumerna_hodnota_uzitecneho_zatizeni?: StringNullableFilter<"registrations"> | string | null
    spojovaci_zarizeni?: StringNullableFilter<"registrations"> | string | null
    pocet_naprav?: IntNullableFilter<"registrations"> | number | null
    naprav_pohanenych?: StringNullableFilter<"registrations"> | string | null
    kola_a_pneumatiky_naprava_1?: StringNullableFilter<"registrations"> | string | null
    kola_a_pneumatiky_naprava_2?: StringNullableFilter<"registrations"> | string | null
    kola_a_pneumatiky_naprava_3?: StringNullableFilter<"registrations"> | string | null
    kola_a_pneumatiky_naprava_4?: StringNullableFilter<"registrations"> | string | null
    vnejsi_hluk_vozidla_stojici?: FloatNullableFilter<"registrations"> | number | null
    vnejsi_hluk_vozidla_otacky?: FloatNullableFilter<"registrations"> | number | null
    vnejsi_hluk_vozidla_jizda?: FloatNullableFilter<"registrations"> | number | null
    nejvyssi_rychlost?: FloatNullableFilter<"registrations"> | number | null
    pomer_vykon_hmotnost?: FloatNullableFilter<"registrations"> | number | null
    inovativni_technologie?: StringNullableFilter<"registrations"> | string | null
    stupe__dokonceni?: StringNullableFilter<"registrations"> | string | null
    faktor_odchylky_de?: FloatNullableFilter<"registrations"> | number | null
    faktor_verifikace_vf?: IntNullableFilter<"registrations"> | number | null
    ucel_vozidla?: StringNullableFilter<"registrations"> | string | null
    dalsi_zaznamy?: StringNullableFilter<"registrations"> | string | null
    alternativni_provedeni?: StringNullableFilter<"registrations"> | string | null
    cislo_tp?: StringNullableFilter<"registrations"> | string | null
    cislo_orv?: StringNullableFilter<"registrations"> | string | null
    druh_rz?: StringNullableFilter<"registrations"> | string | null
    zarazeni_vozidla?: StringNullableFilter<"registrations"> | string | null
    status?: StringNullableFilter<"registrations"> | string | null
    pcv?: IntNullableFilter<"registrations"> | number | null
    abs?: BoolNullableFilter<"registrations"> | boolean | null
    airbag?: StringNullableFilter<"registrations"> | string | null
    asr?: BoolNullableFilter<"registrations"> | boolean | null
    brzdy_nouzova?: BoolNullableFilter<"registrations"> | boolean | null
    brzdy_odlehcovaci?: BoolNullableFilter<"registrations"> | boolean | null
    brzdy_parkovaci?: BoolNullableFilter<"registrations"> | boolean | null
    brzdy_provozni?: BoolNullableFilter<"registrations"> | boolean | null
    dopl_kovy_text_na_tp?: StringNullableFilter<"registrations"> | string | null
    hmotnosti_provozni_do?: IntNullableFilter<"registrations"> | number | null
    hmotnosti_zatizeni_sz?: IntNullableFilter<"registrations"> | number | null
    hmotnosti_zatizeni_sz_typ?: StringNullableFilter<"registrations"> | string | null
    hydropohon?: BoolNullableFilter<"registrations"> | boolean | null
    objem_cisterny?: FloatNullableFilter<"registrations"> | number | null
    zatizeni_strechy?: IntNullableFilter<"registrations"> | number | null
    cislo_motoru?: StringNullableFilter<"registrations"> | string | null
    nejvyssi_rychlost_omezeni?: IntNullableFilter<"registrations"> | number | null
    ovladani_brzd_sz?: StringNullableFilter<"registrations"> | string | null
    ovladani_brzd_sz_druh?: StringNullableFilter<"registrations"> | string | null
    retarder?: BoolNullableFilter<"registrations"> | boolean | null
    rok_vyroby?: IntNullableFilter<"registrations"> | number | null
    delka_do?: IntNullableFilter<"registrations"> | number | null
    lozna_delka?: IntNullableFilter<"registrations"> | number | null
    lozna_sirka?: IntNullableFilter<"registrations"> | number | null
    vyska_do?: IntNullableFilter<"registrations"> | number | null
    typ_kod?: StringNullableFilter<"registrations"> | string | null
    rm_zaniku?: StringNullableFilter<"registrations"> | string | null
  }, "id">

  export type registrationsOrderByWithAggregationInput = {
    id?: SortOrder
    datum_1_registrace?: SortOrderInput | SortOrder
    datum_1_registrace_v_cr?: SortOrderInput | SortOrder
    ztp?: SortOrderInput | SortOrder
    es_eu?: SortOrderInput | SortOrder
    druh_vozidla?: SortOrderInput | SortOrder
    druh_vozidla_2_radek?: SortOrderInput | SortOrder
    kategorie_vozidla?: SortOrderInput | SortOrder
    tovarni_znacka?: SortOrderInput | SortOrder
    typ?: SortOrderInput | SortOrder
    varianta?: SortOrderInput | SortOrder
    verze?: SortOrderInput | SortOrder
    vin?: SortOrderInput | SortOrder
    obchodni_oznaceni?: SortOrderInput | SortOrder
    vyrobce_vozidla?: SortOrderInput | SortOrder
    vyrobce_motoru?: SortOrderInput | SortOrder
    typ_motoru?: SortOrderInput | SortOrder
    max_vykon?: SortOrderInput | SortOrder
    max_vykon_otacky?: SortOrderInput | SortOrder
    palivo?: SortOrderInput | SortOrder
    zdvihovy_objem?: SortOrderInput | SortOrder
    plne_elektricke_vozidlo?: SortOrderInput | SortOrder
    hybridni_vozidlo?: SortOrderInput | SortOrder
    trida_hybridniho_vozidla?: SortOrderInput | SortOrder
    emisni_limit?: SortOrderInput | SortOrder
    stupe__plneni_emisni_urovne?: SortOrderInput | SortOrder
    korigovany_soucinitel_absorpce?: SortOrderInput | SortOrder
    co2?: SortOrderInput | SortOrder
    co2_mesto?: SortOrderInput | SortOrder
    co2_mimo_mesto?: SortOrderInput | SortOrder
    specificke_co2?: SortOrderInput | SortOrder
    snizeni_emisi_nedc?: SortOrderInput | SortOrder
    snizeni_emisi_wltp?: SortOrderInput | SortOrder
    spotreba_mesto?: SortOrderInput | SortOrder
    spotreba_mimo_mesto?: SortOrderInput | SortOrder
    spotreba_kombinovana?: SortOrderInput | SortOrder
    spotreba_pri_rychlosti?: SortOrderInput | SortOrder
    spotreba_el_mobil?: SortOrderInput | SortOrder
    dojezd_zr?: SortOrderInput | SortOrder
    vyrobce_karoserie?: SortOrderInput | SortOrder
    druh_karoserie?: SortOrderInput | SortOrder
    vyrobni_cislo_karoserie?: SortOrderInput | SortOrder
    barva?: SortOrderInput | SortOrder
    barva_doplnkova?: SortOrderInput | SortOrder
    pocet_mist_celkem?: SortOrderInput | SortOrder
    pocet_mist_k_sezeni?: SortOrderInput | SortOrder
    pocet_mist_k_stani?: SortOrderInput | SortOrder
    delka?: SortOrderInput | SortOrder
    sirka?: SortOrderInput | SortOrder
    vyska?: SortOrderInput | SortOrder
    rozvor?: SortOrderInput | SortOrder
    rozchod?: SortOrderInput | SortOrder
    provozni_hmotnost?: SortOrderInput | SortOrder
    nejvetsi_technicky_pripustna_hmotnost?: SortOrderInput | SortOrder
    nejvetsi_povolena_hmotnost?: SortOrderInput | SortOrder
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: SortOrderInput | SortOrder
    nejvetsi_povolena_hmotnost_na_napravu?: SortOrderInput | SortOrder
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: SortOrderInput | SortOrder
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: SortOrderInput | SortOrder
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: SortOrderInput | SortOrder
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: SortOrderInput | SortOrder
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: SortOrderInput | SortOrder
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: SortOrderInput | SortOrder
    hmotnosti_vozidla_pri_testu_wltp?: SortOrderInput | SortOrder
    predpis_spotreba_paliva?: SortOrderInput | SortOrder
    prumerna_hodnota_uzitecneho_zatizeni?: SortOrderInput | SortOrder
    spojovaci_zarizeni?: SortOrderInput | SortOrder
    pocet_naprav?: SortOrderInput | SortOrder
    naprav_pohanenych?: SortOrderInput | SortOrder
    kola_a_pneumatiky_naprava_1?: SortOrderInput | SortOrder
    kola_a_pneumatiky_naprava_2?: SortOrderInput | SortOrder
    kola_a_pneumatiky_naprava_3?: SortOrderInput | SortOrder
    kola_a_pneumatiky_naprava_4?: SortOrderInput | SortOrder
    vnejsi_hluk_vozidla_stojici?: SortOrderInput | SortOrder
    vnejsi_hluk_vozidla_otacky?: SortOrderInput | SortOrder
    vnejsi_hluk_vozidla_jizda?: SortOrderInput | SortOrder
    nejvyssi_rychlost?: SortOrderInput | SortOrder
    pomer_vykon_hmotnost?: SortOrderInput | SortOrder
    inovativni_technologie?: SortOrderInput | SortOrder
    stupe__dokonceni?: SortOrderInput | SortOrder
    faktor_odchylky_de?: SortOrderInput | SortOrder
    faktor_verifikace_vf?: SortOrderInput | SortOrder
    ucel_vozidla?: SortOrderInput | SortOrder
    dalsi_zaznamy?: SortOrderInput | SortOrder
    alternativni_provedeni?: SortOrderInput | SortOrder
    cislo_tp?: SortOrderInput | SortOrder
    cislo_orv?: SortOrderInput | SortOrder
    druh_rz?: SortOrderInput | SortOrder
    zarazeni_vozidla?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    pcv?: SortOrderInput | SortOrder
    abs?: SortOrderInput | SortOrder
    airbag?: SortOrderInput | SortOrder
    asr?: SortOrderInput | SortOrder
    brzdy_nouzova?: SortOrderInput | SortOrder
    brzdy_odlehcovaci?: SortOrderInput | SortOrder
    brzdy_parkovaci?: SortOrderInput | SortOrder
    brzdy_provozni?: SortOrderInput | SortOrder
    dopl_kovy_text_na_tp?: SortOrderInput | SortOrder
    hmotnosti_provozni_do?: SortOrderInput | SortOrder
    hmotnosti_zatizeni_sz?: SortOrderInput | SortOrder
    hmotnosti_zatizeni_sz_typ?: SortOrderInput | SortOrder
    hydropohon?: SortOrderInput | SortOrder
    objem_cisterny?: SortOrderInput | SortOrder
    zatizeni_strechy?: SortOrderInput | SortOrder
    cislo_motoru?: SortOrderInput | SortOrder
    nejvyssi_rychlost_omezeni?: SortOrderInput | SortOrder
    ovladani_brzd_sz?: SortOrderInput | SortOrder
    ovladani_brzd_sz_druh?: SortOrderInput | SortOrder
    retarder?: SortOrderInput | SortOrder
    rok_vyroby?: SortOrderInput | SortOrder
    delka_do?: SortOrderInput | SortOrder
    lozna_delka?: SortOrderInput | SortOrder
    lozna_sirka?: SortOrderInput | SortOrder
    vyska_do?: SortOrderInput | SortOrder
    typ_kod?: SortOrderInput | SortOrder
    rm_zaniku?: SortOrderInput | SortOrder
    _count?: registrationsCountOrderByAggregateInput
    _avg?: registrationsAvgOrderByAggregateInput
    _max?: registrationsMaxOrderByAggregateInput
    _min?: registrationsMinOrderByAggregateInput
    _sum?: registrationsSumOrderByAggregateInput
  }

  export type registrationsScalarWhereWithAggregatesInput = {
    AND?: registrationsScalarWhereWithAggregatesInput | registrationsScalarWhereWithAggregatesInput[]
    OR?: registrationsScalarWhereWithAggregatesInput[]
    NOT?: registrationsScalarWhereWithAggregatesInput | registrationsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"registrations"> | number
    datum_1_registrace?: DateTimeNullableWithAggregatesFilter<"registrations"> | Date | string | null
    datum_1_registrace_v_cr?: DateTimeNullableWithAggregatesFilter<"registrations"> | Date | string | null
    ztp?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    es_eu?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    druh_vozidla?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    druh_vozidla_2_radek?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    kategorie_vozidla?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    tovarni_znacka?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    typ?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    varianta?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    verze?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    vin?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    obchodni_oznaceni?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    vyrobce_vozidla?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    vyrobce_motoru?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    typ_motoru?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    max_vykon?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    max_vykon_otacky?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    palivo?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    zdvihovy_objem?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    plne_elektricke_vozidlo?: BoolNullableWithAggregatesFilter<"registrations"> | boolean | null
    hybridni_vozidlo?: BoolNullableWithAggregatesFilter<"registrations"> | boolean | null
    trida_hybridniho_vozidla?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    emisni_limit?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    stupe__plneni_emisni_urovne?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    korigovany_soucinitel_absorpce?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    co2?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    co2_mesto?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    co2_mimo_mesto?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    specificke_co2?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    snizeni_emisi_nedc?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    snizeni_emisi_wltp?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    spotreba_mesto?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    spotreba_mimo_mesto?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    spotreba_kombinovana?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    spotreba_pri_rychlosti?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    spotreba_el_mobil?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    dojezd_zr?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    vyrobce_karoserie?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    druh_karoserie?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    vyrobni_cislo_karoserie?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    barva?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    barva_doplnkova?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    pocet_mist_celkem?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    pocet_mist_k_sezeni?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    pocet_mist_k_stani?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    delka?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    sirka?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    vyska?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    rozvor?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    rozchod?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    provozni_hmotnost?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    nejvetsi_technicky_pripustna_hmotnost?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    nejvetsi_povolena_hmotnost?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    nejvetsi_povolena_hmotnost_na_napravu?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    hmotnosti_vozidla_pri_testu_wltp?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    predpis_spotreba_paliva?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    prumerna_hodnota_uzitecneho_zatizeni?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    spojovaci_zarizeni?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    pocet_naprav?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    naprav_pohanenych?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    kola_a_pneumatiky_naprava_1?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    kola_a_pneumatiky_naprava_2?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    kola_a_pneumatiky_naprava_3?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    kola_a_pneumatiky_naprava_4?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    vnejsi_hluk_vozidla_stojici?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    vnejsi_hluk_vozidla_otacky?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    vnejsi_hluk_vozidla_jizda?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    nejvyssi_rychlost?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    pomer_vykon_hmotnost?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    inovativni_technologie?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    stupe__dokonceni?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    faktor_odchylky_de?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    faktor_verifikace_vf?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    ucel_vozidla?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    dalsi_zaznamy?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    alternativni_provedeni?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    cislo_tp?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    cislo_orv?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    druh_rz?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    zarazeni_vozidla?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    status?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    pcv?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    abs?: BoolNullableWithAggregatesFilter<"registrations"> | boolean | null
    airbag?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    asr?: BoolNullableWithAggregatesFilter<"registrations"> | boolean | null
    brzdy_nouzova?: BoolNullableWithAggregatesFilter<"registrations"> | boolean | null
    brzdy_odlehcovaci?: BoolNullableWithAggregatesFilter<"registrations"> | boolean | null
    brzdy_parkovaci?: BoolNullableWithAggregatesFilter<"registrations"> | boolean | null
    brzdy_provozni?: BoolNullableWithAggregatesFilter<"registrations"> | boolean | null
    dopl_kovy_text_na_tp?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    hmotnosti_provozni_do?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    hmotnosti_zatizeni_sz?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    hmotnosti_zatizeni_sz_typ?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    hydropohon?: BoolNullableWithAggregatesFilter<"registrations"> | boolean | null
    objem_cisterny?: FloatNullableWithAggregatesFilter<"registrations"> | number | null
    zatizeni_strechy?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    cislo_motoru?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    nejvyssi_rychlost_omezeni?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    ovladani_brzd_sz?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    ovladani_brzd_sz_druh?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    retarder?: BoolNullableWithAggregatesFilter<"registrations"> | boolean | null
    rok_vyroby?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    delka_do?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    lozna_delka?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    lozna_sirka?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    vyska_do?: IntNullableWithAggregatesFilter<"registrations"> | number | null
    typ_kod?: StringNullableWithAggregatesFilter<"registrations"> | string | null
    rm_zaniku?: StringNullableWithAggregatesFilter<"registrations"> | string | null
  }

  export type registrationsCreateInput = {
    datum_1_registrace?: Date | string | null
    datum_1_registrace_v_cr?: Date | string | null
    ztp?: string | null
    es_eu?: string | null
    druh_vozidla?: string | null
    druh_vozidla_2_radek?: string | null
    kategorie_vozidla?: string | null
    tovarni_znacka?: string | null
    typ?: string | null
    varianta?: string | null
    verze?: string | null
    vin?: string | null
    obchodni_oznaceni?: string | null
    vyrobce_vozidla?: string | null
    vyrobce_motoru?: string | null
    typ_motoru?: string | null
    max_vykon?: number | null
    max_vykon_otacky?: number | null
    palivo?: string | null
    zdvihovy_objem?: number | null
    plne_elektricke_vozidlo?: boolean | null
    hybridni_vozidlo?: boolean | null
    trida_hybridniho_vozidla?: string | null
    emisni_limit?: string | null
    stupe__plneni_emisni_urovne?: string | null
    korigovany_soucinitel_absorpce?: number | null
    co2?: number | null
    co2_mesto?: number | null
    co2_mimo_mesto?: number | null
    specificke_co2?: number | null
    snizeni_emisi_nedc?: number | null
    snizeni_emisi_wltp?: number | null
    spotreba_mesto?: number | null
    spotreba_mimo_mesto?: number | null
    spotreba_kombinovana?: number | null
    spotreba_pri_rychlosti?: string | null
    spotreba_el_mobil?: number | null
    dojezd_zr?: number | null
    vyrobce_karoserie?: string | null
    druh_karoserie?: string | null
    vyrobni_cislo_karoserie?: string | null
    barva?: string | null
    barva_doplnkova?: string | null
    pocet_mist_celkem?: number | null
    pocet_mist_k_sezeni?: number | null
    pocet_mist_k_stani?: number | null
    delka?: number | null
    sirka?: number | null
    vyska?: number | null
    rozvor?: number | null
    rozchod?: number | null
    provozni_hmotnost?: number | null
    nejvetsi_technicky_pripustna_hmotnost?: number | null
    nejvetsi_povolena_hmotnost?: number | null
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: string | null
    nejvetsi_povolena_hmotnost_na_napravu?: string | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: number | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: number | null
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: number | null
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: number | null
    hmotnosti_vozidla_pri_testu_wltp?: string | null
    predpis_spotreba_paliva?: string | null
    prumerna_hodnota_uzitecneho_zatizeni?: string | null
    spojovaci_zarizeni?: string | null
    pocet_naprav?: number | null
    naprav_pohanenych?: string | null
    kola_a_pneumatiky_naprava_1?: string | null
    kola_a_pneumatiky_naprava_2?: string | null
    kola_a_pneumatiky_naprava_3?: string | null
    kola_a_pneumatiky_naprava_4?: string | null
    vnejsi_hluk_vozidla_stojici?: number | null
    vnejsi_hluk_vozidla_otacky?: number | null
    vnejsi_hluk_vozidla_jizda?: number | null
    nejvyssi_rychlost?: number | null
    pomer_vykon_hmotnost?: number | null
    inovativni_technologie?: string | null
    stupe__dokonceni?: string | null
    faktor_odchylky_de?: number | null
    faktor_verifikace_vf?: number | null
    ucel_vozidla?: string | null
    dalsi_zaznamy?: string | null
    alternativni_provedeni?: string | null
    cislo_tp?: string | null
    cislo_orv?: string | null
    druh_rz?: string | null
    zarazeni_vozidla?: string | null
    status?: string | null
    pcv?: number | null
    abs?: boolean | null
    airbag?: string | null
    asr?: boolean | null
    brzdy_nouzova?: boolean | null
    brzdy_odlehcovaci?: boolean | null
    brzdy_parkovaci?: boolean | null
    brzdy_provozni?: boolean | null
    dopl_kovy_text_na_tp?: string | null
    hmotnosti_provozni_do?: number | null
    hmotnosti_zatizeni_sz?: number | null
    hmotnosti_zatizeni_sz_typ?: string | null
    hydropohon?: boolean | null
    objem_cisterny?: number | null
    zatizeni_strechy?: number | null
    cislo_motoru?: string | null
    nejvyssi_rychlost_omezeni?: number | null
    ovladani_brzd_sz?: string | null
    ovladani_brzd_sz_druh?: string | null
    retarder?: boolean | null
    rok_vyroby?: number | null
    delka_do?: number | null
    lozna_delka?: number | null
    lozna_sirka?: number | null
    vyska_do?: number | null
    typ_kod?: string | null
    rm_zaniku?: string | null
  }

  export type registrationsUncheckedCreateInput = {
    id?: number
    datum_1_registrace?: Date | string | null
    datum_1_registrace_v_cr?: Date | string | null
    ztp?: string | null
    es_eu?: string | null
    druh_vozidla?: string | null
    druh_vozidla_2_radek?: string | null
    kategorie_vozidla?: string | null
    tovarni_znacka?: string | null
    typ?: string | null
    varianta?: string | null
    verze?: string | null
    vin?: string | null
    obchodni_oznaceni?: string | null
    vyrobce_vozidla?: string | null
    vyrobce_motoru?: string | null
    typ_motoru?: string | null
    max_vykon?: number | null
    max_vykon_otacky?: number | null
    palivo?: string | null
    zdvihovy_objem?: number | null
    plne_elektricke_vozidlo?: boolean | null
    hybridni_vozidlo?: boolean | null
    trida_hybridniho_vozidla?: string | null
    emisni_limit?: string | null
    stupe__plneni_emisni_urovne?: string | null
    korigovany_soucinitel_absorpce?: number | null
    co2?: number | null
    co2_mesto?: number | null
    co2_mimo_mesto?: number | null
    specificke_co2?: number | null
    snizeni_emisi_nedc?: number | null
    snizeni_emisi_wltp?: number | null
    spotreba_mesto?: number | null
    spotreba_mimo_mesto?: number | null
    spotreba_kombinovana?: number | null
    spotreba_pri_rychlosti?: string | null
    spotreba_el_mobil?: number | null
    dojezd_zr?: number | null
    vyrobce_karoserie?: string | null
    druh_karoserie?: string | null
    vyrobni_cislo_karoserie?: string | null
    barva?: string | null
    barva_doplnkova?: string | null
    pocet_mist_celkem?: number | null
    pocet_mist_k_sezeni?: number | null
    pocet_mist_k_stani?: number | null
    delka?: number | null
    sirka?: number | null
    vyska?: number | null
    rozvor?: number | null
    rozchod?: number | null
    provozni_hmotnost?: number | null
    nejvetsi_technicky_pripustna_hmotnost?: number | null
    nejvetsi_povolena_hmotnost?: number | null
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: string | null
    nejvetsi_povolena_hmotnost_na_napravu?: string | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: number | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: number | null
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: number | null
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: number | null
    hmotnosti_vozidla_pri_testu_wltp?: string | null
    predpis_spotreba_paliva?: string | null
    prumerna_hodnota_uzitecneho_zatizeni?: string | null
    spojovaci_zarizeni?: string | null
    pocet_naprav?: number | null
    naprav_pohanenych?: string | null
    kola_a_pneumatiky_naprava_1?: string | null
    kola_a_pneumatiky_naprava_2?: string | null
    kola_a_pneumatiky_naprava_3?: string | null
    kola_a_pneumatiky_naprava_4?: string | null
    vnejsi_hluk_vozidla_stojici?: number | null
    vnejsi_hluk_vozidla_otacky?: number | null
    vnejsi_hluk_vozidla_jizda?: number | null
    nejvyssi_rychlost?: number | null
    pomer_vykon_hmotnost?: number | null
    inovativni_technologie?: string | null
    stupe__dokonceni?: string | null
    faktor_odchylky_de?: number | null
    faktor_verifikace_vf?: number | null
    ucel_vozidla?: string | null
    dalsi_zaznamy?: string | null
    alternativni_provedeni?: string | null
    cislo_tp?: string | null
    cislo_orv?: string | null
    druh_rz?: string | null
    zarazeni_vozidla?: string | null
    status?: string | null
    pcv?: number | null
    abs?: boolean | null
    airbag?: string | null
    asr?: boolean | null
    brzdy_nouzova?: boolean | null
    brzdy_odlehcovaci?: boolean | null
    brzdy_parkovaci?: boolean | null
    brzdy_provozni?: boolean | null
    dopl_kovy_text_na_tp?: string | null
    hmotnosti_provozni_do?: number | null
    hmotnosti_zatizeni_sz?: number | null
    hmotnosti_zatizeni_sz_typ?: string | null
    hydropohon?: boolean | null
    objem_cisterny?: number | null
    zatizeni_strechy?: number | null
    cislo_motoru?: string | null
    nejvyssi_rychlost_omezeni?: number | null
    ovladani_brzd_sz?: string | null
    ovladani_brzd_sz_druh?: string | null
    retarder?: boolean | null
    rok_vyroby?: number | null
    delka_do?: number | null
    lozna_delka?: number | null
    lozna_sirka?: number | null
    vyska_do?: number | null
    typ_kod?: string | null
    rm_zaniku?: string | null
  }

  export type registrationsUpdateInput = {
    datum_1_registrace?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datum_1_registrace_v_cr?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ztp?: NullableStringFieldUpdateOperationsInput | string | null
    es_eu?: NullableStringFieldUpdateOperationsInput | string | null
    druh_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    druh_vozidla_2_radek?: NullableStringFieldUpdateOperationsInput | string | null
    kategorie_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    tovarni_znacka?: NullableStringFieldUpdateOperationsInput | string | null
    typ?: NullableStringFieldUpdateOperationsInput | string | null
    varianta?: NullableStringFieldUpdateOperationsInput | string | null
    verze?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    obchodni_oznaceni?: NullableStringFieldUpdateOperationsInput | string | null
    vyrobce_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    vyrobce_motoru?: NullableStringFieldUpdateOperationsInput | string | null
    typ_motoru?: NullableStringFieldUpdateOperationsInput | string | null
    max_vykon?: NullableFloatFieldUpdateOperationsInput | number | null
    max_vykon_otacky?: NullableFloatFieldUpdateOperationsInput | number | null
    palivo?: NullableStringFieldUpdateOperationsInput | string | null
    zdvihovy_objem?: NullableFloatFieldUpdateOperationsInput | number | null
    plne_elektricke_vozidlo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hybridni_vozidlo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    trida_hybridniho_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    emisni_limit?: NullableStringFieldUpdateOperationsInput | string | null
    stupe__plneni_emisni_urovne?: NullableStringFieldUpdateOperationsInput | string | null
    korigovany_soucinitel_absorpce?: NullableFloatFieldUpdateOperationsInput | number | null
    co2?: NullableFloatFieldUpdateOperationsInput | number | null
    co2_mesto?: NullableFloatFieldUpdateOperationsInput | number | null
    co2_mimo_mesto?: NullableFloatFieldUpdateOperationsInput | number | null
    specificke_co2?: NullableFloatFieldUpdateOperationsInput | number | null
    snizeni_emisi_nedc?: NullableFloatFieldUpdateOperationsInput | number | null
    snizeni_emisi_wltp?: NullableFloatFieldUpdateOperationsInput | number | null
    spotreba_mesto?: NullableFloatFieldUpdateOperationsInput | number | null
    spotreba_mimo_mesto?: NullableFloatFieldUpdateOperationsInput | number | null
    spotreba_kombinovana?: NullableFloatFieldUpdateOperationsInput | number | null
    spotreba_pri_rychlosti?: NullableStringFieldUpdateOperationsInput | string | null
    spotreba_el_mobil?: NullableIntFieldUpdateOperationsInput | number | null
    dojezd_zr?: NullableIntFieldUpdateOperationsInput | number | null
    vyrobce_karoserie?: NullableStringFieldUpdateOperationsInput | string | null
    druh_karoserie?: NullableStringFieldUpdateOperationsInput | string | null
    vyrobni_cislo_karoserie?: NullableStringFieldUpdateOperationsInput | string | null
    barva?: NullableStringFieldUpdateOperationsInput | string | null
    barva_doplnkova?: NullableStringFieldUpdateOperationsInput | string | null
    pocet_mist_celkem?: NullableIntFieldUpdateOperationsInput | number | null
    pocet_mist_k_sezeni?: NullableIntFieldUpdateOperationsInput | number | null
    pocet_mist_k_stani?: NullableIntFieldUpdateOperationsInput | number | null
    delka?: NullableIntFieldUpdateOperationsInput | number | null
    sirka?: NullableIntFieldUpdateOperationsInput | number | null
    vyska?: NullableIntFieldUpdateOperationsInput | number | null
    rozvor?: NullableIntFieldUpdateOperationsInput | number | null
    rozchod?: NullableIntFieldUpdateOperationsInput | number | null
    provozni_hmotnost?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_technicky_pripustna_hmotnost?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_povolena_hmotnost?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: NullableStringFieldUpdateOperationsInput | string | null
    nejvetsi_povolena_hmotnost_na_napravu?: NullableStringFieldUpdateOperationsInput | string | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: NullableIntFieldUpdateOperationsInput | number | null
    hmotnosti_vozidla_pri_testu_wltp?: NullableStringFieldUpdateOperationsInput | string | null
    predpis_spotreba_paliva?: NullableStringFieldUpdateOperationsInput | string | null
    prumerna_hodnota_uzitecneho_zatizeni?: NullableStringFieldUpdateOperationsInput | string | null
    spojovaci_zarizeni?: NullableStringFieldUpdateOperationsInput | string | null
    pocet_naprav?: NullableIntFieldUpdateOperationsInput | number | null
    naprav_pohanenych?: NullableStringFieldUpdateOperationsInput | string | null
    kola_a_pneumatiky_naprava_1?: NullableStringFieldUpdateOperationsInput | string | null
    kola_a_pneumatiky_naprava_2?: NullableStringFieldUpdateOperationsInput | string | null
    kola_a_pneumatiky_naprava_3?: NullableStringFieldUpdateOperationsInput | string | null
    kola_a_pneumatiky_naprava_4?: NullableStringFieldUpdateOperationsInput | string | null
    vnejsi_hluk_vozidla_stojici?: NullableFloatFieldUpdateOperationsInput | number | null
    vnejsi_hluk_vozidla_otacky?: NullableFloatFieldUpdateOperationsInput | number | null
    vnejsi_hluk_vozidla_jizda?: NullableFloatFieldUpdateOperationsInput | number | null
    nejvyssi_rychlost?: NullableFloatFieldUpdateOperationsInput | number | null
    pomer_vykon_hmotnost?: NullableFloatFieldUpdateOperationsInput | number | null
    inovativni_technologie?: NullableStringFieldUpdateOperationsInput | string | null
    stupe__dokonceni?: NullableStringFieldUpdateOperationsInput | string | null
    faktor_odchylky_de?: NullableFloatFieldUpdateOperationsInput | number | null
    faktor_verifikace_vf?: NullableIntFieldUpdateOperationsInput | number | null
    ucel_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    dalsi_zaznamy?: NullableStringFieldUpdateOperationsInput | string | null
    alternativni_provedeni?: NullableStringFieldUpdateOperationsInput | string | null
    cislo_tp?: NullableStringFieldUpdateOperationsInput | string | null
    cislo_orv?: NullableStringFieldUpdateOperationsInput | string | null
    druh_rz?: NullableStringFieldUpdateOperationsInput | string | null
    zarazeni_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    pcv?: NullableIntFieldUpdateOperationsInput | number | null
    abs?: NullableBoolFieldUpdateOperationsInput | boolean | null
    airbag?: NullableStringFieldUpdateOperationsInput | string | null
    asr?: NullableBoolFieldUpdateOperationsInput | boolean | null
    brzdy_nouzova?: NullableBoolFieldUpdateOperationsInput | boolean | null
    brzdy_odlehcovaci?: NullableBoolFieldUpdateOperationsInput | boolean | null
    brzdy_parkovaci?: NullableBoolFieldUpdateOperationsInput | boolean | null
    brzdy_provozni?: NullableBoolFieldUpdateOperationsInput | boolean | null
    dopl_kovy_text_na_tp?: NullableStringFieldUpdateOperationsInput | string | null
    hmotnosti_provozni_do?: NullableIntFieldUpdateOperationsInput | number | null
    hmotnosti_zatizeni_sz?: NullableIntFieldUpdateOperationsInput | number | null
    hmotnosti_zatizeni_sz_typ?: NullableStringFieldUpdateOperationsInput | string | null
    hydropohon?: NullableBoolFieldUpdateOperationsInput | boolean | null
    objem_cisterny?: NullableFloatFieldUpdateOperationsInput | number | null
    zatizeni_strechy?: NullableIntFieldUpdateOperationsInput | number | null
    cislo_motoru?: NullableStringFieldUpdateOperationsInput | string | null
    nejvyssi_rychlost_omezeni?: NullableIntFieldUpdateOperationsInput | number | null
    ovladani_brzd_sz?: NullableStringFieldUpdateOperationsInput | string | null
    ovladani_brzd_sz_druh?: NullableStringFieldUpdateOperationsInput | string | null
    retarder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rok_vyroby?: NullableIntFieldUpdateOperationsInput | number | null
    delka_do?: NullableIntFieldUpdateOperationsInput | number | null
    lozna_delka?: NullableIntFieldUpdateOperationsInput | number | null
    lozna_sirka?: NullableIntFieldUpdateOperationsInput | number | null
    vyska_do?: NullableIntFieldUpdateOperationsInput | number | null
    typ_kod?: NullableStringFieldUpdateOperationsInput | string | null
    rm_zaniku?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type registrationsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    datum_1_registrace?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datum_1_registrace_v_cr?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ztp?: NullableStringFieldUpdateOperationsInput | string | null
    es_eu?: NullableStringFieldUpdateOperationsInput | string | null
    druh_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    druh_vozidla_2_radek?: NullableStringFieldUpdateOperationsInput | string | null
    kategorie_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    tovarni_znacka?: NullableStringFieldUpdateOperationsInput | string | null
    typ?: NullableStringFieldUpdateOperationsInput | string | null
    varianta?: NullableStringFieldUpdateOperationsInput | string | null
    verze?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    obchodni_oznaceni?: NullableStringFieldUpdateOperationsInput | string | null
    vyrobce_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    vyrobce_motoru?: NullableStringFieldUpdateOperationsInput | string | null
    typ_motoru?: NullableStringFieldUpdateOperationsInput | string | null
    max_vykon?: NullableFloatFieldUpdateOperationsInput | number | null
    max_vykon_otacky?: NullableFloatFieldUpdateOperationsInput | number | null
    palivo?: NullableStringFieldUpdateOperationsInput | string | null
    zdvihovy_objem?: NullableFloatFieldUpdateOperationsInput | number | null
    plne_elektricke_vozidlo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hybridni_vozidlo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    trida_hybridniho_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    emisni_limit?: NullableStringFieldUpdateOperationsInput | string | null
    stupe__plneni_emisni_urovne?: NullableStringFieldUpdateOperationsInput | string | null
    korigovany_soucinitel_absorpce?: NullableFloatFieldUpdateOperationsInput | number | null
    co2?: NullableFloatFieldUpdateOperationsInput | number | null
    co2_mesto?: NullableFloatFieldUpdateOperationsInput | number | null
    co2_mimo_mesto?: NullableFloatFieldUpdateOperationsInput | number | null
    specificke_co2?: NullableFloatFieldUpdateOperationsInput | number | null
    snizeni_emisi_nedc?: NullableFloatFieldUpdateOperationsInput | number | null
    snizeni_emisi_wltp?: NullableFloatFieldUpdateOperationsInput | number | null
    spotreba_mesto?: NullableFloatFieldUpdateOperationsInput | number | null
    spotreba_mimo_mesto?: NullableFloatFieldUpdateOperationsInput | number | null
    spotreba_kombinovana?: NullableFloatFieldUpdateOperationsInput | number | null
    spotreba_pri_rychlosti?: NullableStringFieldUpdateOperationsInput | string | null
    spotreba_el_mobil?: NullableIntFieldUpdateOperationsInput | number | null
    dojezd_zr?: NullableIntFieldUpdateOperationsInput | number | null
    vyrobce_karoserie?: NullableStringFieldUpdateOperationsInput | string | null
    druh_karoserie?: NullableStringFieldUpdateOperationsInput | string | null
    vyrobni_cislo_karoserie?: NullableStringFieldUpdateOperationsInput | string | null
    barva?: NullableStringFieldUpdateOperationsInput | string | null
    barva_doplnkova?: NullableStringFieldUpdateOperationsInput | string | null
    pocet_mist_celkem?: NullableIntFieldUpdateOperationsInput | number | null
    pocet_mist_k_sezeni?: NullableIntFieldUpdateOperationsInput | number | null
    pocet_mist_k_stani?: NullableIntFieldUpdateOperationsInput | number | null
    delka?: NullableIntFieldUpdateOperationsInput | number | null
    sirka?: NullableIntFieldUpdateOperationsInput | number | null
    vyska?: NullableIntFieldUpdateOperationsInput | number | null
    rozvor?: NullableIntFieldUpdateOperationsInput | number | null
    rozchod?: NullableIntFieldUpdateOperationsInput | number | null
    provozni_hmotnost?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_technicky_pripustna_hmotnost?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_povolena_hmotnost?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: NullableStringFieldUpdateOperationsInput | string | null
    nejvetsi_povolena_hmotnost_na_napravu?: NullableStringFieldUpdateOperationsInput | string | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: NullableIntFieldUpdateOperationsInput | number | null
    hmotnosti_vozidla_pri_testu_wltp?: NullableStringFieldUpdateOperationsInput | string | null
    predpis_spotreba_paliva?: NullableStringFieldUpdateOperationsInput | string | null
    prumerna_hodnota_uzitecneho_zatizeni?: NullableStringFieldUpdateOperationsInput | string | null
    spojovaci_zarizeni?: NullableStringFieldUpdateOperationsInput | string | null
    pocet_naprav?: NullableIntFieldUpdateOperationsInput | number | null
    naprav_pohanenych?: NullableStringFieldUpdateOperationsInput | string | null
    kola_a_pneumatiky_naprava_1?: NullableStringFieldUpdateOperationsInput | string | null
    kola_a_pneumatiky_naprava_2?: NullableStringFieldUpdateOperationsInput | string | null
    kola_a_pneumatiky_naprava_3?: NullableStringFieldUpdateOperationsInput | string | null
    kola_a_pneumatiky_naprava_4?: NullableStringFieldUpdateOperationsInput | string | null
    vnejsi_hluk_vozidla_stojici?: NullableFloatFieldUpdateOperationsInput | number | null
    vnejsi_hluk_vozidla_otacky?: NullableFloatFieldUpdateOperationsInput | number | null
    vnejsi_hluk_vozidla_jizda?: NullableFloatFieldUpdateOperationsInput | number | null
    nejvyssi_rychlost?: NullableFloatFieldUpdateOperationsInput | number | null
    pomer_vykon_hmotnost?: NullableFloatFieldUpdateOperationsInput | number | null
    inovativni_technologie?: NullableStringFieldUpdateOperationsInput | string | null
    stupe__dokonceni?: NullableStringFieldUpdateOperationsInput | string | null
    faktor_odchylky_de?: NullableFloatFieldUpdateOperationsInput | number | null
    faktor_verifikace_vf?: NullableIntFieldUpdateOperationsInput | number | null
    ucel_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    dalsi_zaznamy?: NullableStringFieldUpdateOperationsInput | string | null
    alternativni_provedeni?: NullableStringFieldUpdateOperationsInput | string | null
    cislo_tp?: NullableStringFieldUpdateOperationsInput | string | null
    cislo_orv?: NullableStringFieldUpdateOperationsInput | string | null
    druh_rz?: NullableStringFieldUpdateOperationsInput | string | null
    zarazeni_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    pcv?: NullableIntFieldUpdateOperationsInput | number | null
    abs?: NullableBoolFieldUpdateOperationsInput | boolean | null
    airbag?: NullableStringFieldUpdateOperationsInput | string | null
    asr?: NullableBoolFieldUpdateOperationsInput | boolean | null
    brzdy_nouzova?: NullableBoolFieldUpdateOperationsInput | boolean | null
    brzdy_odlehcovaci?: NullableBoolFieldUpdateOperationsInput | boolean | null
    brzdy_parkovaci?: NullableBoolFieldUpdateOperationsInput | boolean | null
    brzdy_provozni?: NullableBoolFieldUpdateOperationsInput | boolean | null
    dopl_kovy_text_na_tp?: NullableStringFieldUpdateOperationsInput | string | null
    hmotnosti_provozni_do?: NullableIntFieldUpdateOperationsInput | number | null
    hmotnosti_zatizeni_sz?: NullableIntFieldUpdateOperationsInput | number | null
    hmotnosti_zatizeni_sz_typ?: NullableStringFieldUpdateOperationsInput | string | null
    hydropohon?: NullableBoolFieldUpdateOperationsInput | boolean | null
    objem_cisterny?: NullableFloatFieldUpdateOperationsInput | number | null
    zatizeni_strechy?: NullableIntFieldUpdateOperationsInput | number | null
    cislo_motoru?: NullableStringFieldUpdateOperationsInput | string | null
    nejvyssi_rychlost_omezeni?: NullableIntFieldUpdateOperationsInput | number | null
    ovladani_brzd_sz?: NullableStringFieldUpdateOperationsInput | string | null
    ovladani_brzd_sz_druh?: NullableStringFieldUpdateOperationsInput | string | null
    retarder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rok_vyroby?: NullableIntFieldUpdateOperationsInput | number | null
    delka_do?: NullableIntFieldUpdateOperationsInput | number | null
    lozna_delka?: NullableIntFieldUpdateOperationsInput | number | null
    lozna_sirka?: NullableIntFieldUpdateOperationsInput | number | null
    vyska_do?: NullableIntFieldUpdateOperationsInput | number | null
    typ_kod?: NullableStringFieldUpdateOperationsInput | string | null
    rm_zaniku?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type registrationsCreateManyInput = {
    id?: number
    datum_1_registrace?: Date | string | null
    datum_1_registrace_v_cr?: Date | string | null
    ztp?: string | null
    es_eu?: string | null
    druh_vozidla?: string | null
    druh_vozidla_2_radek?: string | null
    kategorie_vozidla?: string | null
    tovarni_znacka?: string | null
    typ?: string | null
    varianta?: string | null
    verze?: string | null
    vin?: string | null
    obchodni_oznaceni?: string | null
    vyrobce_vozidla?: string | null
    vyrobce_motoru?: string | null
    typ_motoru?: string | null
    max_vykon?: number | null
    max_vykon_otacky?: number | null
    palivo?: string | null
    zdvihovy_objem?: number | null
    plne_elektricke_vozidlo?: boolean | null
    hybridni_vozidlo?: boolean | null
    trida_hybridniho_vozidla?: string | null
    emisni_limit?: string | null
    stupe__plneni_emisni_urovne?: string | null
    korigovany_soucinitel_absorpce?: number | null
    co2?: number | null
    co2_mesto?: number | null
    co2_mimo_mesto?: number | null
    specificke_co2?: number | null
    snizeni_emisi_nedc?: number | null
    snizeni_emisi_wltp?: number | null
    spotreba_mesto?: number | null
    spotreba_mimo_mesto?: number | null
    spotreba_kombinovana?: number | null
    spotreba_pri_rychlosti?: string | null
    spotreba_el_mobil?: number | null
    dojezd_zr?: number | null
    vyrobce_karoserie?: string | null
    druh_karoserie?: string | null
    vyrobni_cislo_karoserie?: string | null
    barva?: string | null
    barva_doplnkova?: string | null
    pocet_mist_celkem?: number | null
    pocet_mist_k_sezeni?: number | null
    pocet_mist_k_stani?: number | null
    delka?: number | null
    sirka?: number | null
    vyska?: number | null
    rozvor?: number | null
    rozchod?: number | null
    provozni_hmotnost?: number | null
    nejvetsi_technicky_pripustna_hmotnost?: number | null
    nejvetsi_povolena_hmotnost?: number | null
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: string | null
    nejvetsi_povolena_hmotnost_na_napravu?: string | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: number | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: number | null
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: number | null
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: number | null
    hmotnosti_vozidla_pri_testu_wltp?: string | null
    predpis_spotreba_paliva?: string | null
    prumerna_hodnota_uzitecneho_zatizeni?: string | null
    spojovaci_zarizeni?: string | null
    pocet_naprav?: number | null
    naprav_pohanenych?: string | null
    kola_a_pneumatiky_naprava_1?: string | null
    kola_a_pneumatiky_naprava_2?: string | null
    kola_a_pneumatiky_naprava_3?: string | null
    kola_a_pneumatiky_naprava_4?: string | null
    vnejsi_hluk_vozidla_stojici?: number | null
    vnejsi_hluk_vozidla_otacky?: number | null
    vnejsi_hluk_vozidla_jizda?: number | null
    nejvyssi_rychlost?: number | null
    pomer_vykon_hmotnost?: number | null
    inovativni_technologie?: string | null
    stupe__dokonceni?: string | null
    faktor_odchylky_de?: number | null
    faktor_verifikace_vf?: number | null
    ucel_vozidla?: string | null
    dalsi_zaznamy?: string | null
    alternativni_provedeni?: string | null
    cislo_tp?: string | null
    cislo_orv?: string | null
    druh_rz?: string | null
    zarazeni_vozidla?: string | null
    status?: string | null
    pcv?: number | null
    abs?: boolean | null
    airbag?: string | null
    asr?: boolean | null
    brzdy_nouzova?: boolean | null
    brzdy_odlehcovaci?: boolean | null
    brzdy_parkovaci?: boolean | null
    brzdy_provozni?: boolean | null
    dopl_kovy_text_na_tp?: string | null
    hmotnosti_provozni_do?: number | null
    hmotnosti_zatizeni_sz?: number | null
    hmotnosti_zatizeni_sz_typ?: string | null
    hydropohon?: boolean | null
    objem_cisterny?: number | null
    zatizeni_strechy?: number | null
    cislo_motoru?: string | null
    nejvyssi_rychlost_omezeni?: number | null
    ovladani_brzd_sz?: string | null
    ovladani_brzd_sz_druh?: string | null
    retarder?: boolean | null
    rok_vyroby?: number | null
    delka_do?: number | null
    lozna_delka?: number | null
    lozna_sirka?: number | null
    vyska_do?: number | null
    typ_kod?: string | null
    rm_zaniku?: string | null
  }

  export type registrationsUpdateManyMutationInput = {
    datum_1_registrace?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datum_1_registrace_v_cr?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ztp?: NullableStringFieldUpdateOperationsInput | string | null
    es_eu?: NullableStringFieldUpdateOperationsInput | string | null
    druh_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    druh_vozidla_2_radek?: NullableStringFieldUpdateOperationsInput | string | null
    kategorie_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    tovarni_znacka?: NullableStringFieldUpdateOperationsInput | string | null
    typ?: NullableStringFieldUpdateOperationsInput | string | null
    varianta?: NullableStringFieldUpdateOperationsInput | string | null
    verze?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    obchodni_oznaceni?: NullableStringFieldUpdateOperationsInput | string | null
    vyrobce_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    vyrobce_motoru?: NullableStringFieldUpdateOperationsInput | string | null
    typ_motoru?: NullableStringFieldUpdateOperationsInput | string | null
    max_vykon?: NullableFloatFieldUpdateOperationsInput | number | null
    max_vykon_otacky?: NullableFloatFieldUpdateOperationsInput | number | null
    palivo?: NullableStringFieldUpdateOperationsInput | string | null
    zdvihovy_objem?: NullableFloatFieldUpdateOperationsInput | number | null
    plne_elektricke_vozidlo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hybridni_vozidlo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    trida_hybridniho_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    emisni_limit?: NullableStringFieldUpdateOperationsInput | string | null
    stupe__plneni_emisni_urovne?: NullableStringFieldUpdateOperationsInput | string | null
    korigovany_soucinitel_absorpce?: NullableFloatFieldUpdateOperationsInput | number | null
    co2?: NullableFloatFieldUpdateOperationsInput | number | null
    co2_mesto?: NullableFloatFieldUpdateOperationsInput | number | null
    co2_mimo_mesto?: NullableFloatFieldUpdateOperationsInput | number | null
    specificke_co2?: NullableFloatFieldUpdateOperationsInput | number | null
    snizeni_emisi_nedc?: NullableFloatFieldUpdateOperationsInput | number | null
    snizeni_emisi_wltp?: NullableFloatFieldUpdateOperationsInput | number | null
    spotreba_mesto?: NullableFloatFieldUpdateOperationsInput | number | null
    spotreba_mimo_mesto?: NullableFloatFieldUpdateOperationsInput | number | null
    spotreba_kombinovana?: NullableFloatFieldUpdateOperationsInput | number | null
    spotreba_pri_rychlosti?: NullableStringFieldUpdateOperationsInput | string | null
    spotreba_el_mobil?: NullableIntFieldUpdateOperationsInput | number | null
    dojezd_zr?: NullableIntFieldUpdateOperationsInput | number | null
    vyrobce_karoserie?: NullableStringFieldUpdateOperationsInput | string | null
    druh_karoserie?: NullableStringFieldUpdateOperationsInput | string | null
    vyrobni_cislo_karoserie?: NullableStringFieldUpdateOperationsInput | string | null
    barva?: NullableStringFieldUpdateOperationsInput | string | null
    barva_doplnkova?: NullableStringFieldUpdateOperationsInput | string | null
    pocet_mist_celkem?: NullableIntFieldUpdateOperationsInput | number | null
    pocet_mist_k_sezeni?: NullableIntFieldUpdateOperationsInput | number | null
    pocet_mist_k_stani?: NullableIntFieldUpdateOperationsInput | number | null
    delka?: NullableIntFieldUpdateOperationsInput | number | null
    sirka?: NullableIntFieldUpdateOperationsInput | number | null
    vyska?: NullableIntFieldUpdateOperationsInput | number | null
    rozvor?: NullableIntFieldUpdateOperationsInput | number | null
    rozchod?: NullableIntFieldUpdateOperationsInput | number | null
    provozni_hmotnost?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_technicky_pripustna_hmotnost?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_povolena_hmotnost?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: NullableStringFieldUpdateOperationsInput | string | null
    nejvetsi_povolena_hmotnost_na_napravu?: NullableStringFieldUpdateOperationsInput | string | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: NullableIntFieldUpdateOperationsInput | number | null
    hmotnosti_vozidla_pri_testu_wltp?: NullableStringFieldUpdateOperationsInput | string | null
    predpis_spotreba_paliva?: NullableStringFieldUpdateOperationsInput | string | null
    prumerna_hodnota_uzitecneho_zatizeni?: NullableStringFieldUpdateOperationsInput | string | null
    spojovaci_zarizeni?: NullableStringFieldUpdateOperationsInput | string | null
    pocet_naprav?: NullableIntFieldUpdateOperationsInput | number | null
    naprav_pohanenych?: NullableStringFieldUpdateOperationsInput | string | null
    kola_a_pneumatiky_naprava_1?: NullableStringFieldUpdateOperationsInput | string | null
    kola_a_pneumatiky_naprava_2?: NullableStringFieldUpdateOperationsInput | string | null
    kola_a_pneumatiky_naprava_3?: NullableStringFieldUpdateOperationsInput | string | null
    kola_a_pneumatiky_naprava_4?: NullableStringFieldUpdateOperationsInput | string | null
    vnejsi_hluk_vozidla_stojici?: NullableFloatFieldUpdateOperationsInput | number | null
    vnejsi_hluk_vozidla_otacky?: NullableFloatFieldUpdateOperationsInput | number | null
    vnejsi_hluk_vozidla_jizda?: NullableFloatFieldUpdateOperationsInput | number | null
    nejvyssi_rychlost?: NullableFloatFieldUpdateOperationsInput | number | null
    pomer_vykon_hmotnost?: NullableFloatFieldUpdateOperationsInput | number | null
    inovativni_technologie?: NullableStringFieldUpdateOperationsInput | string | null
    stupe__dokonceni?: NullableStringFieldUpdateOperationsInput | string | null
    faktor_odchylky_de?: NullableFloatFieldUpdateOperationsInput | number | null
    faktor_verifikace_vf?: NullableIntFieldUpdateOperationsInput | number | null
    ucel_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    dalsi_zaznamy?: NullableStringFieldUpdateOperationsInput | string | null
    alternativni_provedeni?: NullableStringFieldUpdateOperationsInput | string | null
    cislo_tp?: NullableStringFieldUpdateOperationsInput | string | null
    cislo_orv?: NullableStringFieldUpdateOperationsInput | string | null
    druh_rz?: NullableStringFieldUpdateOperationsInput | string | null
    zarazeni_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    pcv?: NullableIntFieldUpdateOperationsInput | number | null
    abs?: NullableBoolFieldUpdateOperationsInput | boolean | null
    airbag?: NullableStringFieldUpdateOperationsInput | string | null
    asr?: NullableBoolFieldUpdateOperationsInput | boolean | null
    brzdy_nouzova?: NullableBoolFieldUpdateOperationsInput | boolean | null
    brzdy_odlehcovaci?: NullableBoolFieldUpdateOperationsInput | boolean | null
    brzdy_parkovaci?: NullableBoolFieldUpdateOperationsInput | boolean | null
    brzdy_provozni?: NullableBoolFieldUpdateOperationsInput | boolean | null
    dopl_kovy_text_na_tp?: NullableStringFieldUpdateOperationsInput | string | null
    hmotnosti_provozni_do?: NullableIntFieldUpdateOperationsInput | number | null
    hmotnosti_zatizeni_sz?: NullableIntFieldUpdateOperationsInput | number | null
    hmotnosti_zatizeni_sz_typ?: NullableStringFieldUpdateOperationsInput | string | null
    hydropohon?: NullableBoolFieldUpdateOperationsInput | boolean | null
    objem_cisterny?: NullableFloatFieldUpdateOperationsInput | number | null
    zatizeni_strechy?: NullableIntFieldUpdateOperationsInput | number | null
    cislo_motoru?: NullableStringFieldUpdateOperationsInput | string | null
    nejvyssi_rychlost_omezeni?: NullableIntFieldUpdateOperationsInput | number | null
    ovladani_brzd_sz?: NullableStringFieldUpdateOperationsInput | string | null
    ovladani_brzd_sz_druh?: NullableStringFieldUpdateOperationsInput | string | null
    retarder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rok_vyroby?: NullableIntFieldUpdateOperationsInput | number | null
    delka_do?: NullableIntFieldUpdateOperationsInput | number | null
    lozna_delka?: NullableIntFieldUpdateOperationsInput | number | null
    lozna_sirka?: NullableIntFieldUpdateOperationsInput | number | null
    vyska_do?: NullableIntFieldUpdateOperationsInput | number | null
    typ_kod?: NullableStringFieldUpdateOperationsInput | string | null
    rm_zaniku?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type registrationsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    datum_1_registrace?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datum_1_registrace_v_cr?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ztp?: NullableStringFieldUpdateOperationsInput | string | null
    es_eu?: NullableStringFieldUpdateOperationsInput | string | null
    druh_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    druh_vozidla_2_radek?: NullableStringFieldUpdateOperationsInput | string | null
    kategorie_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    tovarni_znacka?: NullableStringFieldUpdateOperationsInput | string | null
    typ?: NullableStringFieldUpdateOperationsInput | string | null
    varianta?: NullableStringFieldUpdateOperationsInput | string | null
    verze?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    obchodni_oznaceni?: NullableStringFieldUpdateOperationsInput | string | null
    vyrobce_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    vyrobce_motoru?: NullableStringFieldUpdateOperationsInput | string | null
    typ_motoru?: NullableStringFieldUpdateOperationsInput | string | null
    max_vykon?: NullableFloatFieldUpdateOperationsInput | number | null
    max_vykon_otacky?: NullableFloatFieldUpdateOperationsInput | number | null
    palivo?: NullableStringFieldUpdateOperationsInput | string | null
    zdvihovy_objem?: NullableFloatFieldUpdateOperationsInput | number | null
    plne_elektricke_vozidlo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hybridni_vozidlo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    trida_hybridniho_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    emisni_limit?: NullableStringFieldUpdateOperationsInput | string | null
    stupe__plneni_emisni_urovne?: NullableStringFieldUpdateOperationsInput | string | null
    korigovany_soucinitel_absorpce?: NullableFloatFieldUpdateOperationsInput | number | null
    co2?: NullableFloatFieldUpdateOperationsInput | number | null
    co2_mesto?: NullableFloatFieldUpdateOperationsInput | number | null
    co2_mimo_mesto?: NullableFloatFieldUpdateOperationsInput | number | null
    specificke_co2?: NullableFloatFieldUpdateOperationsInput | number | null
    snizeni_emisi_nedc?: NullableFloatFieldUpdateOperationsInput | number | null
    snizeni_emisi_wltp?: NullableFloatFieldUpdateOperationsInput | number | null
    spotreba_mesto?: NullableFloatFieldUpdateOperationsInput | number | null
    spotreba_mimo_mesto?: NullableFloatFieldUpdateOperationsInput | number | null
    spotreba_kombinovana?: NullableFloatFieldUpdateOperationsInput | number | null
    spotreba_pri_rychlosti?: NullableStringFieldUpdateOperationsInput | string | null
    spotreba_el_mobil?: NullableIntFieldUpdateOperationsInput | number | null
    dojezd_zr?: NullableIntFieldUpdateOperationsInput | number | null
    vyrobce_karoserie?: NullableStringFieldUpdateOperationsInput | string | null
    druh_karoserie?: NullableStringFieldUpdateOperationsInput | string | null
    vyrobni_cislo_karoserie?: NullableStringFieldUpdateOperationsInput | string | null
    barva?: NullableStringFieldUpdateOperationsInput | string | null
    barva_doplnkova?: NullableStringFieldUpdateOperationsInput | string | null
    pocet_mist_celkem?: NullableIntFieldUpdateOperationsInput | number | null
    pocet_mist_k_sezeni?: NullableIntFieldUpdateOperationsInput | number | null
    pocet_mist_k_stani?: NullableIntFieldUpdateOperationsInput | number | null
    delka?: NullableIntFieldUpdateOperationsInput | number | null
    sirka?: NullableIntFieldUpdateOperationsInput | number | null
    vyska?: NullableIntFieldUpdateOperationsInput | number | null
    rozvor?: NullableIntFieldUpdateOperationsInput | number | null
    rozchod?: NullableIntFieldUpdateOperationsInput | number | null
    provozni_hmotnost?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_technicky_pripustna_hmotnost?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_povolena_hmotnost?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: NullableStringFieldUpdateOperationsInput | string | null
    nejvetsi_povolena_hmotnost_na_napravu?: NullableStringFieldUpdateOperationsInput | string | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: NullableIntFieldUpdateOperationsInput | number | null
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: NullableIntFieldUpdateOperationsInput | number | null
    hmotnosti_vozidla_pri_testu_wltp?: NullableStringFieldUpdateOperationsInput | string | null
    predpis_spotreba_paliva?: NullableStringFieldUpdateOperationsInput | string | null
    prumerna_hodnota_uzitecneho_zatizeni?: NullableStringFieldUpdateOperationsInput | string | null
    spojovaci_zarizeni?: NullableStringFieldUpdateOperationsInput | string | null
    pocet_naprav?: NullableIntFieldUpdateOperationsInput | number | null
    naprav_pohanenych?: NullableStringFieldUpdateOperationsInput | string | null
    kola_a_pneumatiky_naprava_1?: NullableStringFieldUpdateOperationsInput | string | null
    kola_a_pneumatiky_naprava_2?: NullableStringFieldUpdateOperationsInput | string | null
    kola_a_pneumatiky_naprava_3?: NullableStringFieldUpdateOperationsInput | string | null
    kola_a_pneumatiky_naprava_4?: NullableStringFieldUpdateOperationsInput | string | null
    vnejsi_hluk_vozidla_stojici?: NullableFloatFieldUpdateOperationsInput | number | null
    vnejsi_hluk_vozidla_otacky?: NullableFloatFieldUpdateOperationsInput | number | null
    vnejsi_hluk_vozidla_jizda?: NullableFloatFieldUpdateOperationsInput | number | null
    nejvyssi_rychlost?: NullableFloatFieldUpdateOperationsInput | number | null
    pomer_vykon_hmotnost?: NullableFloatFieldUpdateOperationsInput | number | null
    inovativni_technologie?: NullableStringFieldUpdateOperationsInput | string | null
    stupe__dokonceni?: NullableStringFieldUpdateOperationsInput | string | null
    faktor_odchylky_de?: NullableFloatFieldUpdateOperationsInput | number | null
    faktor_verifikace_vf?: NullableIntFieldUpdateOperationsInput | number | null
    ucel_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    dalsi_zaznamy?: NullableStringFieldUpdateOperationsInput | string | null
    alternativni_provedeni?: NullableStringFieldUpdateOperationsInput | string | null
    cislo_tp?: NullableStringFieldUpdateOperationsInput | string | null
    cislo_orv?: NullableStringFieldUpdateOperationsInput | string | null
    druh_rz?: NullableStringFieldUpdateOperationsInput | string | null
    zarazeni_vozidla?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    pcv?: NullableIntFieldUpdateOperationsInput | number | null
    abs?: NullableBoolFieldUpdateOperationsInput | boolean | null
    airbag?: NullableStringFieldUpdateOperationsInput | string | null
    asr?: NullableBoolFieldUpdateOperationsInput | boolean | null
    brzdy_nouzova?: NullableBoolFieldUpdateOperationsInput | boolean | null
    brzdy_odlehcovaci?: NullableBoolFieldUpdateOperationsInput | boolean | null
    brzdy_parkovaci?: NullableBoolFieldUpdateOperationsInput | boolean | null
    brzdy_provozni?: NullableBoolFieldUpdateOperationsInput | boolean | null
    dopl_kovy_text_na_tp?: NullableStringFieldUpdateOperationsInput | string | null
    hmotnosti_provozni_do?: NullableIntFieldUpdateOperationsInput | number | null
    hmotnosti_zatizeni_sz?: NullableIntFieldUpdateOperationsInput | number | null
    hmotnosti_zatizeni_sz_typ?: NullableStringFieldUpdateOperationsInput | string | null
    hydropohon?: NullableBoolFieldUpdateOperationsInput | boolean | null
    objem_cisterny?: NullableFloatFieldUpdateOperationsInput | number | null
    zatizeni_strechy?: NullableIntFieldUpdateOperationsInput | number | null
    cislo_motoru?: NullableStringFieldUpdateOperationsInput | string | null
    nejvyssi_rychlost_omezeni?: NullableIntFieldUpdateOperationsInput | number | null
    ovladani_brzd_sz?: NullableStringFieldUpdateOperationsInput | string | null
    ovladani_brzd_sz_druh?: NullableStringFieldUpdateOperationsInput | string | null
    retarder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rok_vyroby?: NullableIntFieldUpdateOperationsInput | number | null
    delka_do?: NullableIntFieldUpdateOperationsInput | number | null
    lozna_delka?: NullableIntFieldUpdateOperationsInput | number | null
    lozna_sirka?: NullableIntFieldUpdateOperationsInput | number | null
    vyska_do?: NullableIntFieldUpdateOperationsInput | number | null
    typ_kod?: NullableStringFieldUpdateOperationsInput | string | null
    rm_zaniku?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type registrationsCountOrderByAggregateInput = {
    id?: SortOrder
    datum_1_registrace?: SortOrder
    datum_1_registrace_v_cr?: SortOrder
    ztp?: SortOrder
    es_eu?: SortOrder
    druh_vozidla?: SortOrder
    druh_vozidla_2_radek?: SortOrder
    kategorie_vozidla?: SortOrder
    tovarni_znacka?: SortOrder
    typ?: SortOrder
    varianta?: SortOrder
    verze?: SortOrder
    vin?: SortOrder
    obchodni_oznaceni?: SortOrder
    vyrobce_vozidla?: SortOrder
    vyrobce_motoru?: SortOrder
    typ_motoru?: SortOrder
    max_vykon?: SortOrder
    max_vykon_otacky?: SortOrder
    palivo?: SortOrder
    zdvihovy_objem?: SortOrder
    plne_elektricke_vozidlo?: SortOrder
    hybridni_vozidlo?: SortOrder
    trida_hybridniho_vozidla?: SortOrder
    emisni_limit?: SortOrder
    stupe__plneni_emisni_urovne?: SortOrder
    korigovany_soucinitel_absorpce?: SortOrder
    co2?: SortOrder
    co2_mesto?: SortOrder
    co2_mimo_mesto?: SortOrder
    specificke_co2?: SortOrder
    snizeni_emisi_nedc?: SortOrder
    snizeni_emisi_wltp?: SortOrder
    spotreba_mesto?: SortOrder
    spotreba_mimo_mesto?: SortOrder
    spotreba_kombinovana?: SortOrder
    spotreba_pri_rychlosti?: SortOrder
    spotreba_el_mobil?: SortOrder
    dojezd_zr?: SortOrder
    vyrobce_karoserie?: SortOrder
    druh_karoserie?: SortOrder
    vyrobni_cislo_karoserie?: SortOrder
    barva?: SortOrder
    barva_doplnkova?: SortOrder
    pocet_mist_celkem?: SortOrder
    pocet_mist_k_sezeni?: SortOrder
    pocet_mist_k_stani?: SortOrder
    delka?: SortOrder
    sirka?: SortOrder
    vyska?: SortOrder
    rozvor?: SortOrder
    rozchod?: SortOrder
    provozni_hmotnost?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost?: SortOrder
    nejvetsi_povolena_hmotnost?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: SortOrder
    nejvetsi_povolena_hmotnost_na_napravu?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: SortOrder
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: SortOrder
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: SortOrder
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: SortOrder
    hmotnosti_vozidla_pri_testu_wltp?: SortOrder
    predpis_spotreba_paliva?: SortOrder
    prumerna_hodnota_uzitecneho_zatizeni?: SortOrder
    spojovaci_zarizeni?: SortOrder
    pocet_naprav?: SortOrder
    naprav_pohanenych?: SortOrder
    kola_a_pneumatiky_naprava_1?: SortOrder
    kola_a_pneumatiky_naprava_2?: SortOrder
    kola_a_pneumatiky_naprava_3?: SortOrder
    kola_a_pneumatiky_naprava_4?: SortOrder
    vnejsi_hluk_vozidla_stojici?: SortOrder
    vnejsi_hluk_vozidla_otacky?: SortOrder
    vnejsi_hluk_vozidla_jizda?: SortOrder
    nejvyssi_rychlost?: SortOrder
    pomer_vykon_hmotnost?: SortOrder
    inovativni_technologie?: SortOrder
    stupe__dokonceni?: SortOrder
    faktor_odchylky_de?: SortOrder
    faktor_verifikace_vf?: SortOrder
    ucel_vozidla?: SortOrder
    dalsi_zaznamy?: SortOrder
    alternativni_provedeni?: SortOrder
    cislo_tp?: SortOrder
    cislo_orv?: SortOrder
    druh_rz?: SortOrder
    zarazeni_vozidla?: SortOrder
    status?: SortOrder
    pcv?: SortOrder
    abs?: SortOrder
    airbag?: SortOrder
    asr?: SortOrder
    brzdy_nouzova?: SortOrder
    brzdy_odlehcovaci?: SortOrder
    brzdy_parkovaci?: SortOrder
    brzdy_provozni?: SortOrder
    dopl_kovy_text_na_tp?: SortOrder
    hmotnosti_provozni_do?: SortOrder
    hmotnosti_zatizeni_sz?: SortOrder
    hmotnosti_zatizeni_sz_typ?: SortOrder
    hydropohon?: SortOrder
    objem_cisterny?: SortOrder
    zatizeni_strechy?: SortOrder
    cislo_motoru?: SortOrder
    nejvyssi_rychlost_omezeni?: SortOrder
    ovladani_brzd_sz?: SortOrder
    ovladani_brzd_sz_druh?: SortOrder
    retarder?: SortOrder
    rok_vyroby?: SortOrder
    delka_do?: SortOrder
    lozna_delka?: SortOrder
    lozna_sirka?: SortOrder
    vyska_do?: SortOrder
    typ_kod?: SortOrder
    rm_zaniku?: SortOrder
  }

  export type registrationsAvgOrderByAggregateInput = {
    id?: SortOrder
    max_vykon?: SortOrder
    max_vykon_otacky?: SortOrder
    zdvihovy_objem?: SortOrder
    korigovany_soucinitel_absorpce?: SortOrder
    co2?: SortOrder
    co2_mesto?: SortOrder
    co2_mimo_mesto?: SortOrder
    specificke_co2?: SortOrder
    snizeni_emisi_nedc?: SortOrder
    snizeni_emisi_wltp?: SortOrder
    spotreba_mesto?: SortOrder
    spotreba_mimo_mesto?: SortOrder
    spotreba_kombinovana?: SortOrder
    spotreba_el_mobil?: SortOrder
    dojezd_zr?: SortOrder
    pocet_mist_celkem?: SortOrder
    pocet_mist_k_sezeni?: SortOrder
    pocet_mist_k_stani?: SortOrder
    delka?: SortOrder
    sirka?: SortOrder
    vyska?: SortOrder
    rozvor?: SortOrder
    rozchod?: SortOrder
    provozni_hmotnost?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost?: SortOrder
    nejvetsi_povolena_hmotnost?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: SortOrder
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: SortOrder
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: SortOrder
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: SortOrder
    pocet_naprav?: SortOrder
    vnejsi_hluk_vozidla_stojici?: SortOrder
    vnejsi_hluk_vozidla_otacky?: SortOrder
    vnejsi_hluk_vozidla_jizda?: SortOrder
    nejvyssi_rychlost?: SortOrder
    pomer_vykon_hmotnost?: SortOrder
    faktor_odchylky_de?: SortOrder
    faktor_verifikace_vf?: SortOrder
    pcv?: SortOrder
    hmotnosti_provozni_do?: SortOrder
    hmotnosti_zatizeni_sz?: SortOrder
    objem_cisterny?: SortOrder
    zatizeni_strechy?: SortOrder
    nejvyssi_rychlost_omezeni?: SortOrder
    rok_vyroby?: SortOrder
    delka_do?: SortOrder
    lozna_delka?: SortOrder
    lozna_sirka?: SortOrder
    vyska_do?: SortOrder
  }

  export type registrationsMaxOrderByAggregateInput = {
    id?: SortOrder
    datum_1_registrace?: SortOrder
    datum_1_registrace_v_cr?: SortOrder
    ztp?: SortOrder
    es_eu?: SortOrder
    druh_vozidla?: SortOrder
    druh_vozidla_2_radek?: SortOrder
    kategorie_vozidla?: SortOrder
    tovarni_znacka?: SortOrder
    typ?: SortOrder
    varianta?: SortOrder
    verze?: SortOrder
    vin?: SortOrder
    obchodni_oznaceni?: SortOrder
    vyrobce_vozidla?: SortOrder
    vyrobce_motoru?: SortOrder
    typ_motoru?: SortOrder
    max_vykon?: SortOrder
    max_vykon_otacky?: SortOrder
    palivo?: SortOrder
    zdvihovy_objem?: SortOrder
    plne_elektricke_vozidlo?: SortOrder
    hybridni_vozidlo?: SortOrder
    trida_hybridniho_vozidla?: SortOrder
    emisni_limit?: SortOrder
    stupe__plneni_emisni_urovne?: SortOrder
    korigovany_soucinitel_absorpce?: SortOrder
    co2?: SortOrder
    co2_mesto?: SortOrder
    co2_mimo_mesto?: SortOrder
    specificke_co2?: SortOrder
    snizeni_emisi_nedc?: SortOrder
    snizeni_emisi_wltp?: SortOrder
    spotreba_mesto?: SortOrder
    spotreba_mimo_mesto?: SortOrder
    spotreba_kombinovana?: SortOrder
    spotreba_pri_rychlosti?: SortOrder
    spotreba_el_mobil?: SortOrder
    dojezd_zr?: SortOrder
    vyrobce_karoserie?: SortOrder
    druh_karoserie?: SortOrder
    vyrobni_cislo_karoserie?: SortOrder
    barva?: SortOrder
    barva_doplnkova?: SortOrder
    pocet_mist_celkem?: SortOrder
    pocet_mist_k_sezeni?: SortOrder
    pocet_mist_k_stani?: SortOrder
    delka?: SortOrder
    sirka?: SortOrder
    vyska?: SortOrder
    rozvor?: SortOrder
    rozchod?: SortOrder
    provozni_hmotnost?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost?: SortOrder
    nejvetsi_povolena_hmotnost?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: SortOrder
    nejvetsi_povolena_hmotnost_na_napravu?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: SortOrder
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: SortOrder
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: SortOrder
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: SortOrder
    hmotnosti_vozidla_pri_testu_wltp?: SortOrder
    predpis_spotreba_paliva?: SortOrder
    prumerna_hodnota_uzitecneho_zatizeni?: SortOrder
    spojovaci_zarizeni?: SortOrder
    pocet_naprav?: SortOrder
    naprav_pohanenych?: SortOrder
    kola_a_pneumatiky_naprava_1?: SortOrder
    kola_a_pneumatiky_naprava_2?: SortOrder
    kola_a_pneumatiky_naprava_3?: SortOrder
    kola_a_pneumatiky_naprava_4?: SortOrder
    vnejsi_hluk_vozidla_stojici?: SortOrder
    vnejsi_hluk_vozidla_otacky?: SortOrder
    vnejsi_hluk_vozidla_jizda?: SortOrder
    nejvyssi_rychlost?: SortOrder
    pomer_vykon_hmotnost?: SortOrder
    inovativni_technologie?: SortOrder
    stupe__dokonceni?: SortOrder
    faktor_odchylky_de?: SortOrder
    faktor_verifikace_vf?: SortOrder
    ucel_vozidla?: SortOrder
    dalsi_zaznamy?: SortOrder
    alternativni_provedeni?: SortOrder
    cislo_tp?: SortOrder
    cislo_orv?: SortOrder
    druh_rz?: SortOrder
    zarazeni_vozidla?: SortOrder
    status?: SortOrder
    pcv?: SortOrder
    abs?: SortOrder
    airbag?: SortOrder
    asr?: SortOrder
    brzdy_nouzova?: SortOrder
    brzdy_odlehcovaci?: SortOrder
    brzdy_parkovaci?: SortOrder
    brzdy_provozni?: SortOrder
    dopl_kovy_text_na_tp?: SortOrder
    hmotnosti_provozni_do?: SortOrder
    hmotnosti_zatizeni_sz?: SortOrder
    hmotnosti_zatizeni_sz_typ?: SortOrder
    hydropohon?: SortOrder
    objem_cisterny?: SortOrder
    zatizeni_strechy?: SortOrder
    cislo_motoru?: SortOrder
    nejvyssi_rychlost_omezeni?: SortOrder
    ovladani_brzd_sz?: SortOrder
    ovladani_brzd_sz_druh?: SortOrder
    retarder?: SortOrder
    rok_vyroby?: SortOrder
    delka_do?: SortOrder
    lozna_delka?: SortOrder
    lozna_sirka?: SortOrder
    vyska_do?: SortOrder
    typ_kod?: SortOrder
    rm_zaniku?: SortOrder
  }

  export type registrationsMinOrderByAggregateInput = {
    id?: SortOrder
    datum_1_registrace?: SortOrder
    datum_1_registrace_v_cr?: SortOrder
    ztp?: SortOrder
    es_eu?: SortOrder
    druh_vozidla?: SortOrder
    druh_vozidla_2_radek?: SortOrder
    kategorie_vozidla?: SortOrder
    tovarni_znacka?: SortOrder
    typ?: SortOrder
    varianta?: SortOrder
    verze?: SortOrder
    vin?: SortOrder
    obchodni_oznaceni?: SortOrder
    vyrobce_vozidla?: SortOrder
    vyrobce_motoru?: SortOrder
    typ_motoru?: SortOrder
    max_vykon?: SortOrder
    max_vykon_otacky?: SortOrder
    palivo?: SortOrder
    zdvihovy_objem?: SortOrder
    plne_elektricke_vozidlo?: SortOrder
    hybridni_vozidlo?: SortOrder
    trida_hybridniho_vozidla?: SortOrder
    emisni_limit?: SortOrder
    stupe__plneni_emisni_urovne?: SortOrder
    korigovany_soucinitel_absorpce?: SortOrder
    co2?: SortOrder
    co2_mesto?: SortOrder
    co2_mimo_mesto?: SortOrder
    specificke_co2?: SortOrder
    snizeni_emisi_nedc?: SortOrder
    snizeni_emisi_wltp?: SortOrder
    spotreba_mesto?: SortOrder
    spotreba_mimo_mesto?: SortOrder
    spotreba_kombinovana?: SortOrder
    spotreba_pri_rychlosti?: SortOrder
    spotreba_el_mobil?: SortOrder
    dojezd_zr?: SortOrder
    vyrobce_karoserie?: SortOrder
    druh_karoserie?: SortOrder
    vyrobni_cislo_karoserie?: SortOrder
    barva?: SortOrder
    barva_doplnkova?: SortOrder
    pocet_mist_celkem?: SortOrder
    pocet_mist_k_sezeni?: SortOrder
    pocet_mist_k_stani?: SortOrder
    delka?: SortOrder
    sirka?: SortOrder
    vyska?: SortOrder
    rozvor?: SortOrder
    rozchod?: SortOrder
    provozni_hmotnost?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost?: SortOrder
    nejvetsi_povolena_hmotnost?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_na_napravu?: SortOrder
    nejvetsi_povolena_hmotnost_na_napravu?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: SortOrder
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: SortOrder
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: SortOrder
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: SortOrder
    hmotnosti_vozidla_pri_testu_wltp?: SortOrder
    predpis_spotreba_paliva?: SortOrder
    prumerna_hodnota_uzitecneho_zatizeni?: SortOrder
    spojovaci_zarizeni?: SortOrder
    pocet_naprav?: SortOrder
    naprav_pohanenych?: SortOrder
    kola_a_pneumatiky_naprava_1?: SortOrder
    kola_a_pneumatiky_naprava_2?: SortOrder
    kola_a_pneumatiky_naprava_3?: SortOrder
    kola_a_pneumatiky_naprava_4?: SortOrder
    vnejsi_hluk_vozidla_stojici?: SortOrder
    vnejsi_hluk_vozidla_otacky?: SortOrder
    vnejsi_hluk_vozidla_jizda?: SortOrder
    nejvyssi_rychlost?: SortOrder
    pomer_vykon_hmotnost?: SortOrder
    inovativni_technologie?: SortOrder
    stupe__dokonceni?: SortOrder
    faktor_odchylky_de?: SortOrder
    faktor_verifikace_vf?: SortOrder
    ucel_vozidla?: SortOrder
    dalsi_zaznamy?: SortOrder
    alternativni_provedeni?: SortOrder
    cislo_tp?: SortOrder
    cislo_orv?: SortOrder
    druh_rz?: SortOrder
    zarazeni_vozidla?: SortOrder
    status?: SortOrder
    pcv?: SortOrder
    abs?: SortOrder
    airbag?: SortOrder
    asr?: SortOrder
    brzdy_nouzova?: SortOrder
    brzdy_odlehcovaci?: SortOrder
    brzdy_parkovaci?: SortOrder
    brzdy_provozni?: SortOrder
    dopl_kovy_text_na_tp?: SortOrder
    hmotnosti_provozni_do?: SortOrder
    hmotnosti_zatizeni_sz?: SortOrder
    hmotnosti_zatizeni_sz_typ?: SortOrder
    hydropohon?: SortOrder
    objem_cisterny?: SortOrder
    zatizeni_strechy?: SortOrder
    cislo_motoru?: SortOrder
    nejvyssi_rychlost_omezeni?: SortOrder
    ovladani_brzd_sz?: SortOrder
    ovladani_brzd_sz_druh?: SortOrder
    retarder?: SortOrder
    rok_vyroby?: SortOrder
    delka_do?: SortOrder
    lozna_delka?: SortOrder
    lozna_sirka?: SortOrder
    vyska_do?: SortOrder
    typ_kod?: SortOrder
    rm_zaniku?: SortOrder
  }

  export type registrationsSumOrderByAggregateInput = {
    id?: SortOrder
    max_vykon?: SortOrder
    max_vykon_otacky?: SortOrder
    zdvihovy_objem?: SortOrder
    korigovany_soucinitel_absorpce?: SortOrder
    co2?: SortOrder
    co2_mesto?: SortOrder
    co2_mimo_mesto?: SortOrder
    specificke_co2?: SortOrder
    snizeni_emisi_nedc?: SortOrder
    snizeni_emisi_wltp?: SortOrder
    spotreba_mesto?: SortOrder
    spotreba_mimo_mesto?: SortOrder
    spotreba_kombinovana?: SortOrder
    spotreba_el_mobil?: SortOrder
    dojezd_zr?: SortOrder
    pocet_mist_celkem?: SortOrder
    pocet_mist_k_sezeni?: SortOrder
    pocet_mist_k_stani?: SortOrder
    delka?: SortOrder
    sirka?: SortOrder
    vyska?: SortOrder
    rozvor?: SortOrder
    rozchod?: SortOrder
    provozni_hmotnost?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost?: SortOrder
    nejvetsi_povolena_hmotnost?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden?: SortOrder
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz?: SortOrder
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho?: SortOrder
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy?: SortOrder
    nejvetsi_povolena_hmotnost_jizdni_soupravy?: SortOrder
    pocet_naprav?: SortOrder
    vnejsi_hluk_vozidla_stojici?: SortOrder
    vnejsi_hluk_vozidla_otacky?: SortOrder
    vnejsi_hluk_vozidla_jizda?: SortOrder
    nejvyssi_rychlost?: SortOrder
    pomer_vykon_hmotnost?: SortOrder
    faktor_odchylky_de?: SortOrder
    faktor_verifikace_vf?: SortOrder
    pcv?: SortOrder
    hmotnosti_provozni_do?: SortOrder
    hmotnosti_zatizeni_sz?: SortOrder
    objem_cisterny?: SortOrder
    zatizeni_strechy?: SortOrder
    nejvyssi_rychlost_omezeni?: SortOrder
    rok_vyroby?: SortOrder
    delka_do?: SortOrder
    lozna_delka?: SortOrder
    lozna_sirka?: SortOrder
    vyska_do?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}