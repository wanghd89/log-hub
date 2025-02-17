# Cost Estimation

!!! important "Important"
    The cost estimation in this section is just examples. They are calculated based on assumptions, and may vary in your environment.

You will be responsible for the cost of using each of the AWS services when running the solution. As of June 2022, the 
main factors affecting the solution cost include:

- Type of logs to be ingested
- Volume of logs to be ingested/processed
- Size of the log message
- Location of logs
- Additional features

This section will walk you through the cost estimation of 10/100/1000 GB daily log ingestion. The total cost is composed of 
the [**Amazon OpenSearch cost**](#amazon-opensearch-cost), the [**Processing Cost**](#processing-cost), and the [**Additional Features Cost**](#additional-features-cost).
All the cost estimation is All price models are calculated based on the AWS service price of US East (N. Virginia) region.

## Amazon OpenSearch Cost

- **OD**: On Demand
- **AURI_1**: All Upfront Reserved Instance 1 Year
- **Tiering**: The days stored in each tier. For example, 7H + 23W + 60C represents the log is stored in hot tier for 7 days,  warm tier for 23 days, and cold tier for 60 days.

| Daily log Volume (GB)	 | Retention (days)	 | Tiering	         | Replica	 | Dedicated Master	 | Data Node	      | EBS (GB)	 | UW Nodes	   | UW/Cold S3 Storage (GB)	 | OD Monthly ($)	 | OD cost per GB ($)	 | AURI_1 Monthly ($)	 | AURI_1 cost per GB ($)	 |
|------------------------|-------------------|------------------|----------|-------------------|-----------------|-----------|-------------|--------------------------|-----------------|---------------------|---------------------|-------------------------|
| 10	                    | 30	               | 30H	             | 0	       | N/A	              | c6g.large[2]	   | 380	      | N/A	        | 0	                       | 216.28	         | 0.72093	            | 158.54	             | 0.52847	                |
| 10	                    | 30	               | 30H	             | 1	       | N/A	              | m6g.large[2]	   | 760	      | N/A	        | 0	                       | 289.35	         | 0.9645	             | 223.94	             | 0.74647	                |
| 100	                   | 30	               | 7H + 23W	        | 0	       | m6g.large[3]	     | m6g.large[2]	   | 886	      | medium[2]	  | 0	                       | 989.49	         | 0.32983	            | 825.97	             | 0.27532	                |
| 100	                   | 30	               | 7H + 23W	        | 1	       | m6g.large[3]	     | m6g.large[4]	   | 1772	     | medium[2]	  | 0	                       | 1295.85	        | 0.43195	            | 1066.92	            | 0.35564	                |
| 100	                   | 90	               | 7H + 23W + 60C	  | 0	       | m6g.large[3]	     | m6g.large[2]	   | 886	      | medium[2]	  | 8300	                    | 1133.49	        | 0.12594	            | 969.97	             | 0.10777	                |
| 100	                   | 90	               | 7H + 23W + 60C	  | 1	       | m6g.large[3]	     | m6g.large[4]	   | 1772	     | medium[2]	  | 8300	                    | 1439.85	        | 0.15998	            | 1210.92	            | 0.13455	                |
| 100	                   | 180	              | 7H + 23W + 150C	 | 0	       | m6g.large[3]	     | m6g.large[2]	   | 886	      | medium[2]	  | 17300	                   | 1349.49	        | 0.07497	            | 1185.97	            | 0.06589	                |
| 100	                   | 180	              | 7H + 23W + 150C	 | 1	       | m6g.large[3]	     | m6g.large[4]	   | 1772	     | medium[2]	  | 17300	                   | 1655.85	        | 0.09199	            | 1426.92	            | 0.07927	                |
| 1000	                  | 30	               | 7H + 23W	        | 0	       | m6g.large[3]	     | r6g.xlarge[6]	  | 8856	     | medium[15]	 | 23000	                   | 6101.15	        | 0.20337	            | 5489.48	            | 0.18298	                |
| 1000	                  | 30	               | 7H + 23W	        | 1	       | m6g.large[3]	     | r6g.2xlarge[6]	 | 17712	    | medium[15]	 | 23000	                   | 8759.49	        | 0.29198	            | 7635.8	             | 0.25453	                |
| 1000	                  | 90	               | 7H + 23W + 60C	  | 0	       | m6g.large[3]	     | r6g.xlarge[6]	  | 8856	     | medium[15]	 | 83000	                   | 8027.33	        | 0.08919	            | 7245.45	            | 0.0805	                 |
| 1000	                  | 90	               | 7H + 23W + 60C	  | 1	       | m6g.large[3]	     | r6g.2xlarge[6]	 | 17712	    | medium[15]	 | 83000	                   | 10199.49	       | 0.11333	            | 9075.8	             | 0.10084	                |
| 1000	                  | 180	              | 7H + 23W + 150C	 | 0	       | m6g.large[3]	     | r6g.xlarge[6]	  | 8856	     | medium[15]	 | 173000	                  | 9701.15	        | 0.0539	             | 9089.48	            | 0.0505	                 |
| 1000	                  | 180	              | 7H + 23W + 150C	 | 1	       | m6g.large[3]	     | r6g.2xlarge[6]	 | 17712	    | medium[15]	 | 173000	                  | 12644.19	       | 0.07025	            | 11420.86	           | 0.06345	                |

## Processing Cost

### AWS Service Logs

Depending on the log location, the cost of ingesting and processing service logs may vary. 

#### Logs in Amazon S3

!!! note "Note"

    Ingest AWS service logs from S3 will incur SQS and S3 request fees which are very low, usually within the free tier.

Here are the assumptions:

- AWS Services save logs to Amazon S3 every 5 minutes in gzip format (most of AWS services output logs in gzip). 
- A 4MB compressed log file in S3 is roughly 100MB in raw log size
- A Lambda with 1GB memory takes about 26 seconds to process a 4MB log file, namely 260 ms per MB raw logs. 
- The maximum compressed log file size is 5MB.

You have `N` GB raw log per day, and the daily cost estimation is as follows: 

- Lambda Cost = 260 ms per MB x 1024 MB x `N` GB/day x $0.0000000167 per ms
- S3 Storage Cost = $0.023 per GB x `N `GB/day * 4% (compression)

The total monthly cost for ingesting AWS service logs is:

**Total Monthly Charges** = (Lambda Cost + S3 Storage Cost) x 30 days

| Daily Log Volume | Daily Lambda Cost $ | Daily S3 Storage Cost $ | Monthly $ |
| ---------------- | ------------------- | ----------------------- | --------- |
| 10               | 0.044               | 0.009                   | 1.610     |
| 100              | 0.445               | 0.092                   | 16.099    |
| 1000             | 4.446               | 0.920                   | 160.986   |


### Application Logs

Depending on the log location, the cost of ingesting and processing application logs may vary.

#### Ingest logs from Amazon EC2

!!! important "Important"

    If you have multiple log format (index), you need to estimate each of them.

The cost estimation is based on the following assumptions and facts:

- 30% more shards are provided to handle traffic jitter. 
- The average log message size is 1 KB. 
- The Lambda processor memory is 1024 MB.
- Every Lambda invocation process 1 MB logs.
- One Lambda invocation simultaneously to process one shard of Kinesis. 
- The Lambda runtime to process log less than 5 MB is 500ms.
- One Kinesis shard intake log size is =  1 MB /second x 3600 seconds per hour x 24 hours x 0.7 = 60.48 GB/day.
- The daily log volume is `X` GB.
- The desired Kinesis Shard number `S` is = Round_up_to_next_integer(Daily log volume `X` / 60.48).

Based on the above assumptions, here is the daily cost estimation formula:

- Kinesis Shard Hour Cost = $0.015 / shard hour x 24 hours per day x `S` shards
- Kinesis PUT Payload Unit Cost =  $0.014 per million units * 1 millions per GB x `X` GB per day
- Lambda Cost = $0.0000000167 per 1ms x 500 ms per invocation x 1,000 invocations per GB x `X` GB per day

**Total Monthly Charges** = (Kinesis Shard Hour Cost + Kinesis PUT Payload Unit Cost + Lambda Cost) x 30 days

| Daily Log Volume (GB) | Shards | Daily Kinesis Shard Hour Cost | Daily Kinesis PUT Payload Unit Cost | Daily Lambda Cost | Monthly $ |
| --------------------- | ------ | ----------------------------- | ----------------------------------- | ----------------- | --------- |
| 10                    | 1      | 0.36                          | 0.14                                | 0.0835            | 17.505    |
| 100                   | 2      | 0.72                          | 1.4                                 | 0.835             | 88.65     |
| 1000                  | 17     | 6.12                          | 14                                  | 8.35              | 854.1     |

#### Ingest logs from Amazon EKS

Currently, there is no buffer layer between EKS and Amazon OpenSearch, and there is no additional cost.


## Additional Features Cost

!!! note "Note"

    You will not be charged if you do not turn on the additional features in the Log Hub console.

### Access Proxy

If you deploy the [Access Proxy](./domains/proxy.md) through Log Hub, the following charges will apply.  

- EC2 Cost = t3.large 1Y RI All Upfront $426.612 x 2  / 12 months  = $71.1/month
- EBS Cost = $0.1 GB/month x 8 GB x 2 = $1.6/month
- Elastic Load Balancer Cost = $0.0225 per ALB-hour x 720 hours/month = $16.2/month

**Total Monthly Charges** = $71.1 EC2 Cost + $1.6 EBS Cost + $16.2 Elastic Load Balancer Cost = **$88.9**

### Alarms

If you deploy the [Alarms](./domains/alarms.md) through Log Hub, the [CloudWatch Price](https://aws.amazon.com/cloudwatch/pricing/) will apply.

